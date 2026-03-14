import React from "react"

export interface DirectoryEntryProps {
    name: string,
    fullPath: string,
    isDir: boolean,
    onSelect: (name: string) => void,
}

export const DirectoryEntry: React.FC<DirectoryEntryProps> = ({
    name,
    fullPath,
    isDir,
    onSelect,
}) => {
    return (
        <li
            onClick={() => {
                onSelect(fullPath);
                return true;
            }}
        >
            {name + (isDir? "/" : "")}
        </li>
    )
}
