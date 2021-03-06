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

export function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
