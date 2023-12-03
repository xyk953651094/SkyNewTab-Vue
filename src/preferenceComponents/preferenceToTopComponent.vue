<template>
    <a-row justify="center">
        <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                  type="text"
                  @click="toTopBtnOnClick" @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
            <template #icon>
                <icon-to-top/>
            </template>
            {{ "回到顶部" }}
        </a-button>
    </a-row>
</template>

<script setup>
import {IconToTop} from "@arco-design/web-vue/es/icon";
import {defineProps} from "vue";
import {btnMouseOut, btnMouseOver} from "../javascripts/publicFunctions";
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