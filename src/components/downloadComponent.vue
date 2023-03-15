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
import {unsplashUrl, clientId} from "../javascripts//publicConstants";
import {changeThemeColor, httpRequest} from "../javascripts//publicFunctions";
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
        let url = this.state.downloadLink;
        let data = {
            "client_id": clientId,
        }
        httpRequest(url, data, "GET")
            .then(function(resultData){
                window.open(resultData.url + unsplashUrl);
                // let a = document.createElement("a");
                // a.href = resultData.url + unsplashUrl;
                // a.download = "unsplashWallpaper.jpg";
                // document.body.appendChild(a);
                // a.click();
                // document.body.removeChild(a);
            })
            .catch(function(){
                Message.error("下载 Unsplash 图片失败");
            })
            .finally(function(){});
    } else {
        Message.error("无下载链接");
    }
}
</script>

<style scoped>

</style>