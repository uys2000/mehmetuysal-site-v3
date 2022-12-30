export default defineNuxtPlugin((nuxtApp) => {
  const watchElement = function (el: Element) {
    if (isElementInViewport(el)) showforOsa(el, el.classList)
    else hideForOsa(el, el.classList)
  }
  nuxtApp.vueApp.directive('osa', {
    mounted(el) {
      window.addEventListener("scroll", () => watchElement(el))
    },
    unmounted(el) {
      window.removeEventListener("scroll", () => watchElement(el))
    }
  })
})