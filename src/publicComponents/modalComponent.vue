<template>
    <a-modal v-model:visible="displayModal" :closable="false" unmount-on-close
             :mask-style="{backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)'}"
             @cancel="modalCancel" :onBeforeOk="modalOnBeforeOk" @ok="modalOk">
        <template #title>
            <slot name="modalTitle"></slot>
        </template>
        <slot name="modalContent"></slot>
    </a-modal>
</template>

<script setup>
import "@/stylesheets/publicStyles.less"
import {defineProps} from "vue"

defineProps({
    displayModal: {
        type: Boolean,
        required: true,
        default: () => { return false }
    },
    modalOnBeforeOk: {
        type: Function,
        required: true,
        default: () => { return null }
    },
    modalOk: {
        type: Function,
        required: true,
        default: () => { return null }
    },
    modalCancel: {
        type: Function,
        required: true,
        default: () => { return null }
    },
});
</script>

<style scoped>

</style>