<template>
    <a-space>
        <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor, cursor: 'default'}" type="text"
                  @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
            <template #icon>
                <icon-star />
            </template>
            如果喜欢这款插件，请考虑捐助或五星好评
        </a-button>
    </a-space>
</template>

<script setup>
import {IconStar} from "@arco-design/web-vue/es/icon";
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