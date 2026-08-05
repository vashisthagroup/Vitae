import { NextRequest, NextResponse } from 'next/server';

// Store application updates from Emploi
let applicationUpdates: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    // Webhook: Receive application/screening feedback from Emploi
    // Payload: {candidate_id, vitae_candidate_id, job_id, status, screening_score, recommendation}

    const update = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      emploi_candidate_id: payload.candidate_id,
      vitae_candidate_id: payload.vitae_candidate_id,
      job_id: payload.job_id,
      status: payload.status,
      screening_score: payload.screening_score,
      recommendation: payload.recommendation,
      timestamp: new Date().toISOString(),
    };

    applicationUpdates.push(update);

    console.log('[Vitae] Application update received from Emploi:', update);

    return NextResponse.json({
      status: 'success',
      message: 'Application update received',
    }, { status: 200 });

  } catch (error) {
    console.error('[Vitae Application Webhook Error]', error);
    return NextResponse.json(
      { status: 'error', message: String(error) },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json(applicationUpdates);
}
