<template>
  <div>
    <div class="flex flex-wrap ">
      <div class="w-full">
        <span class="inline-block w-32">
          Terminal Data :
        </span>
        <select v-model="selectedType.terminal" class="text-black">
          <option v-for="key in dataStore.AnalyticsTerminalKeys" :key="key" :value="key">{{ key }}</option>
        </select>
        <button @click="addRemoveData('terminal')">Add / Remove</button>
      </div>
      <div class="w-full">
        <span class="inline-block w-32">
          General Data :
        </span>
        <select v-model="selectedType.general" class="text-black">
          <option v-for="key in dataStore.AnalyticsGeneralKeys" :key="key" :value="key">{{ key }}</option>
        </select>
        <button @click="addRemoveData('general')">Add / Remove</button>
      </div>
      <div class="w-full">
        <span class="inline-block w-32">
          Links Data :
        </span>
        <select v-model="selectedType.link" class="text-black">
          <option v-for="key in dataStore.AnalyticsLinkKeys" :key="key" :value="key">{{ key }}</option>
        </select>
        <button @click="addRemoveData('link')">Add / Remove</button>
      </div>
      <div class="w-full">
      </div>
      <div class="flex w-full">
        <div class="w-6/12 m-auto" v-if="refresh">
          <Chart :chartData="dataStore.chartData" :chartType="chartType" />
        </div>
      </div>
    </div>
    <footer>
      <div>
        First data record date is Jan 03 2023
      </div>
      <div>
        <span>uys2000</span> | <span>Mehmet Uysal</span> | <span>Published at Jan 03 2023</span>
      </div>
    </footer>
  </div>

</template>
<script>
export default defineComponent({
  data() {
    return {
      refresh: true,
      selectedType: {
        terminal: "",
        general: "",
        link: "",
      },
      selectedTypes: {
        terminal: [],
        general: [],
        link: [],
      },
      dataStore: useDataStore(),
      chartType: "bar"
    }
  },
  methods: {
    getMainData() {
      getAnalyticsDataTypes().then(collections => {
        this.dataStore.setMainData(collections)
      })
    },
    refreshChart() {
      this.refresh = false
      setTimeout(() => {
        this.refresh = true
      }, 100);
    },
    mySplice(arr, ind, ct) {
      var rem = [];
      while (ct--) {
        var indRem = ind + CT;
        rem.push(arr[indRem]);
        arr[indRem] = arr.pop();
      }
      return rem;
    },
    addData(dataType) {
      this.dataStore.addData(dataType, this.selectedType[dataType])
      this.selectedTypes[dataType].push(this.selectedType[dataType])
      this.refreshChart()
    },
    removeData(dataType) {
      this.dataStore.removeData(this.selectedType[dataType])
      this.selectedTypes[dataType] = this.selectedTypes[dataType].filter(i => i != this.selectedType[dataType]);
      this.refreshChart()
    },
    addRemoveData(dataType) {
      if (this.selectedType[dataType] == "") return
      if (this.selectedTypes[dataType].includes(this.selectedType[dataType])) this.removeData(dataType)
      else this.addData(dataType)
    },
  },
  mounted() {
    const types = ["bar", "pie", "doughnut", "line", "polarArea", "radar"]
    this.chartType = types.includes(this.$route.params.type) ? this.$route.params.type : "bar"
    setTimeout(() => {
      this.getMainData()
    }, 1000)
  }
})
</script>