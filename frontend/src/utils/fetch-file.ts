export type FileData = {
  type: string;
  content: string;
}

export function fetchFile(
  fullPath: string,
  onGotFile: (result: FileData) => void,
  onError?: (error: string) => void,
) {
  console.log(`Fetching file: ${fullPath}`)
  const url = `/api/file?path=${encodeURIComponent(fullPath)}`;
  fetch(url, {
      method: 'GET',
    })
    .then(async (res) => {
      if (res.status !== 200) {
        onError?.(`Error (HTTP ${res.status}) fetching file ${fullPath}`)
        return;
      }
      const contentType = res.headers.get('Content-Type');
      if (contentType && contentType.startsWith('image/')) {
        // Handle images
        const imageBlob = await res.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        onGotFile({ type: 'image', content: imageUrl });
      } else {
        // Handle text files (e.g., text/plain, text/html, application/json, etc)
        const textContent = await res.text();
        onGotFile({ type: 'text', content: textContent });
      }
    })
    .catch((err) => {
      console.error(`Error fetching file ${fullPath}:`, err);
      onError?.(err.toString());
    });
}
