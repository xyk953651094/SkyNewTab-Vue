<template>
    <a-space align="center">
        <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor, cursor: 'default'}"
                  type="text"
                  @mouseout="btnMouseOut(fontColor, $event)"
                  @mouseover="btnMouseOver(hoverColor, $event)">
            <template #icon>
                <icon-dashboard/>
            </template>
            云开新标签页的仪表盘
        </a-button>
    </a-space>
</template>

<script setup>
import {IconDashboard} from "@arco-design/web-vue/es/icon";
import {defineProps} from "vue";
import {btnMouseOut, btnMouseOver} from "@/javascripts/publicFunctions";
import {defaultPreferenceData} from "@/javascripts/publicConstants";

const props = defineProps({
    hoverColor: {
        type: String,
        required: true,
        default: () => {
            return ""
        }
    },
    fontColor: {
        type: String,
        required: true,
        default: () => {
            return ""
        }
    },
    preferenceData: {
        type: Object,
        required: true,
        default: () => {
            return defaultPreferenceData
        }
    }
});
</script>

<style scoped>

</style>