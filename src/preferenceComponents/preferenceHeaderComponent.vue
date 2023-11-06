<template>
    <a-row align="center" :style="{width: '348px'}"><!-- 380（drawer 的宽度） - 16 * 2 -->
        <a-col :span="12">
            <a-typography-text :style="{color: fontColor}">{{ "菜单栏" }}</a-typography-text>
        </a-col>
        <a-col :span="12" :style="{textAlign: 'right'}">
            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                      :style="{color: fontColor}" href="https://afdian.net/a/xyk953651094"
                      :shape="preferenceData.buttonShape"
                      target="_blank" type="text">
                <template #icon>
                    <icon-gift/>
                </template>
                {{ "支持作者" }}
            </a-button>
        </a-col>
    </a-row>
</template>

<script setup>
import {defineProps} from "vue";
import {getFontColor} from "../javascripts/publicFunctions";
import {defaultPreferenceData} from "../javascripts/publicConstants";
import {IconGift} from "@arco-design/web-vue/es/icon";

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