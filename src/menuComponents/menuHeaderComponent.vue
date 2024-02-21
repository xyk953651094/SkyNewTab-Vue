<template>
    <a-row :style="{width: '368px'}" align="center"><!-- drawer 的宽度 - 16 * 2 -->
        <a-col :span="12">
            <a-typography-text :style="{color: fontColor}">{{ "菜单栏" }}</a-typography-text>
        </a-col>
        <a-col :span="12" :style="{textAlign: 'right'}">
            <a-space>
                <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                          href="https://afdian.net/a/xyk953651094" target="_self" type="text"
                          @mouseout="btnMouseOut(fontColor, $event)"
                          @mouseover="btnMouseOver(hoverColor, $event)">
                    <template #icon>
                        <icon-gift/>
                    </template>
                    {{ "捐助" }}
                </a-button>
                <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                          href="https://xyk953651094.blogspot.com/" target="_self" type="text"
                          @mouseout="btnMouseOut(fontColor, $event)"
                          @mouseover="btnMouseOver(hoverColor, $event)">
                    <template #icon>
                        <icon-notification/>
                    </template>
                    {{ "博客" }}
                </a-button>
            </a-space>
        </a-col>
    </a-row>
</template>

<script setup>
import {defineProps} from "vue";
import {btnMouseOut, btnMouseOver} from "@/javascripts/publicFunctions";
import {defaultPreferenceData} from "@/javascripts/publicConstants";
import {IconGift, IconNotification} from "@arco-design/web-vue/es/icon";

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