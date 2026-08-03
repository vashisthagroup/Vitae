export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function calculateProfileCompleteness(candidate: {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  resumeUrl?: string;
  linkedinUrl?: string;
}): number {
  const fields = [
    candidate.name,
    candidate.email,
    candidate.phone,
    candidate.location,
    candidate.resumeUrl,
    candidate.linkedinUrl,
  ];
  const completed = fields.filter(Boolean).length;
  return Math.round((completed / fields.length) * 100);
}

export function formatFitScore(score: number): { value: string; color: string } {
  if (score >= 80) return { value: `${score}%`, color: 'text-green-600' };
  if (score >= 70) return { value: `${score}%`, color: 'text-blue-600' };
  if (score >= 60) return { value: `${score}%`, color: 'text-yellow-600' };
  return { value: `${score}%`, color: 'text-red-600' };
}
