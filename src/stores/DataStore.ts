import { QuerySnapshot, DocumentData } from "firebase/firestore"
const Analytics: Record<string, any> = {}
const AnalyticsData: Record<string, any>[] = []
const keys = (obj: object) => Object.keys(obj)
export const useDataStore = defineStore("DataStore", {
  state: () => {
    return {
      AnalyticsTerminal: Analytics,
      AnalyticsGeneral: Analytics,
      AnalyticsLink: Analytics,

      AnalyticsTerminalData: AnalyticsData,
      AnalyticsGeneralData: AnalyticsData,
      AnalyticsLinkData: AnalyticsData,

      chartData: {
        labels: [] as string[],
        datasets: [
          {
            label: 'Data',
            backgroundColor: [] as string[],
            data: [] as number[]
          },
        ]
      }
    }
  },
  actions: {
    addData(dataType: "terminal" | "general" | "link", key: string) {
      const data = dataType == "terminal" ? this.AnalyticsTerminal : dataType == "general" ? this.AnalyticsGeneral : this.AnalyticsLink
      const colour = dataType == "terminal" ? "#900" : dataType == "general" ? "#090" : "#009"
      this.chartData.labels = this.chartData.labels.concat([key])
      this.chartData.datasets[0].data = this.chartData.datasets[0].data.concat([data[key]])
      this.chartData.datasets[0].backgroundColor = this.chartData.datasets[0].backgroundColor.concat([colour])
    },
    removeData(key: string) {
      console.log(key)
      const dataIndex = this.chartData.labels.findIndex(item => item == key)
      const newDatas = [] as number[]
      const newLabels = [] as string[]
      const newColors = [] as string[]
      console.log(key)
      for (let i = 0; i < this.chartData.labels.length; i++) {
        if (i == dataIndex) continue
        newLabels.push(this.chartData.labels[i])
        newDatas.push(this.chartData.datasets[0].data[i])
        newColors.push(this.chartData.datasets[0].backgroundColor[i])
      }
      console.log(key)
      this.chartData.labels = newLabels
      this.chartData.datasets[0].data = newDatas
      this.chartData.datasets[0].backgroundColor = newColors
      console.log(key)
    },
    setMainData(collections: QuerySnapshot<DocumentData>) {
      collections.docs.map(document => {
        if (document.id == "AnalyticsLink") this.AnalyticsLink = document.data()
        else if (document.id == "AnalyticsGeneral") this.AnalyticsGeneral = document.data()
        else if (document.id == "AnalyticsTerminal") this.AnalyticsTerminal = document.data()
      })
    },
    getData(dataType: "terminal" | "general" | "link", key: string) {
      if (dataType == "link") return this.AnalyticsLink[key]
      else if (dataType == "general") return this.AnalyticsGeneral[key]
      else if (dataType == "terminal") return this.AnalyticsTerminal[key]
    },
  },
  getters: {
    AnalyticsTerminalKeys: (state) => {
      return keys(state.AnalyticsTerminal).filter(item => item != "timestamp")
    },
    AnalyticsGeneralKeys: (state) => {
      return keys(state.AnalyticsGeneral).filter(item => item != "timestamp")
    },
    AnalyticsLinkKeys: (state) => {
      return keys(state.AnalyticsLink).filter(item => item != "timestamp")
    },
    AnalyticsKeys: (state) => {
      return keys(state.AnalyticsLink).concat(keys(state.AnalyticsGeneral)).concat(keys(state.AnalyticsTerminal)).filter(item => item != "timestamp")
    }
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}