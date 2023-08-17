<template>
    <a-card :body-style="{backgroundColor: backgroundColor}"
            :header-style="{backgroundColor: backgroundColor, borderBottom: '1px solid ' + fontColor}"
            :style="{border: '1px solid' + fontColor}"
            size="small"
            title="联系作者"
    >
        <template #extra>
            <icon-send/>
        </template>
        <a-row :gutter="[0, 8]">
            <a-col :span="12">
                <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                          href="mailto:xyk953651094@qq.com?&subject=云开新标签页-功能建议"
                          shape="round"
                          target="_blank" type="text">
                    <template #icon>
                        <icon-info-circle/>
                    </template>
                    功能建议
                </a-button>
            </a-col>
            <a-col :span="12">
                <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                          href="mailto:xyk953651094@qq.com?&subject=云开新标签页-问题反馈"
                          shape="round"
                          target="_blank" type="text">
                    <template #icon>
                        <icon-exclamation-circle/>
                    </template>
                    问题反馈
                </a-button>
            </a-col>
        </a-row>
    </a-card>
</template>

<script setup>
import {IconExclamationCircle, IconInfoCircle, IconSend} from "@arco-design/web-vue/es/icon";
import {defineProps} from "vue";
import {getFontColor} from "../javascripts/publicFunctions";

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