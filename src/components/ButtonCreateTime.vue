<template>
    <a-space>
        <a-tooltip :content=tooltipContent>
            <a-button type="primary" shape="round" size="large" id="buttonCreateTime" class="frostedGlass zIndexHigh"
                      :style="{display: display}">
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
import {changeThemeColor} from "@/javascripts/publicFunctions";
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
        changeThemeColor("#buttonCreateTime", props.themeColor);
    }
})

watch(() => props.imageData, (newValue, oldValue) => {
    if(newValue !== oldValue) {
        createTime.value = JSON.parse(props.imageData).created_at.split("T")[0];
        tooltipContent.value = "拍摄时间：" + createTime.value;
    }
})
</script>

<style scoped>

</style>