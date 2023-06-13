<template>
    <a-space>
        <a-tooltip content="前往摄影师主页" :background-color="backgroundColor" :content-style="{color: fontColor}">
            <a-button type="primary" shape="round" size="large" id="buttonAuthor" class="componentTheme zIndexHigh" @click="onclick"
                      :style="{display: display}">
                <template #icon>
                    <icon-camera/>
                </template>
                {{ "by " + authorName + " on " + imageSource }}
            </a-button>
        </a-tooltip>
    </a-space>
</template>

<script setup>
import {defineProps, ref, watch} from "vue"
import {IconCamera} from "@arco-design/web-vue/es/icon";
import {unsplashUrl} from "../javascripts/publicConstants";
import {changeThemeColor} from "../javascripts/publicFunctions";
import {Message} from "@arco-design/web-vue";

const props = defineProps({
    themeColor: {
        type: Object,
        default: ()=> {
            return {
                "componentBackgroundColor": "",
                "componentFontColor": ""
            }
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
    imageData: {
        type: Object,
        required: true
    },
    imageSource: {
        type: String,
        default: () => {
            return "Unsplash";
        },
        required: true
    }
});

let backgroundColor = ref("");
let fontColor = ref("");
let authorName = ref("暂无信息");
let authorLink = ref("");
let imageSource = ref("Unsplash");

watch(() => props.themeColor, (newValue, oldValue) => {
    if(newValue !== oldValue) {
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#buttonAuthor", backgroundColor.value, fontColor.value);
    }
})

watch(() => props.imageData, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        authorName.value = props.imageData.userName;
        authorLink.value = props.imageData.userLink
    }
})

watch(() => props.imageSource, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        imageSource.value = props.imageSource;
    }
})

const onclick = () => {
    if(authorLink.value.length !== 0) {
        window.open(authorLink.value + unsplashUrl);
    }
    else {
        Message.error("无跳转链接");
    }
}
</script>

<style scoped>

</style>