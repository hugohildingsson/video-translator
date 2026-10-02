import { NextResponse } from 'next/server';

import { createJob, translateVideoScript } from '@/lib/translator';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { videoId, language } = body;

    if (!videoId || !language) {
      return NextResponse.json({ error: 'videoId och language krävs' }, { status: 400 });
    }

    const job = createJob(Number(videoId), String(language));

    const result = await translateVideoScript(Number(videoId), String(language));

    job.translatedText = result.translatedText;
    job.translatedUrl = result.translatedUrl;

    return NextResponse.json({ success: true, job });
  } catch (error) {
    console.error('Translate route error:', error);
    return NextResponse.json({ error: 'Kunde inte skapa översättningsjobbet' }, { status: 500 });
  }
}
