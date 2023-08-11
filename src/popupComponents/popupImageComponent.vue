<template>
    <a-space>
        <a-image
            id="popupImage"
            :src="imagePreviewUrl"
            :style="{borderRadius: '10px'}"
            alt="图片加载失败"
            height="150px"
            width="250px"
        >
        </a-image>
        <canvas id="popupCanvas" :style="{display: displayCanvas, borderRadius: '10px'}" class="popupCanvas"></canvas>
        <a-space direction="vertical">
            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                      shape="round" target="_blank"
                      type="text" @click="authorLinkBtnOnClick">
                <template #icon>
                    <icon-user/>
                </template>
                {{ authorName.length < btnMaxSize ? authorName : authorName.substring(0, btnMaxSize) + "..." }}
            </a-button>
            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                      shape="round" target="_blank"
                      type="text" @click="imageLocationBtnOnClick">
                <template #icon>
                    <icon-location/>
                </template>
                {{ imageLocation.length < btnMaxSize ? imageLocation : imageLocation.substring(0, btnMaxSize) + "..." }}
            </a-button>
            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                      shape="round" target="_blank"
                      type="text" @click="imageLinkBtnOnClick">
                <template #icon>
                    <icon-info-circle/>
                </template>
                {{
                    imageDescription.length < btnMaxSize ? imageDescription : imageDescription.substring(0, btnMaxSize) + "..."
                }}
            </a-button>
            <a-space>
                <template #split>
                    <a-divider :style="{borderColor: fontColor}" direction="vertical"/>
                </template>
                <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                          :style="{color: fontColor, cursor: 'default'}"
                          shape="round" type="text">
                    <template #icon>
                        <icon-clock-circle/>
                    </template>
                    {{ imageCreateTime }}
                </a-button>
                <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                          :style="{color: fontColor}"
                          shape="round"
                          type="text" @click="imageCameraBtnOnClick">
                    <template #icon>
                        <icon-camera/>
                    </template>
                    {{ imageCamera }}
                </a-button>
            </a-space>
        </a-space>
    </a-space>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {IconCamera, IconClockCircle, IconInfoCircle, IconLocation, IconUser} from "@arco-design/web-vue/es/icon";
import {getFontColor, getSearchEngineDetail, isEmptyString} from "../javascripts/publicFunctions";
import "../stylesheets/popupComponent.less"
import {decode} from "blurhash";
import {Message} from "@arco-design/web-vue";
import {defaultPreferenceData, unsplashUrl} from "../javascripts/publicConstants";

const btnMaxSize = 45;

const props = defineProps({
    imageData: {
        type: Object,
        required: true
    },
    fontColor: {
        type: String,
        default: () => {
            return "#000000";
        },
        required: true
    },
    preferenceData: {
        type: Object,
        required: true,
        default: () => {
            return defaultPreferenceData
        }
    }
});

let displayCanvas = ref("none");
let authorName = ref("暂无信息");
let authorLink = ref("");
let imageLink = ref("");
let imagePreviewUrl = ref("");
let imageLocation = ref("暂无信息");
let imageDescription = ref("暂无信息");
let imageCreateTime = ref("暂无信息");
let imageCamera = ref("暂无信息");
let blurHashCode = ref("");
let searchEngineUrl = ref("https://www.bing.com/search?q=");

onMounted(() => {
    let popupImage = document.getElementById("popupImage");
    let popupImageDiv = popupImage.parentElement;

    popupImageDiv.style.display = "none";
    if (popupImage instanceof HTMLElement) {
        popupImage.onload = function () {
            document.getElementById("popupCanvas").remove();
            popupImageDiv.style.display = "block";
            popupImageDiv.classList.add("wallpaperFadeIn");
        }
    }
})

watch(() => props.imageData, (newValue, oldValue) => {
    if (newValue !== oldValue && newValue) {
        authorName.value = props.imageData.user.name;
        authorLink.value = props.imageData.user.links.html;
        imageLink.value = props.imageData.links.html;
        imagePreviewUrl.value = props.imageData.urls.regular;
        imageLocation.value = isEmptyString(props.imageData.location.name) ? "暂无信息" : props.imageData.location.name;
        imageDescription.value = isEmptyString(props.imageData.alt_description) ? "暂无信息" : props.imageData.alt_description;
        imageCreateTime.value = getCreateTime(props.imageData.created_at);
        imageCamera.value = isEmptyString(props.imageData.exif.name) ? "暂无信息" : props.imageData.exif.name;

        blurHashCode.value = newValue.blur_hash;
        if (!isEmptyString(blurHashCode.value)) {
            const popupCanvas = document.getElementById("popupCanvas");
            if (popupCanvas instanceof HTMLCanvasElement) {
                let blurHashImage = decode(blurHashCode.value, popupCanvas.width, popupCanvas.height);
                let ctx = popupCanvas.getContext("2d");
                if (ctx) {
                    const imageData = new ImageData(blurHashImage, popupCanvas.width, popupCanvas.height);
                    ctx.putImageData(imageData, 0, 0);
                }

                displayCanvas.value = "block";
                popupCanvas.className = "popupCanvas wallpaperFadeIn";
            }
        }
    }
})

watch(() => props.preferenceData, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        searchEngineUrl.value = getSearchEngineDetail(newValue.searchEngine).searchEngineUrl;
    }
});

function btnMouseOver() {
    this.style.backgroundColor = props.imageData.color;
    this.style.color = getFontColor(props.imageData.color);
}

function btnMouseOut() {
    this.style.backgroundColor = "transparent";
    this.style.color = props.fontColor;
}

function authorLinkBtnOnClick() {
    if (authorLink.value.length !== 0) {
        window.open(authorLink.value + unsplashUrl);
    } else {
        Message.error("无跳转链接");
    }
}

function imageLinkBtnOnClick() {
    if (authorLink.value.length !== 0) {
        window.open(imageLink.value + unsplashUrl);
    } else {
        Message.error("无跳转链接");
    }
}

function imageLocationBtnOnClick() {
    if (imageLocation.value !== "暂无信息") {
        window.open(searchEngineUrl.value + imageLocation.value, "_blank");
    } else {
        Message.error("无跳转链接");
    }
}

function imageCameraBtnOnClick() {
    if (imageCamera.value !== "暂无信息") {
        window.open(searchEngineUrl.value + imageCamera.value, "_blank");
    } else {
        Message.error("无跳转链接");
    }
}

function getCreateTime(createTime) {
    return createTime.substring(0, createTime.indexOf("T"));
}
</script>

<style scoped>

</style>