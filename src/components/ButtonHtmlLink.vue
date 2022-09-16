<template>
    <a-space>
        <a-tooltip content="前往图片主页">
            <a-button type="primary" shape="round" size="large" id="buttonHtmlLink" class="frostedGlass zIndexHigh" @click="onclick"
                      :style="{display: display}">
                <template #icon>
                    <icon-link/>
                </template>
            </a-button>
        </a-tooltip>
    </a-space>
</template>

<script setup>
import {defineProps, watch} from "vue";
import {IconLink} from "@arco-design/web-vue/es/icon";
import {unsplashUrl} from "@/javascripts/publicContents";
import {changeThemeColor} from "@/javascripts/publicFunctions";

const props = defineProps({
    htmlLink: {
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
    themeColor: {
        type: String,
        default: () => {
            return "#2c3e50";
        },
        required: true
    }
});

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        changeThemeColor("#buttonHtmlLink", props.themeColor);
    }
})

const onclick = () => {
    if (props.htmlLink.length !== 0) {
        window.open(props.htmlLink + unsplashUrl);
    } else {
        this.$message.error("无跳转链接");
    }
}
</script>

<style scoped>

</style>