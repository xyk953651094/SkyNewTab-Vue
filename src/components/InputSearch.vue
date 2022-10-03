<template>
    <div id="mask" class="mask zIndexMiddle" :style="{display: showMask}"/>
    <a-space direction="vertical"  class="zIndexHigh">
        <a-input-search
            id="inputSearch"
            allow-clear
            placeholder="按下 Enter 键搜索"
            size="large"
            class="componentTheme"
            @focus="onFocus"
            @blur="onBlur"
            @search="onSearch"
            @press-enter="onPressEnter"
        />
    </a-space>
</template>

<script setup>
import "../stylesheets/publicStyles.css"
import { ref } from "vue";
import {fadeIn, fadeOut} from "@/javascripts/publicFunctions";

let showMask = ref("none");


const onFocus = () => {
    fadeIn("#mask", 300);
    showMask.value = "block";
}

const onBlur = () => {
    fadeOut("#mask", 300);
    // showMask.value = "none";
}

const onSearch = (value) => {
    window.location.href = "https://www.bing.com/search?q=" + value;
}

const onPressEnter = () => {
    let value = document.getElementById("inputSearch").firstElementChild.value;
    window.location.href = "https://www.bing.com/search?q=" + value;
}
</script>

<style scoped>
#inputSearch {
    width: 750px;
    border-radius: calc(36px * 0.5);
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.2);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter:blur(10px);
    display: none;
}

/*移动端竖屏样式*/
@media screen and (max-width: 500px) and (orientation:portrait) {
    #inputSearch {
        width: 350px;
        border-radius: calc(36px * 0.5);
    }
}

/*移动端横屏样式*/
@media screen and (max-width: 1000px) and (orientation:landscape) {
    #inputSearch {
        width: 600px;
        border-radius: calc(36px * 0.5);
    }
}
</style>