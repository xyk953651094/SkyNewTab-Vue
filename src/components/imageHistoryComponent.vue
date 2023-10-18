<template>
    <a-space>
        <a-popover
            :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
            :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
            :style="{width: '370px'}"
            position="tr"
        >
            <a-button id="historyBtn" :style="{display: display, cursor: 'default'}" class="componentTheme zIndexHigh"
                      :shape="preferenceData.buttonShape"
                      size="large"
                      type="primary">
                <template #icon>
                    <icon-history />
                </template>
            </a-button>
            <template #title>
                <a-typography-text :style="{color: fontColor}">{{ "历史记录 " + imageHistoryJson.length + " / " + imageArrayMaxSize }}</a-typography-text>
            </template>
            <template #content>
                <a-row class="alignCenter">
                    <a-empty :style="{display: imageHistoryJson.length === 0 ? 'block' : 'none'}"/>
                    <a-carousel indicator-type="line" animation-name="fade" :default-current="imageHistoryJson.length"
                                :style="{display: imageHistoryJson.length === 0 ? 'none' : 'block', width: '350px',height: '210px'}">
                        <a-carousel-item v-for="item in imageHistoryJson" :key="item.index">
                            <a-image
                                :src="item.imageUrl"
                                alt="图片加载失败"
                                height="210px"
                                width="350px"
                                :preview="false"
                                :style="{cursor: 'pointer'}"
                                @click="imageOnClick(item)"
                            >
                            </a-image>
                        </a-carousel-item>
                    </a-carousel>
                </a-row>
            </template>
        </a-popover>
    </a-space>
</template>

<script setup>
import {IconHistory} from "@arco-design/web-vue/es/icon";
import {defineProps, onMounted, ref, watch} from "vue";
import {changeThemeColor} from "../javascripts/publicFunctions";
import {defaultPreferenceData, imageArrayMaxSize, unsplashUrl} from "../javascripts/publicConstants";
import {Message} from "@arco-design/web-vue";

const props = defineProps({
    display: {
        type: String,
        default: () => {
            return "none"
        },
        required: true
    },
    imageHistory: {
        type: Object,
        default: () => {
            return []
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
    preferenceData: {
        type: Object,
        required: true,
        default: () => {
            return defaultPreferenceData
        }
    }
});

let hoverColor = ref("");
let backgroundColor = ref("");
let fontColor = ref("");
let imageHistoryJson = ref([]);

onMounted(() => {
    // 获取缓存图片列表
    let imageHistoryStorage = localStorage.getItem("imageHistory");
    if(imageHistoryStorage !== null) {
        imageHistoryJson.value = JSON.parse(imageHistoryStorage);
    }
})

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        hoverColor.value = props.themeColor.themeColor;
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#historyBtn", backgroundColor.value, fontColor.value);
    }
})

watch(() => props.imageHistory, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        imageHistoryJson.value = newValue;
    }
})

function imageOnClick(item) {
    if(item.links.html) {
        window.open(item.link + unsplashUrl, '_blank');
    } else {
        Message.error("无跳转链接");
    }
}
</script>

<style scoped>

</style>