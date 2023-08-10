<template>
    <a-layout style="height: 100%">
        <a-layout-header id="header">
            <a-row justify="center">
                <a-col :lg="10" :md="10" :sm="0" :xl="10" :xs="0" :xxl="10" style="text-align: left">
                    <a-space>
                        <greet-component :search-engine="searchEngine" :theme-color="themeColor"/>
                        <weather-component :search-engine="searchEngine" :theme-color="themeColor"/>
                    </a-space>
                </a-col>
                <a-col :lg="10" :md="10" :sm="22" :xl="10" :xs="22" :xxl="10" style="text-align: right">
                    <a-space>
                        <daily-component :theme-color="themeColor" :simple-mode="simpleMode"/>
                        <todo-component :theme-color="themeColor" :simple-mode="simpleMode"/>
                        <preference-component :theme-color="themeColor"
                                              @dynamicEffect="getDynamicEffect"
                                              @imageQuality="getImageQuality"
                                              @imageTopics="getImageTopics"
                                              @searchEngine="getSearchEngine"
                                              @simpleMode="getSimpleMode"
                                              @noImageMode="getNoImageMode"
                        />
                    </a-space>
                </a-col>
            </a-row>
        </a-layout-header>
        <a-layout-content id="content" class="center">
            <wallpaper-component :no-image-mode="noImageMode" @imageData="getImageData" :dynamic-effect="dynamicEffect"
                                 :image-quality="imageQuality" :image-topics="imageTopics"/>
            <a-space align="center" direction="vertical">
                <clock-component :theme-color="themeColor"/>
                <search-component :search-engine="searchEngine"/>
                <a-col :lg="24" :md="24" :sm="0" :xl="24" :xs="0" :xxl="24">
                    <collection-component :theme-color="themeColor" :simple-mode="simpleMode"/>
                </a-col>
            </a-space>
        </a-layout-content>
        <a-layout-footer id="footer">
            <a-row justify="center">
                <a-col :lg="20" :md="20" :sm="0" :xl="20" :xs="0" :xxl="20" style="text-align: right">
                    <a-space>
                        <author-component :display="componentDisplay" :image-data="imageData"
                                          :search-engine="searchEngine" :theme-color="themeColor"/>
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
    getFontColor,
    getReverseColor,
    setColorTheme,
} from "./javascripts/publicFunctions";
import "./stylesheets/publicStyles.less"

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

const $ = require("jquery");

let componentDisplay = ref("none");
let themeColor = ref({
    "themeColor": "",
    "componentBackgroundColor": "",
    "componentFontColor": ""
});

let imageData = ref(null);
let searchEngine = ref("bing");
let dynamicEffect = ref("all");
let imageQuality = ref("regular");
let imageTopics = ref("Fzo3zuOHN6w");
let simpleMode = ref(false);
let noImageMode = ref(false);

