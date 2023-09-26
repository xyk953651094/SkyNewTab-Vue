<template>
    <a-card :body-style="{backgroundColor: backgroundColor}"
            :header-style="{backgroundColor: backgroundColor, borderBottom: '1px solid ' + fontColor}"
            :style="{border: '1px solid' + fontColor}"
            size="small"
            title="友情链接"
    >
        <template #extra>
            <icon-link/>
        </template>
        <a-row :gutter="[0, 8]">
            <a-col :span="12">
                <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                          :style="{color: fontColor}" href="https://unsplash.com/"
                          :shape="preferenceData.buttonShape"
                          target="_blank" type="text">
                    <template #icon>
                        <a-avatar :size="16" :style="{backgroundColor: 'transparent'}"
                                  image-url="https://unsplash.com/favicon.ico"
                                  shape="square"/>
                    </template>
                    Unsplash
                </a-button>
            </a-col>
            <a-col :span="12">
                <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                          :style="{color: fontColor}" href="https://www.pexels.com/"
                          :shape="preferenceData.buttonShape"
                          target="_blank" type="text">
                    <template #icon>
                        <a-avatar :size="16" :style="{backgroundColor: 'transparent'}"
                                  image-url="https://www.pexels.com/favicon.ico"
                                  shape="square"/>
                    </template>
                    Pexels
                </a-button>
            </a-col>
            <a-col :span="12">
                <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                          :style="{color: fontColor}" href="https://pixabay.com/"
                          :shape="preferenceData.buttonShape"
                          target="_blank" type="text">
                    <template #icon>
                        <a-avatar :size="16" :style="{backgroundColor: 'transparent'}"
                                  image-url="https://pixabay.com/favicon.ico"
                                  shape="square"/>
                    </template>
                    Pixabay
                </a-button>
            </a-col>
            <a-col :span="12">
                <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                          :style="{color: fontColor}" href="https://www.jetbrains.com/"
                          :shape="preferenceData.buttonShape"
                          target="_blank" type="text">
                    <template #icon>
                        <a-avatar :size="16" :style="{backgroundColor: 'transparent'}"
                                  image-url="https://www.jetbrains.com/favicon.ico"
                                  shape="square"/>
                    </template>
                    JetBrains
                </a-button>
            </a-col>
        </a-row>
    </a-card>
</template>

<script setup>
import {IconLink} from "@arco-design/web-vue/es/icon";
import {getFontColor} from "../javascripts/publicFunctions";
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