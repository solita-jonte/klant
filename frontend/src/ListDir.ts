export type DirEntry = {
  name: string;
  isDir: boolean;
  isLink: boolean;
};

export type ListDirData = {
  directory: string;
  entries: DirEntry[];
}

export function listDir(directory: string, onResult: (result: ListDirData) => void) {
  console.log(`Listing directory: ${directory}`)
  const url = `/api/path?dir=${encodeURIComponent(directory)}`;
  fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
    .then((res) => {
      res.json().then((entries: DirEntry[]) => {
        entries = entries.sort((a, b) => (b.name.localeCompare(a.name)))
        entries = entries.sort((a, _) => (a.isDir? -1 : 1))
        const result: ListDirData = {
          directory: directory,
          entries: entries,
        };
        onResult(result);
      });
    });
}
