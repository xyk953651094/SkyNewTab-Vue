<template>
    <a-space align="center">
        <a-button @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)"
                  :style="{color: fontColor, cursor: 'default'}"
                  :shape="preferenceData.buttonShape"
                  type="text">
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
import {btnMouseOver, btnMouseOut} from "../javascripts/publicFunctions";
import {defaultPreferenceData} from "../javascripts/publicConstants";

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