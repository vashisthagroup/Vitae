import { NextRequest, NextResponse } from 'next/server';

interface EmailTemplate {
  type: 'screening_completed' | 'interview_scheduled' | 'rejection' | 'offer' | 'approval_notification';
  to: string;
  recipientName: string;
  data: Record<string, any>;
}

function generateEmailContent(template: EmailTemplate) {
  switch (template.type) {
    case 'screening_completed':
      return {
        subject: `Your Vitae Screening Results - ${template.data.jobRole}`,
        html: `
          <h2>Hi ${template.recipientName},</h2>
          <p>Your AI screening for the <strong>${template.data.jobRole}</strong> position has been completed.</p>
          <p>Your fit score: <strong>${template.data.fitScore}%</strong></p>
          <p>${template.data.fitScore >= 75 ? '🎉 Great news! You qualified for an interview. Check your calendar for interview details.' : 'Thank you for applying. We will keep your profile for future opportunities.'}</p>
        `,
      };

    case 'interview_scheduled':
      return {
        subject: `Interview Scheduled - ${template.data.jobRole}`,
        html: `
          <h2>Hi ${template.recipientName},</h2>
          <p>Your interview for <strong>${template.data.jobRole}</strong> has been scheduled!</p>
          <p><strong>Date & Time:</strong> ${template.data.interviewDate}</p>
          <p><strong>Type:</strong> ${template.data.interviewType}</p>
          <p><strong>Duration:</strong> ${template.data.duration} minutes</p>
          <p><a href="${template.data.calendarLink}">Add to Calendar</a></p>
        `,
      };

    case 'rejection':
      return {
        subject: `Application Update - ${template.data.jobRole}`,
        html: `
          <h2>Hi ${template.recipientName},</h2>
          <p>Thank you for your interest in the <strong>${template.data.jobRole}</strong> position.</p>
          <p>We appreciated learning about your background. While we've moved forward with other candidates, we encourage you to apply for future opportunities.</p>
          <p>Best of luck!</p>
        `,
      };

    case 'offer':
      return {
        subject: `Job Offer - ${template.data.jobRole}`,
        html: `
          <h2>Hi ${template.recipientName},</h2>
          <p>Congratulations! We're excited to offer you the position of <strong>${template.data.jobRole}</strong>.</p>
          <p><strong>Salary:</strong> ${template.data.salary}</p>
          <p><strong>Start Date:</strong> ${template.data.startDate}</p>
          <p>Please review the attached offer letter and let us know if you have any questions.</p>
        `,
      };

    case 'approval_notification':
      return {
        subject: `Job Posting Approved - ${template.data.jobTitle}`,
        html: `
          <h2>Hi ${template.recipientName},</h2>
          <p>Your job posting for <strong>${template.data.jobTitle}</strong> has been approved and is now live!</p>
          <p>Candidates can now apply through the Vitae portal.</p>
        `,
      };

    default:
      return {
        subject: 'Vitae Notification',
        html: '<p>No content</p>',
      };
  }
}

export async function POST(request: NextRequest) {
  try {
    const emailData = await request.json() as EmailTemplate;

    const emailContent = generateEmailContent(emailData);

    console.log(`📧 EMAIL SIMULATION (${emailData.type})`);
    console.log(`To: ${emailData.to}`);
    console.log(`Subject: ${emailContent.subject}`);
    console.log(`\nIn production, this would be sent via:\n- SendGrid\n- Resend\n- AWS SES\n- Mailgun`);

    return NextResponse.json({
      success: true,
      message: 'Email queued for delivery',
      emailId: Math.random().toString(36).substring(7),
      to: emailData.to,
      type: emailData.type,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: String(error) },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'Email service is running',
    supportedTemplates: [
      'screening_completed',
      'interview_scheduled',
      'rejection',
      'offer',
      'approval_notification',
    ],
    note: 'Configure SendGrid/Resend API key in .env for production',
  });
}
