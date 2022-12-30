<template>
  <div class="flex flex-wrap "> Aaa I made litle mistake with path of this page sorry :)
    <div class="w-full">
      <select v-model="selectedType.terminal" class="text-black">
        <option v-for="key in dataStore.AnalyticsTerminalKeys" :key="key" :value="key">{{ key }}</option>
      </select>
      <button @click="addRemoveData('terminal')">Add / Remove</button>
    </div>
    <div class="w-full">
      <select v-model="selectedType.general" class="text-black">
        <option v-for="key in dataStore.AnalyticsGeneralKeys" :key="key" :value="key">{{ key }}</option>
      </select>
      <button @click="addRemoveData('general')">Add / Remove</button>
    </div>
    <div class="w-full">
      <select v-model="selectedType.link" class="text-black">
        <option v-for="key in dataStore.AnalyticsLinkKeys" :key="key" :value="key">{{ key }}</option>
      </select>
      <button @click="addRemoveData('link')">Add / Remove</button>
    </div>
    <div class="w-full">
    </div>
    <div class="w-full bg-[#ffffff]" v-if="refresh">
      <ChartBar :chartData="dataStore.chartData" />
    </div>
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
      width: 0,
      dataStore: useDataStore(),
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
    setTimeout(() => {
      this.getMainData()
    }, 1000)
  }
})
</script>