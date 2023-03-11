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
// import "../stylesheets/publicStyles.less"
import {defineProps, ref, watch} from "vue";
import {fadeIn, fadeOut} from "../javascripts//publicFunctions";
import "../stylesheets/searchComponent.less"

let showMask = ref("none");
let searchEngineUrl = ref("https://www.bing.com/search?q=");

const props = defineProps({
    searchEngine: {
        type: String,
        default: ()=> {
            return "bing";
        },
        required: true
    }
});

watch(() => props.searchEngine, (newValue, oldValue) => {
    if(newValue !== oldValue) {
        switch (props.searchEngine) {
            case "bing": searchEngineUrl.value = "https://www.bing.com/search?q="; break;
            case "baidu": searchEngineUrl.value = "https://www.baidu.com/s?wd="; break;
            case "google": searchEngineUrl.value = "https://www.google.com/search?q="; break;
            default: searchEngineUrl.value = "https://www.bing.com/search?q="; break;
        }
    }
})

const onFocus = () => {
    fadeIn("#mask", 300);
    showMask.value = "block";
}

const onBlur = () => {
    fadeOut("#mask", 300);
    // showMask.value = "none";
}

const onSearch = (value) => {
    window.location.href = searchEngineUrl.value + value;
}

const onPressEnter = () => {
    let value = document.getElementById("inputSearch").firstElementChild.value;
    window.location.href = searchEngineUrl.value + value;
}
</script>

<style scoped>

</style>