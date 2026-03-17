import { useState, useEffect } from "react"
import { type ListDirData, listDir } from "../utils/list-dir"
import { isDirOrLink } from "@shared/types/DirEntry"
import { DirectoryEntry } from "./DirectoryEntry"

export interface DirectoryListingProps {
  directory: string,
  onSelectDirectory: (dir: string) => void,
  onSelectFilePath: (file: string) => void,
  onError?: (error: string) => void,
}

export function DirectoryListing({
  directory,
  onSelectDirectory,
  onSelectFilePath,
  onError,
}: DirectoryListingProps) {
  const [listDirData, setListDirData] = useState<ListDirData>({directory: "", entries: []})

 const dir = directory ? directory : "/";

 useEffect(() => {
    onError?.("");
    listDir(dir, (res) => {
      setListDirData(res);
      onSelectDirectory(dir);
    }, (err) => {
      onError?.(err);
    });
  }, [dir]);

  return (
    <ul className="directory-listing">
        {listDirData.entries.map((entry) => {
          let dir = listDirData.directory;
          while (dir.endsWith('/')) {
            dir = dir.substring(0, dir.length - 1);
          }
          const fullPath = `${dir}/${entry.name}`
          const onSelect = isDirOrLink(entry)? onSelectDirectory : onSelectFilePath;
          return (
            <DirectoryEntry key={entry.name} name={entry.name} fullPath={fullPath} isDir={isDirOrLink(entry)} onSelect={onSelect} />
          );
        })}
    </ul>
  );
}
