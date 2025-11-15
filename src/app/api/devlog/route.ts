import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const owner = url.searchParams.get('owner') ?? process.env.GITHUB_OWNER ?? '';
  const repo = url.searchParams.get('repo') ?? process.env.GITHUB_REPO ?? '';
  const perPage = parseInt(url.searchParams.get('per_page') ?? '50', 10);

  if (!owner || !repo) {
    return NextResponse.json({ items: [] });
  }

  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=${perPage}`, { headers });
  if (!res.ok) {
    return NextResponse.json({ items: [] });
  }
  const commits = await res.json();
  const items = (Array.isArray(commits) ? commits : []).map((c: any) => ({
    sha: c?.sha ?? '',
    date: c?.commit?.author?.date ?? c?.commit?.committer?.date ?? '',
    message: c?.commit?.message ?? '',
  }));

  return NextResponse.json({ items });
}

