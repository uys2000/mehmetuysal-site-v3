import { OuterExecute } from "../types/terminal"
let commands: OuterExecute = {}
export const useMainStore = defineStore("MainStore", {
  state: () => {
    return {
      page: "index",
      commands: commands,
    }
  },
  actions: {
    setPage(value: string) {
      this.page = value
    },
    setCommands(data: OuterExecute) {
      this.commands = data
    },
    checkCommands(value: string) {
      return Object.keys(this.commands).some((item) => item == value);
    },
    getCommand(command: string) {
      return this.commands[command]
    },
    help(key: string) {
      let text = ""
      let obj: any = this.commands
      if (Object.keys(this.commands).includes(key)) obj = this.commands[key]
      Object.keys(obj).forEach(key => {
        text = text + key + " : " + JSON.stringify(obj[key].ex ? obj[key].ex : obj[key].help.ex) + "<br/>"
      })
      return text
    }
  },
  getters: {
    menu: (state) => {
      return state.page == "links"
    }
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}