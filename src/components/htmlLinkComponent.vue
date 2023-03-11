<template>
    <a-space>
        <a-tooltip content="前往图片主页" :background-color="backgroundColor" :content-style="{color: fontColor}">
            <a-button type="primary" shape="round" size="large" id="buttonHtmlLink" class="componentTheme zIndexHigh" @click="onclick"
                      :style="{display: display}">
                <template #icon>
                    <icon-link/>
                </template>
            </a-button>
        </a-tooltip>
    </a-space>
</template>

<script setup>
import {defineProps, ref, watch} from "vue";
import {IconLink} from "@arco-design/web-vue/es/icon";
import {unsplashUrl} from "../javascripts//publicConstants";
import {changeThemeColor} from "../javascripts//publicFunctions";
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
let htmlLink = ref("");

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#buttonHtmlLink", backgroundColor.value, fontColor.value);
    }
})

watch(() => props.imageData, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        htmlLink.value = props.imageData.links.html;
    }
})

const onclick = () => {
    if (htmlLink.value.length !== 0) {
        window.open(htmlLink.value + unsplashUrl);
    } else {
        Message.error("无跳转链接");
    }
}
</script>

<style scoped>

</style>