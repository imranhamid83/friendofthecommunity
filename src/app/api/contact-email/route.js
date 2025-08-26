import { NextResponse } from 'next/server';
import { EmailClient } from '@azure/communication-email';

export async function POST(req) {
  try {
    const { name, email, query, token } = await req.json();
    // Basic validation
    if (!name || !email || !query) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }
    // Verify reCAPTCHA
    const secret = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ error: 'Captcha not configured.' }, { status: 500 });
    }
    const verifyRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    });
    const verify = await verifyRes.json();
    if (!verify.success) {
      return NextResponse.json({ error: 'Captcha verification failed.' }, { status: 400 });
    }
    // Prepare email
    const connectionString = process.env.NEXT_PUBLIC_AZURE_COMMUNICATION_CONNECTION_STRING;
    if (!connectionString) {
      return NextResponse.json({ error: 'Email service not configured.' }, { status: 500 });
    }
    const emailClient = new EmailClient(connectionString);
    const message = {
      senderAddress: 'DoNotReply@zero-tek.co.uk',
      content: {
        subject: `Contact Us Query from Amersham Muslims web site`,
        plainText: `Name: ${name}\nEmail: ${email}\nQuery: ${query}`,
        html: `<p><b>Name:</b> ${name}<br/><b>Email:</b> ${email}<br/><b>Query:</b><br/>${query.replace(/\n/g, '<br/>')}</p>`
      },
      recipients: {
        to: [
          { address: 'imranhamid83@gmail.com', displayName: 'Muslims in Amersham' }
        ]
      }
    };
    // Send email
    const poller = await emailClient.beginSend(message);
    const response = await poller.pollUntilDone();
    if (response.status === 'Succeeded') {
      return NextResponse.json({ ok: true });
    } else {
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
} 