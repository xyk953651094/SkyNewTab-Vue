<template>
    <a-layout style="height: 100%">
        <a-layout-header id="header">
            <a-row justify="space-around">
                <a-col :xs="0" :sm="0" :md="10" :lg="10" :xl="10" :xxl="10" style="text-align: left">
                    <a-space>
                        <greet-component :theme-color="themeColor"/>
                        <weather-component :theme-color="themeColor" :display="componentDisplay"/>
                    </a-space>
                </a-col>
                <a-col :xs="22" :sm="22" :md="10" :lg="10" :xl="10" :xxl="10" style="text-align: right">
                    <a-space>
                        <daily-component :theme-color="themeColor"/>
                        <todo-component :theme-color="themeColor"/>
                        <html-link-component :theme-color="themeColor" :display="componentDisplay" :image-data="imageData"/>
                        <preference-component :theme-color="themeColor"
                                              @searchEngine="getSearchEngine"
                                              @dynamicEffect="getDynamicEffect"
                                              @imageSource="getImageSource"
                        />
                    </a-space>
                </a-col>
            </a-row>
        </a-layout-header>
        <a-layout-content class="center">
            <wallpaper-component :display="imageDisplay" :image-data="imageData" :dynamic-effect="dynamicEffect"/>
            <a-space direction="vertical" align="center">
                <clock-component :theme-color="themeColor" />
                <search-component :search-engine="searchEngine"/>
                <collection-component :theme-color="themeColor"/>
            </a-space>
        </a-layout-content>
        <a-layout-footer id="footer">
            <a-row justify="space-around">
                <a-col :xs="0" :sm="0" :md="22" :lg="22" :xl="22" :xxl="22" style="text-align: right">
                    <a-space>
                        <author-component :theme-color="themeColor" :display="componentDisplay" :image-data="imageData" :image-source="imageSource"/>
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
    getComponentBackgroundColor,
    setColorTheme,
    getFontColor,
    httpRequest,
} from "./javascripts/publicFunctions";
import "./stylesheets/publicStyles.less"

import GreetComponent from "./components/greetComponent.vue";
import HtmlLinkComponent from "./components/htmlLinkComponent.vue";
import SearchComponent from "./components/searchComponent.vue";
import WallpaperComponent from "./components/wallpaperComponent.vue"
import AuthorComponent from "./components/authorComponent.vue";
import WeatherComponent from "./components/weatherComponent.vue";
import PreferenceComponent from "./components/preferenceComponent.vue";
import CollectionComponent from "@/components/collectionComponent.vue";
import TodoComponent from "@/components/todoComponent.vue";
import ClockComponent from "@/components/clockComponent.vue";
import DailyComponent from "@/components/dailyComponent.vue";

const $ = require("jquery");

let componentDisplay = ref("none");
let imageDisplay = ref("none");
let imageData = ref("");
let themeColor = ref( {
    "componentBackgroundColor": "",
    "componentFontColor": ""
});

// 配置偏好设置
let searchEngine = ref("bing");
let dynamicEffect = ref("all");
let imageSource = ref("Unsplash");

const getSearchEngine = (value) => {
    searchEngine.value = value;
}

const getDynamicEffect = (value) => {
    dynamicEffect.value = value;
}

const getImageSource = (value) => {
    imageSource.value = value;
}

// 请求完成后处理步骤
function setWallpaper(data) {
    imageDisplay.value = "block";
    componentDisplay.value = "block";
    imageData.value = data;

    // 修改主题颜色
    if (data.color !== null) {
        let componentBackgroundColor = getComponentBackgroundColor(data.color);
        let componentFontColor = getFontColor(componentBackgroundColor);
        themeColor.value = {
            "componentBackgroundColor": componentBackgroundColor,
            "componentFontColor": componentFontColor,
        };

        let bodyBackgroundColor = data.color;
        let bodyFontColor = getFontColor(bodyBackgroundColor);
        changeThemeColor("body", bodyBackgroundColor, bodyFontColor);
    }
}

