<template>
    <a-space>
        <a-popover
                :title="region"
                :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
                :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
        >
            <a-button type="primary" shape="round" size="large" id="buttonWeather" class="componentTheme zIndexHigh"
                      :style="{display: display}">
                <template #icon>
                    <i :class="weatherIcon"></i>
                </template>
                {{ weatherInfo }}
            </a-button>
            <template #content>
                <p><i class="bi bi-moisture"></i>{{" 空气湿度：" + humidity}}</p>
                <p><i class="bi bi-water"></i>{{" 空气质量：" + pm25}}</p>
                <p><i class="bi bi-cloud-rain"></i>{{" 降雨概率：" + rainfall}}</p>
                <p><i class="bi bi-eye"></i>{{" 视线距离：" + visibility}}</p>
                <p><i class="bi bi-wind"></i>{{" 风速情况：" + windInfo}}</p>
            </template>
        </a-popover>
    </a-space>
</template>

<script setup>
import {defineProps, ref, watch, onMounted} from "vue";
import {device} from "@/javascripts/publicConstants";
import {getWeatherIcon, changeThemeColor, httpRequest} from "@/javascripts/publicFunctions";

const props = defineProps({
    themeColor: {
        type: Object,
        required: true,
        default: ()=> {
            return {
                "componentBackgroundColor": "",
                "componentFontColor": ""
            }
        }
    }
});

let backgroundColor = ref("");
let fontColor = ref("");
let display = ref("block");
let weatherIcon = ref("");
let weatherInfo = ref("暂无信息");
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
        changeThemeColor("#buttonWeather", backgroundColor.value, fontColor.value);
    }
})

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
    let url = "https://v2.jinrishici.com/info";
    let data = {};
    httpRequest(url, data, "GET")
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
    if(device === "iPhone" || device === "Android") {
        display.value = "none";
    }
    else {
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
    }
})
</script>

<style scoped>

</style>