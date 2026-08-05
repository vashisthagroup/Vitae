import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const EMPLOI_BASE_URL = process.env.EMPLOI_BASE_URL || 'http://localhost:8000/api';

    // Fetch Emploi sync status
    let emploiStatus = null;
    try {
      const response = await fetch(`${EMPLOI_BASE_URL}/integration/vitae/sync/status`, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        emploiStatus = await response.json();
      }
    } catch (error) {
      console.log('[Vitae Integration] Could not reach Emploi backend');
    }

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      vitae: {
        base_url: process.env.VITAE_BASE_URL || 'http://localhost:3000',
        status: 'running',
      },
      emploi: {
        base_url: EMPLOI_BASE_URL,
        status: emploiStatus ? 'connected' : 'disconnected',
        integration_status: emploiStatus,
      },
      endpoints: {
        vitae: {
          'POST /api/integration/sync-jobs': 'Sync jobs from Vitae to Emploi',
          'GET /api/integration/sync-jobs': 'Get job sync status',
          'POST /api/integration/webhooks/emploi-candidate': 'Receive candidates from Emploi',
          'POST /api/integration/webhooks/emploi-application': 'Receive application updates from Emploi',
          'GET /api/integration/status': 'Get integration status',
        },
        emploi: {
          'POST /api/integration/vitae/webhooks/job-sync': 'Receive jobs from Vitae',
          'POST /api/integration/vitae/webhooks/candidate-sync': 'Receive candidate feedback from Vitae',
          'POST /api/integration/vitae/sync/candidates': 'Sync candidates to Vitae',
          'GET /api/integration/vitae/sync/candidates/{id}': 'Sync single candidate to Vitae',
          'GET /api/integration/vitae/sync/status': 'Get Vitae integration sync status',
        },
      },
      webhook_urls: {
        emploi_to_vitae_candidate: `${process.env.VITAE_BASE_URL || 'http://localhost:3000'}/api/integration/webhooks/emploi-candidate`,
        emploi_to_vitae_application: `${process.env.VITAE_BASE_URL || 'http://localhost:3000'}/api/integration/webhooks/emploi-application`,
        vitae_to_emploi_jobs: `${process.env.EMPLOI_BASE_URL || 'http://localhost:8000/api'}/integration/vitae/webhooks/job-sync`,
        vitae_to_emploi_candidates: `${process.env.EMPLOI_BASE_URL || 'http://localhost:8000/api'}/integration/vitae/webhooks/candidate-sync`,
      },
    });

  } catch (error) {
    console.error('[Integration Status Error]', error);
    return NextResponse.json(
      { status: 'error', message: String(error) },
      { status: 500 }
    );
  }
}
