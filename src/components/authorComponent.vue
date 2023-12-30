<template>
    <a-space>
        <a-popover
            :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
            :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
            :style="{width: '550px'}"
            position="tr"
        >
            <a-button id="authorBtn" :shape="preferenceData.buttonShape" :style="{display: display, cursor: 'default'}"
                      class="componentTheme zIndexHigh"
                      size="large"
                      type="primary">
                <template #icon>
                    <icon-camera/>
                </template>
                {{
                    "由 Unsplash 的 " + (authorName.length < btnMaxSize ? authorName : authorName.substring(0, btnMaxSize) + "...") + " 拍摄"
                }}
            </a-button>
            <template #title>
                <a-row align="center">
                    <a-col :span="10">
                        <a-typography-text :style="{color: fontColor}">{{ "摄影师与图片信息" }}</a-typography-text>
                    </a-col>
                    <a-col :span="14" :style="{textAlign: 'right'}">
                        <a-space>
                            <a-button :shape="preferenceData.buttonShape"
                                      :style="{color: fontColor}" type="text"
                                      @click="authorLinkBtnOnClick"
                                      @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                <template #icon>
                                    <icon-home/>
                                </template>
                                {{ "摄影师主页" }}
                            </a-button>
                            <a-button :shape="preferenceData.buttonShape"
                                      :style="{color: fontColor}" type="text"
                                      @click="imageLinkBtnOnClick"
                                      @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                <template #icon>
                                    <icon-file-image/>
                                </template>
                                {{ "图片主页" }}
                            </a-button>
                        </a-space>
                    </a-col>
                </a-row>
            </template>
            <template #content>
                <a-list :bordered=false>
                    <a-list-item>
                        <a-space>
                            <a-avatar :image-url="authorIconUrl" :size="64" :style="{backgroundColor: 'transparent'}"/>
                            <a-space direction="vertical">
                                <a-button :shape="preferenceData.buttonShape"
                                          :style="{color: fontColor}"
                                          type="text"
                                          @click="authorLinkBtnOnClick" @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                    <template #icon>
                                        <icon-user/>
                                    </template>
                                    {{
                                        authorName.length < btnMaxSize ? authorName : authorName.substring(0, btnMaxSize) + "..."
                                    }}
                                </a-button>
                                <a-space>
                                    <a-button :shape="preferenceData.buttonShape"
                                              :style="{color: fontColor, cursor: 'default'}"
                                              type="text"
                                              @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                        <template #icon>
                                            <i class="bi bi-collection"></i>
                                        </template>
                                        {{ " " + authorCollections + " 个合集" }}
                                    </a-button>
                                    <a-button :shape="preferenceData.buttonShape"
                                              :style="{color: fontColor, cursor: 'default'}"
                                              type="text"
                                              @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                        <template #icon>
                                            <i class="bi bi-heart"></i>
                                        </template>
                                        {{ " " + authorLikes + " 个点赞" }}
                                    </a-button>
                                    <a-button :shape="preferenceData.buttonShape"
                                              :style="{color: fontColor, cursor: 'default'}"
                                              type="text"
                                              @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                        <template #icon>
                                            <i class="bi bi-images"></i>
                                        </template>
                                        {{ " " + authorPhotos + " 张照片" }}
                                    </a-button>
                                </a-space>
                            </a-space>
                        </a-space>
                    </a-list-item>
                    <a-list-item>
                        <a-space>
                            <a-avatar :image-url="imagePreviewUrl" :size="64"
                                      :style="{backgroundColor: 'transparent'}"
                                      shape="square"/>
                            <a-space direction="vertical">
                                <a-button :shape="preferenceData.buttonShape"
                                          :style="{color: fontColor}"
                                          type="text"
                                          @click="imageLocationBtnOnClick"
                                          @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                    <template #icon>
                                        <icon-location/>
                                    </template>
                                    {{
                                        imageLocation.length < btnMaxSize ? imageLocation : imageLocation.substring(0, btnMaxSize) + "..."
                                    }}
                                </a-button>
                                <a-button :shape="preferenceData.buttonShape"
                                          :style="{color: fontColor}"
                                          type="text"
                                          @click="imageLinkBtnOnClick" @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                    <template #icon>
                                        <icon-info-circle/>
                                    </template>
                                    {{
                                        imageDescription.length < btnMaxSize ? imageDescription : imageDescription.substring(0, btnMaxSize) + "..."
                                    }}
                                </a-button>
                                <a-space>
                                    <a-button :shape="preferenceData.buttonShape"
                                              :style="{color: fontColor, cursor: 'default'}"
                                              type="text"
                                              @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                        <template #icon>
                                            <icon-clock-circle/>
                                        </template>
                                        {{ imageCreateTime }}
                                    </a-button>
                                    <a-button :shape="preferenceData.buttonShape"
                                              :style="{color: fontColor}"
                                              type="text"
                                              @click="imageCameraBtnOnClick"
                                              @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                        <template #icon>
                                            <icon-camera/>
                                        </template>
                                        {{ imageCamera }}
                                    </a-button>
                                </a-space>
                            </a-space>
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
    IconFileImage,
    IconHome,
    IconInfoCircle,
    IconLocation,
    IconUser
} from "@arco-design/web-vue/es/icon";
import {defaultPreferenceData, unsplashUrl} from "@/javascripts/publicConstants";
import {
    btnMouseOut,
    btnMouseOver,
    changeThemeColor,
    getSearchEngineDetail,
    isEmpty
} from "@/javascripts/publicFunctions";
import {Message} from "@arco-design/web-vue";

const btnMaxSize = 50;

const props = defineProps({
    display: {
        type: String,
        default: () => {
            return "none"
        },
        required: true
    },
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
    imageData: {
        type: Object,
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
        imagePreviewUrl.value = props.imageData.urls.regular;
        imageLocation.value = isEmpty(props.imageData.location.name) ? "暂无信息" : props.imageData.location.name;
        imageDescription.value = isEmpty(props.imageData.alt_description) ? "暂无信息" : props.imageData.alt_description;
        imageCreateTime.value = getCreateTime(props.imageData.created_at);
        imageCamera.value = isEmpty(props.imageData.exif.name) ? "暂无信息" : props.imageData.exif.name;
    }
})

watch(() => props.preferenceData, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        searchEngineUrl.value = getSearchEngineDetail(newValue.searchEngine).searchEngineUrl;
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
    if (imageLink.value.length !== 0) {
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