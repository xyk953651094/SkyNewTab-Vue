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
                        <daily-component :theme-color="themeColor"/>
                        <todo-component :theme-color="themeColor"/>
                        <preference-component :theme-color="themeColor"
                                              @dynamicEffect="getDynamicEffect"
                                              @imageQuality="getImageQuality"
                                              @imageTopics="getImageTopics"
                                              @searchEngine="getSearchEngine"
                        />
                    </a-space>
                </a-col>
            </a-row>
        </a-layout-header>
        <a-layout-content id="content" class="center">
            <wallpaper-component :display="componentDisplay" :dynamic-effect="dynamicEffect" :image-data="imageData"
                                 :image-quality="imageQuality"/>
            <a-space align="center" direction="vertical">
                <clock-component :theme-color="themeColor"/>
                <search-component :search-engine="searchEngine"/>
                <a-col :lg="24" :md="24" :sm="0" :xl="24" :xs="0" :xxl="24">
                    <collection-component :theme-color="themeColor"/>
                </a-col>
            </a-space>
        </a-layout-content>
        <a-layout-footer id="footer">
            <a-row justify="center">
                <a-col :lg="20" :md="20" :sm="0" :xl="20" :xs="0" :xxl="20" style="text-align: right">
                    <a-space>
                        <author-component :display="componentDisplay" :image-data="imageData"
                                          :theme-color="themeColor" :search-engine="searchEngine"/>
                    </a-space>
                </a-col>
            </a-row>
        </a-layout-footer>
    </a-layout>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {clientId, device} from "./javascripts/publicConstants";
import {
    changeThemeColor,
    getFontColor,
    getReverseColor,
    httpRequest,
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
import {Message} from "@arco-design/web-vue";

const $ = require("jquery");

let componentDisplay = ref("none");
let imageData = ref({});
let themeColor = ref({
    "themeColor": "",
    "componentBackgroundColor": "",
    "componentFontColor": ""
});

// 配置偏好设置
let searchEngine = ref("bing");
let dynamicEffect = ref("all");
let imageQuality = ref("regular");
let imageTopics = ref("Fzo3zuOHN6w");

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

// 请求完成后处理步骤
function setWallpaper(data) {
    componentDisplay.value = "block";
    imageData.value = data;

    // 修改主题颜色
    if (data.color !== null) {
        let bodyBackgroundColor = data.color;
        let bodyFontColor = getFontColor(bodyBackgroundColor);
        changeThemeColor("body", bodyBackgroundColor, bodyFontColor);

        let componentBackgroundColor = getReverseColor(data.color);
        let componentFontColor = getFontColor(componentBackgroundColor);
        themeColor.value = {
            "themeColor": data.color,
            "componentBackgroundColor": componentBackgroundColor,
            "componentFontColor": componentFontColor,
        };
    }
}

function getWallpaper() {
    let headers = {};
    let url = "https://api.unsplash.com/photos/random?";
    let data = {
        "client_id": clientId,
        "orientation": (device === "iPhone" || device === "Android") ? "portrait" : "landscape",
        "topics": imageTopics.value,
        "content_filter": "high",
    };

    httpRequest(headers, url, data, "GET")
        .then(function (resultData) {

            localStorage.setItem("lastImageRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
            localStorage.setItem("lastImage", JSON.stringify(resultData));               // 保存请求结果，防抖节流
            setWallpaper(resultData);
        })
        .catch(function () {
            // Message.error("获取图片失败");
            // 请求失败也更新请求时间，防止超时后无信息可显示
            localStorage.setItem("lastImageRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
            // 获取图片失败时显示上次图片
            let lastImage = localStorage.getItem("lastImage");
            if (lastImage) {
                lastImage = JSON.parse(lastImage);
                setWallpaper(lastImage);
            } else {
                Message.error("获取图片失败");
            }
        })
        .finally(function () {
        });
}

onMounted(() => {
    // 加载偏好设置
    let tempSearchEngine = localStorage.getItem("searchEngine");
    let tempDynamicEffect = localStorage.getItem("dynamicEffect");
    let tempImageQuality = localStorage.getItem("imageQuality");
    let tempImageTopics = localStorage.getItem("imageTopics");

    searchEngine.value = tempSearchEngine === null ? "bing" : tempSearchEngine;
    dynamicEffect.value = tempDynamicEffect === null ? "all" : tempDynamicEffect;
    imageQuality.value = tempImageQuality === null ? "regular" : tempImageQuality;
    imageTopics.value = tempImageTopics === null ? "Fzo3zuOHN6w" : tempImageTopics;

    // 未加载图片前随机显示颜色主题
    themeColor.value = setColorTheme();

    // 设置背景图片，防抖节流
    let lastRequestTime = localStorage.getItem("lastImageRequestTime");
    let nowTimeStamp = new Date().getTime();
    if (lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
        getWallpaper();
    } else if (nowTimeStamp - parseInt(lastRequestTime) > 60 * 1000) {  // 必须多于一分钟才能进行新的请求
        getWallpaper();
    } else {  // 一分钟之内使用上一次请求结果
        let lastImage = localStorage.getItem("lastImage");
        if (lastImage) {
            lastImage = JSON.parse(lastImage);
            setWallpaper(lastImage);
        } else {
            Message.error("获取图片失败");
        }
    }

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
            $(".arco-modal-header").css("borderBottomColor", themeColor.value.componentFontColor);
            $(".arco-modal-title").css("color", themeColor.value.componentFontColor);
            $(".arco-list-item:not(:last-child)").css("borderBottomColor", themeColor.value.componentFontColor);
            $(".arco-form-item-label").css("color", themeColor.value.componentFontColor);
            $(".arco-list-item-meta-title").css("color", themeColor.value.componentFontColor);
            $(".arco-list-item-meta-description").css("color", themeColor.value.componentFontColor);
            $(".arco-empty-image").css("color", themeColor.value.componentFontColor);
            $(".arco-empty-description").css("color", themeColor.value.componentFontColor);
            $(".arco-modal-footer").css("borderTopColor", themeColor.value.componentFontColor);
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
