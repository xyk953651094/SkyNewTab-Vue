<template>
    <a-space>
        <a-tooltip content="前往图片主页">
            <a-button type="primary" shape="round" size="large" id="buttonHtmlLink" class="frostedGlass zIndexHigh" @click="onclick"
                      :style="{display: display, backgroundColor: backgroundColor, color: fontColor}">
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
import {unsplashUrl} from "@/javascripts/publicContents";
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
let htmlLink = ref("");

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        backgroundColor.value = props.themeColor;
        fontColor.value = getFontColor(props.themeColor);
        changeThemeColor("#buttonHtmlLink", props.themeColor);
    }
})

watch(() => props.imageData, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        htmlLink.value = JSON.parse(props.imageData).links.html;
    }
})

const onclick = () => {
    if (htmlLink.value.length !== 0) {
        window.open(htmlLink.value + unsplashUrl);
    } else {
        this.$message.error("无跳转链接");
    }
}
</script>

<style scoped>

</style>