<template>
    <a-space>
        <a-image
            :src="imagePreviewUrl"
            :style="{borderRadius: '10px'}"
            alt="图片加载失败"
            width="200px"
            height="120px"
        >
            <template #loader>
                <canvas id="popupCanvas" class="popupCanvas"></canvas>
            </template>
        </a-image>
        <a-space direction="vertical">
            <a-button :href="authorLink" :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                      :style="{color: fontColor}" shape="round"
                      target="_blank" type="text">
                <template #icon>
                    <icon-user/>
                </template>
                {{ authorName.length < btnMaxSize ? authorName : authorName.substring(0, btnMaxSize) + "..." }}
            </a-button>
            <a-button :href="imageLink" :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                      :style="{color: fontColor}" shape="round"
                      target="_blank" type="text">
                <template #icon>
                    <icon-location/>
                </template>
                {{ imageLocation.length < btnMaxSize ? imageLocation : imageLocation.substring(0, btnMaxSize) + "..." }}
            </a-button>
            <a-button :href="imageLink" :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
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
import {IconInfoCircle, IconLocation, IconUser} from "@arco-design/web-vue/es/icon";
import {getFontColor, isEmptyString} from "../javascripts/publicFunctions";
import "../stylesheets/popupComponent.less"
import {decode} from "blurhash";

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
});

let authorName = ref("暂无信息");
let authorLink = ref("");
let imageLink = ref("");
let imagePreviewUrl = ref("");
let imageLocation = ref("暂无信息");
let imageDescription = ref("暂无信息");
let blurHashCode = ref("");

watch(() => props.imageData, (newValue, oldValue) => {
    if (newValue !== oldValue && newValue) {
        authorName.value = props.imageData.user.name;
        authorLink.value = props.imageData.user.links.html;
        imageLink.value = props.imageData.links.html;
        imagePreviewUrl.value = props.imageData.urls.thumb;
        imageLocation.value = isEmptyString(props.imageData.location.name) ? "暂无信息" : props.imageData.location.name;
        imageDescription.value = isEmptyString(props.imageData.alt_description) ? "暂无信息" : props.imageData.alt_description;

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

function btnMouseOver() {
    this.style.backgroundColor = props.imageData.color;
    this.style.color = getFontColor(props.imageData.color);
}

function btnMouseOut() {
    this.style.backgroundColor = "transparent";
    this.style.color = props.fontColor;
}

</script>

<style scoped>

</style>