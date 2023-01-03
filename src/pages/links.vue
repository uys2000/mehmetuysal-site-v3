<template>
  <div class="w-full h-full relative flex flex-col justify-between">
    <div class="w-full min-h-screen flex flex-wrap justify-center items-center align-middle place-content-center gap-1">
      <a id="Linkedin" class="container-1" target="_blank" href="https://www.linkedin.com/in/uys2000/"
        @click="sendData('linkedin')">
        Linkedin
      </a>
      <a id="github" class="container-2" target="_blank" href="https://github.com/uys2000" @click="sendData('github')">
        Github
      </a>
      <a id="github-interviews" class="container-2" target="_blank" href="https://github.com/uys2000-interviews"
        @click="sendData('github-interviews')">
        Github Interviews
      </a>
      <a id="github-projects" class="container-2" target="_blank" href="https://github.com/uys2000-projects"
        @click="sendData('github-projects')">
        Github Projects
      </a>
      <a id="github-bots" class="container-2" target="_blank" href="https://github.com/uys2000-bot"
        @click="sendData('github-bots')">
        Github Bots
      </a>
      <a id="buy-me-a-coffee" class="container-1" target="_blank" href="https://www.buymeacoffee.com/uys2000"
        @click="sendData('buy-me-a-coffee')">
        Buy Me a Coffee
      </a>
    </div>
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
      mainStore: useMainStore()
    }
  },
  methods: {
    sendData(link: string) {
      sendAnalyticsData("link", link)
    }
  },
  mounted() {
    setTimeout(() => {
      this.mainStore.setPage("links")
    }, 500);
  },
  setup() {
    definePageMeta({
      keepalive: true,
    })
    useHead({
      title: "Mehmet Uysal | Links",
      meta: [
        { name: "description", content: "Important links about Mehmet Uysal." },
      ]
    })
  }
})
</script>
<style scoped>
#Linkedin::before {
  content: "Linkedin";
}

#github::before {
  content: "Github";
}

#github-interviews::before {
  content: "Github Interviews";
}

#github-projects::before {
  content: "Github Projects";
}

#github-bots::before {
  content: "Github Bots";
}

#buy-me-a-coffee::before {
  content: "Buy Me a Coffee";
}
</style>