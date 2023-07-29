<template>
    <a-space>
        <a-image
            :src="imagePreviewUrl"
            :style="{borderRadius: '10px'}"
            alt="图片加载失败"
            width="200px"
        />
        <a-space direction="vertical">
            <a-button :href="authorLink" :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}" shape="round"
                      target="_blank" type="text">
                <template #icon>
                    <icon-user/>
                </template>
                {{ authorName }}
            </a-button>
            <a-button :href="imageLink" :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}" shape="round"
                      target="_blank" type="text">
                <template #icon>
                    <icon-location/>
                </template>
                {{ imageLocation }}
            </a-button>
            <a-button :href="imageLink" :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}" shape="round"
                      target="_blank" type="text">
                <template #icon>
                    <icon-info-circle/>
                </template>
                {{ imageDescription }}
            </a-button>
        </a-space>
    </a-space>
</template>

<script setup>
import {defineProps, ref, watch} from "vue";
import {IconInfoCircle, IconLocation, IconUser} from "@arco-design/web-vue/es/icon";
import {getFontColor, isEmptyString} from "../javascripts/publicFunctions";
import "../stylesheets/popupComponent.less"

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

watch(() => props.imageData, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        authorName.value = props.imageData.user.name;
        authorLink.value = props.imageData.user.links.html;
        imageLink.value = props.imageData.links.html;
        imagePreviewUrl.value = props.imageData.urls.thumb;
        imageLocation.value = isEmptyString(props.imageData.location.name) ? "暂无信息" : props.imageData.location.name;
        imageDescription.value = isEmptyString(props.imageData.alt_description) ? "暂无信息" : props.imageData.alt_description;
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