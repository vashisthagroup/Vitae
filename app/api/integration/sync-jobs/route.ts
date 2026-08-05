import { NextRequest, NextResponse } from 'next/server';

// Mock jobs data - replace with DB query
const jobs = [
  {
    id: '1',
    title: 'Senior Full Stack Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    description: 'We are looking for a senior engineer...',
    requirements: ['10+ years experience', 'React & Node.js', 'System design'],
    autoScheduleCutoff: 75,
    status: 'active',
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    location: 'Remote',
    description: 'Lead our product vision...',
    requirements: ['5+ years PM experience', 'B2B SaaS'],
    autoScheduleCutoff: 70,
    status: 'active',
  },
];

// Track which jobs have been synced
const syncedJobs: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const { job_ids } = await request.json();

    const EMPLOI_BASE_URL = process.env.EMPLOI_BASE_URL || 'http://localhost:8000/api';
    const EMPLOI_WEBHOOK_URL = process.env.EMPLOI_WEBHOOK_URL ||
      'http://localhost:8000/api/integration/vitae/webhooks/job-sync';

    let synced = [];
    let errors = [];

    // Get specific jobs or all if not specified
    const jobsToSync = job_ids
      ? jobs.filter(j => job_ids.includes(j.id))
      : jobs;

    for (const job of jobsToSync) {
      try {
        // Send to Emploi webhook
        const response = await fetch(EMPLOI_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: `vitae-${job.id}`,
            title: job.title,
            department: job.department,
            location: job.location,
            description: job.description,
            requirements: job.requirements,
            autoScheduleCutoff: job.autoScheduleCutoff,
            drive_type: 'Off-campus',
            domain: 'it',
            webhook_url: `${process.env.VITAE_BASE_URL || 'http://localhost:3000'}/api/integration/webhooks/emploi-application`,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          synced.push({
            job_id: job.id,
            title: job.title,
            emploi_drive_id: data.emploi_drive_id,
            synced_at: new Date().toISOString(),
          });

          // Track sync
          syncedJobs.push({
            vitae_job_id: job.id,
            emploi_drive_id: data.emploi_drive_id,
            synced_at: new Date().toISOString(),
          });

          console.log(`[Vitae] Job "${job.title}" synced to Emploi`);
        } else {
          const errorData = await response.json();
          errors.push({
            job_id: job.id,
            error: errorData.detail || 'Failed to sync',
          });
        }
      } catch (error) {
        errors.push({
          job_id: job.id,
          error: String(error),
        });
      }
    }

    return NextResponse.json({
      status: synced.length > 0 ? 'partial_success' : 'failed',
      synced,
      errors,
      total_synced: synced.length,
      total_errors: errors.length,
    });

  } catch (error) {
    console.error('[Vitae Sync Jobs Error]', error);
    return NextResponse.json(
      { status: 'error', message: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return sync status for all jobs
  return NextResponse.json({
    total_jobs: jobs.length,
    synced_jobs: syncedJobs.length,
    synced: syncedJobs,
    jobs_with_sync_status: jobs.map(job => ({
      ...job,
      synced: !!syncedJobs.find(s => s.vitae_job_id === job.id),
    })),
  });
}
