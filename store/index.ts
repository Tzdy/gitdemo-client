import { defineStore } from 'pinia'

export const useWindowEvent = defineStore('windowEvent', {
  state: () => ({
      click: [] as Array<Function>,
      resize: [] as Array<Function>,
  }),
  actions: {
      addEventListener(event: 'click' | 'resize', func: (ev: MouseEvent | UIEvent) => void) {
        this[event].push(func)
      },
  }
})