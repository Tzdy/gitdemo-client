import { Ref } from "vue";
import { useWindowEvent } from "~~/store";

export function useNavbarResize(
  parentElement: Ref<HTMLElement | null>,
  navItems: { visible: boolean }[]
) {
  const parntElement = parentElement.value;
  const children = Array.from(parentElement.value.children);
  const childPadding =
    parseInt(children[0] && getComputedStyle(children[0]).paddingLeft, 0) * 2 ||
    0;
  const windowEvent = useWindowEvent();
  let originWidth = parntElement.offsetWidth;
  // attribute的hidden相当于display: none.
  // 这里需要使用visibility: hidden，站位但不显示。
  function navItemsResize(init?: boolean) {
    const parentWidth = parntElement.offsetWidth;
    let subTotalWidth = 0;
    if (init) {
      children.forEach((ele: HTMLElement, index) => {
        subTotalWidth += ele.offsetWidth + childPadding;
        if (subTotalWidth > parentWidth) {
          navItems[index].visible = false;
        }
      });
    } else {
      if (parentWidth > originWidth) {
        children.forEach((ele: HTMLElement, index) => {
          subTotalWidth += ele.offsetWidth + childPadding;
          if (subTotalWidth < parentWidth) {
            navItems[index].visible = true;
          }
        });
      } else {
        children.forEach((ele: HTMLElement, index) => {
          subTotalWidth += ele.offsetWidth + childPadding;
          if (subTotalWidth > parentWidth) {
            navItems[index].visible = false;
          }
        });
      }
    }
    originWidth = parentWidth;
  }
  navItemsResize(true);
  windowEvent.addEventListener("resize", () => navItemsResize());
  return navItems;
}
