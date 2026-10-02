export type JobStatus = 'queued' | 'processing' | 'completed' | 'failed';

export type Job = {
  id: string;
  videoId: number;
  language: string;
  status: JobStatus;
  progress: number;
  translatedText?: string;
  translatedUrl?: string;
  createdAt: number;
};

const jobs = new Map<string, Job>();

export function createJob(videoId: number, language: string): Job {
  const id = `job-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const job: Job = {
    id,
    videoId,
    language,
    status: 'queued',
    progress: 5,
    createdAt: Date.now(),
  };

  jobs.set(id, job);
  return job;
}

export function getJob(jobId: string): Job | undefined {
  return jobs.get(jobId);
}

export function advanceJob(job: Job): Job {
  if (job.status === 'queued') {
    job.status = 'processing';
    job.progress = 32;
    return job;
  }

  if (job.status === 'processing') {
    job.status = 'completed';
    job.progress = 100;
    job.translatedUrl = `https://example.com/translated/${job.videoId}-${job.language.toLowerCase().replace(/\s+/g, '-')}.mp4`;
    return job;
  }

  return job;
}
