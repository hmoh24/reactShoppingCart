export default function limit(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
