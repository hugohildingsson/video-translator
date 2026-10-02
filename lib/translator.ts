import OpenAI from 'openai';

import { videos } from '@/lib/video-library';

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

export type TranslationResult = {
  translatedText: string;
  translatedUrl: string;
};

export async function translateVideoScript(videoId: number, targetLanguage: string): Promise<TranslationResult> {
  const video = videos.find((item) => item.id === Number(videoId));

  if (!video) {
    throw new Error('Video not found');
  }

  if (!openai) {
    const fallbackText = `Det här är en AI-fallbacköversättning till ${targetLanguage}. Originalinnehåll: "${video.transcript}"`;

    return {
      translatedText: fallbackText,
      translatedUrl: video.mediaUrl,
    };
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.3,
    messages: [
      {
        role: 'system',
        content: 'Du är en professionell översättare. Översätt texten naturligt och bara till målspråket utan att lägga till onödigt fluff.',
      },
      {
        role: 'user',
        content: `Översätt följande text till ${targetLanguage}:\n\n"${video.transcript}"`,
      },
    ],
  });

  const translatedText = completion.choices[0]?.message?.content ?? video.transcript;

  return {
    translatedText,
    translatedUrl: video.mediaUrl,
  };
}
