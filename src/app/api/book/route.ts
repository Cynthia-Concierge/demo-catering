import { NextResponse } from 'next/server';

const GHL_BASE = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';

function ghlHeaders(pit: string) {
  return {
    'Authorization': `Bearer ${pit}`,
    'Version': GHL_VERSION,
    'Content-Type': 'application/json',
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, eventDate, guestCount, eventType, message } = body;

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const pit = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;

    // GHL not connected yet — just log and return success for demo
    if (!pit || !locationId) {
      console.log('[book-api] GHL not configured — form submission received:', { firstName, lastName, email, phone, eventDate, guestCount, eventType });
      return NextResponse.json({ success: true, message: 'Form received (GHL not yet connected)' });
    }

    // Step 1: Upsert contact — create or find existing
    let contactId: string | null = null;

    const createRes = await fetch(`${GHL_BASE}/contacts/upsert`, {
      method: 'POST',
      headers: ghlHeaders(pit),
      body: JSON.stringify({
        locationId,
        firstName,
        lastName,
        email,
        phone,
        source: 'Demo Website - Booking Form',
        tags: ['Demo Lead', 'Demo - Catering Inquiry'],
      }),
    });

    if (createRes.ok) {
      const data = await createRes.json();
      contactId = data.contact?.id;
      console.log(`[book-api] Upserted contact: ${contactId} (new=${data.new})`);
    } else {
      const errText = await createRes.text();
      console.error(`[book-api] GHL upsert error (${createRes.status}): ${errText}`);
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }

    if (!contactId) {
      return NextResponse.json({ error: 'Failed to get contact ID' }, { status: 500 });
    }

    // Step 2: Ensure Demo Lead tag is on the contact (upsert may not add tags to existing contacts)
    fetch(`${GHL_BASE}/contacts/${contactId}/tags`, {
      method: 'POST',
      headers: ghlHeaders(pit),
      body: JSON.stringify({ tags: ['Demo Lead', 'Demo - Catering Inquiry'] }),
    }).catch(() => {});

    // Step 3: Add event details as a note
    const noteLines: string[] = [];
    if (eventDate) noteLines.push(`Event Date: ${eventDate}`);
    if (guestCount) noteLines.push(`Guest Count: ${guestCount}`);
    if (eventType) noteLines.push(`Event Type: ${eventType}`);
    if (message) noteLines.push(`Message: ${message}`);

    if (noteLines.length > 0) {
      fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
        method: 'POST',
        headers: ghlHeaders(pit),
        body: JSON.stringify({ body: `New Catering Inquiry:\n${noteLines.join('\n')}` }),
      }).catch(() => {});
    }

    // Step 4: Create opportunity in Demo Catering pipeline (await to get ID)
    const pipelineId = process.env.GHL_PIPELINE_ID;
    const newLeadStageId = process.env.GHL_STAGE_ID;
    const contactedStageId = process.env.GHL_CONTACTED_STAGE_ID;
    let opportunityId: string | null = null;

    if (pipelineId && newLeadStageId) {
      const oppRes = await fetch(`${GHL_BASE}/opportunities/`, {
        method: 'POST',
        headers: ghlHeaders(pit),
        body: JSON.stringify({
          pipelineId,
          locationId,
          pipelineStageId: newLeadStageId,
          contactId,
          name: `${firstName} ${lastName} - ${eventType || 'Catering'} Inquiry`,
          status: 'open',
          source: 'Demo Website',
        }),
      });
      if (oppRes.ok) {
        const oppData = await oppRes.json();
        opportunityId = oppData.opportunity?.id;
        console.log(`[book-api] Created opportunity: ${opportunityId}`);
      }
    }

    // Step 5: Trigger iMessage
    const triggerUrl = process.env.IMESSAGE_TRIGGER_URL || 'https://app.cynthiaconcierge.com/imessage-trigger';
    fetch(triggerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        contactId,
        locationId,
        type: 'demo-booking',
      }),
    }).catch(() => {});

    // Step 6: Move opportunity to "Contacted" (iMessage is now queued)
    if (opportunityId && contactedStageId) {
      fetch(`${GHL_BASE}/opportunities/${opportunityId}`, {
        method: 'PUT',
        headers: ghlHeaders(pit),
        body: JSON.stringify({ pipelineStageId: contactedStageId }),
      }).catch(() => {});
    }

    return NextResponse.json({ success: true, contactId });
  } catch (err) {
    console.error('[book-api] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
