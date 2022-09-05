<template>
    <a-space>
        <a-tooltip content="图片链接">
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
        changeThemeColor("#buttonHtmlLink", props.imageColor);
    }
})

const onclick = () => {
    if (props.htmlLink.length !== 0) {
        window.open(props.htmlLink);
    } else {
        this.$message.error("无跳转链接");
    }
}
</script>

<style scoped>

</style>