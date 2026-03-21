import { NextResponse } from 'next/server';

const WEBHOOK_URL = 'https://app.cynthiaconcierge.com/demo-booking';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone } = body;

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Forward to Cynthia's demo-booking webhook
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errData = await res.text();
      console.error(`[book-api] Webhook error (${res.status}):`, errData);
      return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json({ success: true, message: data.message || 'Booking received!' });
  } catch (err) {
    console.error('[book-api] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
