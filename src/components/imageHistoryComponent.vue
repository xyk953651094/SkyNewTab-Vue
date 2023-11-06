<template>
    <a-space>
        <a-popover
            :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
            :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
            :style="{width: '370px'}"
            position="tr"
        >
            <a-button id="imageHistoryBtn" :style="{display: display, cursor: 'default'}" class="componentTheme zIndexHigh"
                      :shape="preferenceData.buttonShape"
                      size="large"
                      type="primary">
                <template #icon>
                    <icon-history />
                </template>
            </a-button>
            <template #title>
                <a-row align="center">
                    <a-col :span="10">
                        <a-typography-text :style="{color: fontColor}">
                            {{ "历史记录 " + imageHistoryJson.length + " / " + imageHistoryMaxSize }}
                        </a-typography-text>
                    </a-col>
                    <a-col :span="14" :style="{textAlign: 'right'}">
                        <a-space>
                            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                                      :shape="preferenceData.buttonShape"
                                      type="text" @click="imageLinkBtnOnClick">
                                <template #icon>
                                    <icon-file-image />
                                </template>
                                {{ "当前历史图片主页" }}
                            </a-button>
                        </a-space>
                    </a-col>
                </a-row>
            </template>
            <template #content>
                <a-list :bordered=false>
                    <a-list-item>
                        <a-row class="alignCenter">
                            <a-empty :style="{display: imageHistoryJson.length === 0 ? 'block' : 'none'}"/>
                            <a-carousel indicator-type="line" animation-name="fade" @change="carouselOnChange"
                                        :style="{display: imageHistoryJson.length === 0 ? 'none' : 'block', width: '350px',height: '210px', borderRadius: '4px'}">
                                <a-carousel-item v-for="item in imageHistoryJson" :key="item.index" :style="{borderRadius: '4px'}">
                                    <a-image
                                        :src="item.imageUrl"
                                        alt="图片加载失败"
                                        height="210px"
                                        width="350px"
                                        :preview="false"
                                        :style="{borderRadius: '4px'}"
                                    >
                                        <template #loader>
                                            <div :style="{width: '350px',height: '210px', borderRadius: '4px'}" class="alignCenter">
                                                <a-spin dot tip="加载中，请稍后..."/>
                                            </div>
                                        </template>
                                    </a-image>
                                </a-carousel-item>
                            </a-carousel>
                        </a-row>
                    </a-list-item>
                </a-list>
            </template>
        </a-popover>
    </a-space>
</template>

<script setup>
import {IconFileImage, IconHistory} from "@arco-design/web-vue/es/icon";
import {defineProps, onMounted, ref, watch} from "vue";
import {changeThemeColor, getFontColor, isEmpty} from "../javascripts/publicFunctions";
import {defaultPreferenceData, imageHistoryMaxSize, unsplashUrl} from "../javascripts/publicConstants";
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
let imageLink = ref("");

onMounted(() => {
    // 获取缓存图片列表
    let imageHistoryStorage = localStorage.getItem("imageHistory");
    if(imageHistoryStorage !== null) {
        let tempImageHistoryJson = JSON.parse(imageHistoryStorage);
        if (!isEmpty(tempImageHistoryJson)) {
            tempImageHistoryJson = tempImageHistoryJson.reverse(); // 重新到旧排序
            imageHistoryJson.value = tempImageHistoryJson;
            imageLink.value = tempImageHistoryJson[0].imageLink;
        }
    }
})

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        hoverColor.value = props.themeColor.themeColor;
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#imageHistoryBtn", backgroundColor.value, fontColor.value);
    }
})

watch(() => props.imageHistory, (newValue, oldValue) => {
    if (newValue.length > 0 && newValue !== oldValue) {
        let tempImageHistoryJson = newValue.reverse(); // 重新到旧排序
        imageHistoryJson.value = tempImageHistoryJson;
        imageLink.value = tempImageHistoryJson[0].imageLink;
    }
})

function btnMouseOver() {
    this.style.backgroundColor = hoverColor.value;
    this.style.color = getFontColor(hoverColor.value);
}

function btnMouseOut() {
    this.style.backgroundColor = "transparent";
    this.style.color = fontColor.value;
}

function imageLinkBtnOnClick() {
    if (!isEmpty(imageLink.value)) {
        window.open(imageLink.value + unsplashUrl, "_blank");
    } else {
        Message.error("无跳转链接");
    }
}

function carouselOnChange(currentIndex) {
    imageLink.value = imageHistoryJson.value[currentIndex - 1].imageLink
}
</script>

<style scoped>

</style>