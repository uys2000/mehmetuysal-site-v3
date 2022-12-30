<template>
  <div v-if="mainStore.page != 'index'"
    class=" z-10 fixed right-1/2 translate-x-1/2 bottom-0 cursor-pointer transition-all duration-300" :class="{

}" @click="changePage">
    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" class="svg">
      <path d="m24 30.75-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z" />
      <defs>
        <linearGradient id="g-1">
          <stop offset="5%" stop-color="#800020" />
          <stop offset="95%" stop-color="#8A9A5B" />
        </linearGradient>
        <linearGradient id="g-2">
          <stop offset="5%" stop-color="#7DF9FF" />
          <stop offset="95%" stop-color="#C04000" />
        </linearGradient>
        <linearGradient id="g-3">
          <stop offset="5%" stop-color="#FA8072" />
          <stop offset="95%" stop-color="#FF00FF" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  data() {
    return {
      mainStore: useMainStore(),
    }
  },
  methods: {
    changePage() {
      if (this.mainStore.menu) {
        this.mainStore.setPage('terminal')
        this.$router.push('/terminal')
      }
      else {
        this.mainStore.setPage('links')
        this.$router.push('/links')
      }
    }
  }
})
</script>