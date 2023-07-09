<template>
    <a-space>
        <a-popover
            title="图片信息"
            position="tr"
            :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
            :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
            :style="{width: '500px'}"
        >
            <a-button type="primary" shape="round" size="large" id="authorBtn" class="componentTheme zIndexHigh"
                      @click="authorBtnOnClick"
                      :style="{display: display}">
                <template #icon>
                    <icon-camera/>
                </template>
                {{"by " + authorName + " on Unsplash"}}
            </a-button>
            <template #content>
                <a-list :bordered=false>
                    <a-list-item>
                        <a-list-item-meta :title=authorName >
                            <template #avatar>
                                <a-avatar :image-url="authorIconUrl" :style="{backgroundColor: 'transparent'}"/>
                            </template>
                            <template #description>
                                <a-space>
                                    <a-space>
                                        <i class="bi bi-collection"></i>
                                        <a-typography-text :style="{color: fontColor}">{{" " + authorCollections}}</a-typography-text>
                                    </a-space>
                                    <a-divider direction="vertical" :style="{borderColor: fontColor}"/>
                                    <a-space>
                                        <i class="bi bi-heart"></i>
                                        <a-typography-text :style="{color: fontColor}">{{" " + authorLikes}}</a-typography-text>
                                    </a-space>
                                    <a-divider direction="vertical" :style="{borderColor: fontColor}"/>
                                    <a-space>
                                        <i class="bi bi-images"></i>
                                        <a-typography-text :style="{color: fontColor}">{{" " + authorPhotos}}</a-typography-text>
                                    </a-space>
                                </a-space>
                            </template>
                        </a-list-item-meta>
                        <template #actions>
                            <a-button type="text" shape="circle" @click="gotoUserBtnOnClick" :style="{color: fontColor}">
                                <template #icon><icon-link /></template>
                            </a-button>
                        </template>
                    </a-list-item>
                    <a-list-item>
                        <a-list-item-meta :title=imageLocation :description=imageDescription>
                            <template #avatar>
                                <a-avatar shape="square" :image-url="imagePreviewUrl" :style="{backgroundColor: 'transparent'}"/>
                            </template>
                        </a-list-item-meta>
                        <template #actions>
                            <a-button type="text" shape="circle" @click="gotoImageBtnOnClick" :style="{color: fontColor}">
                                <template #icon><icon-link /></template>
                            </a-button>
                        </template>
                    </a-list-item>
                </a-list>
            </template>
        </a-popover>
    </a-space>
</template>

<script setup>
import {defineProps, ref, watch} from "vue"
import {IconCamera, IconLink} from "@arco-design/web-vue/es/icon";
import {unsplashUrl} from "../javascripts/publicConstants";
import {changeThemeColor, isEmptyString} from "../javascripts/publicFunctions";
import {Message} from "@arco-design/web-vue";

const props = defineProps({
    themeColor: {
        type: Object,
        default: ()=> {
            return {
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
});

let backgroundColor = ref("");
let fontColor = ref("");
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

watch(() => props.themeColor, (newValue, oldValue) => {
    if(newValue !== oldValue) {
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#authorBtn", backgroundColor.value, fontColor.value);
    }
})

watch(() => props.imageData, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        authorName.value = props.imageData.user.name;
        authorLink.value = props.imageData.user.links.html;
        authorIconUrl.value = props.imageData.user.profile_image.small;
        authorCollections.value = props.imageData.user.total_collections;
        authorLikes.value = props.imageData.user.total_likes;
        authorPhotos.value = props.imageData.user.total_photos;
        imageLink.value = props.imageData.links.html;
        imagePreviewUrl.value = props.imageData.urls.thumb;
        imageLocation.value = isEmptyString(props.imageData.location.name)? "暂无信息" : props.imageData.location.name;
        imageDescription.value = isEmptyString(props.imageData.alt_description)? "暂无信息" : props.imageData.alt_description;
    }
})

function authorBtnOnClick() {
    window.open(authorLink.value);
}

function gotoUserBtnOnClick() {
    if(authorLink.value.length !== 0) {
        window.open(authorLink.value + unsplashUrl);
    }
    else {
        Message.error("无跳转链接");
    }
}

function gotoImageBtnOnClick() {
    if(authorLink.value.length !== 0) {
        window.open(imageLink.value + unsplashUrl);
    }
    else {
        Message.error("无跳转链接");
    }
}
</script>

<style scoped>

</style>