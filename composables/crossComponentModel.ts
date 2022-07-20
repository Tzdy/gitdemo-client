import { Ref } from "vue";

export const useCrossComponentModel = (father: Ref,  emit: Function, event: string) => {
    const childRef = ref('')
    watch(father, (val) => {
        childRef.value = val
    }, { immediate: true })
    watch(childRef, val => {
        emit(event, val)
    })
    return childRef
};
