import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
          }
        }
      }
    `;
    
    // LeetCode GraphQL endpoint
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
      },
      body: JSON.stringify({
        query,
        variables: { username: 'suhailult777' } // Keeping the desired username
      }),
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch LeetCode data' }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
