<template>
    <a-space>
        <a-tooltip content="前往作者主页">
            <a-button type="primary" shape="round" size="large" id="buttonAuthor" class="frostedGlass zIndexHigh" @click="onclick"
                      :style="{display: display}">
                <template #icon>
                    <icon-camera/>
                </template>
                {{ props.authorName }}
            </a-button>
        </a-tooltip>
    </a-space>
</template>

<script setup>
import {defineProps, watch} from "vue"
import {IconCamera} from "@arco-design/web-vue/es/icon";
import {unsplashUrl} from "@/javascripts/publicContents";
import {changeThemeColor} from "@/javascripts/publicFunctions";

const props = defineProps({
    authorName: {
        type: String,
        default: () => {
            return "";
        },
        required: true
    },
    authorLink: {
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
    if(newValue !== oldValue) {
        changeThemeColor("#buttonAuthor", props.imageColor);
    }
})

const onclick = () => {
    if(props.authorLink.length !== 0) {
        window.open(props.authorLink + unsplashUrl);
    }
    else {
        this.$message.error("无跳转链接");
    }
}
</script>

<style scoped>

</style>