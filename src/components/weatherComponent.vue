<template>
    <a-space>
        <a-popover
            :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
            :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
            :title="region"
        >
            <a-button id="weatherBtn" class="componentTheme zIndexHigh" shape="round" size="large" type="primary"
                      @click="weatherBtnOnClick">
                <template #icon>
                    <i :class="weatherIcon"></i>
                </template>
                {{ weatherInfo }}
            </a-button>
            <template #content>
                <a-space direction="vertical" fill size="mini">
                    <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                              shape="round" type="text">
                        <template #icon>
                            <i class="bi bi-moisture"></i>
                        </template>
                        {{ " 空气湿度：" + humidity }}
                    </a-button>
                    <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                              shape="round" type="text">
                        <template #icon>
                            <i class="bi bi-water"></i>
                        </template>
                        {{ " 空气质量：" + pm25 }}
                    </a-button>
                    <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                              shape="round" type="text">
                        <template #icon>
                            <i class="bi bi-cloud-rain"></i>
                        </template>
                        {{ " 降雨概率：" + rainfall }}
                    </a-button>
                    <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                              shape="round" type="text">
                        <template #icon>
                            <i class="bi bi-eye"></i>
                        </template>
                        {{ " 视线距离：" + visibility }}
                    </a-button>
                    <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                              shape="round" type="text">
                        <template #icon>
                            <i class="bi bi-wind"></i>
                        </template>
                        {{ " 风速情况：" + windInfo }}
                    </a-button>

<!--                    <a-space>-->
<!--                        <i class="bi bi-moisture"></i>-->
<!--                        <a-typography-text :style="{color: fontColor}">{{ " 空气湿度：" + humidity }}</a-typography-text>-->
<!--                    </a-space>-->
<!--                    <a-space>-->
<!--                        <i class="bi bi-water"></i>-->
<!--                        <a-typography-text :style="{color: fontColor}">{{ " 空气质量：" + pm25 }}</a-typography-text>-->
<!--                    </a-space>-->
<!--                    <a-space>-->
<!--                        <i class="bi bi-cloud-rain"></i>-->
<!--                        <a-typography-text :style="{color: fontColor}">{{ " 降雨概率：" + rainfall }}</a-typography-text>-->
<!--                    </a-space>-->
<!--                    <a-space>-->
<!--                        <i class="bi bi-eye"></i>-->
<!--                        <a-typography-text :style="{color: fontColor}">{{ " 视线距离：" + visibility }}-->
<!--                        </a-typography-text>-->
<!--                    </a-space>-->
<!--                    <a-space>-->
<!--                        <i class="bi bi-wind"></i>-->
<!--                        <a-typography-text :style="{color: fontColor}">{{ " 风速情况：" + windInfo }}</a-typography-text>-->
<!--                    </a-space>-->
                </a-space>
            </template>
        </a-popover>
    </a-space>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {changeThemeColor, getFontColor, getWeatherIcon, httpRequest} from "../javascripts/publicFunctions";

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
    searchEngine: {
        type: String,
        required: true,
        default: () => {
            return "bing"
        }
    }
});

let hoverColor = ref("");
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
        hoverColor.value = props.themeColor.themeColor;
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#weatherBtn", backgroundColor.value, fontColor.value);
    }
});

watch(() => props.searchEngine, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        switch (newValue) {
            case "baidu":
                searchEngineUrl.value = "https://www.baidu.com/s?wd=";
                break;
            case "bing":
                searchEngineUrl.value = "https://www.bing.com/search?q=";
                break;
            case "brave":
                searchEngineUrl.value = "https://search.brave.com/search?q=";
                break;
            case "duckduckgo":
                searchEngineUrl.value = "https://duckduckgo.com/?q=";
                break;
            case "ghostery":
                searchEngineUrl.value = "https://ghosterysearch.com/search?q=";
                break;
            case "google":
                searchEngineUrl.value = "https://www.google.com/search?q=";
                break;
            case "sogou":
                searchEngineUrl.value = "https://www.sogou.com/web?query=";
                break;
            case "startpage":
                searchEngineUrl.value = "https://startpage.com/do/search?q=";
                break;
            case "wuzhuiso":
                searchEngineUrl.value = "https://www.wuzhuiso.com/s?ie=utf-8&fr=none&q=";
                break;
            case "yandex":
                searchEngineUrl.value = "https://yandex.com/search/?text=";
                break;
            default:
                searchEngineUrl.value = "https://www.bing.com/search?q=";
                break;
        }
    }
});

function btnMouseOver() {
    this.style.backgroundColor = hoverColor.value;
    this.style.color = getFontColor(hoverColor.value);
}

function btnMouseOut() {
    this.style.backgroundColor = "transparent";
    this.style.color = fontColor.value;
}

function weatherBtnOnClick() {
    window.open(searchEngineUrl.value + "天气", "_blank",);
}

function setWeather(data) {
    weatherIcon.value = getWeatherIcon(data.weatherData.weather);
    weatherInfo.value = data.weatherData.weather + "｜"
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
        .then(function (resultData) {
            localStorage.setItem("lastWeatherRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
            if (resultData.status === "success" && resultData.data.weatherData !== null) {
                localStorage.setItem("lastWeather", JSON.stringify(resultData.data));      // 保存请求结果，防抖节流
                setWeather(resultData.data.weatherData);
            }
        })
        .catch(function () {
            // 请求失败也更新请求时间，防止超时后无信息可显示
            localStorage.setItem("lastWeatherRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
        })
}

onMounted(() => {
    // 防抖节流
    let lastRequestTime = localStorage.getItem("lastWeatherRequestTime");
    let nowTimeStamp = new Date().getTime();
    if (lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
        getWeather();
    } else if (nowTimeStamp - parseInt(lastRequestTime) > 60 * 60 * 1000) {  // 必须多于一小时才能进行新的请求
        getWeather();
    } else {  // 一小时之内使用上一次请求结果
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