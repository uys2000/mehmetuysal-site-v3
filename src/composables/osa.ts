export function isElementInViewport(el: Element) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
export function hideForOsa(el: Element, classList: DOMTokenList) {
  el.style = `opacity:0; ${el.style}`
  if (!classList.contains("osa")) return
  classList.forEach(value => {
    classList.replace(value, "osa:" + value)
  })
}

export function showforOsa(el: Element, classList: DOMTokenList) {
  el.style = `${el.style}`.replace("opacity:0;", "")
  if (!classList.contains("osa:osa")) return
  classList.forEach(value => {
    classList.replace(value, value.replace("osa:", ""))
  })
}