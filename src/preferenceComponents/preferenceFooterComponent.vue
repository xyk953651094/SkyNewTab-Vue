<template>
    <a-space>
        <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                  href="https://github.com/xyk953651094"
                  shape="round" target="_blank" type="text">
            <template #icon>
                <icon-github/>
            </template>
            Github
        </a-button>
        <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                  href="https://gitlab.com/xyk953651094"
                  shape="round" target="_blank" type="text">
            <template #icon>
                <icon-gitlab />
            </template>
            GitLab
        </a-button>
        <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                  href="https://xyk953651094.blogspot.com"
                  shape="round" target="_blank" type="text">
            <template #icon>
                <icon-notification />
            </template>
            博客
        </a-button>
    </a-space>
</template>

<script setup>
import {IconGithub, IconGitlab, IconNotification} from "@arco-design/web-vue/es/icon";
import {defineProps} from "vue";
import {getFontColor} from "../javascripts/publicFunctions";

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