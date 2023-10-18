<template>
    <a-layout style="height: 100%">
        <a-layout-header id="header">
            <a-row justify="center">
                <a-col :lg="10" :md="0" :sm="0" :xl="10" :xs="0" :xxl="10" style="text-align: left">
                    <a-space>
                        <greet-component
                            :preference-data="preferenceData"
                            :theme-color="themeColor"
                        />
                        <weather-component
                            :preference-data="preferenceData"
                            :theme-color="themeColor"
                        />
                    </a-space>
                </a-col>
                <a-col :lg="10" :md="0" :sm="0" :xl="10" :xs="0" :xxl="10" style="text-align: right">
                    <a-space>
                        <daily-component
                            :preference-data="preferenceData"
                            :theme-color="themeColor"
                        />
                        <todo-component
                            :preference-data="preferenceData"
                            :theme-color="themeColor"
                        />
                        <preference-component
                            :preference-data="preferenceData"
                            :theme-color="themeColor"
                            @preference-data="getPreferenceData"
                        />
                    </a-space>
                </a-col>
                <a-col :lg="0" :md="22" :sm="22" :xl="0" :xs="22" :xxl="0" style="text-align: right">
                    <a-space>
                        <author-lite-component
                            :display="componentDisplay"
                            :image-data="imageData"
                            :preference-data="preferenceData"
                            :theme-color="themeColor"
                        />
                        <preference-component
                            :theme-color="themeColor"
                            :preference-data="preferenceData"
                            @preference-data="getPreferenceData"
                        />
                    </a-space>
                </a-col>
            </a-row>
        </a-layout-header>
        <a-layout-content id="content" class="alignCenter">
            <wallpaper-component @imageData="getImageData"/>
            <a-space align="center" direction="vertical">
                <clock-component :preference-data="preferenceData" :theme-color="themeColor"/>
                <search-component :preference-data="preferenceData" :theme-color="themeColor"/>
                <a-col :lg="24" :md="0" :sm="0" :xl="24" :xs="0" :xxl="24">
                    <collection-component :preference-data="preferenceData" :theme-color="themeColor"/>
                </a-col>
            </a-space>
        </a-layout-content>
        <a-layout-footer id="footer">
            <a-row justify="center">
                <a-col :lg="20" :md="0" :sm="0" :xl="20" :xs="0" :xxl="20" style="text-align: right">
                    <a-space>
                        <author-component :display="componentDisplay" :image-data="imageData"
                                          :preference-data="preferenceData" :theme-color="themeColor"/>
                        <image-history-component :display="componentDisplay"
                                          :preference-data="preferenceData" :theme-color="themeColor"/>
                    </a-space>
                </a-col>
            </a-row>
        </a-layout-footer>
    </a-layout>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {
    changeThemeColor,
    getFontColor, getPreferenceDataStorage,
    getReverseColor,
    setColorTheme,
} from "./javascripts/publicFunctions";
import "./stylesheets/publicStyles.less"
import { Notification } from '@arco-design/web-vue';

import GreetComponent from "./components/greetComponent.vue";
import SearchComponent from "./components/searchComponent.vue";
import WallpaperComponent from "./components/wallpaperComponent.vue"
import AuthorComponent from "./components/authorComponent.vue";
import WeatherComponent from "./components/weatherComponent.vue";
import PreferenceComponent from "./components/preferenceComponent.vue";
import CollectionComponent from "./components/collectionComponent.vue";
import TodoComponent from "./components/todoComponent.vue";
import ClockComponent from "./components/clockComponent.vue";
import DailyComponent from "./components/dailyComponent.vue";
import AuthorLiteComponent from "./components/authorLiteComponent.vue";
import ImageHistoryComponent from "@/components/imageHistoryComponent.vue";

const $ = require("jquery");

let themeColor = ref({
    "themeColor": "",
    "componentBackgroundColor": "",
    "componentFontColor": ""
});

let imageData = ref(null);
let preferenceData = ref(getPreferenceDataStorage());
let componentDisplay = ref("none");  // 图片接口请求成功后再显示相关组件

const getImageData = (value) => {
    imageData.value = value;
    componentDisplay.value = "block";

    // 修改主题颜色
    if (value.color !== null) {
        let bodyBackgroundColor = value.color;
        let bodyFontColor = getFontColor(bodyBackgroundColor);
        changeThemeColor("body", bodyBackgroundColor, bodyFontColor);

        let componentBackgroundColor = getReverseColor(value.color);
        let componentFontColor = getFontColor(componentBackgroundColor);
        themeColor.value = {
            "themeColor": value.color,
            "componentBackgroundColor": componentBackgroundColor,
            "componentFontColor": componentFontColor,
        };
    }
}

const getPreferenceData = (value) => {
    preferenceData.value = value;
}

