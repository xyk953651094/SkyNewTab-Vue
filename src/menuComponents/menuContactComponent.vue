<template>
    <a-card :body-style="{backgroundColor: backgroundColor}"
            :header-style="{backgroundColor: backgroundColor, borderBottom: '1px solid ' + fontColor}"
            :style="{border: '1px solid' + fontColor}"
            size="small"
            title="联系作者"
    >
        <template #extra>
            <icon-email/>
        </template>
        <a-row :gutter="[0, 8]">
            <a-col :span="12">
                <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                          href="https://github.com/xyk953651094/"
                          target="_self"
                          type="text" @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                    <template #icon>
                        <icon-github/>
                    </template>
                    作者主页
                </a-button>
            </a-col>
            <a-col :span="12">
                <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                          href="https://gitlab.com/xyk953651094/"
                          target="_self"
                          type="text" @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                    <template #icon>
                        <icon-gitlab/>
                    </template>
                    作者主页
                </a-button>
            </a-col>
            <a-col :span="12">
                <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                          href="https://github.com/xyk953651094?tab=repositories"
                          target="_self"
                          type="text" @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                    <template #icon>
                        <icon-github/>
                    </template>
                    更多产品
                </a-button>
            </a-col>
            <a-col :span="12">
                <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                          href="https://gitlab.com/users/xyk953651094/projects/"
                          target="_self"
                          type="text" @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                    <template #icon>
                        <icon-gitlab/>
                    </template>
                    更多产品
                </a-button>
            </a-col>
            <a-col :span="12">
                <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                          href="mailto:xyk953651094@qq.com?&subject=云开新标签页-功能建议&body=提示：功能建议前请优先查阅帮助文档"
                          target="_self"
                          type="text"
                          @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                    <template #icon>
                        <icon-thumb-up/>
                    </template>
                    功能建议
                </a-button>
            </a-col>
            <a-col :span="12">
                <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                          href="mailto:xyk953651094@qq.com?&subject=云开新标签页-问题反馈&body=提示：问题反馈前请优先查阅帮助文档"
                          target="_self"
                          type="text"
                          @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                    <template #icon>
                        <icon-thumb-down/>
                    </template>
                    问题反馈
                </a-button>
            </a-col>
        </a-row>
    </a-card>
</template>

<script setup>
import {IconEmail, IconThumbDown, IconThumbUp, IconGitlab, IconGithub} from "@arco-design/web-vue/es/icon";
import {defineProps} from "vue";
import {btnMouseOut, btnMouseOver} from "@/javascripts/publicFunctions";
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