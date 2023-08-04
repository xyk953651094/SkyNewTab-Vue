<template>
    <a-layout class="popupLayout">
        <a-layout-header class="popupHeader">
            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                      :style="{color: fontColor, cursor: 'default'}" href="https://github.com/xyk953651094"
                      shape="round" target="_blank"
                      type="text">
                <template #icon>
                    <icon-dashboard/>
                </template>
                云开新标签页的仪表盘
            </a-button>
        </a-layout-header>
        <a-layout-content class="popupContent">
            <a-space direction="vertical">
                <popup-status-component :font-color="fontColor" :image-data="imageData"/>
                <popup-image-component :font-color="fontColor" :image-data="imageData"/>
            </a-space>
        </a-layout-content>
        <a-layout-footer class="popupFooter">
            <a-space>
                <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                          href="https://github.com/xyk953651094"
                          shape="round" target="_blank" type="text">
                    <template #icon>
                        <icon-github/>
                    </template>
                    主页
                </a-button>
                <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                          href="https://xyk953651094.blogspot.com"
                          shape="round" target="_blank" type="text">
                    <template #icon>
                        <icon-message/>
                    </template>
                    博客
                </a-button>
                <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                          href="https://afdian.net/a/xyk953651094"
                          shape="round" target="_blank" type="text">
                    <template #icon>
                        <icon-gift/>
                    </template>
                    捐赠
                </a-button>
            </a-space>
        </a-layout-footer>
    </a-layout>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {IconDashboard, IconGift, IconGithub, IconMessage} from "@arco-design/web-vue/es/icon";
import {Message} from "@arco-design/web-vue";
import {getFontColor, getReverseColor} from "../javascripts/publicFunctions";
import "../stylesheets/popupComponent.less"
import PopupImageComponent from "../popupComponents/popupImageComponent.vue";
import PopupStatusComponent from "../popupComponents/popupStatusComponent.vue";

const $ = require("jquery");

let imageData = ref({});
let hoverColor = ref("");
let backgroundColor = ref("");
let fontColor = ref("");

onMounted(() => {
    let tempImageData = localStorage.getItem("lastImage");
    if (tempImageData) {
        tempImageData = JSON.parse(tempImageData);

        imageData.value = tempImageData;
        hoverColor.value = tempImageData.color;
        backgroundColor.value = getReverseColor(tempImageData.color);
        fontColor.value = getFontColor(getReverseColor(tempImageData.color));

        $("body").css({"backgroundColor": backgroundColor.value});
    } else {
        Message.error("暂无图片信息");
    }
})

function btnMouseOver() {
    this.style.backgroundColor = hoverColor.value;
    this.style.color = getFontColor(hoverColor.value);
}

function btnMouseOut() {
    this.style.backgroundColor = "transparent";
    this.style.color = fontColor.value;
}

</script>

<style scoped>

</style>