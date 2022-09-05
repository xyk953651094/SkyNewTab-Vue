<template>
    <a-space>
        <a-tooltip content="拍摄时间">
            <a-button type="primary" shape="round" size="large" id="buttonCreateTime" class="frostedGlass zIndexHigh"
                      :style="{display: display}">
                <template #icon>
                    <icon-camera/>
                </template>
                {{ props.createTime }}
            </a-button>
        </a-tooltip>
    </a-space>
</template>

<script setup>
import {defineProps, watch} from "vue"
import {IconCamera} from "@arco-design/web-vue/es/icon";
import {changeThemeColor} from "@/javascripts/publicFunctions";

const props = defineProps({
    createTime: {
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
        changeThemeColor("#buttonCreateTime", props.imageColor);
    }
})
</script>

<style scoped>

</style>