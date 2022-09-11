<template>
    <a-space>
        <a-tooltip content="下载图片">
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
import {defineProps, watch} from "vue";
import {IconDownload} from "@arco-design/web-vue/es/icon";
import {unsplashUrl, clientId} from "@/javascripts/publicContents";
import {changeThemeColor} from "@/javascripts/publicFunctions";

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

const onclick = () => {
    if (props.downloadLink.length !== 0) {
        let tempThis = this;
        let downloadXHR = new XMLHttpRequest();
        downloadXHR.open("GET", props.downloadLink + "?client_id=" + clientId);
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