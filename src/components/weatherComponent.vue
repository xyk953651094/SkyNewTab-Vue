<template>
    <a-space>
        <a-popover
                :title="region"
                :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
                :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
        >
            <a-button type="primary" shape="round" size="large" id="weatherBtn" class="componentTheme zIndexHigh"
                      @click="weatherBtnOnClick">
                <template #icon>
                    <i :class="weatherIcon"></i>
                </template>
                {{ weatherInfo }}
            </a-button>
            <template #content>
                <a-space direction="vertical" size="mini" fill>
                    <a-space>
                        <i class="bi bi-moisture"></i>
                        <a-typography-text :style="{color: fontColor}">{{" 空气湿度：" + humidity}}</a-typography-text>
                    </a-space>
                    <a-space>
                        <i class="bi bi-water"></i>
                        <a-typography-text :style="{color: fontColor}">{{" 空气质量：" + pm25}}</a-typography-text>
                    </a-space>
                    <a-space>
                        <i class="bi bi-cloud-rain"></i>
                        <a-typography-text :style="{color: fontColor}">{{" 降雨概率：" + rainfall}}</a-typography-text>
                    </a-space>
                    <a-space>
                        <i class="bi bi-eye"></i>
                        <a-typography-text :style="{color: fontColor}">{{" 视线距离：" + visibility}}</a-typography-text>
                    </a-space>
                    <a-space>
                        <i class="bi bi-wind"></i>
                        <a-typography-text :style="{color: fontColor}">{{" 风速情况：" + windInfo}}</a-typography-text>
                    </a-space>
                </a-space>
            </template>
        </a-popover>
    </a-space>
</template>

<script setup>
import {defineProps, ref, watch, onMounted} from "vue";
import {getWeatherIcon, changeThemeColor, httpRequest} from "../javascripts/publicFunctions";

const props = defineProps({
    themeColor: {
        type: Object,
        required: true,
        default: ()=> {
            return {
                "themeColor": "",
                "componentBackgroundColor": "",
                "componentFontColor": ""
            }
        }
    },
    searchEngine: {
        type: String,
        required: true,
        default: ()=> {
            return "bing"
        }
    }
});

let backgroundColor = ref("");
let fontColor = ref("");
let weatherIcon = ref("");
let weatherInfo = ref("暂无信息");
let searchEngineUrl = ref("https://www.bing.com/search?q=")
let region = ref("暂无信息");
let humidity = ref("暂无信息")
let pm25 = ref("暂无信息");
let rainfall = ref("暂无信息");
let visibility = ref("暂无信息");
let windInfo = ref("暂无信息");

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#weatherBtn", backgroundColor.value, fontColor.value);
    }
});

watch(() => props.searchEngine, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        switch (newValue) {
            case "bing":
                searchEngineUrl.value = "https://www.bing.com/search?q=";
                break;
            case "baidu":
                searchEngineUrl.value = "https://www.baidu.com/s?wd=";
                break;
            case "google":
                searchEngineUrl.value = "https://www.google.com/search?q=";
                break;
            default:
                searchEngineUrl.value = "https://www.bing.com/search?q=";
                break;
        }
    }
});

function weatherBtnOnClick() {
    window.open(searchEngineUrl.value + "天气", "_blank",);
}

function setWeather(data) {
    weatherIcon.value = getWeatherIcon(data.weatherData.weather);
    weatherInfo.value = data.weatherData.weather  + "｜"
        + data.weatherData.temperature + "°C";
    region.value = data.region.replace("|", " · ");
    humidity.value = data.weatherData.humidity;
    pm25.value = data.weatherData.pm25;
    rainfall.value = data.weatherData.rainfall + "%";
    visibility.value = data.weatherData.visibility;
    windInfo.value = data.weatherData.windDirection + data.weatherData.windPower + "级";
}

function getWeather() {
    let headers = {};
    let url = "https://v2.jinrishici.com/info";
    let data = {};
    httpRequest(headers, url, data, "GET")
        .then(function(resultData){
            localStorage.setItem("lastWeatherRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
            if (resultData.status === "success"  && resultData.data.weatherData !== null) {
                localStorage.setItem("lastWeather", JSON.stringify(resultData.data));      // 保存请求结果，防抖节流
                setWeather(resultData.data.weatherData);
            }
        })
        .catch(function(){
            // 请求失败也更新请求时间，防止超时后无信息可显示
            localStorage.setItem("lastWeatherRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
        })
}

onMounted(() => {
    // 防抖节流
    let lastRequestTime = localStorage.getItem("lastWeatherRequestTime");
    let nowTimeStamp = new Date().getTime();
    if(lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
        getWeather();
    }
    else if(nowTimeStamp - parseInt(lastRequestTime) > 60 * 60 * 1000) {  // 必须多于一小时才能进行新的请求
        getWeather();
    }
    else {  // 一小时之内使用上一次请求结果
        let lastWeather = localStorage.getItem("lastWeather");
        if (lastWeather) {
            lastWeather = JSON.parse(lastWeather);
            setWeather(lastWeather);
        }
    }
})
</script>

<style scoped>

</style>