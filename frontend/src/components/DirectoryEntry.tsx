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
        <li className="px-2 py-[0.03rem] hover:bg-blue-100 rounded cursor-pointer user-select-none"
            onClick={() => {
                onSelect(fullPath);
                return true;
            }}
        >
            {name + (isDir? "/" : "")}
        </li>
    )
}
