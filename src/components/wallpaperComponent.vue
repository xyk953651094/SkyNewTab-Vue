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
    <div id="backgroundMask" :style="{display: preferenceData.nightMode ? 'block' : 'none'}" class="backgroundMask zIndexMiddle"/>
</template>

<script setup>
import {defineProps, onMounted, ref} from "vue";
import {
    httpRequest,
    imageDynamicEffect,
    isEmpty
} from "@/javascripts/publicFunctions";
import "@/stylesheets/wallpaperComponent.less"
import {clientId, defaultPreferenceData, device, imageHistoryMaxSize} from "@/javascripts/publicConstants";
import {decode} from "blurhash";
import {Message} from "@arco-design/web-vue";

const emit = defineEmits(["imageData", "imageHistory"]);

const props = defineProps({
    preferenceData: {
        type: Object,
        required: true,
        default: () => {
            return defaultPreferenceData
        }
    }
});

let imageData = ref(null);
let imageLink = ref("");
let display = ref("none");
let displayCanvas = ref("none");

// 请求完成后处理步骤
function setWallpaper(data) {
    imageData.value = data;
    emit("imageData", imageData.value);

    // 图片质量
    switch (props.preferenceData.imageQuality) {
        case "full":
            imageLink.value = imageData.value.urls.full;
            break;
        case "regular":
            imageLink.value = imageData.value.urls.regular;
            break;
        default:
            imageLink.value = imageData.value.urls.regular;
            break;
    }

    // blurHash
    if (!isEmpty(data.blur_hash)) {
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
    for (let i = 0; i < props.preferenceData.imageTopics.length; i++) {
        imageTopics += props.preferenceData.imageTopics[i];
        if (i !== props.preferenceData.imageTopics.length - 1) {
            imageTopics += ",";
        }
    }
    let imageQuery = props.preferenceData.customTopic;

    let headers = {};
    let url = "https://api.unsplash.com/photos/random?";
    let data = {
        "client_id": clientId,
        "orientation": (device === "iPhone" || device === "Android") ? "portrait" : "landscape",
        "topics": imageTopics,
        "content_filter": "high",
    };
    if (!isEmpty(imageQuery)) {
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

            // 缓存历史图片
            let lastImageStorage = localStorage.getItem("lastImage"); // 上一张图片
            let imageHistoryStorage = localStorage.getItem("imageHistory");
            let imageHistoryJson = [];
            if (imageHistoryStorage !== null) {
                imageHistoryJson = JSON.parse(imageHistoryStorage);
            }
            if (lastImageStorage !== null) {
                let lastImageJson = JSON.parse(lastImageStorage);
                let imageArrayJsonItem = {
                    index: new Date().getTime(),
                    imageUrl: lastImageJson.urls.regular,
                    imageLink: lastImageJson.links.html,
                };

                if (imageHistoryJson.length === imageHistoryMaxSize) { // 满了就把第一个删掉
                    imageHistoryJson.shift();
                }
                imageHistoryJson.push(imageArrayJsonItem);
            }
            localStorage.setItem("imageHistory", JSON.stringify(imageHistoryJson));
            emit("imageHistory", imageHistoryJson); // 传递给历史图片组件

            // 保存请求结果，防抖节流
            localStorage.setItem("lastImageRequestTime", String(new Date().getTime()));
            localStorage.setItem("lastImage", JSON.stringify(resultData)); // 更新上一张图片为本次图片
            setWallpaper(resultData);
        })
        .catch(function () {
            Message.clear();
            // 请求失败时显示上一次请求结果
            let lastImage = localStorage.getItem("lastImage");
            if (lastImage) {
                lastImage = JSON.parse(lastImage);
                Message.loading({
                    content: "获取图片失败，正在加载缓存图片",
                    duration: 0
                });
                setWallpaper(lastImage);
            } else {
                Message.error("获取图片失败，请检查网络连接");
            }
        })
        .finally(function () {
        });
}

onMounted(() => {
    if (!props.preferenceData.noImageMode) {
        // 防抖节流
        let lastRequestTime = localStorage.getItem("lastImageRequestTime");
        let nowTimeStamp = new Date().getTime();
        if (lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
            getWallpaper();
            // } else if (nowTimeStamp - parseInt(lastRequestTime) > 0) {
        } else if (nowTimeStamp - parseInt(lastRequestTime) > parseInt(props.preferenceData.changeImageTime)) {  // 必须多于切换间隔才能进行新的请求
            getWallpaper();
        } else {  // 切换间隔内使用上一次请求结果
            let lastImage = localStorage.getItem("lastImage");
            if (lastImage) {
                Message.loading({
                    content: "正在加载缓存图片",
                    duration: 0
                });
                lastImage = JSON.parse(lastImage);
                setWallpaper(lastImage);
            } else {
                Message.error("无缓存图片可加载，请尝试重置插件");
            }
        }

        // 图片动画
        let backgroundImage = document.getElementById("backgroundImage");
        let backgroundImageDiv = backgroundImage.parentElement;

        if (backgroundImage instanceof HTMLElement) {
            backgroundImage.onload = function () {

                Message.clear();
                Message.success("图片加载成功");
                document.getElementById("backgroundCanvas").className = "backgroundCanvas wallpaperFadeOut";
                display.value = "block";

                // 设置动态效果
                backgroundImage.classList.add("wallpaperFadeIn");
                setTimeout(() => {
                    backgroundImage.style.transform = "scale(1.05, 1.05)";
                    backgroundImage.style.transition = "5s";

                    setTimeout(() => {
                        backgroundImageDiv.style.perspective = "500px";
                        imageDynamicEffect(backgroundImage, props.preferenceData.dynamicEffect);
                    }, 5000);
                }, 2000);
            }
        }
    }
})
</script>

<style scoped>

</style>