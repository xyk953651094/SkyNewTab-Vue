<template>
    <a-space>
        <a-tooltip content="下载图片">
            <a-button type="primary" shape="round" size="large" id="buttonDownload" class="frostedGlass zIndexHigh" @click="onclick"
                      :style="{display: display, backgroundColor: backgroundColor, color: fontColor}">
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
import {unsplashUrl, clientId} from "@/javascripts/publicContents";
import {changeThemeColor, getFontColor} from "@/javascripts/publicFunctions";

const props = defineProps({
    themeColor: {
        type: String,
        required: true
    },
    display: {
        type: String,
        default: () => {
            return "none";
        },
        required: true
    },
    imageData: {
        type: String,
        required: true
    }
});

let backgroundColor = ref("");
let fontColor = ref("");
let downloadLink = ref("");

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        backgroundColor.value = props.themeColor;
        fontColor.value = getFontColor(props.themeColor);
        changeThemeColor("#buttonDownload", props.themeColor);
    }
})

watch(() => props.imageData, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        downloadLink.value = props.imageData.links.download_location;
    }
})

const onclick = () => {
    if (downloadLink.value.length !== 0) {
        let tempThis = this;
        let downloadXHR = new XMLHttpRequest();
        downloadXHR.open("GET", downloadLink.value + "?client_id=" + clientId);
        downloadXHR.onload = function () {
            if (downloadXHR.status === 200) {
                let downloadUrl = JSON.parse(downloadXHR.responseText).url + unsplashUrl;
                window.open(downloadUrl);
            }
            else {
                tempThis.$message.error("获取下载链接失败");
            }
        }
        downloadXHR.onerror = function () {
            tempThis.$message.error("获取下载链接失败");
        }
        downloadXHR.send();
    } else {
        this.$message.error("无下载链接");
    }
}
</script>

<style scoped>

</style>