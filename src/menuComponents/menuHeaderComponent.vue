<template>
    <a-row :style="{width: '368px'}" align="center"><!-- drawer 的宽度 - 16 * 2 -->
        <a-col :span="6">
            <a-typography-text :style="{color: fontColor}">{{ "菜单栏" }}</a-typography-text>
        </a-col>
        <a-col :span="18" :style="{textAlign: 'right'}">
            <a-space>
                <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                          href="https://github.com/xyk953651094/xyk953651094/assets/28004442/fd605f5c-d2ca-43eb-ae16-86d17d5f6fb1/" target="_self" type="text"
                          @mouseout="btnMouseOut(fontColor, $event)"
                          @mouseover="btnMouseOver(hoverColor, $event)">
                    <template #icon>
                        <icon-wechat />
                    </template>
                </a-button>
                <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                          href="https://xyk953651094.blogspot.com/" target="_self" type="text"
                          @mouseout="btnMouseOut(fontColor, $event)"
                          @mouseover="btnMouseOver(hoverColor, $event)">
                    <template #icon>
                        <i class="bi bi-rss-fill"></i>
                    </template>
                </a-button>
            </a-space>
        </a-col>
    </a-row>
</template>

<script setup>
import {defineProps} from "vue";
import {btnMouseOut, btnMouseOver} from "@/javascripts/publicFunctions";
import {defaultPreferenceData} from "@/javascripts/publicConstants";
import {IconGift, IconWechat} from "@arco-design/web-vue/es/icon";

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