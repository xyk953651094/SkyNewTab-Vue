<template>
    <a-space align="center">
        <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
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
import {getFontColor} from "../javascripts/publicFunctions";
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

function btnMouseOver() {
    this.style.backgroundColor = props.hoverColor;
    this.style.color = getFontColor(props.hoverColor);
}

function btnMouseOut() {
    this.style.backgroundColor = "transparent";
    this.style.color = props.fontColor;
}
</script>

<style scoped>

</style>