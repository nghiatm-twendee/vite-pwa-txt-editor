/// <reference types="wicg-file-system-access" />

export async function openFile() {
  const [handle] = await window.showOpenFilePicker({
    types: [{ description: "Text files", accept: { "text/plain": [".txt"] } }],
    multiple: false,
  });

  const file = await handle.getFile();
  const content = await file.text();

  return {
    id: crypto.randomUUID(),
    name: handle.name,
    handle,
    content,
    isDirty: false,
  };
}

export async function saveFile(handle: FileSystemFileHandle, content: string) {
  const permission = await handle.queryPermission({ mode: "readwrite" });
  if (permission !== "granted") {
    const result = await handle.requestPermission({ mode: "readwrite" });
    if (result !== "granted") throw new Error("Permission denied");
  }

  const writable = await handle.createWritable();
  await writable.write(content);
  await writable.close();
}

export async function saveFileAs(
  content: string,
  suggestedName = "untitled.txt",
) {
  const handle = await window.showSaveFilePicker({
    suggestedName,
    types: [{ description: "Text files", accept: { "text/plain": [".txt"] } }],
  });

  const writable = await handle.createWritable();
  await writable.write(content);
  await writable.close();

  return handle; // caller updates the file's handle in the store
}

export function newFile() {
  return {
    id: crypto.randomUUID(),
    name: "untitled.txt",
    handle: null,
    content: "",
    isDirty: false,
  };
}
