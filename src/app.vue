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
  mounted() {
    const text = `
                                   .oooo.     .oooo.     .oooo.     .oooo.   
                                 .dP""Y88b   d8P' Y8b   d8P' Y8b   d8P' Y8b  
oooo  oooo  oooo    ooo  .oooo.o       ]8P' 888    888 888    888 888    888 
 888   888    88.  .8'  d88(  "8     .d8P'  888    888 888    888 888    888 
 888   888     88..8'    "Y88b.    .dP'     888    888 888    888 888    888 
 888   888      888'    o.  )88b .oP     .o '88b  d88' '88b  d88'  88b  d88' 
 'V88V"V8P'     .8'     8""888P' 8888888888  'Y8bd8P'   'Y8bd8P'   'Y8bd8P'  
            .o..P'                                                           
            'Y8P'
data/chartTypes = ["bar", "pie", "doughnut", "line", "polarArea", "radar"] 
You can check out recorded data with https://mehmetuysal.dev/data/bar 
`
    console.log(text)
    //initializeAnalytics()
    initializeFirebase()
    initializeAuth()
  },
  beforeCreate() {
    useFetch('/api/getCommands').then(result => {
      this.mainStore.setCommands(result.data.value as OuterExecute)
    })
  },
})
</script>
