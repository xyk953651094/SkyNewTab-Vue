<template>
    <a-space>
        <a-tooltip :content=tooltipContent>
            <a-button type="primary" shape="round" size="large" id="buttonDownload" class="frostedGlass zIndexHigh" @click="onclick"
                      :style="{display: display}">
                <template #icon>
                    <icon-download/>
                </template>
            </a-button>
        </a-tooltip>
    </a-space>
</template>

<script setup>
import {defineProps, ref, watch} from "vue";
import {IconDownload} from "@arco-design/web-vue/es/icon";
import {changeThemeColor} from "@/javascripts/publicFunctions";
let tooltipContent = ref("");

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

watch(() => props.imageColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        changeThemeColor("#buttonDownload", props.imageColor);
    }
})

watch(() => props.downloadLink, (newValue, oldValue) => {
    if(newValue !== oldValue) {
        tooltipContent.value = "下载图片：" + props.downloadLink;
    }
})

const onclick = () => {
    if (props.downloadLink.length !== 0) {
        window.open(props.downloadLink);
    } else {
        this.$message.error("无下载链接");
    }
}
</script>

<style scoped>

</style>