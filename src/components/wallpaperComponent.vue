<template>
    <a-image
        id="backgroundImage"
        width="102%"
        height="102%"
        class="backgroundImage zIndexLow"
        :src="imageLink"
        :preview=false
        :style="{display: display}"
    >
        <template #loader>
            <img
                width="102%"
                height="102%"
                :src="loadImageLink"
                class="backgroundImage zIndexLow"
                style="filter: blur(5px);"
            />
        </template>
    </a-image>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {imageDynamicEffect} from "../javascripts/publicFunctions";
import "../stylesheets/wallpaperComponent.less"

const props = defineProps({
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
    dynamicEffect: {
        type: String,
        default: () => {
            return "all";
        },
        required: true
    },
    imageQuality: {
        type: String,
        default: () => {
            return "regular";
        },
        required: true
    },
});

let imageLink = ref("");
let loadImageLink = ref("");

watch(() => props.dynamicEffect, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        let backgroundImage = document.getElementById("backgroundImage");
        if (backgroundImage instanceof HTMLElement) {
            imageDynamicEffect(backgroundImage, props.dynamicEffect);
        }
    }
})

watch(() => props.imageData, (newValue, oldValue) => {
    if (newValue !== oldValue && newValue) {
        switch (props.imageQuality) {
            case "full":
                imageLink.value = props.imageData.urls.full;
                loadImageLink.value = props.imageData.urls.small;
                break;
            case "regular":
                imageLink.value = props.imageData.urls.regular;
                loadImageLink.value = props.imageData.urls.small;
                break;
            case "small":
                imageLink.value = props.imageData.urls.small;
                loadImageLink.value = props.imageData.urls.small;
                break;
            default:
                imageLink.value = props.imageData.urls.regular;
                loadImageLink.value = props.imageData.urls.small;
                break;
        }
    }
})

onMounted(() => {
    let backgroundImage = document.getElementById("backgroundImage");
    let backgroundImageDiv = backgroundImage.parentElement;

    if (backgroundImage instanceof HTMLElement) {
        backgroundImage.onload = function () {
            // 设置动态效果
            backgroundImage.className = "backgroundImage zIndexLow wallpaperFadeIn";
            // fadeIn("#backgroundImage", 3000);
            setTimeout(() => {
                backgroundImage.style.transform = "scale(1.05)";
                backgroundImage.style.transition = "5s";
            }, 2000);
            setTimeout(() => {
                backgroundImageDiv.style.perspective = "500px";
                imageDynamicEffect(backgroundImage, props.dynamicEffect);
            }, 7000);
        }
    }
})
</script>

<style scoped>
/*.backgroundImage {*/
/*    position: fixed;*/
/*    top: -1%;*/
/*    left: -1%;*/
/*    object-fit: cover;*/
/*}*/
</style>