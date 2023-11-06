<template>
    <a-col :span="24" class="alignCenter">
        <div id="searchMask" :style="{display: displayMask}" class="searchMask zIndexMiddle"/>
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
            :style="{borderRadius: (preferenceData.buttonShape === 'round' ? '18px' : '')}"
        >
            <template #prefix>
                <a-button type="text" :shape="preferenceData.buttonShape" size="small"
                          id="searchEngineIconBtn" @click="changeSearchEngine">
                    {{searchEngineName}}
                </a-button>
                <a-divider direction="vertical" />
            </template>
        </a-input-search>
    </a-col>
</template>

<script setup>
import {defineProps, ref, watch} from "vue";
import {changeThemeColor, fadeIn, fadeOut, getSearchEngineDetail} from "../javascripts/publicFunctions";
import "../stylesheets/searchComponent.less"
import {defaultPreferenceData} from "../javascripts/publicConstants";

let backgroundColor = ref("");
let fontColor = ref("");
let searchEngineName = ref("Bing");
let searchEngineUrl = ref("https://www.bing.com/search?q=");
let displayMask = ref("none");

const props = defineProps({
    themeColor: {
        type: Object,
        required: true,
        default: () => {
            return {
                "themeColor": "",
                "componentBackgroundColor": "",
                "componentFontColor": ""
            }
        }
    },
    preferenceData: {
        type: Object,
        required: true,
        default: () => {
            return defaultPreferenceData
        }
    }
});

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#searchEngineIconBtn", backgroundColor.value, fontColor.value);
    }
})

watch(() => props.preferenceData, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        let searchEngineDetail = getSearchEngineDetail(newValue.searchEngine);
        searchEngineName.value = searchEngineDetail.searchEngineName;
        searchEngineUrl.value = searchEngineDetail.searchEngineUrl;
    }
})

function onFocus() {
    fadeIn("#searchMask", 300);
    displayMask.value = "block";
}

function onBlur() {
    fadeOut("#searchMask", 300);
}

function onSearch(value) {
    window.location.href = searchEngineUrl.value + value;
}

function onPressEnter() {
    let value = document.getElementById("searchInput").children[1].value;
    window.open(searchEngineUrl.value + value, "_blank");
}

function changeSearchEngine() {
    const searchEngines = ["Baidu", "Bing", "Google", "Yandex"];
    let currentIndex = searchEngines.indexOf(searchEngineName.value);
    let nextIndex = 0;
    if (currentIndex !== searchEngines.length - 1) {
        nextIndex = currentIndex + 1;
    }

    searchEngineName.value = searchEngines[nextIndex];
    searchEngineUrl.value = getSearchEngineDetail(searchEngines[nextIndex].toLowerCase()).searchEngineUrl
}
</script>

<style scoped>

</style>