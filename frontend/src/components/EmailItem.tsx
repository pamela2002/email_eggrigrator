import React from "react";

import Chip from "@mui/material/Chip";

interface EmailItemProps {
  from: string;
  subject: string;
  date: string;
  category: string;
}

const categoryColors: Record<
  string,
  "default" | "primary" | "success" | "error" | "warning" | "info"
> = {
  Interested: "success",
  "Meeting Booked": "primary",
  "Not Interested": "warning",
  Spam: "error",
  "Out of Office": "info",
  Uncategorized: "default",
};

const EmailItem: React.FC<EmailItemProps> = ({
  from,
  subject,
  date,
  category,
}) => {
  return (
    <div className="border-b border-gray-300 p-4 hover:bg-gray-50 flex justify-between items-center">
      <div>
        <div className="font-semibold">{subject || "(No Subject)"}</div>
        <div className="text-sm text-gray-600">{from}</div>
        <div className="text-xs text-gray-500">
          {new Date(date).toLocaleString()}
        </div>
      </div>
      <Chip label={category} color={categoryColors[category] || "default"} />
    </div>
  );
};

export default EmailItem;
