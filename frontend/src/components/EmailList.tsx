import React from "react";
import EmailItem from "./EmailItem";
import type { Email } from "../api/emailApi";

interface EmailListProps {
  emails: Email[];
}

const EmailList: React.FC<EmailListProps> = ({ emails }) => {
  if (emails.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">No emails found.</div>
    );
  }

  return (
    <div className="border rounded-md shadow-sm overflow-auto max-h-[500px]">
      {emails.map((email, idx) => (
        <EmailItem
          key={idx}
          from={email.from}
          subject={email.subject}
          date={email.date}
          category={email.category}
        />
      ))}
    </div>
  );
};

export default EmailList;
