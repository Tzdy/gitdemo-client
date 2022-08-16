import { Ref } from "vue-demi";

export function useDetailsElement(elem: Ref<HTMLElement>) {
  function open() {
    elem.value.setAttribute("open", "");
  }

  function close() {
    elem.value.removeAttribute("open");
  }

  return {
    open,
    close,
  };
}
