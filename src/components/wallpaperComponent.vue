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
            <canvas id="blurHashCanvas" class="blurHashCanvas zIndexLow"></canvas>
        </template>
    </a-image>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {imageDynamicEffect, isEmptyString} from "../javascripts/publicFunctions";
import "../stylesheets/wallpaperComponent.less"
import {decode} from "blurhash"

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
let blurHashCode = ref("");

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

    blurHashCode.value = newValue.blur_hash;
    if (!isEmptyString(blurHashCode.value)) {
        const blurHashCanvas = document.getElementById("blurHashCanvas");
        if (blurHashCanvas instanceof HTMLCanvasElement) {
            let blurHashImage = decode(blurHashCode.value, window.innerWidth, window.innerHeight);
            let ctx = blurHashCanvas.getContext("2d");
            if (ctx) {
                const imageData = new ImageData(blurHashImage, window.innerWidth, window.innerHeight);
                ctx.putImageData(imageData, 0, 0);
            }

            blurHashCanvas.className = "blurHashCanvas zIndexLow wallpaperFadeIn";
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

</style>