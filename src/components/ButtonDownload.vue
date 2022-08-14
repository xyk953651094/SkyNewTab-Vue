<template>
  <a-space>
    <a-button type="primary" shape="round" size="large" class="zIndexHigh" @click="onclick"
              :style="{display: display, backgroundColor: backgroundColor, color: fontColor}">
      <template #icon>
        <icon-download />
      </template>
    </a-button>
  </a-space>
</template>

<script setup>
import { defineProps, ref, watch } from "vue";
import { IconDownload } from "@arco-design/web-vue/es/icon";
import { getFontColor } from "@/javascripts/publicFunctions";

const props = defineProps({
    downloadLink: {
        type: String,
        default: () => {
            return "";
        },
        required: true
    },
    display: {
        type: String,
        default: () => {
            return "none";
        },
        required: true
    },
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
    if(newValue !== oldValue) {
        backgroundColor.value = props.imageColor;
        fontColor.value = getFontColor(backgroundColor.value);
    }
})

const onclick = () => {
    if(props.downloadLink.length !== 0) {
        window.open(props.downloadLink);
    }
    else {
        alert("无下载链接");
    }
}
</script>

<style scoped>

</style>