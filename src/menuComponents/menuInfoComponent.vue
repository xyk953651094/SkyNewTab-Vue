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
        <a-row :gutter="[0, 8]">
            <a-col :span="12">
                <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                          href="https://github.com/xyk953651094/SkyNewTab-Vue/"
                          target="_self"
                          type="text" @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                    <template #icon>
                        <icon-github/>
                    </template>
                    产品主页
                </a-button>
            </a-col>
            <a-col :span="12">
                <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                          href="https://gitlab.com/xyk953651094/SkyNewTab-Vue/"
                          target="_self"
                          type="text" @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                    <template #icon>
                        <icon-gitlab/>
                    </template>
                    产品主页
                </a-button>
            </a-col>
            <a-col :span="12">
                <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                          href="https://github.com/xyk953651094/SkyNewTab-Vue/releases/"
                          target="_self"
                          type="text" @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                    <template #icon>
                        <icon-github/>
                    </template>
                    更新日志
                </a-button>
            </a-col>
            <a-col :span="12">
                <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                          href="https://gitlab.com/xyk953651094/SkyNewTab-Vue/-/releases/"
                          target="_self"
                          type="text" @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                    <template #icon>
                        <icon-gitlab/>
                    </template>
                    更新日志
                </a-button>
            </a-col>
            <a-col :span="12">
                <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                          href="https://xyk953651094.github.io/SkyDocuments/"
                          target="_self"
                          type="text"
                          @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                    <template #icon>
                        <icon-github/>
                    </template>
                    帮助文档
                </a-button>
            </a-col>
            <a-col :span="12">
                <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                          href="https://xyk953651094.gitlab.io/SkyDocuments/"
                          target="_self"
                          type="text"
                          @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                    <template #icon>
                        <icon-gitlab/>
                    </template>
                    帮助文档
                </a-button>
            </a-col>
        </a-row>
    </a-card>
</template>

<script setup>
import {IconGithub, IconGitlab, IconInfoCircle} from "@arco-design/web-vue/es/icon";
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