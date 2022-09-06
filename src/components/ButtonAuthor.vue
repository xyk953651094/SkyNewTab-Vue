<template>
    <a-space>
        <a-tooltip :content=tooltipContent>
            <a-button type="primary" shape="round" size="large" id="buttonAuthor" class="frostedGlass zIndexHigh" @click="onclick"
                      :style="{display: display}">
                <template #icon>
                    <icon-user/>
                </template>
                {{ props.authorName }}
            </a-button>
        </a-tooltip>
    </a-space>
</template>

<script setup>
import {defineProps, ref, watch} from "vue"
import {IconUser} from "@arco-design/web-vue/es/icon";
import {changeThemeColor} from "@/javascripts/publicFunctions";
let tooltipContent = ref("");

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

watch(() => props.authorLink, (newValue, oldValue) => {
    if(newValue !== oldValue) {
        tooltipContent.value = "作者主页：" + props.authorLink;
    }
})

const onclick = () => {
    if(props.authorLink.length !== 0) {
        window.open(props.authorLink);
    }
    else {
        this.$message.error("无跳转链接");
    }
}
</script>

<style scoped>

</style>