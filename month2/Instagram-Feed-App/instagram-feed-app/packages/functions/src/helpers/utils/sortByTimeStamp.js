export default function sortByTimeStamp(array) {
  return array.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}
