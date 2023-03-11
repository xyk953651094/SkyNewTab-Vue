<template>
    <a-space>
        <a-popover
            :title="'摄影师：' + authorName"
            :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
            :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
        >
            <a-button type="primary" shape="round" size="large" id="buttonAuthor" class="componentTheme zIndexHigh" @click="onclick"
                      :style="{display: display}">
                <template #icon>
                    <icon-camera/>
                </template>
                {{ "by " + authorName + " on Unsplash" }}
            </a-button>
            <template #content>
                <div class="authorPopoverContentDiv">
                    <div class="avatarDiv center">
                        <Avatar size={32}>
                            <img :src="userAvatar"/>
                        </Avatar>
                    </div>
                    <div class="userDiv">
                        <p class="authorPopoverP"><i class="bi bi-person"></i>{{" " + userName}}</p>
                        <p class="authorPopoverP"><i class="bi bi-geo-alt"></i>{{userLocation == null? " 暂无信息" : " " + userLocation}}</p>
                    </div>
                </div>
            </template>
        </a-popover>
    </a-space>
</template>

<script setup>
import {defineProps, ref, watch} from "vue"
import {IconCamera} from "@arco-design/web-vue/es/icon";
import {unsplashUrl} from "@/javascripts/publicConstants";
import {changeThemeColor} from "@/javascripts/publicFunctions";
import {Avatar, Message} from "@arco-design/web-vue";
import "../stylesheets/authorComponent.less"

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
    }
});

let backgroundColor = ref("");
let fontColor = ref("");
let authorName = ref("暂无信息");
let userAvatar = ref("");
let userName = ref("暂无信息");
let userLocation = ref("暂无信息");
let authorLink = ref("");

watch(() => props.themeColor, (newValue, oldValue) => {
    if(newValue !== oldValue) {
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#buttonAuthor", backgroundColor.value, fontColor.value);
    }
})

watch(() => props.imageData, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        authorName.value = props.imageData.user.name;
        userAvatar.value = props.imageData.user.profile_image.large;
        userName.value = props.imageData.user.username;
        userLocation.value = props.imageData.user.location;
        authorLink.value = props.imageData.user.links.html
    }
})

const onclick = () => {
    if(authorLink.value.length !== 0) {
        window.open(authorLink.value + unsplashUrl);
    }
    else {
        Message.error("无跳转链接");
    }
}
</script>

<style scoped>

</style>