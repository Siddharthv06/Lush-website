import { NextResponse } from 'next/server';

const DEFAULT_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxIyg7TN4dq_VyQfOtlR_KJfZPm9f3hBKP6isZyYQu2fEdlA3507WnblA4YNKlqvPur/exec';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL || DEFAULT_SCRIPT_URL;

    const payload = {
      ...body,
      recipient: 'kurtamalai@gmail.com',
    };

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Submission failed' },
      { status: 500 }
    );
  }
}
