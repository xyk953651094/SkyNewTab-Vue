<template>
    <a-layout class="popupLayout">
        <a-layout-header class="popupHeader">
            <popup-header-component
                :font-color="fontColor"
                :hover-color="hoverColor"
                :preference-data="preferenceData"
            />
        </a-layout-header>
        <a-layout-content class="popupContent">
            <a-list :bordered=false>
                <a-list-item :style="{borderBottomColor: fontColor}" class="alignCenter">
                    <popup-status-component
                        :font-color="fontColor"
                        :hover-color="hoverColor"
                        :image-data="imageData"
                        :preference-data="preferenceData"
                    />
                </a-list-item>
                <a-list-item class="alignCenter">
                    <popup-image-component
                        :font-color="fontColor"
                        :hover-color="hoverColor"
                        :image-data="imageData"
                        :preference-data="preferenceData"
                    />
                </a-list-item>
            </a-list>
        </a-layout-content>
        <a-layout-footer class="popupFooter">
            <popup-footer-component
                :font-color="fontColor"
                :hover-color="hoverColor"
                :preference-data="preferenceData"
            />
        </a-layout-footer>
    </a-layout>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {Message} from "@arco-design/web-vue";
import {getFontColor, getPreferenceDataStorage, getReverseColor, setThemeColor} from "@/javascripts/publicFunctions";
import "@/stylesheets/popupComponent.less"
import PopupImageComponent from "../popupComponents/popupImageComponent.vue";
import PopupStatusComponent from "../popupComponents/popupStatusComponent.vue";
import PopupFooterComponent from "../popupComponents/popupFooterComponent.vue";
import PopupHeaderComponent from "../popupComponents/popupHeaderComponent.vue";

const $ = require("jquery");

let imageData = ref({});
let hoverColor = ref("");
let backgroundColor = ref("");
let fontColor = ref("");
let preferenceData = ref(getPreferenceDataStorage());

onMounted(() => {
    if (preferenceData.value.noImageMode) {
        const tempThemeColor = setThemeColor();
        hoverColor.value = tempThemeColor.componentBackgroundColor;
        backgroundColor.value = tempThemeColor.themeColor;
        fontColor.value = getFontColor(tempThemeColor.themeColor);
    } else {
        let tempImageData = localStorage.getItem("lastImage");
        if (tempImageData) {
            tempImageData = JSON.parse(tempImageData);
            imageData.value = tempImageData;
            hoverColor.value = getReverseColor(tempImageData.color);
            backgroundColor.value = tempImageData.color;
            fontColor.value = getFontColor(tempImageData.color);
        } else {
            Message.error("暂无图片信息");
        }
    }
    const bodyEle = $("body");
    bodyEle.css({"backgroundColor": backgroundColor.value});

    // 修改各类弹窗样式
    bodyEle.bind("DOMNodeInserted", () => {
        $(".arco-list-item").css("padding", "10px 0");

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
</script>

<style scoped>

</style>