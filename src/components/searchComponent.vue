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
import {fadeIn, fadeOut, getSearchEngineDetail} from "../javascripts/publicFunctions";
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
        searchEngineUrl.value = getSearchEngineDetail(newValue).searchEngineUrl;
        searchEngineIconUrl.value = getSearchEngineDetail(newValue).searchEngineIconUrl;
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