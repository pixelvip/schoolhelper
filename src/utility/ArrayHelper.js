export function range(start, end) {
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
}

export function rangeClosed(start, end) {
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  end += 1;
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
}
