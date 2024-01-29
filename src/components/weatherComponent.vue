<template>
    <a-space>
        <a-popover
            :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
            :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
            :style="{minWidth: '400px'}"
            position="bl"
        >
            <a-button id="weatherBtn" :shape="preferenceData.buttonShape" :style="{cursor: 'default', display: display}"
                      class="componentTheme zIndexHigh" size="large" type="primary">
                <template #icon>
                    <i :class="weatherIcon"></i>
                </template>
                {{ weatherInfo }}
            </a-button>
            <template #title>
                <a-row align="center">
                    <a-col :span="10">
                        <a-typography-text :style="{color: fontColor}">{{ "天气信息" }}</a-typography-text>
                    </a-col>
                    <a-col :span="14" :style="{textAlign: 'right'}">
                        <a-button :shape="preferenceData.buttonShape"
                                  :style="{color: fontColor}" type="text"
                                  @click="infoBtnOnClick"
                                  @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                            <template #icon>
                                <icon-more-vertical/>
                            </template>
                            {{ "更多信息" }}
                        </a-button>
                    </a-col>
                </a-row>
            </template>
            <template #content>
                <a-list :bordered=false>
                    <a-list-item>
                        <a-space direction="vertical">
                            <a-row :gutter="8">
                                <a-col :span="12">
                                    <a-button :shape="preferenceData.buttonShape"
                                              :style="{color: fontColor}" type="text"
                                              @click="locationBtnOnClick"
                                              @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                        <template #icon>
                                            <icon-location/>
                                        </template>
                                        {{ " 地理位置：" + location }}
                                    </a-button>
                                </a-col>
                                <a-col :span="12">
                                    <a-button :shape="preferenceData.buttonShape"
                                              :style="{color: fontColor, cursor: 'default'}"
                                              type="text"
                                              @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                        <template #icon>
                                            <i class="bi bi-wind"></i>
                                        </template>
                                        {{ " 风速情况：" + windInfo }}
                                    </a-button>
                                </a-col>
                            </a-row>
                            <a-row :gutter="8">
                                <a-col :span="12">
                                    <a-button :shape="preferenceData.buttonShape"
                                              :style="{color: fontColor, cursor: 'default'}"
                                              type="text"
                                              @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                        <template #icon>
                                            <i class="bi bi-moisture"></i>
                                        </template>
                                        {{ " 空气湿度：" + humidity + "%" }}
                                    </a-button>
                                </a-col>
                                <a-col :span="12">
                                    <a-button :shape="preferenceData.buttonShape"
                                              :style="{color: fontColor, cursor: 'default'}"
                                              type="text"
                                              @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                        <template #icon>
                                            <i class="bi bi-water"></i>
                                        </template>
                                        {{ " 空气质量：" + pm25 }}
                                    </a-button>
                                </a-col>
                            </a-row>
                            <a-row :gutter="8">
                                <a-col :span="12">
                                    <a-button :shape="preferenceData.buttonShape"
                                              :style="{color: fontColor, cursor: 'default'}"
                                              type="text"
                                              @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                        <template #icon>
                                            <i class="bi bi-cloud-rain"></i>
                                        </template>
                                        {{ " 降雨概率：" + rainfall }}
                                    </a-button>
                                </a-col>
                                <a-col :span="12">
                                    <a-button :shape="preferenceData.buttonShape"
                                              :style="{color: fontColor, cursor: 'default'}"
                                              type="text"
                                              @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                        <template #icon>
                                            <i class="bi bi-eye"></i>
                                        </template>
                                        {{ " 视线距离：" + visibility }}
                                    </a-button>
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-button :shape="preferenceData.buttonShape"
                                          :style="{color: fontColor, cursor: 'default'}"
                                          type="text"
                                          @mouseout="btnMouseOut(fontColor, $event)"
                                          @mouseover="btnMouseOver(hoverColor, $event)">
                                    <template #icon>
                                        <icon-clock-circle/>
                                    </template>
                                    {{ "上次更新：" + lastRequestTime }}
                                </a-button>
                            </a-row>
                        </a-space>
                    </a-list-item>
                </a-list>
            </template>
        </a-popover>
    </a-space>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {
    btnMouseOut,
    btnMouseOver,
    changeThemeColor,
    getSearchEngineDetail,
    getTimeDetails,
    getWeatherIcon,
    httpRequest
} from "@/javascripts/publicFunctions";
import {defaultPreferenceData} from "@/javascripts/publicConstants";
import {IconClockCircle, IconLocation, IconMoreVertical} from "@arco-design/web-vue/es/icon";
import {Message} from "@arco-design/web-vue";

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

