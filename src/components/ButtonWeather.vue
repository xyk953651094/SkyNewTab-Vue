<template>
    <a-space>
        <a-button type="primary" shape="round" size="large" class="frostedGlass zIndexHigh" @click="onclick"
                  :style="{backgroundColor: backgroundColor, color: fontColor}">
        </a-button>
    </a-space>
</template>

<script setup>
import {defineProps, ref, watch} from "vue";
import {getFontColor} from "@/javascripts/publicFunctions";

const props = defineProps({
    imageColor: {
        type: String,
        default: () => {
            return "#2c3e50";
        },
        required: true
    }
});

let backgroundColor = ref(props.imageColor);
let fontColor = ref(getFontColor(backgroundColor.value));
watch(() => props.imageColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        backgroundColor.value = props.imageColor;
        fontColor.value = getFontColor(backgroundColor.value);
    }
})

const onclick = () => {
    window.open("https://www.qweather.com");
}
</script>

<style scoped>

</style>