import { type DirEntry, isDirOrLink } from "@shared/types/DirEntry"

export type ListDirData = {
  directory: string;
  entries: DirEntry[];
}

export function listDir(
  directory: string,
  onResult: (result: ListDirData) => void,
  onError?: (error: string) => void,
) {
  console.log(`Listing directory: ${directory}`)
  const url = `/api/dir?path=${encodeURIComponent(directory)}`;
  fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
    .then((res) => {
      if (res.status !== 200) {
        onError?.(`Error (HTTP ${res.status}): ${res.statusText}`);
        return;
      }
      res.json().then((entries: DirEntry[]) => {
        // sort directories and files neatly
        entries = entries.sort((a, b) => (b.name.localeCompare(a.name)))
        entries = entries.sort((a) => (isDirOrLink(a)? -1 : 1))
        const result: ListDirData = {
          directory: directory,
          entries: entries,
        };
        onResult(result);
      })
      .catch((err) => {
        console.error(`Error in response on directory ${directory}:`, err);
        onError?.(err.toString());
      });
    });
}
