import { NextResponse } from 'next/server';

const GHL_BASE = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';

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

    // Create contact in GHL
    const contactRes = await fetch(`${GHL_BASE}/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${pit}`,
        'Version': GHL_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationId,
        firstName,
        lastName,
        email,
        phone,
        source: 'Website - Booking Form',
        tags: ['Website Lead', 'Catering Inquiry'],
      }),
    });

    let contactId: string | null = null;

    if (contactRes.ok) {
      const data = await contactRes.json();
      contactId = data.contact?.id;
    } else {
      const errText = await contactRes.text();
      // Handle duplicate contact
      const match = errText.match(/"contactId"\s*:\s*"([^"]+)"/);
      if (match) {
        contactId = match[1];
      } else {
        console.error(`[book-api] GHL error (${contactRes.status}): ${errText}`);
        return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
      }
    }

    // Add event details as a note
    const noteLines: string[] = [];
    if (eventDate) noteLines.push(`Event Date: ${eventDate}`);
    if (guestCount) noteLines.push(`Guest Count: ${guestCount}`);
    if (eventType) noteLines.push(`Event Type: ${eventType}`);
    if (message) noteLines.push(`Message: ${message}`);

    if (contactId && noteLines.length > 0) {
      fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${pit}`, 'Version': GHL_VERSION, 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: `New Catering Inquiry:\n${noteLines.join('\n')}` }),
      }).catch(() => {});
    }

    return NextResponse.json({ success: true, contactId });
  } catch (err) {
    console.error('[book-api] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
