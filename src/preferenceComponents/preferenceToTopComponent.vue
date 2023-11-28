<template>
    <a-row justify="center">
        <a-button @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)" @click="toTopBtnOnClick"
                  :shape="preferenceData.buttonShape" type="text" :style="{color: fontColor}">
            <template #icon>
                <icon-to-top />
            </template>
            {{ "回到顶部" }}
        </a-button>
    </a-row>
</template>

<script setup>
import {IconToTop} from "@arco-design/web-vue/es/icon";
import {defineProps} from "vue";
import {btnMouseOver, btnMouseOut} from "../javascripts/publicFunctions";
import {defaultPreferenceData} from "../javascripts/publicConstants";

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

function toTopBtnOnClick() {
    document.getElementById("drawerContent").scrollIntoView({behavior: "smooth"});
}
</script>

<style scoped>

</style>