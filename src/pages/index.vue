<template>
  <div class="relative min-h-screen flex flex-col justify-between">
    <header>
      <nav class="index-container">
        <div id="name">
          <NuxtLink to="links" @click="sendData('links')">
            <div>
              <div>
                Links
                <div></div>
              </div>
              <div aria-hidden>Links</div>
            </div>
          </NuxtLink>
        </div>
        <div>
          <NuxtLink>
            <div>
              <div>
                Mehmet Uysal
                <div></div>
              </div>
              <div aria-hidden>Mehmet Uysal</div>
            </div>
          </NuxtLink>
        </div>
        <div>
          <NuxtLink to="terminal" @click="sendData('terminal')">
            <div>
              <div>
                Terminal
                <div></div>
              </div>
              <div aria-hidden>Terminal</div>
            </div>
          </NuxtLink>
        </div>
      </nav>
    </header>
    <div class="relative">
      <footer> 
        <span>uys2000</span> | <span>Mehmet Uysal</span> | <span>Published at Dec 29 2022</span>
      </footer>
    </div>
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
    sendData(link: string) {
      sendAnalyticsData("link", link)
    }
  },
  mounted() {
    setTimeout(() => {
      this.mainStore.setPage("index")
    }, 500);
  },
  setup() {
    useHead({
      title: "Mehmet Uysal | Portfolio",
      meta: [
        { name: "description", content: "Land page of Mehmet Uysal's portfolio site" },
      ]
    })
  }

})
</script>
<style>
/*
.links::before {
  content: "Links";
}

.uys2000::before {
  content: "Mehmet Uysal";
}

.term::before {
  content: "Terminal";
}
*/
</style>