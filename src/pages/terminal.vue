<template>
  <div class="w-full h-full relative flex flex-col justify-between content-center align-middle ">
    <div class="w-full min-h-screen flex flex-col justify-center">
      <div class="w-[95%] lg:w-3/4 h-2/3 m-auto flex flex-col justify-center">
        <Terminal />
      </div>
      <div class="relative">
      </div>
    </div>
    <footer>
      <span>uys2000</span> | <span>Mehmet Uysal</span> | <span>Published at Dec 29 2022</span>
    </footer>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  data() {
    return {
      mainStore: useMainStore()
    }
  },
  mounted() {
    setTimeout(() => {
      this.mainStore.setPage("terminal")
    }, 500);
  },
  setup() {
    useHead({
      title: "Mehmet Uysal | Terminal",
      meta: [
        { name: "description", content: "Terminal screen to access more data about Mehmet Uysal and to manage system of this web page." },
      ]
    })
  }

})
</script>