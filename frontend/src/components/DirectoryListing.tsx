import { useState } from "react"
import { type ListDirData, listDir } from "../utils/list-dir"
import { DirectoryEntry } from "./DirectoryEntry"

export interface DirectoryListingProps {
  directory: string,
  onSelectDirectory: (dir: string) => void,
  onSelectFilePath: (file: string) => void,
}

export function DirectoryListing({
  directory,
  onSelectDirectory,
  onSelectFilePath,
}: DirectoryListingProps) {
  const [listDirData, setListDirData] = useState<ListDirData>({directory: "", entries: []})

  const dir = directory ? directory : "/";
  if (listDirData.directory != dir) {
    const prevDir = listDirData.directory;
    listDirData.directory = dir;
    listDir(dir, (res) => {
      if (res.directory) {
        setListDirData(res);
        onSelectDirectory(dir);
      } else {
        onSelectDirectory(prevDir);
      }
    });
  }

  return (
    <ul className="directory-listing">
        {listDirData.entries.map((entry) => {
          const dir = directory == "/" ? "" : directory;
          const fullPath = `${dir}/${entry.name}`
          const onSelect = entry.isDir? onSelectDirectory : onSelectFilePath;
          return (
            <DirectoryEntry key={entry.name} name={entry.name} fullPath={fullPath} isDir={entry.isDir} onSelect={onSelect} />
          );
        })}
    </ul>
  );
}
