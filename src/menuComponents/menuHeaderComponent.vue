<template>
    <a-row :style="{width: '368px'}" align="center"><!-- drawer 的宽度 - 16 * 2 -->
        <a-col :span="6">
            <a-typography-text :style="{color: fontColor}">{{ "菜单栏" }}</a-typography-text>
        </a-col>
        <a-col :span="18" :style="{textAlign: 'right'}">
            <a-space>
                <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}" type="text"
                          @mouseout="btnMouseOut(fontColor, $event)"
                          @mouseover="btnMouseOver(hoverColor, $event)"
                          @click="toChromeBtnOnClick">
                    <template #icon>
                        <i class="bi bi-browser-chrome"></i>
                    </template>
                </a-button>
                <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}" type="text"
                          @mouseout="btnMouseOut(fontColor, $event)"
                          @mouseover="btnMouseOver(hoverColor, $event)"
                          @click="toEdgeBtnOnClick">
                    <template #icon>
                        <i class="bi bi-browser-edge"></i>
                    </template>
                </a-button>
                <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}" type="text"
                          @mouseout="btnMouseOut(fontColor, $event)"
                          @mouseover="btnMouseOver(hoverColor, $event)"
                          @click="toFirefoxBtnOnClick">
                    <template #icon>
                        <i class="bi bi-browser-firefox"></i>
                    </template>
                </a-button>
                <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}" type="text"
                          @mouseout="btnMouseOut(fontColor, $event)"
                          @mouseover="btnMouseOver(hoverColor, $event)"
                          @click="toSafariBtnOnClick">
                    <template #icon>
                        <i class="bi bi-browser-safari"></i>
                    </template>
                </a-button>
                <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor, cursor: 'default'}" type="text"
                          @mouseout="btnMouseOut(fontColor, $event)"
                          @mouseover="btnMouseOver(hoverColor, $event)">
                    <template #icon>
                        <icon-info-circle />
                    </template>
                    {{"V" + require('../../package.json').version}}
                </a-button>
            </a-space>
        </a-col>
    </a-row>
</template>

<script setup>
import {defineProps} from "vue";
import {btnMouseOut, btnMouseOver} from "@/javascripts/publicFunctions";
import {defaultPreferenceData} from "@/javascripts/publicConstants";
import {IconInfoCircle} from "@arco-design/web-vue/es/icon";
import {Message} from "@arco-design/web-vue";

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

function toChromeBtnOnClick() {
    window.open("https://chromewebstore.google.com/detail/云开新标签页/odoenlibdoinhncgedhpbiehcadmakom/", "_self");
}

function toEdgeBtnOnClick() {
    window.open("https://microsoftedge.microsoft.com/addons/detail/云开新标签页/dilcoahhajibnbanbabkcljjobgpomdc/", "_self");
}

function toFirefoxBtnOnClick() {
    Message.warning("暂未上架 Firefox");
}

function toSafariBtnOnClick() {
    Message.warning("暂未上架 Safari");
}
</script>

<style scoped>

</style>