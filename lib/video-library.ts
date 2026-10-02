export type VideoItem = {
  id: number;
  title: string;
  description: string;
  duration: string;
  originalLanguage: string;
  thumbnail: string;
  mediaUrl: string;
  transcript: string;
};

export const videos: VideoItem[] = [
  {
    id: 1,
    title: 'Intro till AI-marknadsföring',
    description: 'Kort introduktion till hur AI kan hjälpa företag att snabba upp content, kampanjer och kundkommunikation.',
    duration: '04:32',
    originalLanguage: 'Svenska',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    transcript:
      'Hej och välkommen. I den här videon går vi igenom hur AI kan hjälpa dig att skapa bättre content snabbare. Med rätt verktyg kan du automatisera idéer, förbättra budskapet och spara tid i marknadsföringen. Det handlar inte om att ersätta människan, utan om att stärka den kreativa processen.',
  },
  {
    id: 2,
    title: 'Så bygger du en produktiv workflow',
    description: 'Praktiska strategier för att få bättre fokus, strukturera arbete och eliminera onödiga steg.',
    duration: '06:15',
    originalLanguage: 'Svenska',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    mediaUrl: 'https://www.w3schools.com/html/movie.mp4',
    transcript:
      'En effektiv workflow börjar med tydliga prioriteringar. När du definierar mål, delar upp arbete i mindre steg och använder automatisering rätt, blir arbetet både snabbare och mer hållbart. Det viktigaste är att skapa system som stödjer dig varje dag.',
  },
  {
    id: 3,
    title: 'User onboarding guide',
    description: 'Hur du får användarna att förstå produkten snabbt och minska churn från första dagen.',
    duration: '03:44',
    originalLanguage: 'Engelska',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    mediaUrl: 'https://www.w3schools.com/html/movie.mp4',
    transcript:
      'A great onboarding experience starts with clarity. Users should understand the value of your product within the first few minutes. You can reduce confusion by guiding them step by step and removing unnecessary friction from the start.',
  },
];
