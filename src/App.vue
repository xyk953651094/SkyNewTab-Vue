<template>
    <a-layout style="height: 100%">
        <a-layout-header id="header">
            <a-row justify="space-around">
                <a-col :span="10" style="text-align: left">
                    <a-space>
                        <button-greet :theme-color="themeColor" />
                        <button-weather :theme-color="themeColor" />
                    </a-space>
                </a-col>
                <a-col :span="10" style="text-align: right">
                    <a-space>
                        <button-download :download-link="downloadLink" :display="componentDisplay" :theme-color="themeColor" />
                        <button-html-link :html-link="htmlLink" :display="componentDisplay" :theme-color="themeColor" />
                        <button-preference :display="componentDisplay" :theme-color="themeColor" />
                    </a-space>
                </a-col>
            </a-row>
        </a-layout-header>
        <a-layout-content class="center">
            <input-search/>
            <image-wallpaper :display="componentDisplay" :image-link="imageLink"/>
        </a-layout-content>
        <a-layout-footer id="footer">
            <a-row justify="space-around">
                <a-col :span="10" style="text-align: left">
                    <a-space>
                        <button-download :download-link="downloadLink" :display="mobileComponentDisplay" :theme-color="themeColor" />
                        <button-html-link :html-link="htmlLink" :display="mobileComponentDisplay" :theme-color="themeColor" />
                        <button-preference :display="mobileComponentDisplay" :theme-color="themeColor" />
                    </a-space>
                </a-col>
                <a-col :span="10" style="text-align: right">
                    <a-space>
                        <ButtonAuthor
                            :author-name="authorName"
                            :author-link="authorLink"
                            :display="componentDisplay"
                            :theme-color="themeColor" />
                        <ButtonCreateTime
                            :create-time="createTime"
                            :display="componentDisplay"
                            :theme-color="themeColor" />
                    </a-space>
                </a-col>
            </a-row>
        </a-layout-footer>
    </a-layout>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {unsplashUrl, clientId} from "@/javascripts/publicContents";
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
let themeColor = ref("");
let htmlLink = ref("");
let downloadLink = ref("");
let imageLink = ref("");
let authorName = ref("");
let authorLink = ref("");
let createTime = ref("");

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
    imageXHR.open("GET", "https://api.unsplash.com/photos/random?client_id=" + clientId + "&orientation=" + orientation + "&topics=" + topics + "&content_filter=high");
    imageXHR.onload = function () {
        if (imageXHR.status === 200) {
            let imageData = JSON.parse(imageXHR.responseText);
            componentDisplay.value = "block";
            mobileComponentDisplay.value ="none";
            themeColor.value = getThemeColor(imageData.color);
            htmlLink.value = imageData.links.html;
            downloadLink.value = imageData.links.download_location;
            imageLink.value = imageData.urls.regular;
            authorName.value = "by " + imageData.user.name + " on Unsplash";
            authorLink.value = imageData.user.links.html + unsplashUrl;
            createTime.value = imageData.created_at.split("T")[0];

            // 小屏显示底部按钮
            if(device === "iPhone" || device === "Android") {
                componentDisplay.value = "none";
                mobileComponentDisplay.value ="block";
            }

            //设置body颜色
            changeThemeColor("body", imageData.color);
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
