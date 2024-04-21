<template>
    <a-space :style="{display: noImageMode ? 'none' : 'inline-flex'}">
        <div class="popupImageDiv">
            <a-image
                id="popupImage"
                :preview="false"
                :src="imagePreviewUrl"
                :style="{borderRadius: '4px'}"
                alt="图片加载失败"
                height="120px"
                width="200px"
            >
            </a-image>
            <canvas id="popupCanvas" :style="{display: displayCanvas}" class="popupCanvas"></canvas>
        </div>
        <a-space align="start" direction="vertical">
            <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                      target="_blank"
                      type="text" @click="authorLinkBtnOnClick"
                      @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                <template #icon>
                    <icon-user/>
                </template>
                {{ authorName.length < btnMaxSize ? authorName : authorName.substring(0, btnMaxSize) + "..." }}
            </a-button>
            <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                      target="_blank"
                      type="text" @click="imageLinkBtnOnClick"
                      @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)"
            >
                <template #icon>
                    <icon-info-circle/>
                </template>
                {{
                    imageDescription.length < btnMaxSize ? imageDescription : imageDescription.substring(0, btnMaxSize) + "..."
                }}
            </a-button>
            <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                      target="_blank"
                      type="text" @click="imageLocationBtnOnClick"
                      @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                <template #icon>
                    <icon-location/>
                </template>
                {{ imageLocation.length < btnMaxSize ? imageLocation : imageLocation.substring(0, btnMaxSize) + "..." }}
            </a-button>
        </a-space>
    </a-space>
    <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor, cursor: 'default', display: noImageMode ? 'inline-block' : 'none'}"
              type="text"
              @mouseout="btnMouseOut(fontColor, $event)"
              @mouseover="btnMouseOver(hoverColor, $event)">
        <template #icon>
            <icon-info-circle/>
        </template>
        已开启纯色模式
    </a-button>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {IconCamera, IconClockCircle, IconInfoCircle, IconLocation, IconUser} from "@arco-design/web-vue/es/icon";
import {btnMouseOut, btnMouseOver, getSearchEngineDetail, isEmpty} from "@/javascripts/publicFunctions";
import "@/stylesheets/popupComponent.less"
import {decode} from "blurhash";
import {Message} from "@arco-design/web-vue";
import {defaultPreferenceData, unsplashUrl} from "@/javascripts/publicConstants";

const btnMaxSize = 50;

const props = defineProps({
    imageData: {
        type: Object,
        required: true
    },
    hoverColor: {
        type: String,
        required: true,
        default: () => {
            return ""
        }
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
let blurHashCode = ref("");
let searchEngineUrl = ref("https://www.bing.com/search?q=");
let noImageMode = ref(false)

onMounted(() => {
    let popupImage = document.getElementById("popupImage");
    let popupImageDiv = popupImage.parentElement;

    popupImageDiv.style.display = "none";
    if (popupImage instanceof HTMLElement) {
        popupImage.onload = function () {
            // document.getElementById("popupCanvas").remove();
            document.getElementById("popupCanvas").classList.remove("imageFadeIn");
            document.getElementById("popupCanvas").classList.add("imageFadeOut");
            popupImageDiv.style.display = "block";
            popupImageDiv.classList.add("imageFadeIn");
        }
    }
})

watch(() => props.imageData, (newValue, oldValue) => {
    if (newValue !== oldValue && newValue) {
        authorName.value = props.imageData.user.name;
        authorLink.value = props.imageData.user.links.html;
        imageLink.value = props.imageData.links.html;
        imagePreviewUrl.value = props.imageData.urls.regular;
        imageLocation.value = isEmpty(props.imageData.location.name) ? "暂无信息" : props.imageData.location.name;
        imageDescription.value = isEmpty(props.imageData.alt_description) ? "暂无信息" : props.imageData.alt_description;

        blurHashCode.value = newValue.blur_hash;
        if (!isEmpty(blurHashCode.value)) {
            const popupCanvas = document.getElementById("popupCanvas");
            if (popupCanvas instanceof HTMLCanvasElement) {
                let blurHashImage = decode(blurHashCode.value, popupCanvas.width, popupCanvas.height);
                let ctx = popupCanvas.getContext("2d");
                if (ctx) {
                    const imageData = new ImageData(blurHashImage, popupCanvas.width, popupCanvas.height);
                    ctx.putImageData(imageData, 0, 0);
                }

                displayCanvas.value = "block";
                popupCanvas.className = "popupCanvas imageFadeIn";
            }
        }
    }
})

watch(() => props.preferenceData, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        searchEngineUrl.value = getSearchEngineDetail(newValue.searchEngine).searchEngineUrl;
        noImageMode.value = newValue.noImageMode;
    }
}, {immediate: true});

function authorLinkBtnOnClick() {
    if (authorLink.value.length !== 0) {
        window.open(authorLink.value + unsplashUrl, "_blank");
    } else {
        Message.error("无跳转链接");
    }
}

function imageLinkBtnOnClick() {
    if (authorLink.value.length !== 0) {
        window.open(imageLink.value + unsplashUrl, "_blank");
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

function getCreateTime(createTime) {
    return createTime.substring(0, createTime.indexOf("T"));
}
</script>

<style scoped>

</style>