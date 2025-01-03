---
title: JavaScript 通用工具代码
---

## 网页大文件切片校验上传

```typescript
function uploadFile(
  file: File,
  chunkSize: number,
  chunkCount: number
) {
  const chunks = createFileChunks(file, chunkSize);
  const promises = chunks.map((chunk, index) => {
    const formData = new FormData();
    formData.append("file", chunk, `${file.name}.part${index + 1}`);
    return fetch("http://example.com/upload", {
      method: "POST",
      body: formData
    });
  });
  return Promise.all(promises);
}

function createFileChunks(file: File, chunkSize: number): File[] {
  const chunks: File[] = [];
  let start = 0;
  while (start < file.size) {
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);
    chunks.push(chunk);
    start += chunkSize;
  }
  return chunks;
}
```

## 代码深拷贝

```typescript
function deepClone(value, seen = new Set<any>()) {
  if (typeof value !== "object" || seen.has(value)) {
    return;
  }
  seen.add(value);

  if (typeof value === "object") {
    value = Object.assign({}, value);
  }

  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      const newValue = value[key];

      if (typeof newValue === "object") {
        value[key] = deepClone(newValue, seen);
      }
    }
  }
  return value;
}
```
