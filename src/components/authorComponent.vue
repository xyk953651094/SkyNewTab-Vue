<template>
    <a-space>
        <a-popover
            :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
            :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
            :style="{minWidth: '550px'}"
            position="tr"
        >
            <template #title>
                <a-row align="center">
                    <a-col :span="10">
                        <a-typography-text :style="{color: fontColor}">{{ "摄影师与图片信息" }}</a-typography-text>
                    </a-col>
                    <a-col :span="14" :style="{textAlign: 'right'}">
                        <a-space>
                            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                                      shape="round"
                                      type="text" @click="authorLinkBtnOnClick">
                                <template #icon>
                                    <icon-link/>
                                </template>
                                {{ "摄影师主页" }}
                            </a-button>
                            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                                      shape="round"
                                      type="text" @click="imageLinkBtnOnClick">
                                <template #icon>
                                    <icon-link/>
                                </template>
                                {{ "图片主页" }}
                            </a-button>
                        </a-space>
                    </a-col>
                </a-row>
            </template>
            <a-button id="authorBtn" :style="{display: display}" class="componentTheme zIndexHigh" shape="round"
                      size="large"
                      type="primary"
                      @click="authorLinkBtnOnClick">
                <template #icon>
                    <icon-camera/>
                </template>
                {{ "by " + authorName + " on Unsplash" }}
            </a-button>
            <template #content>
                <a-list :bordered=false>
                    <a-list-item>
                        <a-space>
                            <a-avatar :image-url="authorIconUrl" :size="64" :style="{backgroundColor: 'transparent'}"/>
                            <a-space direction="vertical">
                                <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                                          :style="{color: fontColor, cursor: 'default'}"
                                          shape="round" type="text">
                                    <template #icon>
                                        <icon-user/>
                                    </template>
                                    {{
                                        authorName.length < btnMaxSize ? authorName : authorName.substring(0, btnMaxSize) + "..."
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
                                            <i class="bi bi-collection"></i>
                                        </template>
                                        {{ " " + authorCollections + "个合集" }}
                                    </a-button>
                                    <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                                              :style="{color: fontColor, cursor: 'default'}"
                                              shape="round" type="text">
                                        <template #icon>
                                            <i class="bi bi-heart"></i>
                                        </template>
                                        {{ " " + authorLikes + "个点赞" }}
                                    </a-button>
                                    <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                                              :style="{color: fontColor, cursor: 'default'}"
                                              shape="round" type="text">
                                        <template #icon>
                                            <i class="bi bi-images"></i>
                                        </template>
                                        {{ " " + authorPhotos + "张照片" }}
                                    </a-button>
                                </a-space>
                            </a-space>
                        </a-space>
                    </a-list-item>
                    <a-list-item>
                        <a-space direction="vertical">
                            <a-space>
                                <a-avatar :image-url="imagePreviewUrl" :size="64"
                                          :style="{backgroundColor: 'transparent'}"
                                          shape="square"/>
                                <a-space direction="vertical">
                                    <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                                              :style="{color: fontColor}"
                                              shape="round"
                                              type="text" @click="imageCameraBtnOnClick">
                                        <template #icon>
                                            <icon-camera/>
                                        </template>
                                        {{ imageCamera }}
                                    </a-button>
                                    <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                                              :style="{color: fontColor, cursor: 'default'}"
                                              shape="round" type="text">
                                        <template #icon>
                                            <icon-clock-circle/>
                                        </template>
                                        {{ imageCreateTime }}
                                    </a-button>
                                </a-space>
                            </a-space>
                            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                                      :style="{color: fontColor}"
                                      shape="round"
                                      type="text" @click="imageLocationBtnOnClick">
                                <template #icon>
                                    <icon-location/>
                                </template>
                                {{
                                    imageLocation.length < btnMaxSize ? imageLocation : imageLocation.substring(0, btnMaxSize) + "..."
                                }}
                            </a-button>
                            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                                      :style="{color: fontColor, cursor: 'default'}"
                                      shape="round" type="text">
                                <template #icon>
                                    <icon-info-circle/>
                                </template>
                                {{
                                    imageDescription.length < btnMaxSize ? imageDescription : imageDescription.substring(0, btnMaxSize) + "..."
                                }}
                            </a-button>
                        </a-space>
                    </a-list-item>
                </a-list>
            </template>
        </a-popover>
    </a-space>
</template>

<script setup>
import {defineProps, ref, watch} from "vue"
import {
    IconCamera,
    IconClockCircle,
    IconInfoCircle,
    IconLink,
    IconLocation,
    IconUser
} from "@arco-design/web-vue/es/icon";
import {unsplashUrl} from "../javascripts/publicConstants";
import {changeThemeColor, getFontColor, getSearchEngineDetail, isEmptyString} from "../javascripts/publicFunctions";
import {Message} from "@arco-design/web-vue";

const btnMaxSize = 65;

const props = defineProps({
    themeColor: {
        type: Object,
        default: () => {
            return {
                "themeColor": "",
                "componentBackgroundColor": "",
                "componentFontColor": ""
            }
        },
        required: true
    },
    display: {
        type: String,
        default: () => {
            return "none";
        },
        required: true
    },
    imageData: {
        type: Object,
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

let hoverColor = ref("");
let backgroundColor = ref("");
let fontColor = ref("");
let searchEngineUrl = ref("https://www.bing.com/search?q=");
let authorName = ref("暂无信息");
let authorLink = ref("");
let authorIconUrl = ref("");
let authorCollections = ref(0);
let authorLikes = ref(0);
let authorPhotos = ref(0);
let imageLink = ref("");
let imagePreviewUrl = ref("");
let imageLocation = ref("暂无信息");
let imageDescription = ref("暂无信息");
let imageCreateTime = ref("暂无信息");
let imageCamera = ref("暂无信息");

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        hoverColor.value = props.themeColor.themeColor;
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#authorBtn", backgroundColor.value, fontColor.value);
    }
})

watch(() => props.imageData, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        authorName.value = props.imageData.user.name;
        authorLink.value = props.imageData.user.links.html;
        authorIconUrl.value = props.imageData.user.profile_image.large;
        authorCollections.value = props.imageData.user.total_collections;
        authorLikes.value = props.imageData.user.total_likes;
        authorPhotos.value = props.imageData.user.total_photos;
        imageLink.value = props.imageData.links.html;
        imagePreviewUrl.value = props.imageData.urls.thumb;
        imageLocation.value = isEmptyString(props.imageData.location.name) ? "暂无信息" : props.imageData.location.name;
        imageDescription.value = isEmptyString(props.imageData.alt_description) ? "暂无信息" : props.imageData.alt_description;
        imageCreateTime.value = props.imageData.created_at;
        imageCamera.value = isEmptyString(props.imageData.exif.name) ? "暂无信息" : props.imageData.exif.name;
    }
})

watch(() => props.searchEngine, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        searchEngineUrl.value = getSearchEngineDetail(newValue).searchEngineUrl;
    }
});

function btnMouseOver() {
    this.style.backgroundColor = hoverColor.value;
    this.style.color = getFontColor(hoverColor.value);
}

function btnMouseOut() {
    this.style.backgroundColor = "transparent";
    this.style.color = fontColor.value;
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
</script>

<style scoped>

</style>