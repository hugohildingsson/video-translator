# Video Translator AI MVP

This repository contains a Next.js app for a video translation product where users can select a video from an existing library and translate it into another language.

## Features
- Video library UI with selection and language picker
- AI translation request flow
- Job status polling
- Real OpenAI integration if `OPENAI_API_KEY` is provided
- Graceful fallback mode when no API key is configured

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a local environment file:
   ```bash
   cp .env.local.example .env.local
   ```

3. Start the app:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000

## Environment variables

The app supports the following keys:

```bash
OPENAI_API_KEY=your_key_here
```

## Notes

This is an MVP and simulates the full video export process. In production, you would add:
- user uploads / pre-existing asset storage
- audio extraction from video
- speech-to-text with Whisper
- OCR or subtitle generation
- text-to-speech for dubbing
- FFmpeg export for final rendered video
