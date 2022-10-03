<template>
    <a-layout style="height: 100%">
        <a-layout-header id="header">
            <a-row justify="space-around">
                <a-col :xs="22" :sm="22" :md="10" :lg="10" :xl="10" :xxl="10" style="text-align: left">
                    <a-space>
                        <button-greet :theme-color="themeColor"/>
                        <button-weather :theme-color="themeColor"/>
                    </a-space>
                </a-col>
                <a-col :xs="0" :sm="0" :md="10" :lg="10" :xl="10" :xxl="10" style="text-align: right">
                    <a-space>
                        <button-download :theme-color="themeColor" :display="componentDisplay" :image-data="imageData"/>
                        <button-html-link :theme-color="themeColor" :display="componentDisplay" :image-data="imageData"/>
                        <button-preference :theme-color="themeColor" :display="componentDisplay"
                                           @displayEffect="getDisplayEffect"
                                           @dynamicEffect="getDynamicEffect"
                                           @imageTopics="getImageTopics"
                        />
                    </a-space>
                </a-col>
            </a-row>
        </a-layout-header>
        <a-layout-content class="center">
            <input-search/>
            <image-wallpaper :display="componentDisplay" :image-data="imageData" :display-effect="displayEffect" :dynamic-effect="dynamicEffect"/>
        </a-layout-content>
        <a-layout-footer id="footer">
            <a-row justify="space-around">
                <a-col :xs="22" :sm="22" :md="0" :lg="0" :xl="0" :xxl="0" style="text-align: left">
                    <a-space>
                        <button-preference :theme-color="themeColor" :display="mobileComponentDisplay"
                                           @displayEffect="getDisplayEffect"
                                           @dynamicEffect="getDynamicEffect"
                                           @imageTopics="getImageTopics"
                        />
                        <button-download :theme-color="themeColor" :display="mobileComponentDisplay" :image-data="imageData"/>
                        <button-html-link :theme-color="themeColor" :display="mobileComponentDisplay" :image-data="imageData"/>
                    </a-space>
                </a-col>
                <a-col :xs="0" :sm="0" :md="22" :lg="22" :xl="22" :xxl="22" style="text-align: right">
                    <a-space>
                        <ButtonAuthor :theme-color="themeColor" :display="componentDisplay" :image-data="imageData"/>
                        <ButtonCreateTime :theme-color="themeColor" :display="componentDisplay" :image-data="imageData"/>
                    </a-space>
                </a-col>
            </a-row>
        </a-layout-footer>
    </a-layout>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {clientId} from "@/javascripts/publicContents";
import {changeThemeColor, getThemeColor, setColorTheme, getDevice} from "@/javascripts/publicFunctions";
import {Message} from "@arco-design/web-vue";

import ButtonGreet from "@/components/ButtonGreet";
import ButtonHtmlLink from "@/components/ButtonHtmlLink";
import ButtonDownload from "@/components/ButtonDownload";
import InputSearch from "@/components/InputSearch";
import ImageWallpaper from "@/components/ImageWallpaper"
import ButtonAuthor from "@/components/ButtonAuthor";
import ButtonCreateTime from "@/components/ButtonCreateTime";
import ButtonWeather from "@/components/ButtonWeather";
import ButtonPreference from "@/components/ButtonPreference";
const $ = require("jquery");

let componentDisplay = ref("none");
let mobileComponentDisplay = ref("none");
let imageData = ref("");
let themeColor = ref("");

let displayEffect = ref("regular");
let dynamicEffect = ref("all");
let imageTopics = ref("Fzo3zuOHN6w");

const getDisplayEffect = (value) => {
    displayEffect.value = value;
};

const getDynamicEffect = (value) => {
    dynamicEffect.value = value;
}

const getImageTopics = (value) => {
    imageTopics.value = value;
}

onMounted(()=>{
    // 加载偏好设置
    let tempDisplayEffect = localStorage.getItem("displayEffect");
    let tempDynamicEffect = localStorage.getItem("dynamicEffect");
    let tempImageTopics = localStorage.getItem("imageTopics");
    displayEffect.value = tempDisplayEffect === null ? "regular" : tempDisplayEffect;
    dynamicEffect.value = tempDynamicEffect === null ? "all" : tempDynamicEffect;
    imageTopics.value = tempImageTopics === null ? "Fzo3zuOHN6w" : tempImageTopics;

    let device = getDevice();
    themeColor.value = setColorTheme();  // 未加载图片前随机显示颜色主题

    // 获取背景图片
    $.ajax({
        url: "https://api.unsplash.com/photos/random?",
        headers: {
            "Authorization": "Client-ID " + clientId,
        },
        type: "GET",
        data: {
            "client_id": clientId,
            "orientation": (device === "iPhone" || device === "Android")? "portrait" : "landscape",
            "topics": imageTopics.value,
            "content_filter": "high",
        },
        timeout: 5000,
        success: (resultData) => {
            componentDisplay.value = "block";
            mobileComponentDisplay.value ="none";
            imageData.value = resultData;
            themeColor.value = getThemeColor(resultData.color);

            // 小屏显示底部按钮
            if(device === "iPhone" || device === "Android") {
                componentDisplay.value = "none";
                mobileComponentDisplay.value ="block";
            }

            //设置body颜色
            changeThemeColor("body", resultData.color);
        },
        error: () => {
            Message.error("获取图片失败");
        }
    });
});
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

html, body {
    height: 100%;
    background-color: #FFFFFF;
    overflow: hidden;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
}

#header {
    padding-top: 30px;
}

#footer {
    padding-bottom: 30px;
}

</style>
