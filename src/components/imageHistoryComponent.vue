<template>
    <a-space>
        <a-popover
            :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
            :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
            :style="{width: '370px'}"
            position="tr"
        >
            <a-button id="imageHistoryBtn" :shape="preferenceData.buttonShape"
                      :style="{display: display, cursor: 'default'}"
                      class="componentTheme zIndexHigh"
                      size="large"
                      type="primary">
                <template #icon>
                    <icon-history/>
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
                            <a-button :shape="preferenceData.buttonShape"
                                      :style="{color: fontColor}" type="text"
                                      @click="imageLinkBtnOnClick"
                                      @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                <template #icon>
                                    <icon-file-image/>
                                </template>
                                {{ "图片主页" }}
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
                            <a-carousel :style="{display: imageHistoryJson.length === 0 ? 'none' : 'block', width: '100%',height: '210px', borderRadius: '4px'}" animation-name="fade" indicator-type="line"
                                        @change="carouselOnChange">
                                <a-carousel-item v-for="item in imageHistoryJson" :key="item.index"
                                                 :style="{borderRadius: '4px'}">
                                    <a-image
                                        :preview="false"
                                        :src="item.imageUrl"
                                        :style="{borderRadius: '4px'}"
                                        alt="图片加载失败"
                                        height="210px"
                                        width="100%"
                                    >
                                        <template #loader>
                                            <div :style="{width: '100%',height: '210px', borderRadius: '4px'}"
                                                 class="alignCenter">
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
import {btnMouseOut, btnMouseOver, changeThemeColor, isEmpty} from "@/javascripts/publicFunctions";
import {defaultPreferenceData, imageHistoryMaxSize, unsplashUrl} from "@/javascripts/publicConstants";
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
        let tempImageHistoryJson = newValue;
        imageHistoryJson.value = tempImageHistoryJson;
        imageLink.value = tempImageHistoryJson[0].imageLink;
    }
}, {immediate: true})

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