import React from "react"

export interface DirectoryEntryProps {
    name: string,
    fullPath: string,
    isDir: boolean,
    onSelect: (name: string) => void,
}

export function DirectoryEntry({
    name,
    fullPath,
    isDir,
    onSelect,
}: DirectoryEntryProps) {
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
