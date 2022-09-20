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
                width="200"
                src=""
                style="filter: blur(5px);"
                alt=""/>
        </template>
    </a-image>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {fadeIn, mouseMoveEffect} from "@/javascripts/publicFunctions";

const props = defineProps({
    display: {
        type: String,
        default: () => {
            return "none";
        },
        required: true
    },
    imageData: {
        type: String,
        required: true
    },
    displayEffect: {
        type: String,
        default: () => {
            return "regular";
        },
        required: true
    },
    dynamicEffect: {
        type: String,
        default: () => {
            return "translate";
        },
        required: true
    }
});

let imageLink = ref("");

watch(() => props.imageData, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        if(props.displayEffect === "regular") {
            imageLink.value = props.imageData.urls.regular;
        }
        else if (props.displayEffect === "full") {
            imageLink.value = props.imageData.urls.full;
        }
    }
})

watch(() => props.dynamicEffect, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        mouseMoveEffect(props.dynamicEffect);
    }
})

onMounted(() => {
    let backgroundImage = document.getElementById('backgroundImage');
    if (backgroundImage instanceof HTMLElement) {
        backgroundImage.onload = function () {
            // 设置动态效果
            // backgroundImage.className = "backgroundImage zIndexLow wallpaplerFadeIn";
            fadeIn("#backgroundImage", 3000);
            backgroundImage.style.transform = 'scale(1.05)';
            backgroundImage.style.transition = '5s';
            setTimeout(() => {
                mouseMoveEffect(props.dynamicEffect);
            }, 5000);
        }
    }
})
</script>

<style scoped>
.backgroundImage {
    position: fixed;
    top: -1%;
    left: -1%;
    object-fit: cover;
}
</style>