let display = ref("block");
let hoverColor = ref("");
let backgroundColor = ref("");
let fontColor = ref("");
let lastRequestTime = ref("暂无信息");
let weatherIcon = ref("");
let weatherInfo = ref("暂无信息");
let searchEngineUrl = ref("https://www.bing.com/search?q=")
let location = ref("暂无信息");
let humidity = ref("暂无信息");
let pm25 = ref("暂无信息");
let rainfall = ref("暂无信息");
let visibility = ref("暂无信息");
let windInfo = ref("暂无信息");

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        hoverColor.value = props.themeColor.themeColor;
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#weatherBtn", backgroundColor.value, fontColor.value);
    }
});

watch(() => props.preferenceData, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        if (newValue !== oldValue) {
            searchEngineUrl.value = getSearchEngineDetail(newValue.searchEngine).searchEngineUrl;
        }
    }
}, {immediate: true});

watch(() => props.preferenceData.simpleMode, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        display.value = newValue ? "none" : "block";
    }
}, {immediate: true});

function infoBtnOnClick() {
    window.open(searchEngineUrl.value + "天气", "_self");
}

function locationBtnOnClick() {
    if (location.value !== "暂无信息") {
        window.open(searchEngineUrl.value + location.value, "_self");
    } else {
        Message.error("无跳转链接");
    }
}

function setWeather(data) {
    weatherIcon.value = getWeatherIcon(data.weatherData.weather);
    weatherInfo.value = data.weatherData.weather + " ｜ "
        + data.weatherData.temperature + "°C";
    location.value = data.region.replace("|", " · ");
    humidity.value = data.weatherData.humidity;
    pm25.value = data.weatherData.pm25;
    rainfall.value = data.weatherData.rainfall + "%";
    visibility.value = data.weatherData.visibility;
    windInfo.value = data.weatherData.windDirection + " " + data.weatherData.windPower + " 级";
}

function getWeather() {
    let headers = {};
    let url = "https://v2.jinrishici.com/info";
    let data = {};
    httpRequest(headers, url, data, "GET")
        .then(function (resultData) {
            localStorage.setItem("lastWeatherRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
            if (resultData.status === "success" && resultData.data.weatherData !== null) {
                localStorage.setItem("lastWeather", JSON.stringify(resultData.data));      // 保存请求结果，防抖节流
                setWeather(resultData.data);
            }
        })
        .catch(function () {
            // 请求失败也更新请求时间，防止超时后无信息可显示
            // localStorage.setItem("lastWeatherRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流

            // 请求失败时使用上一次请求结果
            let lastWeather = localStorage.getItem("lastWeather");
            if (lastWeather) {
                lastWeather = JSON.parse(lastWeather);
                setWeather(lastWeather);
            }
        })
}

onMounted(() => {
    if (!props.preferenceData.simpleMode) {
        // 防抖节流
        let tempLastRequestTime = localStorage.getItem("lastWeatherRequestTime");
        let nowTimeStamp = new Date().getTime();
        if (tempLastRequestTime === null) {  // 第一次请求时 tempLastRequestTime 为 null，因此直接进行请求赋值 tempLastRequestTime
            getWeather();
        } else if (nowTimeStamp - parseInt(tempLastRequestTime) > 60 * 60 * 1000) {  // 必须多于一小时才能进行新的请求
            getWeather();
        } else {  // 一小时之内使用上一次请求结果
            let lastWeather = localStorage.getItem("lastWeather");
            if (lastWeather) {
                lastWeather = JSON.parse(lastWeather);
                setWeather(lastWeather);
            }
        }

        if (tempLastRequestTime !== null) {
            lastRequestTime.value = getTimeDetails(new Date(parseInt(tempLastRequestTime))).showDetail;
        }
    }
})
</script>

<style scoped>

</style>