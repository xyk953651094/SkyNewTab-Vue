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
                        <button-preference :theme-color="themeColor" :display="componentDisplay"/>
                    </a-space>
                </a-col>
            </a-row>
        </a-layout-header>
        <a-layout-content class="center">
            <input-search/>
            <image-wallpaper :display="componentDisplay" :image-data="imageData"/>
        </a-layout-content>
        <a-layout-footer id="footer">
            <a-row justify="space-around">
                <a-col :xs="22" :sm="22" :md="0" :lg="0" :xl="0" :xxl="0" style="text-align: left">
                    <a-space>
                        <button-preference :theme-color="themeColor" :display="mobileComponentDisplay"/>
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
import {changeThemeColor, getThemeColor, setColorTheme, deviceModel} from "@/javascripts/publicFunctions";

import ButtonGreet from "@/components/ButtonGreet";
import ButtonHtmlLink from "@/components/ButtonHtmlLink";
import ButtonDownload from "@/components/ButtonDownload";
import InputSearch from "@/components/InputSearch";
import ImageWallpaper from "@/components/ImageWallpaper"
import ButtonAuthor from "@/components/ButtonAuthor";
import ButtonCreateTime from "@/components/ButtonCreateTime";
import ButtonWeather from "@/components/ButtonWeather";
import ButtonPreference from "@/components/ButtonPreference";

let componentDisplay = ref("none");
let mobileComponentDisplay = ref("none");
let imageData = ref("");
let themeColor = ref("");

onMounted(()=>{
    let tempThis = this;

    themeColor.value = setColorTheme();  // 未加载图片前随机显示颜色主题
    let device = deviceModel();
    let orientation = "landscape";
    if(device === "iPhone" || device === "Android") {
        orientation = "portrait";
    }
    let topics = "bo8jQKTaE0Y,6sMVjTLSkeQ,bDo48cUhwnY,xHxYTMHLgOc,iUIsnVtjB0Y,R_Fyn-Gwtlw,Fzo3zuOHN6w";

    let imageXHR = new XMLHttpRequest();
    imageXHR.timeout = 5000;
    imageXHR.open("GET", "https://api.unsplash.com/photos/random?client_id=" + clientId + "&orientation=" + orientation + "&topics=" + topics + "&content_filter=high");
    imageXHR.onload = function () {
        if (imageXHR.status === 200) {
            let resultData = JSON.parse(imageXHR.responseText);
            let resultData2 = imageXHR.responseText
            componentDisplay.value = "block";
            mobileComponentDisplay.value ="none";
            imageData.value = resultData2;
            themeColor.value = getThemeColor(resultData.color);

            // 小屏显示底部按钮
            if(device === "iPhone" || device === "Android") {
                componentDisplay.value = "none";
                mobileComponentDisplay.value ="block";
            }

            //设置body颜色
            changeThemeColor("body", resultData.color);
        }
        else {
            tempThis.$message.error("获取图片失败");
        }
    }
    imageXHR.onerror = function () {
        tempThis.$message.error("获取图片失败");
    }
    imageXHR.send();
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
