<template>
    <div class="mask zIndexMiddle" :style="{display: showMask}"/>
    <a-space direction="vertical"  class="zIndexHigh">
        <a-input-search
            id="inputSearch"
            allow-clear=true
            placeholder="请输入搜索内容"
            size="large"
            @focus="onFocus"
            @blur="onBlur"
            @search="onSearch"
            @press-enter="onPressEnter"
            :style="{width:'750px', borderRadius: 'calc(36px * 0.5)'}"/>
    </a-space>
</template>

<script setup>
import "../css/publicStyles.css"
import { ref } from "vue";

let showMask = ref("none");

const onFocus = () => {
    showMask.value = "block";
}

const onBlur = () => {
    showMask.value = "none";
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

</style>