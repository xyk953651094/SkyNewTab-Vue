<template>
    <a-popover :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
               :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
               :style="{minWidth: popoverMinWidth}"
               :position="popoverPosition"
    >
        <a-button :id="buttonId" :shape="buttonShape" :style="{cursor: 'default', display: buttonDisplay}"
                  class="componentTheme zIndexHigh" size="large" type="primary">
            <template #icon>
                <slot name="buttonIcon"></slot>
            </template>
            {{ buttonContent}}
        </a-button>
        <template #title>
            <slot name="popoverTitle"></slot>
        </template>
        <template #content>
            <slot name="popoverContent"></slot>
        </template>
    </a-popover>
</template>

<script setup>
import "@/stylesheets/publicStyles.less"
import {defineProps, ref, watch} from "vue"

const props = defineProps({
    themeColor: {
        type: Object,
        required: true,
        default: () => {
            return {
                "themeColor": "",
                "componentBackgroundColor": "",
                "componentFontColor": ""
            }
        }
    },
    popoverPosition: {
        validator: function(value) {
            return ["top", "tl", "tr", "bottom", "bl", "br", "left", "lt", "lb", "right", "rt", "rb"].includes(value);
        },
        required: true,
        default: () => {
            return "bottom"
        }
    },
    popoverMinWidth: {
        type: String,
        required: true,
        default: () => {
            return ""
        }
    },
    buttonId: {
        type: String,
        required: true,
        default: () => {
            return ""
        }
    },
    buttonDisplay: {
        type: String,
        required: true,
        default: () => {
            return ""
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
    }
});

let backgroundColor = ref("");
let fontColor = ref("");

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
    }
});
</script>

<style scoped>

</style>