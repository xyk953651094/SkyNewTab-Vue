<template>
    <a-row :style="{width: '368px'}" align="center"><!-- drawer 的宽度 - 16 * 2 -->
        <a-col :span="6">
            <a-typography-text :style="{color: fontColor}">{{ "菜单栏" }}</a-typography-text>
        </a-col>
        <a-col :span="18" :style="{textAlign: 'right'}">
            <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor, cursor: 'default'}" type="text"
                      @mouseout="btnMouseOut(fontColor, $event)"
                      @mouseover="btnMouseOver(hoverColor, $event)">
                <template #icon>
                    <icon-info-circle />
                </template>
                {{"V" + require('../../package.json').version}}
            </a-button>
        </a-col>
    </a-row>
</template>

<script setup>
import {defineProps} from "vue";
import {btnMouseOut, btnMouseOver} from "@/javascripts/publicFunctions";
import {defaultPreferenceData} from "@/javascripts/publicConstants";
import {IconInfoCircle} from "@arco-design/web-vue/es/icon";

defineProps({
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