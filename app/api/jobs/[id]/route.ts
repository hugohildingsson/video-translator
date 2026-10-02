import { NextResponse } from 'next/server';

import { advanceJob, getJob } from '@/lib/jobs';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const job = getJob(params.id);

  if (!job) {
    return NextResponse.json({ error: 'Jobb hittades inte' }, { status: 404 });
  }

  const updatedJob = advanceJob(job);

  return NextResponse.json({ job: updatedJob });
}
