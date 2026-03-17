import { useState } from "react"
import { type ListDirData, listDir } from "./ListDir"
import { DirectoryEntry } from "./DirectoryEntry"

export interface DirectoryListingProps {
  directory: string,
  onSelectDirectory: (dir: string) => void,
  onSelectFilePath: (file: string) => void,
}

export const DirectoryListing: React.FC<DirectoryListingProps> = ({
  directory,
  onSelectDirectory,
  onSelectFilePath,
}) => {
  const [listDirData, setListDirData] = useState<ListDirData>({directory: "", entries: []})

  const dir = directory ? directory : "/";
  if (listDirData.directory != dir) {
    console.log("New list dir!");
    listDirData.directory = dir;
    listDir(dir, (res) => {
      setListDirData(res);
      onSelectDirectory(dir);
    });
  }

  return (
    <div className="directory-listing">
      <ul>
          {listDirData.entries.map((entry) => {
            const dir = directory == "/" ? "" : directory;
            const fullPath = `${dir}/${entry.name}`
            const onSelect = entry.isDir? onSelectDirectory : onSelectFilePath;
            return (
              <DirectoryEntry key={entry.name} name={entry.name} fullPath={fullPath} isDir={entry.isDir} onSelect={onSelect} />
            );
          })}
      </ul>
    </div>
  );
}
