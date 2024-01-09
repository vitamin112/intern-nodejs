export default function chunkArray(array, chunkSize) {
  const results = [];
  for (let i = array.length; i > 0; i -= chunkSize) {
    results.push(array.slice(Math.max(0, i - chunkSize), i));
  }
  return results;
}
