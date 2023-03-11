<template>
    <a-layout style="height: 100%">
        <a-layout-header id="header">
            <a-row justify="space-around">
                <a-col :xs="22" :sm="22" :md="10" :lg="10" :xl="10" :xxl="10" style="text-align: left">
                    <a-space>
                        <greet-component :theme-color="themeColor"/>
                        <weather-component :theme-color="themeColor" :display="componentDisplay"/>
                    </a-space>
                </a-col>
                <a-col :xs="0" :sm="0" :md="10" :lg="10" :xl="10" :xxl="10" style="text-align: right">
                    <a-space>
                        <download-component :theme-color="themeColor" :display="componentDisplay" :image-data="imageData"/>
                        <html-link-component :theme-color="themeColor" :display="componentDisplay" :image-data="imageData"/>
                        <preference-component :theme-color="themeColor"
                                           @displayEffect="getDisplayEffect"
                                           @dynamicEffect="getDynamicEffect"
                                           @imageTopics="getImageTopics"
                                           @searchEngine="getSearchEngine"
                        />
                    </a-space>
                </a-col>
            </a-row>
        </a-layout-header>
        <a-layout-content class="center">
            <search-component :search-engine="searchEngine"/>
            <wallpaper-component :display="imageDisplay" :image-data="imageData" :display-effect="displayEffect" :dynamic-effect="dynamicEffect"/>
        </a-layout-content>
        <a-layout-footer id="footer">
            <a-row justify="space-around">
                <a-col :xs="22" :sm="22" :md="0" :lg="0" :xl="0" :xxl="0" style="text-align: left">
                    <a-space>
                        <preference-component :theme-color="themeColor"
                                           @displayEffect="getDisplayEffect"
                                           @dynamicEffect="getDynamicEffect"
                                           @imageTopics="getImageTopics"
                                           @searchEngine="getSearchEngine"
                        />
                        <download-component :theme-color="themeColor" :display="mobileComponentDisplay" :image-data="imageData"/>
                        <html-link-component :theme-color="themeColor" :display="mobileComponentDisplay" :image-data="imageData"/>
                    </a-space>
                </a-col>
                <a-col :xs="0" :sm="0" :md="22" :lg="22" :xl="22" :xxl="22" style="text-align: right">
                    <a-space>
                        <author-component :theme-color="themeColor" :display="componentDisplay" :image-data="imageData"/>
                        <create-time-component :theme-color="themeColor" :display="componentDisplay" :image-data="imageData"/>
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
import DownloadComponent from "./components/downloadComponent.vue";
import SearchComponent from "./components/searchComponent.vue";
import WallpaperComponent from "./components/wallpaperComponent.vue"
import AuthorComponent from "./components/authorComponent.vue";
import CreateTimeComponent from "./components/createTimeComponent.vue";
import WeatherComponent from "./components/weatherComponent.vue";
import PreferenceComponent from "./components/preferenceComponent.vue";

let componentDisplay = ref("none");
let mobileComponentDisplay = ref("none");
let imageDisplay = ref("none");
let imageData = ref("");
let themeColor = ref( {
    "componentBackgroundColor": "",
    "componentFontColor": ""
});

// 配置偏好设置
let displayEffect = ref("regular");
let dynamicEffect = ref("all");
let imageTopics = ref("Fzo3zuOHN6w");
let searchEngine = ref("bing");

const getDisplayEffect = (value) => {
    displayEffect.value = value;
};

const getDynamicEffect = (value) => {
    dynamicEffect.value = value;
}

const getImageTopics = (value) => {
    imageTopics.value = value;
}

const getSearchEngine = (value) => {
    searchEngine.value = value;
}

// 请求完成后处理步骤
function setWallpaper(data) {
    imageDisplay.value = "block";
    componentDisplay.value = "block";
    mobileComponentDisplay.value ="none";
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

function getWallpaper() {
    let url = "https://api.unsplash.com/photos/random?";
    let data = {
        "client_id": clientId,
        "orientation": (device === "iPhone" || device === "Android")? "portrait" : "landscape",
        "topics": imageTopics.value,
        "content_filter": "high",
    }
    httpRequest(url, data, "GET")
        .then(function(resultData){
            localStorage.setItem("lastImageRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
            localStorage.setItem("lastImage", JSON.stringify(resultData));               // 保存请求结果，防抖节流
            setWallpaper(resultData);
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
        .finally(function () {
            // 小屏显示底部按钮
            if(device === "iPhone" || device === "Android") {
                componentDisplay.value = "none";
                mobileComponentDisplay.value ="block";
            }
        });
}

onMounted(()=>{
    // 加载偏好设置
    let tempDisplayEffect = localStorage.getItem("displayEffect");
    let tempDynamicEffect = localStorage.getItem("dynamicEffect");
    let tempImageTopics = localStorage.getItem("imageTopics");
    let tempSearchEngine = localStorage.getItem("searchEngine");
    displayEffect.value = tempDisplayEffect === null ? "regular" : tempDisplayEffect;
    dynamicEffect.value = tempDynamicEffect === null ? "all" : tempDynamicEffect;
    imageTopics.value = tempImageTopics === null ? "Fzo3zuOHN6w" : tempImageTopics;
    searchEngine.value = tempSearchEngine === null ? "bing" : tempSearchEngine;

    // 未加载图片前随机显示颜色主题
    themeColor.value = setColorTheme();

    // 设置背景图片，防抖节流
    let lastRequestTime = localStorage.getItem("lastImageRequestTime");
    let nowTimeStamp = new Date().getTime();
    if(lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
        getWallpaper();
    }
    else if(nowTimeStamp - parseInt(lastRequestTime) > 60 * 1000) {  // 必须多于一分钟才能进行新的请求
        getWallpaper();
    }
    else {  // 一分钟之内使用上一次请求结果
        let lastImage = localStorage.getItem("lastImage");
        if (lastImage) {
            lastImage = JSON.parse(lastImage);
            setWallpaper(lastImage);
        }
    }
});
</script>

<style>

</style>
