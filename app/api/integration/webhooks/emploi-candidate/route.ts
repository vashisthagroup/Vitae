import { NextRequest, NextResponse } from 'next/server';

// Store synced candidates in memory (replace with DB later)
let employiCandidates: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    // Webhook: Receive candidate from Emploi
    // Payload: {emploi_candidate_id, name, email, phone, skills, experience, batch_year, cgpa, branch}

    const newCandidate = {
      id: `emploi-${payload.emploi_candidate_id}`,
      vitae_candidate_id: `vitae-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      emploi_source_id: payload.emploi_candidate_id,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      location: payload.location || 'Not specified',
      skills: payload.skills || [],
      experience: payload.experience,
      batch_year: payload.batch_year,
      cgpa: payload.cgpa,
      branch: payload.branch,
      profile_completeness: calculateProfileCompleteness(payload),
      synced_from: 'emploi',
      synced_at: new Date().toISOString(),
      appliedRoles: [],
      resumeUrl: payload.resumeUrl || null,
      linkedinUrl: payload.linkedinUrl || null,
    };

    // Check if candidate already exists
    const existingIndex = employiCandidates.findIndex(c => c.emploi_source_id === payload.emploi_candidate_id);
    if (existingIndex >= 0) {
      employiCandidates[existingIndex] = newCandidate;
    } else {
      employiCandidates.push(newCandidate);
    }

    // Log webhook
    console.log('[Vitae] Received candidate from Emploi:', newCandidate.name);

    return NextResponse.json({
      status: 'success',
      message: 'Candidate received from Emploi',
      vitae_candidate_id: newCandidate.vitae_candidate_id,
    }, { status: 200 });

  } catch (error) {
    console.error('[Vitae Webhook Error]', error);
    return NextResponse.json(
      { status: 'error', message: String(error) },
      { status: 400 }
    );
  }
}

function calculateProfileCompleteness(payload: any): number {
  let score = 0;
  if (payload.name) score += 20;
  if (payload.email) score += 20;
  if (payload.phone) score += 20;
  if (payload.skills && payload.skills.length > 0) score += 20;
  if (payload.cgpa || payload.batch_year) score += 20;
  return Math.min(score, 100);
}
