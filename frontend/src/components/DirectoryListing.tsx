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
  const [loadingDir, setLoadingDir] = useState(false)
  const [listDirData, setListDirData] = useState<ListDirData>({directory: "", entries: []})

  const dir = directory ? directory : "/";

  useEffect(() => {
    const guardRun = async () => {
      setLoadingDir(true);
      onError?.("");
      listDir(dir, (res) => {
        setListDirData(res);
        onSelectDirectory(dir);
        setLoadingDir(false);
      }, (err) => {
        setListDirData({directory: dir, entries: []});
        onError?.(err);
        setLoadingDir(false);
      });
    }
    guardRun();
  }, [dir]);

  return (
    <ul className="mr-2 overflow-auto min-w-60 max-w-120 bg-gray-100 rounded-xl">
      {loadingDir
      ? <li className="loading">Loading...</li>
      : listDirData.entries.map((entry) => {
          let dir = listDirData.directory;
          while (dir.endsWith('/')) {
            dir = dir.substring(0, dir.length - 1);
          }
          const fullPath = `${dir}/${entry.name}`
          const onSelect = isDirOrLink(entry)? onSelectDirectory : onSelectFilePath;
          return (
            <DirectoryEntry key={entry.name} name={entry.name} fullPath={fullPath} isDir={isDirOrLink(entry)} onSelect={onSelect} />
          );
        })
      }
    </ul>
  );
}
