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
            <a-list :bordered=false>
                <a-list-item :style="{borderBottomColor: fontColor}">
                    <popup-status-component :font-color="fontColor" :image-data="imageData"/>
                </a-list-item>
                <a-list-item>
                    <popup-image-component :font-color="fontColor" :image-data="imageData"
                                           :preference-data="preferenceData"/>
                </a-list-item>
            </a-list>
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
                    支持
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
import {defaultPreferenceData} from "@/javascripts/publicConstants";

const $ = require("jquery");

let imageData = ref({});
let hoverColor = ref("");
let backgroundColor = ref("");
let fontColor = ref("");
let preferenceData = ref(defaultPreferenceData);

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

    let tempPreferenceData = localStorage.getItem("preferenceData");
    preferenceData.value = tempPreferenceData === null ? defaultPreferenceData : tempPreferenceData;

    // 修改各类弹窗样式
    $("body").bind("DOMNodeInserted", () => {
        // message
        let messageEle = $(".arco-message");
        if (messageEle.length && messageEle.length > 0) {
            messageEle.css({
                "backgroundColor": hoverColor.value,
                "border-color": hoverColor.value
            });
            $(".arco-message-icon").css("color", getFontColor(hoverColor.value));
            $(".arco-message-content").css("color", getFontColor(hoverColor.value));
        }
    })
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