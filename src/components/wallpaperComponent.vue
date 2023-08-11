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
</template>

<script setup>
import {defineProps, onMounted, ref} from "vue";
import {httpRequest, imageDynamicEffect} from "../javascripts/publicFunctions";
import "../stylesheets/wallpaperComponent.less"
import {clientId, defaultPreferenceData, device} from "../javascripts/publicConstants";
import {Message} from "@arco-design/web-vue";

const props = defineProps({
    preferenceData: {
        type: Object,
        required: true,
        default: () => {
            return defaultPreferenceData
        }
    }
});

const emit = defineEmits(["imageData"]);

let imageData = ref(null);
let imageLink = ref("");
let loadImageLink = ref("");
let display = ref("none");

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
    loadImageLink.value = imageData.value.urls.small;
}

function getWallpaper() {
    console.log(props.preferenceData.imageTopics);
    let tempImageTopics = "";
    for (let i = 0; i < props.preferenceData.imageTopics.length; i++) {
        tempImageTopics += props.preferenceData.imageTopics[i];
        if (i !== props.preferenceData.imageTopics.length - 1) {
            tempImageTopics += ",";
        }
    }

    let headers = {};
    let url = "https://api.unsplash.com/photos/random?";
    let data = {
        "client_id": clientId,
        "orientation": (device === "iPhone" || device === "Android") ? "portrait" : "landscape",
        "topics": tempImageTopics,
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
    let preferenceData = localStorage.getItem("preferenceData");
    let noImageMode = false;
    if (preferenceData) {
        noImageMode = JSON.parse(preferenceData).noImageMode;
    }

    if(!noImageMode) {
        // 防抖节流
        let lastRequestTime = localStorage.getItem("lastImageRequestTime");
        let nowTimeStamp = new Date().getTime();
        if (lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
            getWallpaper();
        } else if (nowTimeStamp - parseInt(lastRequestTime) > 0) {  // 必须多于一分钟才能进行新的请求
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

        // 图片动画
        let backgroundImage = document.getElementById("backgroundImage");
        let backgroundImageDiv = backgroundImage.parentElement;

        if (backgroundImage instanceof HTMLElement) {
            backgroundImage.onload = function () {
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