<template>
    <a-image
        id="backgroundImage"
        :preview=false
        :src="imageLink"
        :style="{display: display}"
        class="backgroundImage zIndexLow"
        height="102%"
        width="102%"
    >
    </a-image>
    <canvas id="backgroundCanvas" :style="{display: displayCanvas}" class="backgroundCanvas"/>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {httpRequest, imageDynamicEffect, isEmptyString} from "../javascripts/publicFunctions";
import "../stylesheets/wallpaperComponent.less"
import {clientId, defaultPreferenceData, device} from "../javascripts/publicConstants";
import {decode} from "blurhash";
import {Message} from "@arco-design/web-vue";

const emit = defineEmits(["imageData"]);

let imageData = ref(null);
let preferenceData = ref(defaultPreferenceData);
let imageLink = ref("");
let display = ref("none");
let displayCanvas = ref("none");

// 请求完成后处理步骤
function setWallpaper(data) {
    imageData.value = data;
    emit("imageData", imageData.value);

    // 图片质量
    switch (preferenceData.value.imageQuality) {
        case "full":
            imageLink.value = imageData.value.urls.full;
            break;
        case "regular":
            imageLink.value = imageData.value.urls.regular;
            break;
        case "small":
            imageLink.value = imageData.value.urls.small;
            break;
        case "small_s3":
            imageLink.value = imageData.value.urls.small_s3;
            break;
        default:
            imageLink.value = imageData.value.urls.regular;
            break;
    }

    // blurHash
    if (!isEmptyString(data.blur_hash)) {
        const backgroundCanvas = document.getElementById("backgroundCanvas");
        if (backgroundCanvas instanceof HTMLCanvasElement) {
            let blurHashImage = decode(data.blur_hash, backgroundCanvas.width, backgroundCanvas.height);
            let ctx = backgroundCanvas.getContext("2d");
            if (ctx) {
                const imageData = new ImageData(blurHashImage, backgroundCanvas.width, backgroundCanvas.height);
                ctx.putImageData(imageData, 0, 0);
            }

            displayCanvas.value = "block";
            backgroundCanvas.className = "backgroundCanvas wallpaperFadeIn";
        }
    }
}

function getWallpaper() {
    let imageTopics = "";
    for (let i = 0; i < preferenceData.value.imageTopics.length; i++) {
        imageTopics += preferenceData.value.imageTopics[i];
        if (i !== preferenceData.value.imageTopics.length - 1) {
            imageTopics += ",";
        }
    }
    let imageQuery = preferenceData.value.customTopic;

    let headers = {};
    let url = "https://api.unsplash.com/photos/random?";
    let data = {
        "client_id": clientId,
        "orientation": (device === "iPhone" || device === "Android") ? "portrait" : "landscape",
        "topics": imageTopics,
        "content_filter": "high",
    };
    if (!isEmptyString(imageQuery)) {
        delete data.topics;
        data.query = imageQuery;
    }

    Message.loading({
        content: "正在获取图片",
        duration: 0
    });
    httpRequest(headers, url, data, "GET")
        .then(function (resultData) {
            Message.clear();
            Message.loading({
                content: "正在加载图片",
                duration: 0
            });
            localStorage.setItem("lastImageRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
            localStorage.setItem("lastImage", JSON.stringify(resultData));               // 保存请求结果，防抖节流
            setWallpaper(resultData);
        })
        .catch(function () {
            Message.clear();
            // 请求失败也更新请求时间，防止超时后无信息可显示
            localStorage.setItem("lastImageRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
            // 获取图片失败时显示上次图片
            let lastImage = localStorage.getItem("lastImage");
            if (lastImage) {
                lastImage = JSON.parse(lastImage);
                Message.error({
                    content: "获取图片失败，加载历史图片",
                    duration: 0
                });
                setWallpaper(lastImage);
            } else {
                Message.error("获取图片失败");
            }
        })
        .finally(function () {
        });
}

onMounted(() => {
    let tempPreferenceData = localStorage.getItem("preferenceData");
    if (tempPreferenceData === null) {
        localStorage.setItem("preferenceData", JSON.stringify(defaultPreferenceData));
        preferenceData.value = defaultPreferenceData;
    } else {
        preferenceData.value = JSON.parse(tempPreferenceData);
    }
    let noImageMode = preferenceData.value.noImageMode;

    if (!noImageMode) {
        // 防抖节流
        let lastRequestTime = localStorage.getItem("lastImageRequestTime");
        let nowTimeStamp = new Date().getTime();
        if (lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
            getWallpaper();
        } else if (nowTimeStamp - parseInt(lastRequestTime) > 60 * 1000) {  // 必须多于一分钟才能进行新的请求
            getWallpaper();
        } else {  // 一分钟之内使用上一次请求结果
            let lastImage = localStorage.getItem("lastImage");
            if (lastImage) {
                Message.info("正在加载历史图片");
                lastImage = JSON.parse(lastImage);
                setWallpaper(lastImage);
            } else {
                Message.error("加载历史图片失败");
            }
        }

        // 图片动画
        let backgroundImage = document.getElementById("backgroundImage");
        let backgroundImageDiv = backgroundImage.parentElement;

        if (backgroundImage instanceof HTMLElement) {
            backgroundImage.onload = function () {
                Message.clear();
                Message.success("图片加载成功");
                // document.getElementById("backgroundCanvas").remove();
                document.getElementById("backgroundCanvas").className = "backgroundCanvas wallpaperFadeOut";
                display.value = "block";

                // 设置动态效果
                backgroundImage.classList.add("wallpaperFadeIn");
                setTimeout(() => {
                    backgroundImage.style.transform = "scale(1.05, 1.05)";
                    backgroundImage.style.transition = "5s";

                    setTimeout(() => {
                        backgroundImageDiv.style.perspective = "500px";
                        imageDynamicEffect(backgroundImage, preferenceData.value.dynamicEffect);
                    }, 5000);
                }, 2000);
            }
        }
    }
})
</script>

<style scoped>

</style>