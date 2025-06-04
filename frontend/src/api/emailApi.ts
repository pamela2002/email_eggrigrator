// src/api/emailApi.ts

export type Email = {
    from: string;
    to: string;
    subject: string;
    date: string;
    text: string;
    html: string;
    folder: string;
    account: string;
    category?: string;
  };
  
  export async function fetchEmails(
    query: string,
    account?: string,
    folder?: string
  ): Promise<Email[]> {
    const url = new URL("http://localhost:5000/api/emails/search");
  
    if (query) url.searchParams.append("query", query);
    if (account) url.searchParams.append("accountId", account);
    if (folder) url.searchParams.append("folder", folder);
  
    const res = await fetch(url.toString());
  
    if (!res.ok) {
      throw new Error("Failed to fetch emails");
    }
  
    return res.json();
  }
  