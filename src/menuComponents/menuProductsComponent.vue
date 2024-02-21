<template>
    <a-card :body-style="{backgroundColor: backgroundColor}"
            :header-style="{backgroundColor: backgroundColor, borderBottom: '1px solid ' + fontColor}"
            :style="{border: '1px solid' + fontColor}"
            size="small"
            title="更多产品"
    >
        <template #extra>
            <icon-apps/>
        </template>
        <a-row>
            <a-col :span="12">
                <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                          href="https://github.com/xyk953651094/"
                          target="_self"
                          type="text" @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                    <template #icon>
                        <icon-github/>
                    </template>
                    Github 作者主页
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
                    GitLab 作者主页
                </a-button>
            </a-col>
        </a-row>
    </a-card>
</template>

<script setup>
import {IconApps, IconGithub, IconGitlab} from "@arco-design/web-vue/es/icon";
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