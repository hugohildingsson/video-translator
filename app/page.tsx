"use client";

import { useEffect, useMemo, useState } from 'react';

type JobStatus = 'queued' | 'processing' | 'completed' | 'failed';

type Job = {
  id: string;
  videoId: number;
  language: string;
  status: JobStatus;
  progress: number;
  translatedText?: string;
  translatedUrl?: string;
  createdAt: number;
};

type Video = {
  id: number;
  title: string;
  description: string;
  duration: string;
  originalLanguage: string;
  thumbnail: string;
  mediaUrl: string;
  transcript: string;
};

const videos: Video[] = [
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

const languages = ['Engelska', 'Spanska', 'Franska', 'Tyska', 'Arabiska', 'Turkiska'];

export default function HomePage() {
  const [jobs, setJobs] = useState<Record<number, Job>>({});
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Record<number, string>>({
    1: 'Engelska',
    2: 'Spanska',
    3: 'Tyska',
  });

  const activeJobs = useMemo(
    () => Object.values(jobs).filter((job) => job.status === 'queued' || job.status === 'processing'),
    [jobs],
  );

  const handleTranslate = async (videoId: number) => {
    const language = selectedLanguage[videoId] ?? 'Engelska';
    setLoadingId(videoId);

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId, language }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Något gick fel');
      }

      setJobs((prev) => ({
        ...prev,
        [videoId]: data.job,
      }));
    } catch (error) {
      console.error(error);
      setJobs((prev) => ({
        ...prev,
        [videoId]: {
          id: `error-${Date.now()}`,
          videoId,
          language,
          status: 'failed',
          progress: 0,
          createdAt: Date.now(),
        },
      }));
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    if (activeJobs.length === 0) return;

    const interval = setInterval(async () => {
      for (const job of activeJobs) {
        try {
          const res = await fetch(`/api/jobs/${job.id}`);
          const data = await res.json();

          if (!res.ok) {
            console.error('Polling error', data.error);
            continue;
          }

          setJobs((prev) => ({
            ...prev,
            [job.videoId]: data.job,
          }));
        } catch (error) {
          console.error('Job polling failed', error);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [activeJobs]);

  return (
    <main className="container">
      <header className="header">
        <div className="brand">
          <span className="brand-badge">AI</span>
          <span>VideoTranslator</span>
        </div>

        <div className="header-actions">
          <button className="secondary-btn">Mina projekt</button>
          <button className="primary-btn">Ladda upp video</button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">AI videoöversättare</p>
          <h1>Översätt dina videos till nytt språk</h1>
          <p>Välj en video från biblioteket, välj mål-språk och låt AI:n översätta innehållet och texten.</p>
        </div>
      </section>

      <section className="grid">
        {videos.map((video) => {
          const currentJob = jobs[video.id];
          const isLoading = loadingId === video.id;

          return (
            <article key={video.id} className="card">
              <video className="thumbnail" controls preload="metadata" poster={video.thumbnail}>
                <source src={video.mediaUrl} type="video/mp4" />
              </video>

              <div className="card-body">
                <div className="card-top">
                  <div>
                    <h2>{video.title}</h2>
                    <p className="meta">
                      {video.duration} • {video.originalLanguage}
                    </p>
                  </div>
                </div>

                <p className="description">{video.description}</p>

                <div className="controls">
                  <select
                    className="select"
                    value={selectedLanguage[video.id] ?? 'Engelska'}
                    onChange={(e) => {
                      setSelectedLanguage((prev) => ({
                        ...prev,
                        [video.id]: e.target.value,
                      }));
                    }}
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>

                  <button className="primary-btn" onClick={() => handleTranslate(video.id)} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="spinner" />
                        Bearbetar...
                      </>
                    ) : (
                      'Översätt video'
                    )}
                  </button>
                </div>

                {currentJob && (
                  <div
                    className={[
                      'status-box',
                      currentJob.status === 'processing' ? 'processing' : '',
                      currentJob.status === 'failed' ? 'error' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {currentJob.status === 'queued' && `Köad • ${currentJob.progress}%`}
                    {currentJob.status === 'processing' && `Bearbetar • ${currentJob.progress}%`}
                    {currentJob.status === 'completed' && `Klar • ${currentJob.language}`}
                    {currentJob.status === 'failed' && 'Något gick fel under översättningen'}
                  </div>
                )}

                {currentJob?.status === 'completed' && currentJob.translatedText && (
                  <div className="result-box">
                    <p className="result-label">Översatt text</p>
                    <p className="translated-text">{currentJob.translatedText}</p>
                    {currentJob.translatedUrl && (
                      <a href={currentJob.translatedUrl} target="_blank" rel="noreferrer">
                        Öppna översatt video
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
