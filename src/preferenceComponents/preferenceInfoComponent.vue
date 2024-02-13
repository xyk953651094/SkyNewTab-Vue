<template>
    <a-card :body-style="{backgroundColor: backgroundColor}"
            :header-style="{backgroundColor: backgroundColor, borderBottom: '1px solid ' + fontColor}"
            :style="{border: '1px solid' + fontColor}"
            size="small"
            title="产品信息"
    >
        <template #extra>
            <icon-info-circle/>
        </template>
        <a-space direction="vertical">
            <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                      href="https://www.mxnzp.com/" target="_self"
                      type="text"
                      @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                <template #icon>
                    <icon-calendar/>
                </template>
                {{ "日历来源：https://www.mxnzp.com" }}
            </a-button>
            <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                      href="https://www.jinrishici.com/" target="_self"
                      type="text"
                      @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                <template #icon>
                    <icon-cloud/>
                </template>
                {{ "天气来源：https://www.jinrishici.com" }}
            </a-button>
            <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                      href="https://unsplash.com/" target="_self"
                      type="text"
                      @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                <template #icon>
                    <icon-file-image/>
                </template>
                {{ "图片来源：https://unsplash.com" }}
            </a-button>
            <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                      href="https://www.soundvery.com/" target="_self"
                      type="text"
                      @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                <template #icon>
                    <icon-sound />
                </template>
                {{ "噪音来源：https://www.soundvery.com" }}
            </a-button>
            <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                      href="https://www.jetbrains.com.cn/community/opensource/#support/" target="_self"
                      type="text"
                      @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                <template #icon>
                    <icon-code-square/>
                </template>
                {{ "开发支持：JetBrains 免费许可证计划" }}
            </a-button>
        </a-space>
    </a-card>
</template>

<script setup>
import {IconCalendar, IconCloud, IconCodeSquare, IconFileImage, IconInfoCircle, IconSound} from "@arco-design/web-vue/es/icon";
import {btnMouseOut, btnMouseOver} from "@/javascripts/publicFunctions";
import {defineProps} from "vue";
import {defaultPreferenceData} from "@/javascripts/publicConstants";

defineProps({
    hoverColor: {
        type: String,
        required: true,
        default: () => {
            return ""
        }
    },
    backgroundColor: {
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