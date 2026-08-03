import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { candidateName, responses, jobRole, requirements } = await request.json();

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    const prompt = `You are an expert recruiter evaluating a candidate's fit for a role.

Job Role: ${jobRole}
Requirements: ${requirements.join(', ')}

Candidate: ${candidateName}

Screening Responses:
${responses.map((r: string, i: number) => `Q${i + 1}: ${r}`).join('\n')}

Evaluate the candidate on a scale of 0-100 based on:
1. Technical competency (30%)
2. Experience relevance (30%)
3. Communication clarity (20%)
4. Cultural fit indicators (20%)

Respond in this exact JSON format:
{
  "score": <number 0-100>,
  "strengths": [<string>, <string>, <string>],
  "weaknesses": [<string>, <string>],
  "recommendation": "<STRONG_HIRE|HIRE|MAYBE|REJECT>",
  "reasoning": "<brief explanation>"
}`;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt,
          }],
        }],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Gemini API error:', error);
      return NextResponse.json(
        { error: 'AI evaluation failed', details: error },
        { status: response.status }
      );
    }

    const data = await response.json();
    const textContent = data.contents?.[0]?.parts?.[0]?.text;

    if (!textContent) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      );
    }

    const jsonMatch = textContent.match(/\{[\s\S]*\}/);
    const evaluation = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

    if (!evaluation) {
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      candidateName,
      jobRole,
      score: evaluation.score,
      strengths: evaluation.strengths,
      weaknesses: evaluation.weaknesses,
      recommendation: evaluation.recommendation,
      reasoning: evaluation.reasoning,
      evaluatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Screening error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
