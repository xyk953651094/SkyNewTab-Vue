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
            <a-row :gutter="[0, 8]">
                <a-col :span="18">
                    <a-button @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)"
                              :style="{color: fontColor, cursor: 'default'}"
                              :shape="preferenceData.buttonShape" type="text">
                        <template #icon>
                            <icon-apps/>
                        </template>
                        {{ "云开壁纸" }}
                    </a-button>
                </a-col>
                <a-col :span="6">
                    <a-space>
                        <a-button @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)"
                                  :style="{color: fontColor}" href="https://github.com/xyk953651094/SkyWallpaper-Electron/"
                                  :shape="preferenceData.buttonShape"
                                  target="_blank" type="text">
                            <template #icon>
                                <icon-github />
                            </template>
                        </a-button>
                        <a-button @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)"
                                  :style="{color: fontColor}" href="https://gitlab.com/xyk953651094/SkyWallpaper-Electron/"
                                  :shape="preferenceData.buttonShape"
                                  target="_blank" type="text">
                            <template #icon>
                                <icon-gitlab />
                            </template>
                        </a-button>
                    </a-space>
                </a-col>
                <a-col :span="18">
                    <a-button @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)"
                              :style="{color: fontColor, cursor: 'default'}"
                              :shape="preferenceData.buttonShape" type="text">
                        <template #icon>
                            <i class="bi bi-puzzle"/>
                        </template>
                        {{ "云开新标签页（React）" }}
                    </a-button>
                </a-col>
                <a-col :span="6">
                    <a-space>
                        <a-button @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)"
                                  :style="{color: fontColor}" href="https://github.com/xyk953651094/SkyNewTab-React/"
                                  :shape="preferenceData.buttonShape"
                                  target="_blank" type="text">
                            <template #icon>
                                <icon-github />
                            </template>
                        </a-button>
                        <a-button @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)"
                                  :style="{color: fontColor}" href="https://gitlab.com/xyk953651094/SkyNewTab-React/"
                                  :shape="preferenceData.buttonShape"
                                  target="_blank" type="text">
                            <template #icon>
                                <icon-gitlab />
                            </template>
                        </a-button>
                    </a-space>
                </a-col>
                <a-col :span="18">
                    <a-button @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)"
                              :style="{color: fontColor, cursor: 'default'}"
                              :shape="preferenceData.buttonShape" type="text">
                        <template #icon>
                            <i class="bi bi-puzzle"/>
                        </template>
                        {{ "云开诗词新标签页" }}
                    </a-button>
                </a-col>
                <a-col :span="6">
                    <a-space>
                        <a-button @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)"
                                  :style="{color: fontColor}" href="https://github.com/xyk953651094/SkyNewTab-Poem-React/"
                                  :shape="preferenceData.buttonShape"
                                  target="_blank" type="text">
                            <template #icon>
                                <icon-github/>
                            </template>
                        </a-button>
                        <a-button @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)"
                                  :style="{color: fontColor}" href="https://gitlab.com/xyk953651094/SkyNewTab-Poem-React/"
                                  :shape="preferenceData.buttonShape"
                                  target="_blank" type="text">
                            <template #icon>
                                <icon-gitlab />
                            </template>
                        </a-button>
                    </a-space>
                </a-col>
            </a-row>
    </a-card>
</template>

<script setup>
import {IconApps, IconGithub, IconGitlab} from "@arco-design/web-vue/es/icon";
import {btnMouseOver, btnMouseOut} from "../javascripts/publicFunctions";
import {defineProps} from "vue";
import {defaultPreferenceData} from "../javascripts/publicConstants";

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