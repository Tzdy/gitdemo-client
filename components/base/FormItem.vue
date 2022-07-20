<template>
    <div class="form-group" :class="required ? 'required' : ''">
        <div v-if="label" class="form-group-header">
            <label for="example-text">{{ label }}</label>
        </div>
        <div class="form-group-body">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    props: {
        label: {
            type: String,
        },
        required: {
            type: Boolean,
        },
    }
})
</script>

<style lang="scss">
// @import '@primer/css/support/index.scss';

// .apple {
//     @import '@primer/css/forms/index.scss';
// }

// .form-group-header {
//     // stylelint-disable-next-line primer/spacing
//     margin: 0 0 6px;
// }

// .form-group-body {
//     h4 {
//         margin: $spacer-1 0 0;

//         &.is-error {
//             color: var(--color-danger-fg);
//         }

//         &.is-success {
//             color: var(--color-success-fg);
//         }

//         +.note {
//             margin-top: 0;
//         }
//     }
// }

// .form-group-header[required] label::after {
//     padding-left: 5px;
//     color: var(--color-danger-fg);
//     content: '*';
// }
</style>