<template>
    <a-col :span="24" class="center">
        <div id="mask" :style="{display: showMask}" class="mask zIndexMiddle"/>
        <a-input-search
            id="searchInput"
            allow-clear
            class="componentTheme zIndexHigh"
            placeholder="按下 Enter 键搜索"
            size="large"
            @blur="onBlur"
            @focus="onFocus"
            @search="onSearch"
            @press-enter="onPressEnter"
        >
            <template #prefix>
                <a-avatar :image-url="searchEngineIconUrl" :size="24" :style="{backgroundColor: 'transparent'}"/>
            </template>
        </a-input-search>
    </a-col>
</template>

<script setup>
// import "../stylesheets/publicStyles.less"
import {defineProps, ref, watch} from "vue";
import {fadeIn, fadeOut} from "../javascripts/publicFunctions";
import "../stylesheets/searchComponent.less"

let showMask = ref("none");
let searchEngineUrl = ref("https://www.bing.com/search?q=");
let searchEngineIconUrl = ref("https://www.bing.com/favicon.ico")

const props = defineProps({
    searchEngine: {
        type: String,
        default: () => {
            return "bing";
        },
        required: true
    }
});

watch(() => props.searchEngine, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        switch (props.searchEngine) {

            case "baidu":
                searchEngineUrl.value = "https://www.baidu.com/s?wd=";
                searchEngineIconUrl.value = "https://www.baidu.com/favicon.ico";
                break;
            case "bing":
                searchEngineUrl.value = "https://www.bing.com/search?q=";
                searchEngineIconUrl.value = "https://www.bing.com/favicon.ico";
                break;
            case "brave":
                searchEngineUrl.value = "https://search.brave.com/search?q=";
                searchEngineIconUrl.value = "https://cdn.search.brave.com/serp/v2/_app/immutable/assets/favicon.c09fe1a1.ico";
                break;
            case "duckduckgo":
                searchEngineUrl.value = "https://duckduckgo.com/?q=";
                searchEngineIconUrl.value = "https://duckduckgo.com/favicon.ico";
                break;
            case "ghostery":
                searchEngineUrl.value = "https://ghosterysearch.com/search?q=";
                searchEngineIconUrl.value = "https://ghosterysearch.com/favicon.ico";
                break;
            case "google":
                searchEngineUrl.value = "https://www.google.com/search?q=";
                searchEngineIconUrl.value = "https://www.google.com/favicon.ico";
                break;
            case "sogou":
                searchEngineUrl.value = "https://www.sogou.com/web?query=";
                searchEngineIconUrl.value = "https://www.sogou.com/favicon.ico";
                break;
            case "startpage":
                searchEngineUrl.value = "https://startpage.com/do/search?q=";
                searchEngineIconUrl.value = "https://www.startpage.com/sp/cdn/favicons/favicon-32x32--default.png";
                break;
            case "wuzhuiso":
                searchEngineUrl.value = "https://www.wuzhuiso.com/s?ie=utf-8&fr=none&q=";
                searchEngineIconUrl.value = "https://www.wuzhuiso.com/favicon.ico";
                break;
            case "yandex":
                searchEngineUrl.value = "https://yandex.com/search/?text=";
                searchEngineIconUrl.value = "https://yastatic.net/s3/home-static/_/92/929b10d17990e806734f68758ec917ec.png";
                break;
            default:
                searchEngineUrl.value = "https://www.bing.com/search?q=";
                searchEngineIconUrl.value = "https://www.bing.com/favicon.ico";
                break;
        }
    }
})

function onFocus() {
    fadeIn("#mask", 300);
    showMask.value = "block";
}

function onBlur() {
    fadeOut("#mask", 300);
    // showMask.value = "none";
}

function onSearch(value) {
    window.location.href = searchEngineUrl.value + value;
}

function onPressEnter() {
    let value = document.getElementById("searchInput").firstElementChild.value;
    window.location.href = searchEngineUrl.value + value;
}
</script>

<style scoped>

</style>