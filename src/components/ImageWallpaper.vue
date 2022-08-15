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
                src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
                style="filter: blur(5px);"
                alt="壁纸"/>
        </template>
    </a-image>
</template>

<script setup>
import {defineProps, onMounted} from "vue";
import {mouseMoveEffect} from "@/javascripts/publicFunctions";

const props = defineProps({
    display: {
        type: String,
        default: () => {
            return "none";
        },
        required: true
    },
    imageLink: {
        type: String,
        default: () => {
            return "";
        },
        required: true
    }
});
console.log(props);

onMounted(() => {
    let backgroundImage = document.getElementById('backgroundImage');
    if (backgroundImage instanceof HTMLElement) {
        backgroundImage.onload = function () {
            // 设置动态效果
            backgroundImage.style.transform = 'scale(1.05)';
            backgroundImage.style.transition = '5s';
            setTimeout(mouseMoveEffect, 5000);
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