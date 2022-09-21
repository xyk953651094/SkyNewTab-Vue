<template>
    <a-space>
        <a-tooltip content="前往作者主页" :background-color="backgroundColor" :content-style="{color: fontColor}">
            <a-button type="primary" shape="round" size="large" id="buttonAuthor" class="frostedGlass zIndexHigh" @click="onclick"
                      :style="{display: display, backgroundColor: backgroundColor, color: fontColor}">
                <template #icon>
                    <icon-camera/>
                </template>
                {{ authorName }}
            </a-button>
        </a-tooltip>
    </a-space>
</template>

<script setup>
import {defineProps, ref, watch} from "vue"
import {IconCamera} from "@arco-design/web-vue/es/icon";
import {unsplashUrl} from "@/javascripts/publicContents";
import {getFontColor} from "@/javascripts/publicFunctions";

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
let authorName = ref("");
let authorLink = ref("");

watch(() => props.themeColor, (newValue, oldValue) => {
    if(newValue !== oldValue) {
        backgroundColor.value = props.themeColor;
        fontColor.value = getFontColor(props.themeColor);
    }
})

watch(() => props.imageData, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        authorName.value = "by " + props.imageData.user.name  + " on Unsplash";
        authorLink.value = props.imageData.user.links.html
    }
})

const onclick = () => {
    if(authorLink.value.length !== 0) {
        window.open(authorLink.value + unsplashUrl);
    }
    else {
        this.$message.error("无跳转链接");
    }
}
</script>

<style scoped>

</style>