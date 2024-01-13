<template>
    <a-button type="text"
              :shape="buttonShape"
              :style="{color: fontColor, cursor: buttonCursor}"
              @mouseover="btnMouseOver(hoverColor, $event)" @mouseout="btnMouseOut(fontColor, $event)"
              @click="buttonOnClick"
    >
        <slot name="buttonIcon"></slot>
        {{ buttonContent }}
    </a-button>
</template>

<script setup>
import "@/stylesheets/publicStyles.less"
import {defineProps, } from "vue"
import {btnMouseOut, btnMouseOver} from "@/javascripts/publicFunctions";

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
    buttonCursor: {
        type: String,
        required: true,
        default: () => {
            return "default"
        }
    },
    buttonContent: {
        type: String,
        required: true,
        default: () => {
            return ""
        }
    },
    buttonShape: {
        validator: function(value) {
            return ["round", "circle", "square"].includes(value);
        },
        required: true,
        default: () => {
            return "round"
        }
    },
    buttonOnClick: {
        type: Function,
        required: true,
        default: () => {
            return null
        }
    },
});
</script>

<style scoped>

</style>