function getWallpaper(imageSource) {
    let headers = {};
    let url = "";
    let data = {};

    switch (imageSource) {
        case "Unsplash":
            url = "https://api.unsplash.com/photos/random?";
            data = {
                "client_id": clientId,
                "orientation": (device === "iPhone" || device === "Android") ? "portrait" : "landscape",
                "content_filter": "high",
            };
            break;
        case "Pexels":
            headers = { "authorization": "sbJpn7uRC2FAknG1nefeRAYquBuMxyP68BaJ2joKCr6MtxAjqwBvth6h"};
            url = "https://api.pexels.com/v1/curated";
            data = {
                "per_page": 1,
            };
            break;
    }

    httpRequest(headers, url, data, "GET")
        .then(function(resultData){
            let imageData = {};
            switch (imageSource) {
                case "Unsplash":
                    imageData = {
                        displayUrl: resultData.urls.regular,
                        previewUrl: resultData.urls.small,
                        imageLink: resultData.links.html,
                        userName: resultData.user.name,
                        userLink: resultData.user.links.html,
                        color: resultData.color,
                    };
                    break;
                case "Pexels":
                    imageData = {
                        displayUrl: resultData.photos[0].src.landscape,
                        previewUrl: resultData.photos[0].src.tiny,
                        imageLink: resultData.photos[0].url,
                        userName: resultData.photos[0].photographer,
                        userLink: resultData.photos[0].photographer_url,
                        color: resultData.photos[0].avg_color,
                    };
                    break;
            }

            localStorage.setItem("lastImageRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
            localStorage.setItem("lastImage", JSON.stringify(imageData));               // 保存请求结果，防抖节流
            setWallpaper(imageData);
        })
        .catch(function(){
            // Message.error("获取图片失败");
            // 请求失败也更新请求时间，防止超时后无信息可显示
            localStorage.setItem("lastImageRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
            // 获取图片失败时显示上次图片
            let lastImage = localStorage.getItem("lastImage");
            if (lastImage) {
                lastImage = JSON.parse(lastImage);
                setWallpaper(lastImage);
            }
        })
        .finally(function () {});
}

onMounted(()=>{
    // 加载偏好设置
    let tempSearchEngine = localStorage.getItem("searchEngine");
    let tempDynamicEffect = localStorage.getItem("dynamicEffect");
    let tempImageSource = localStorage.getItem("imageSource");

    searchEngine.value = tempSearchEngine === null ? "bing" : tempSearchEngine;
    dynamicEffect.value = tempDynamicEffect === null ? "all" : tempDynamicEffect;
    imageSource.value = tempImageSource === null ? "Unsplash" : tempImageSource;

    // 未加载图片前随机显示颜色主题
    themeColor.value = setColorTheme();

    // 设置背景图片，防抖节流
    let lastRequestTime = localStorage.getItem("lastImageRequestTime");
    let nowTimeStamp = new Date().getTime();
    if(lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
        getWallpaper(imageSource.value);
    }
    else if(nowTimeStamp - parseInt(lastRequestTime) > 60 * 1000) {  // 必须多于一分钟才能进行新的请求
        getWallpaper(imageSource.value);
    }
    else {  // 一分钟之内使用上一次请求结果
        let lastImage = localStorage.getItem("lastImage");
        if (lastImage) {
            lastImage = JSON.parse(lastImage);
            setWallpaper(lastImage);
        }
    }

    // 修改各类弹窗样式
    $("body").bind("DOMNodeInserted", () => {
        // popover
        let popoverEle = $(".arco-popover");
        if (popoverEle.length && popoverEle.length > 0) {
            $(".arco-popover-title").css("color", themeColor.value.componentFontColor);
            $(".arco-popover-popup-arrow").css({"backgroundColor": themeColor.value.componentBackgroundColor, border: "1px solid " + themeColor.value.componentBackgroundColor});
            $(".arco-checkbox-label").css("color", themeColor.value.componentFontColor);
            $(".arco-list-item:not(:last-child)").css("borderBottom", "1px solid" + themeColor.value.componentFontColor);
            $(".arco-list-item-meta-title").css("color", themeColor.value.componentFontColor);
            $(".arco-list-item-meta-description").css("color", themeColor.value.componentFontColor);
            $(".arco-empty-image").css("color", themeColor.value.componentFontColor);
            $(".arco-empty-description").css("color", themeColor.value.componentFontColor);
        }

        // message
        let messageEle = $(".arco-message");
        if(messageEle.length && messageEle.length > 0) {
            messageEle.css({"backgroundColor": themeColor.value.componentBackgroundColor, "border-color": themeColor.value.componentBackgroundColor});
            $(".arco-message-icon").css("color", themeColor.value.componentFontColor);
            $(".arco-message-content").css("color", themeColor.value.componentFontColor);
        }

        // drawer
        let drawerEle = $(".arco-drawer");
        if (drawerEle.length && drawerEle.length > 0) {
            $(".arco-drawer-header").css("borderBottomColor", themeColor.value.componentFontColor);
            $(".arco-drawer-close-btn").css("color", themeColor.value.componentFontColor);
            $(".arco-drawer-title").css("color", themeColor.value.componentFontColor);
            $(".arco-card-header-title").css("color", themeColor.value.componentFontColor);
            $(".arco-card-header-extra").css("color", themeColor.value.componentFontColor);
            $(".arco-form-item-label").css("color", themeColor.value.componentFontColor);
            $(".arco-radio-label").css("color", themeColor.value.componentFontColor);
            $(".arco-checkbox-label").css("color", themeColor.value.componentFontColor);
            $(".arco-collapse-item-header").css({"backgroundColor": themeColor.value.componentBackgroundColor, "color": themeColor.value.componentFontColor});
            $(".arco-collapse-item-content").css({"backgroundColor": themeColor.value.componentBackgroundColor, "color": themeColor.value.componentFontColor});
            $(".arco-list-item-meta-title").css("color", themeColor.value.componentFontColor);
            $(".arco-drawer-footer").css({"borderBottomColor": themeColor.value.componentFontColor, "textAlign": "center"});
            $(".arco-drawer-footer > .arco-btn").css("marginLeft", 0);
            $(".arco-drawer-mask").css({"backgroundColor": themeColor.value.componentBackgroundColor, opacity: 0.6});
        }

        // modal
        let modalEle = $(".arco-modal");
        if (modalEle.length && modalEle.length > 0) {
            $(".arco-modal").css("backgroundColor", themeColor.value.componentBackgroundColor);
            $(".arco-modal-title").css("color", themeColor.value.componentFontColor);
            $(".arco-modal-close-btn").css("color", themeColor.value.componentFontColor);
            $(".arco-form-item-label").css("color", themeColor.value.componentFontColor);
            $(".arco-list-item-meta-title").css("color", themeColor.value.componentFontColor);
            $(".arco-list-item-meta-description").css("color", themeColor.value.componentFontColor);
            $(".arco-empty-image").css("color", themeColor.value.componentFontColor);
            $(".arco-empty-description").css("color", themeColor.value.componentFontColor);
        }
    });
});
</script>

<style>

</style>
