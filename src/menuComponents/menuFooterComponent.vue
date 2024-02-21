<template>
    <a-space>
        <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                  href="https://github.com/xyk953651094/SkyNewTab-Vue/"
                  target="_self"
                  type="text" @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
            <template #icon>
                <icon-github/>
            </template>
            Github
        </a-button>
        <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                  href="https://gitlab.com/xyk953651094/SkyNewTab-Vue/"
                  target="_self"
                  type="text" @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
            <template #icon>
                <icon-gitlab/>
            </template>
            GitLab
        </a-button>
        <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                  href="https://xyk953651094.blogspot.com/"
                  target="_self"
                  type="text" @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
            <template #icon>
                <icon-notification/>
            </template>
            Blogger
        </a-button>
    </a-space>
</template>

<script setup>
import {IconGithub, IconGitlab, IconNotification} from "@arco-design/web-vue/es/icon";
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