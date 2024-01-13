<template>
    <a-col :span="24" class="alignCenter">
        <div id="searchMask" :style="{display: displayMask}" class="searchMask zIndexMiddle"/>
        <a-input-search
            id="searchInput"
            :style="{
                borderRadius: preferenceData.buttonShape === 'round' ? '18px' : '',
                display: display
            }"
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
                <a-button id="searchEngineIconBtn" :shape="preferenceData.buttonShape" size="small"
                          type="text" @click="changeSearchEngine">
                    <template #icon>
                        <i :class="'bi bi-' + searchEngineValue"></i>
                    </template>
                    {{ searchEngineName }}
                </a-button>
                <a-divider direction="vertical" :style="{borderColor: backgroundColor}"/>
            </template>
        </a-input-search>
    </a-col>
</template>

<script setup lang="jsx">
import {defineProps, ref, watch} from "vue";
import {changeThemeColor, fadeIn, fadeOut, getSearchEngineDetail} from "@/javascripts/publicFunctions";
import "@/stylesheets/searchComponent.less"
import {defaultPreferenceData} from "@/javascripts/publicConstants";

let display = ref("inline-flex");
let backgroundColor = ref("");
let fontColor = ref("");
let searchEngineName = ref("必应");
let searchEngineValue = ref("bing");
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
        searchEngineValue.value = searchEngineDetail.searchEngineValue;
        searchEngineUrl.value = searchEngineDetail.searchEngineUrl;
    }
}, {immediate: true})

watch(() => props.preferenceData.simpleMode, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        display.value = newValue ? "none" : "inline-flex";
    }
}, {immediate: true});

function onFocus(event) {
    console.log(event.target);
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
    const searchEngines = ["bing", "google"];
    let currentIndex = searchEngines.indexOf(searchEngineValue.value);
    let nextIndex = 0;
    if (currentIndex !== searchEngines.length - 1) {
        nextIndex = currentIndex + 1;
    }

    let searchEngineDetail = getSearchEngineDetail(searchEngines[nextIndex]);
    searchEngineName.value = searchEngineDetail.searchEngineName;
    searchEngineValue.value = searchEngineDetail.searchEngineValue;
    searchEngineUrl.value = searchEngineDetail.searchEngineUrl;
}
</script>

<style scoped>

</style>