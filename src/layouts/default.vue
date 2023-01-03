<template>
  <div class="w-full h-full flex items-center justify-center">
    <MenuBtn />
    <slot />
  </div>
</template>
<script lang="ts">

export default defineComponent({
  mounted() {
    setTimeout(() => {
      const path = this.$route.path.split("/")
      sendAnalyticsData("general", `landing_${path[path.length - 1]}`)
    }, 1000);
  }
})
</script>
<style >
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
  position: fixed;
  top: 0vh;
}

.page-enter-active footer,
.page-leave-active footer {
  display: none;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.page-enter-from {
  top: 100vh;
}

.page-leave-to {
  top: -100vh;
}
</style>