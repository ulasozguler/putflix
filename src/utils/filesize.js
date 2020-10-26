export function humanFileSize(bytes, precision = 2) {
  const thresh = 1024;
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

  if (bytes === 0) {
    return 'empty'
  }

  if (Math.abs(bytes) < thresh) {
    return bytes + units[0];
  }

  let u = 0;
  const r = 10 ** precision;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


  return bytes.toFixed(precision) + units[u];
}