const getImageData = (value) => {
    componentDisplay.value = "block";
    imageData.value = value;

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

const getSearchEngine = (value) => {
    searchEngine.value = value;
}

const getDynamicEffect = (value) => {
    dynamicEffect.value = value;
}

const getImageQuality = (value) => {
    imageQuality.value = value;
}

const getImageTopics = (value) => {
    imageTopics.value = value;
}

const getSimpleMode = (value) => {
    simpleMode.value = value;
}

const getNoImageMode = (value) => {
    noImageMode.value = value;
}

onMounted(() => {
    // 加载偏好设置
    let tempSearchEngine = localStorage.getItem("searchEngine");
    let tempDynamicEffect = localStorage.getItem("dynamicEffect");
    let tempImageQuality = localStorage.getItem("imageQuality");
    let tempImageTopics = localStorage.getItem("imageTopics");
    let tempSimpleMode = localStorage.getItem("simpleMode");
    let tempNoImageMode = localStorage.getItem("noImageMode");

    searchEngine.value = tempSearchEngine === null ? "bing" : tempSearchEngine;
    dynamicEffect.value = tempDynamicEffect === null ? "all" : tempDynamicEffect;
    imageQuality.value = tempImageQuality === null ? "regular" : tempImageQuality;
    imageTopics.value = tempImageTopics === null ? "Fzo3zuOHN6w" : tempImageTopics;
    simpleMode.value = tempSimpleMode === null ? false : JSON.parse(tempSimpleMode);
    noImageMode.value = tempNoImageMode === null ? false : JSON.parse(tempNoImageMode);

    // 未加载图片前随机显示颜色主题
    themeColor.value = setColorTheme();

    // 修改各类弹窗样式
    $("body").bind("DOMNodeInserted", () => {
        // popover
        let popoverEle = $(".arco-popover");
        if (popoverEle.length && popoverEle.length > 0) {
            $(".arco-popover-title").css("color", themeColor.value.componentFontColor);
            $(".arco-popover-popup-arrow").css({
                "backgroundColor": themeColor.value.componentBackgroundColor,
                "border": "1px solid " + themeColor.value.componentBackgroundColor
            });
            $(".arco-checkbox-label").css("color", themeColor.value.componentFontColor);
            $(".arco-list-item:not(:last-child)").css("borderBottomColor", themeColor.value.componentFontColor);
            $(".arco-list-item-meta-title").css("color", themeColor.value.componentFontColor);
            $(".arco-list-item-meta-description").css("color", themeColor.value.componentFontColor);
            $(".arco-empty").css("display", "block");
            $(".arco-empty-image").css("color", themeColor.value.componentFontColor);
            $(".arco-empty-description").css("color", themeColor.value.componentFontColor);
        }

        // message
        let messageEle = $(".arco-message");
        if (messageEle.length && messageEle.length > 0) {
            messageEle.css({
                "backgroundColor": themeColor.value.componentBackgroundColor,
                "border-color": themeColor.value.componentBackgroundColor
            });
            $(".arco-message-icon").css("color", themeColor.value.componentFontColor);
            $(".arco-message-content").css("color", themeColor.value.componentFontColor);
        }

        // drawer
        let drawerEle = $(".arco-drawer");
        if (drawerEle.length && drawerEle.length > 0) {
            $(".arco-drawer-header").css("borderBottomColor", themeColor.value.componentFontColor);
            // $(".arco-drawer-close-btn").css("color", themeColor.value.componentFontColor);
            $(".arco-drawer-title").css("color", themeColor.value.componentFontColor);
            $(".arco-card-header-title").css("color", themeColor.value.componentFontColor);
            $(".arco-card-header-extra").css("color", themeColor.value.componentFontColor);
            $(".arco-form-item-label").css("color", themeColor.value.componentFontColor);
            $(".arco-radio-label").css("color", themeColor.value.componentFontColor);
            $(".arco-checkbox-label").css("color", themeColor.value.componentFontColor);
            $(".arco-collapse-item-header").css({
                "backgroundColor": themeColor.value.componentBackgroundColor,
                "color": themeColor.value.componentFontColor
            });
            $(".arco-collapse-item-content").css({
                "backgroundColor": themeColor.value.componentBackgroundColor,
                "color": themeColor.value.componentFontColor
            });
            $(".arco-list-item:not(:last-child)").css("borderBottom", "1px solid" + themeColor.value.componentFontColor);
            $(".arco-list-item-meta-title").css("color", themeColor.value.componentFontColor);
            $(".arco-drawer-footer").css({
                "borderTopColor": themeColor.value.componentFontColor,
                "textAlign": "center"
            });
            // $(".arco-drawer-footer > .arco-btn").css("marginLeft", 0);
            // $(".arco-drawer-mask").css({"backgroundColor": themeColor.value.componentBackgroundColor, "opacity": 0.6});  // TODO: 等待arco design 的 dawer 支持 mask-style属性
            $(".arco-drawer-mask").css({"backdropFilter": "blur(10px)"});

        }

        // modal
        let modalEle = $(".arco-modal");
        if (modalEle.length && modalEle.length > 0) {
            $(".arco-modal").css("backgroundColor", themeColor.value.componentBackgroundColor);
            $(".arco-modal-header").css("borderBottomColor", "transparent");
            $(".arco-modal-title").css("color", themeColor.value.componentFontColor);
            $(".arco-list-item:not(:last-child)").css("borderBottomColor", themeColor.value.componentFontColor);
            $(".arco-form-item-label").css("color", themeColor.value.componentFontColor);
            $(".arco-list-item-meta-title").css("color", themeColor.value.componentFontColor);
            $(".arco-list-item-meta-description").css("color", themeColor.value.componentFontColor);
            $(".arco-empty-image").css("color", themeColor.value.componentFontColor);
            $(".arco-empty-description").css("color", themeColor.value.componentFontColor);
            $(".arco-modal-footer").css("borderTopColor", "transparent");
            $(".arco-modal-footer > .arco-btn").css("color", themeColor.value.componentFontColor);
            $(".arco-modal-footer > .arco-btn").addClass("arco-btn-shape-round arco-btn-text").removeClass("arco-btn-shape-square");
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
