import React from "react";

interface FilterBarProps {
  folders: string[];
  accounts: string[];
  selectedFolder: string;
  selectedAccount: string;
  onFolderChange: (folder: string) => void;
  onAccountChange: (account: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  folders,
  accounts,
  selectedFolder,
  selectedAccount,
  onFolderChange,
  onAccountChange,
}) => {
  return (
    <div className="flex space-x-4 p-4 bg-gray-100 rounded-md">
      <select
        value={selectedFolder}
        onChange={(e) => onFolderChange(e.target.value)}
        className="p-2 border rounded-md"
      >
        <option value="">All Folders</option>
        {folders.map((folder) => (
          <option key={folder} value={folder}>
            {folder}
          </option>
        ))}
      </select>

      <select
        value={selectedAccount}
        onChange={(e) => onAccountChange(e.target.value)}
        className="p-2 border rounded-md"
      >
        <option value="">All Accounts</option>
        {accounts.map((account) => (
          <option key={account} value={account}>
            {account}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
