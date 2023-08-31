<template>
    <a-card :body-style="{backgroundColor: backgroundColor}"
            :header-style="{backgroundColor: backgroundColor, borderBottom: '1px solid ' + fontColor}"
            :style="{border: '1px solid' + fontColor}"
            size="small"
            title="产品信息"
    >
        <template #extra>
            <icon-apps />
        </template>
        <a-space direction="vertical">
            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                      :style="{color: fontColor}" href="https://www.mxnzp.com/"
                      shape="round"
                      target="_blank" type="text">
                <template #icon>
                    <icon-calendar />
                </template>
                {{"节气来源：https://www.mxnzp.com"}}
            </a-button>
            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                      :style="{color: fontColor}" href="https://www.jinrishici.com/"
                      shape="round"
                      target="_blank" type="text">
                <template #icon>
                    <icon-cloud />
                </template>
                {{"天气来源：https://www.jinrishici.com"}}
            </a-button>
            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                      :style="{color: fontColor}" href="https://unsplash.com/"
                      shape="round"
                      target="_blank" type="text">
                <template #icon>
                    <icon-file-image />
                </template>
                {{"图片来源：https://unsplash.com"}}
            </a-button>
        </a-space>
    </a-card>
</template>

<script setup>
import {IconApps, IconCalendar, IconCloud, IconFileImage} from "@arco-design/web-vue/es/icon";
import {getFontColor} from "../javascripts/publicFunctions";
import {defineProps} from "vue";

const props = defineProps({
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