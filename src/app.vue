<template>
  <div class="w-[100vw] h-[100vh]">
    <!-- Ahh do you want to check this website data you can chek it with mehmetuysal.tech/charts/data -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script lang="ts">
import { OuterExecute } from './types/terminal';

export default defineComponent({
  data() {
    return {
      mainStore: useMainStore(),
    }
  },
  methods: {
    createBaseTags() {
      const theHead = document.head;
      console.log(theHead)
      const scriptTag1 = document.createElement("script")
      scriptTag1.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=G-K8MGJSPL5Y")
      scriptTag1.setAttribute("async", "")
      const scriptTag2 = document.createElement("script")
      scriptTag2.innerText = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}gtag('js', new Date()); gtag('config', 'G-K8MGJSPL5Y');`
      theHead.appendChild(scriptTag1)
      theHead.appendChild(scriptTag2)
    }
  },
  mounted() {
    const text=`
                                   .oooo.     .oooo.     .oooo.     .oooo.   
                                 .dP""Y88b   d8P' Y8b   d8P' Y8b   d8P' Y8b  
oooo  oooo  oooo    ooo  .oooo.o       ]8P' 888    888 888    888 888    888 
 888   888    88.  .8'  d88(  "8     .d8P'  888    888 888    888 888    888 
 888   888     88..8'    "Y88b.    .dP'     888    888 888    888 888    888 
 888   888      888'    o.  )88b .oP     .o '88b  d88' '88b  d88'  88b  d88' 
 'V88V"V8P'     .8'     8""888P' 8888888888  'Y8bd8P'   'Y8bd8P'   'Y8bd8P'  
            .o..P'                                                           
            'Y8P'
`
    console.log(text)
    initializeAnalytics()
    initializeFirebase()
    initializeAuth()
  },
  rendered() {
    this.createBaseTags()
  },
  beforeCreate() {
    useFetch('/api/getCommands').then(result => {
      this.mainStore.setCommands(result.data.value as OuterExecute)
    })
  },
})
</script>
