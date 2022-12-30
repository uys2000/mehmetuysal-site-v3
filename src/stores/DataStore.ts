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
        labels: [],
        datasets: [
          {
            label: 'Data',
            backgroundColor: '#f80079',
            data: []
          },
        ]
      }
    }
  },
  actions: {
    addData(dataType: "terminal" | "general" | "link", key: string) { },
    removeData() { },
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