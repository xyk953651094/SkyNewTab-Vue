<template>
    <a-card :body-style="{backgroundColor: backgroundColor}"
            :header-style="{backgroundColor: backgroundColor, borderBottom: '1px solid ' + fontColor}"
            :style="{border: '1px solid' + fontColor}"
            size="small"
            title="帮助文档"
    >
        <template #extra>
            <icon-question-circle />
        </template>
        <a-row>
            <a-col :span="12">
                <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                          href="https://xyk953651094.github.io/SkyDocuments/"
                          target="_self"
                          type="text"
                          @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                    <template #icon>
                        <icon-github/>
                    </template>
                    GitHub Pages
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
                    GitLab Pages
                </a-button>
            </a-col>
        </a-row>
    </a-card>
</template>

<script setup>
import {IconQuestionCircle, IconGithub, IconGitlab} from "@arco-design/web-vue/es/icon";
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