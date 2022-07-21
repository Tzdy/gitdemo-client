<template>
  <NuxtPage />
</template>
<script setup lang="ts">
import 'virtual:svg-icons-register'
import { useWindowEvent } from '~/store/index'
onMounted(() => {
  const windowEvent = useWindowEvent()
  Object.keys(windowEvent.$state).forEach((eventName: 'click' | 'resize') => {
    window.addEventListener(eventName, ev => {
      windowEvent.$state[eventName].forEach(func => {
        func(ev)
      })
    })
  })
  console.log('mounted')
})
</script>
<style lang="scss">
@import '@primer/css/color-modes/themes/light.scss';

html,
body {
  width: 100%;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 14px;
  line-height: 1.5;
}

* {
  padding: 0;
  margin: 0;
}
</style>