<template>
    <a-space>
        <a-tooltip :content=tooltipContent position="tr" :background-color="backgroundColor" :content-style="{color: fontColor}">
            <a-button type="primary" shape="round" size="large" id="buttonCreateTime" class="frostedGlass zIndexHigh"
                      :style="{display: display, backgroundColor: backgroundColor, color: fontColor}">
                <template #icon>
                    <icon-calendar-clock />
                </template>
                {{ createTime }}
            </a-button>
        </a-tooltip>
    </a-space>
</template>

<script setup>
import {defineProps, ref, watch} from "vue"
import {IconCalendarClock} from "@arco-design/web-vue/es/icon";
import {changeThemeColor, getFontColor} from "@/javascripts/publicFunctions";

let backgroundColor = ref("");
let fontColor = ref("");
let tooltipContent = ref("");

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

let createTime = ref("");

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        backgroundColor.value = props.themeColor;
        fontColor.value = getFontColor(props.themeColor);
    }
})

watch(() => props.imageData, (newValue, oldValue) => {
    if(newValue !== oldValue) {
        createTime.value = props.imageData.created_at.split("T")[0];
        tooltipContent.value = "拍摄时间：" + createTime.value;
    }
})
</script>

<style scoped>

</style>