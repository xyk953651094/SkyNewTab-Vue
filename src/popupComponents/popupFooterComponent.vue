<template>
    <a-space>
        <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                  href="https://github.com/xyk953651094/SkyNewTab-Vue/" target="_blank" type="text"
                  @mouseout="btnMouseOut(fontColor, $event)"
                  @mouseover="btnMouseOver(hoverColor, $event)">
            <template #icon>
                <icon-github/>
            </template>
            产品主页
        </a-button>
        <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                  href="https://gitlab.com/xyk953651094/SkyNewTab-Vue/" target="_blank" type="text"
                  @mouseout="btnMouseOut(fontColor, $event)"
                  @mouseover="btnMouseOver(hoverColor, $event)">
            <template #icon>
                <icon-gitlab/>
            </template>
            产品主页
        </a-button>
        <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                  href="https://github.com/xyk953651094/xyk953651094/assets/28004442/fd605f5c-d2ca-43eb-ae16-86d17d5f6fb1/" target="_blank" type="text"
                  @mouseout="btnMouseOut(fontColor, $event)"
                  @mouseover="btnMouseOver(hoverColor, $event)">
            <template #icon>
                <icon-wechat />
            </template>
            公众号
        </a-button>
        <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                  href="https://xyk953651094.blogspot.com/" target="_blank" type="text"
                  @mouseout="btnMouseOut(fontColor, $event)"
                  @mouseover="btnMouseOver(hoverColor, $event)">
            <template #icon>
                <icon-notification/>
            </template>
            博客
        </a-button>
        <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                  href="https://afdian.net/a/xyk953651094/" target="_blank" type="text"
                  @mouseout="btnMouseOut(fontColor, $event)"
                  @mouseover="btnMouseOver(hoverColor, $event)">
            <template #icon>
                <icon-gift/>
            </template>
            捐助
        </a-button>
    </a-space>
</template>

<script setup>
import {IconGift, IconGithub, IconGitlab, IconNotification, IconWechat} from "@arco-design/web-vue/es/icon";
import {defineProps} from "vue";
import {btnMouseOut, btnMouseOver} from "@/javascripts/publicFunctions";
import {defaultPreferenceData} from "@/javascripts/publicConstants";

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
</script>

<style scoped>

</style>