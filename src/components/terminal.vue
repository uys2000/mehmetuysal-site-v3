<template>
  <div class="terminal" ref="t" tabindex="0" @keyup="keydown" @click="click" @mousedown="click" @mouseup="click"
    @touchstart="click" @touchend="click">
    <div>
      <div></div>
      <div>
        <div>guest@uys2000:~</div>
      </div>
      <div @click="changePage">X</div>
    </div>
    <div class="s">
      <div class="focus:border-none">
        guest@uys2000:~$
        <p v-html="input" />
        <textarea v-if="isPhy" ref="i" v-model="inputM" @submit="sendText"></textarea><br v-if="isPhy" />
        <button v-if="isPhy" class="w-full" @click="sendText">Enter</button>
        <span v-if="!isPhy" class="cr animate-cursor"></span>
      </div>
      <div>
        <div class="break-words" v-for="i in results.length" :key="i">
          <div class="break-words p"
            :class="{ 'odd1': i % 8 == 1, 'odd2': i % 8 == 3, 'odd3': i % 8 == 5, 'odd4': i % 8 == 7 }"
            v-html="results[i]"></div>
        </div>
      </div>
    </div>
    <button ref="b" @click="changeMode">
      {{ !isPhy ? "I dont have physical keyboard" : "I have physical keyboard" }}
    </button>
  </div>
</template>
<script lang="ts">
import { OuterExecute } from '../types/terminal';
const results: string[] = []
export default defineComponent({
  data() {
    return {
      mainStore: useMainStore(),
      results: results,
      input: "",
      inputM: "",
      keys: results,
      lastKey: "",
      isPhy: false
    }
  },
  methods: {
    executableFunctions() {
      signFirebase;
      setCommand;
    },
    changeMode() {
      this.isPhy = !this.isPhy;
    },
    click() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && this.isPhy) {
        (this.$refs.i as HTMLTextAreaElement).focus();
      }
      if (!this.isPhy) {
        (this.$refs.t as HTMLDivElement).focus();
      }
    },
    changePage() {
      const el = this.$refs.t as HTMLDivElement
      const elb = this.$refs.b as HTMLDivElement
      el.classList.add('animate-rm')
      elb.remove()
      setTimeout(() => {
        el.remove()
        this.mainStore.setPage('links')
        this.$router.push('/links')
      }, 750)
    },
    updateCommands() {
      return useFetch('/api/getCommands').then(result => {
        this.mainStore.setCommands(result.data.value as OuterExecute)
      }).then(() => "Success")
    },
    pasteText: function () {
      navigator.clipboard.readText().then((text) => {
        this.input += text;
      });
    },
    updateResults: function (output: string | Promise<any> | any) {
      if (isString(output)) this.results.push(output);
      else if (isPromise(output))
        (output as Promise<any>).then(res => this.results.push(res)).catch(res => this.results.push(res))
      else if (isJsonString(output)) this.results.push(JSON.stringify(output));
      else this.results.push("Done I think there is not write able response");
    },
    executeCommand: function (commands: string[]) {
      if (!this.mainStore.checkCommands(commands[0])) commands = ["help"];
      if (commands[0] == "help") commands[2] = commands[1]
      if (!commands[1] || !(commands[1] in this.mainStore.getCommand(commands[0])))
        commands[1] = "help";
      const c = this.mainStore.getCommand(commands[0])[commands[1]];
      const output = eval(c.type ? c.value : "c.value");
      sendAnalyticsData("terminal", `${commands[0]}_${commands[1]}`)
      this.updateResults(output)
    },
    runText: function () {
      const text = this.input;
      this.input = "";
      this.results.push("guest@uys2000:~$ " + text);
      const a = text.replace(/'/g, "\"").replace(/&nbsp;/g, " ")
      this.executeCommand(regex(a, /("[^"]+"|[^\s"]+)/g).map(str => str.replace(/"/g, "")));
    },
    deleteBtn: function () {
      if (this.input.endsWith("&nbsp;"))
        this.input = this.input.substring(0, this.input.length - 5);
      this.input = this.input.substring(0, this.input.length - 1);
    },
    actionRouter: function (input: any) {
      function range(size: number, startAt = 0) {
        return [...Array(size).keys()].map(i => i + startAt);
      }
      const keycodes = range(47).concat(range(4, 91)).concat(range(72, 111)).concat([224, 225]).concat(range(25, 230))
      if (input.shiftKey && input.ctrlKey && input.code == "KeyV")
        this.pasteText();
      else if (input.key == " ") this.input = this.input + "&nbsp;";
      else if (input.keyCode == 8) this.deleteBtn()
      else if (input.keyCode == 13) this.runText();
      else if (!keycodes.includes(input.keyCode)) this.input = this.input + input.key;
    },
    keydown: function (input: any, a: boolean = false) {
      if (!a && this.isPhy) return ""
      const i = this.keys.indexOf(input.key);
      if (i != -1) this.keys = this.keys = this.keys.splice(i, 1);
      this.actionRouter(input);
    },
    sendText() {
      let text = (this.$refs.i as HTMLTextAreaElement).value
      if (text.charAt(text.length - 1) == " " || text.charAt(text.length - 1) == "\n") text = text.slice(0, -1)
      text = text.replace(/'/g, "\"").replace(/\n/g, "<br/>");
      for (let i = 0; i < text.length; i++) {
        const a = {
          key: text.charAt(i),
          keyCode: text.charAt(i).charCodeAt(0) - 32
        }
        this.keydown(a, true)
        if (i == text.length - 1) this.runText();
      }
      this.inputM = ""
    }

  },
  mounted() {
    this.results.push("")
    this.results.push(`<pre class="odd3">
                                   .oooo.     .oooo.     .oooo.     .oooo.   
                                 .dP""Y88b   d8P' Y8b   d8P' Y8b   d8P' Y8b  
oooo  oooo  oooo    ooo  .oooo.o       ]8P' 888    888 888    888 888    888 
 888   888    88.  .8'  d88(  "8     .d8P'  888    888 888    888 888    888 
 888   888     88..8'    "Y88b.    .dP'     888    888 888    888 888    888 
 888   888      888'    o.  )88b .oP     .o '88b  d88' '88b  d88'  88b  d88' 
 'V88V"V8P'     .8'     8""888P' 8888888888  'Y8bd8P'   'Y8bd8P'   'Y8bd8P'  
            .o..P'                                                           
            'Y8P'</pre><br/>
Use help to get help / Terminal is not desined for mobile sorry :'(
`)
  }
})
</script>
<style>
.p {
  margin: 0;
  margin-bottom: 20;
  padding-bottom: 20;
  white-space: normal;
  word-wrap: break-word;
  /* Internet Explorer 5.5+ */
  line-break: anywhere;
}

.s::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px #000000;
  box-shadow: inset 0 0 6px #00000000;
  border-radius: 10px;
  background-color: #00000000;
}

.s::-webkit-scrollbar {
  width: 12px;
  background-color: #00000000;
}

.s::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px #000000;
  box-shadow: inset 0 0 6px #000000;
  background-color: #ff0080;
}
</style>