onMounted(() => {
    // 未加载图片前随机显示颜色主题
    if (themeColor.value.themeColor === "") {
        themeColor.value = setColorTheme();
    }

    // 版本号提醒
    let storageVersion = localStorage.getItem("SkyNewTabVueVersion");
    let currentVersion = require('../package.json').version;
    if(storageVersion !== currentVersion) {
        Notification.info({
            title: "已更新至 " + currentVersion,
            content: "详情请前往 GitHub 或 GitLab 查看",
            position: "bottomLeft",
            duration: 5000
        });
        localStorage.setItem("SkyNewTabVueVersion", currentVersion);
    }

    // 修改各类弹窗样式
    $("body").bind("DOMNodeInserted", () => {
        // 通用
        $(".arco-list-item").css("padding", "10px 0");
        $(".arco-list-item:not(:last-child)").css("borderBottomColor", themeColor.value.componentFontColor);
        $(".arco-list-item-meta-title").css("color", themeColor.value.componentFontColor);
        $(".arco-list-item-meta-description").css("color", themeColor.value.componentFontColor);
        $(".arco-empty-image").css("color", themeColor.value.componentFontColor);
        $(".arco-empty-description").css("color", themeColor.value.componentFontColor);
        $(".arco-alert").css("padding", "10px");
        $("div.arco-typography").css("margin-bottom", "0");

        // popover
        let popoverEle = $(".arco-popover");
        if (popoverEle.length && popoverEle.length > 0) {
            $(".arco-popover-title").css("color", themeColor.value.componentFontColor);
            $(".arco-popover-popup-arrow").css({
                "backgroundColor": themeColor.value.componentBackgroundColor,
                "border": "1px solid " + themeColor.value.componentBackgroundColor
            });
        }

        // message
        let messageEle = $(".arco-message");
        if (messageEle.length && messageEle.length > 0) {
            messageEle.css({
                "backgroundColor": themeColor.value.componentBackgroundColor,
                "borderColor": themeColor.value.componentBackgroundColor
            });
            $(".arco-message-icon").css("color", themeColor.value.componentFontColor);
            $(".arco-message-content").css("color", themeColor.value.componentFontColor);
        }

        // notification
        let notificationEle = $(".arco-notification");
        if (notificationEle.length && notificationEle.length > 0) {
            notificationEle.css({
                "backgroundColor": themeColor.value.componentBackgroundColor,
                "borderColor": themeColor.value.componentBackgroundColor
            });
            $(".arco-notification-icon").css("color", themeColor.value.componentFontColor);
            $(".arco-notification-title").css("color", themeColor.value.componentFontColor);
            $(".arco-notification-content").css("color", themeColor.value.componentFontColor);
        }

        // drawer
        let drawerEle = $(".arco-drawer");
        if (drawerEle.length && drawerEle.length > 0) {
            $(".arco-drawer-header").css("borderBottomColor", themeColor.value.componentFontColor);
            $(".arco-drawer-title").css("color", themeColor.value.componentFontColor);
            $(".arco-card-header-title").css("color", themeColor.value.componentFontColor);
            $(".arco-card-header-extra").css("color", themeColor.value.componentFontColor);
            $(".arco-form-item-label").css("color", themeColor.value.componentFontColor);
            $(".arco-radio-label").css("color", themeColor.value.componentFontColor);
            // $(".arco-radio-icon").css({
            //     "borderColor": themeColor.value.themeColor,
            //     "backgroundColor": themeColor.value.themeColor,
            // });
            $(".arco-checkbox-label").css("color", themeColor.value.componentFontColor);
            // $(".arco-checkbox-icon").css({
            //     "borderColor": "transparent",
            //     "backgroundColor": themeColor.value.themeColor,
            // });
            $(".arco-collapse-item-header").css({
                "backgroundColor": themeColor.value.componentBackgroundColor,
                "color": themeColor.value.componentFontColor
            });
            $(".arco-collapse-item-content").css({
                "backgroundColor": themeColor.value.componentBackgroundColor,
                "color": themeColor.value.componentFontColor
            });
            $(".arco-drawer-footer").css({
                "borderTopColor": themeColor.value.componentFontColor,
                "textAlign": "center"
            });
            $(".arco-drawer-mask").css({"backdropFilter": "blur(10px)"});
        }

        // modal
        let modalEle = $(".arco-modal");
        if (modalEle.length && modalEle.length > 0) {
            $(".arco-modal").css("backgroundColor", themeColor.value.componentBackgroundColor);
            $(".arco-modal-header").css("borderBottomColor", "transparent");
            $(".arco-modal-title").css("color", themeColor.value.componentFontColor);
            $(".arco-form-item-label").css("color", themeColor.value.componentFontColor);
            $(".arco-modal-footer").css("borderTopColor", "transparent");
            $(".arco-modal-footer > .arco-btn").css("color", themeColor.value.componentFontColor);
            if(preferenceData.value.buttonShape === "round") {
                $(".arco-modal-footer > .arco-btn").addClass("arco-btn-shape-round arco-btn-text").removeClass("arco-btn-shape-square");
            }
            else {
                $(".arco-modal-footer > .arco-btn").addClass("arco-btn-shape-square arco-btn-text").removeClass("arco-btn-shape-round");
            }
            $(".arco-modal-footer > .arco-btn").on("mouseover", (e) => {
                e.currentTarget.style.backgroundColor = themeColor.value.themeColor;
                e.currentTarget.style.color = getFontColor(themeColor.value.themeColor);
            });
            $(".arco-modal-footer > .arco-btn").on("mouseout", (e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = themeColor.value.componentFontColor;
            });
        }
    });
});
</script>

<style>

</style>
