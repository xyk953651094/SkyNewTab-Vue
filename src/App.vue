<template>
    <a-layout style="height: 100%">
        <a-layout-header>
            <a-row justify="space-around">
                <a-col :span="10" style="text-align: left">
                    <button-greet :image-color="imageColor" />
                </a-col>
                <a-col :span="10" style="text-align: right">
                    <a-space>
                        <button-html-link :html-link="htmlLink" :display="componentDisplay" :image-color="imageColor" />
                        <button-download :download-link="downloadLink" :display="componentDisplay" :image-color="imageColor" />
                    </a-space>
                </a-col>
            </a-row>
        </a-layout-header>
        <a-layout-content class="center">
            <input-search/>
            <image-wallpaper :display="componentDisplay" :image-link="imageLink"/>
        </a-layout-content>
        <a-layout-footer>
            <a-row justify="space-around">
                <a-col :span="22" style="text-align: right">
                    <a-space>
                        <ButtonAuthor :author-name="authorName" :display="componentDisplay" :image-color="imageColor" />
                        <ButtonCreateTime :create-time="createTime" :display="componentDisplay" :image-color="imageColor" />
                    </a-space>
                </a-col>
            </a-row>
        </a-layout-footer>
    </a-layout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {getThemeColor, setColorTheme} from "@/javascripts/publicFunctions";

import ButtonGreet from "@/components/ButtonGreet";
import ButtonHtmlLink from "@/components/ButtonHtmlLink";
import ButtonDownload from "@/components/ButtonDownload";
import InputSearch from "@/components/InputSearch";
import ImageWallpaper from "@/components/ImageWallpaper"
import ButtonAuthor from "@/components/ButtonAuthor";
import ButtonCreateTime from "@/components/ButtonCreateTime";

let componentDisplay = ref("none");
let imageColor = ref("");
let htmlLink = ref("");
let downloadLink = ref("");
let imageLink = ref("");
let authorName = ref("");
let createTime = ref("");

onMounted(()=>{
    imageColor.value = setColorTheme();

    let clientId = 'ntHZZmwZUkhiLBMvwqqzmOG29nyXSCXlX7x_i-qhVHM';
    let orientation = 'landscape';
    let imageXHR = new XMLHttpRequest();
    imageXHR.open('GET', 'https://api.unsplash.com/photos/random?client_id=' + clientId + '&orientation=' + orientation + '&content_filter=high');
    imageXHR.onload = function () {
        if (imageXHR.status === 200) {
            let imageData = JSON.parse(imageXHR.responseText);
            componentDisplay.value = "block";
            imageColor.value = getThemeColor(imageData.color);
            htmlLink.value = imageData.links.html;
            downloadLink.value = imageData.links.download;
            imageLink.value = imageData.urls.regular;
            authorName.value = imageData.user.name;
            createTime.value = imageData.created_at.split('T')[0];
        }
    }
    imageXHR.onerror = function () {

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
    /*margin: 60px 0;*/
    padding: 60px 0;
    height: 85%;
}
</style>
