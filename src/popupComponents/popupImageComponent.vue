<template>
    <a-space>
        <a-image
            :src="imagePreviewUrl"
            :style="{borderRadius: '10px'}"
            alt="图片加载失败"
            width="300px"
            height="180px"
        >
            <template #loader>
                <canvas id="popupCanvas" class="popupCanvas"></canvas>
            </template>
        </a-image>
        <a-space direction="vertical">
            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" @click="authorLinkBtnOnClick"
                      :style="{color: fontColor}" shape="round"
                      target="_blank" type="text">
                <template #icon>
                    <icon-user/>
                </template>
                {{ authorName.length < btnMaxSize ? authorName : authorName.substring(0, btnMaxSize) + "..." }}
            </a-button>
            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" @click="imageCameraBtnOnClick"
                      :style="{color: fontColor, cursor: 'default'}"
                      shape="round" type="text">
                <template #icon>
                    <icon-camera />
                </template>
                {{ imageCamera }}
            </a-button>
            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                      :style="{color: fontColor, cursor: 'default'}"
                      shape="round" type="text">
                <template #icon>
                    <icon-clock-circle />
                </template>
                {{ imageCreateTime }}
            </a-button>
            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" @click="imageLocationBtnOnClick"
                      :style="{color: fontColor}" shape="round"
                      target="_blank" type="text">
                <template #icon>
                    <icon-location/>
                </template>
                {{ imageLocation.length < btnMaxSize ? imageLocation : imageLocation.substring(0, btnMaxSize) + "..." }}
            </a-button>
            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"  @click="imageLinkBtnOnClick"
                      :style="{color: fontColor}" shape="round"
                      target="_blank" type="text">
                <template #icon>
                    <icon-info-circle/>
                </template>
                {{
                    imageDescription.length < btnMaxSize ? imageDescription : imageDescription.substring(0, btnMaxSize) + "..."
                }}
            </a-button>
        </a-space>
    </a-space>
</template>

<script setup>
import {defineProps, ref, watch} from "vue";
import {IconCamera, IconClockCircle, IconInfoCircle, IconLocation, IconUser} from "@arco-design/web-vue/es/icon";
import {getFontColor, getSearchEngineDetail, isEmptyString} from "../javascripts/publicFunctions";
import "../stylesheets/popupComponent.less"
import {decode} from "blurhash";
import {Message} from "@arco-design/web-vue";
import {unsplashUrl} from "../javascripts/publicConstants";

const btnMaxSize = 35;

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
    searchEngine: {
        type: String,
        required: true,
        default: () => {
            return "bing"
        }
    }
});

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

watch(() => props.imageData, (newValue, oldValue) => {
    if (newValue !== oldValue && newValue) {
        authorName.value = props.imageData.user.name;
        authorLink.value = props.imageData.user.links.html;
        imageLink.value = props.imageData.links.html;
        imagePreviewUrl.value = props.imageData.urls.thumb;
        imageLocation.value = isEmptyString(props.imageData.location.name) ? "暂无信息" : props.imageData.location.name;
        imageDescription.value = isEmptyString(props.imageData.alt_description) ? "暂无信息" : props.imageData.alt_description;
        imageCreateTime.value = props.imageData.created_at;
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

                popupCanvas.className = "popupCanvas wallpaperFadeIn";
            }
        }
    }
})

watch(() => props.searchEngine, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        searchEngineUrl.value = getSearchEngineDetail(newValue).searchEngineUrl;
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
    if(imageLocation.value !== "暂无信息") {
        window.open(searchEngineUrl.value + imageLocation.value, "_blank");
    } else {
        Message.error("无跳转链接");
    }
}

function imageCameraBtnOnClick() {
    if(imageCamera.value !== "暂无信息") {
        window.open(searchEngineUrl.value + imageCamera.value, "_blank");
    } else {
        Message.error("无跳转链接");
    }
}
</script>

<style scoped>

</style>