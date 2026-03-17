export type DirEntry = {
  name: string;
  isDir: boolean;
  isLink: boolean;
};

export function isDirOrLink(entry: DirEntry): boolean {
  return entry.isDir || entry.isLink;
}
