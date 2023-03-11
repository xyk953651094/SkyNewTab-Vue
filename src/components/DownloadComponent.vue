<template>
    <a-space>
        <a-tooltip content="下载图片" :background-color="backgroundColor" :content-style="{color: fontColor}">
            <a-button type="primary" shape="round" size="large" id="buttonDownload" class="componentTheme zIndexHigh" @click="onclick"
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
import {unsplashUrl, clientId} from "@/javascripts/publicConstants";
import {changeThemeColor} from "@/javascripts/publicFunctions";
import {Message} from "@arco-design/web-vue";

const props = defineProps({
    themeColor: {
        type: Object,
        required: true,
        default: ()=> {
            return {
                "componentBackgroundColor": "",
                "componentFontColor": ""
            }
        }
    },
    display: {
        type: String,
        default: () => {
            return "none";
        },
        required: true
    },
    imageData: {
        type: Object,
        required: true
    }
});

let backgroundColor = ref("");
let fontColor = ref("");
let downloadLink = ref("");

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#buttonDownload", backgroundColor.value, fontColor.value);
    }
})

watch(() => props.imageData, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        downloadLink.value = props.imageData.links.download_location;
    }
})

const onclick = () => {
    if (downloadLink.value.length !== 0) {
        let downloadXHR = new XMLHttpRequest();
        downloadXHR.open("GET", downloadLink.value + "?client_id=" + clientId);
        downloadXHR.onload = function () {
            if (downloadXHR.status === 200) {
                let downloadUrl = JSON.parse(downloadXHR.responseText).url + unsplashUrl;
                window.open(downloadUrl);
            }
            else {
                Message.error("获取下载链接失败");
            }
        }
        downloadXHR.onerror = function () {
            Message.error("获取下载链接失败");
        }
        downloadXHR.send();
    } else {
        Message.error("无下载链接");
    }
}
</script>

<style scoped>

</style>