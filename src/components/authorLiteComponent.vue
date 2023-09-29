<template>
    <a-button id="authorLiteBtn" :style="{display: display, cursor: 'default'}" class="componentTheme zIndexHigh"
              :shape="preferenceData.buttonShape"
              size="large" type="primary" @click="imageLinkBtnOnClick">
        <template #icon>
            <icon-link/>
        </template>
    </a-button>
</template>

<script setup>
import {defineProps, ref, watch} from "vue"
import {IconLink,} from "@arco-design/web-vue/es/icon";
import {defaultPreferenceData, unsplashUrl} from "../javascripts/publicConstants";
import {changeThemeColor, getSearchEngineDetail} from "../javascripts/publicFunctions";
import {Message} from "@arco-design/web-vue";

const props = defineProps({
    display: {
        type: String,
        default: () => {
            return "none"
        },
        required: true
    },
    themeColor: {
        type: Object,
        default: () => {
            return {
                "themeColor": "",
                "componentBackgroundColor": "",
                "componentFontColor": ""
            }
        },
        required: true
    },
    imageData: {
        type: Object,
        required: true
    },
    preferenceData: {
        type: Object,
        required: true,
        default: () => {
            return defaultPreferenceData
        }
    }
});

let backgroundColor = ref("");
let fontColor = ref("");
let searchEngineUrl = ref("https://www.bing.com/search?q=");
let imageLink = ref("");

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#authorLiteBtn", backgroundColor.value, fontColor.value);
    }
})

watch(() => props.imageData, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        imageLink.value = props.imageData.links.html;
    }
})

watch(() => props.preferenceData, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        searchEngineUrl.value = getSearchEngineDetail(newValue.searchEngine).searchEngineUrl;
    }
});

function imageLinkBtnOnClick() {
    if (imageLink.value.length !== 0) {
        window.open(imageLink.value + unsplashUrl);
    } else {
        Message.error("无跳转链接");
    }
}
</script>

<style scoped>

</style>