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
                <p><i className="bi bi-moisture"></i>{{" 空气湿度：" + humidity}}</p>
                <p><i className="bi bi-water"></i>{{" 空气质量：" + pm25}}</p>
                <p><i className="bi bi-cloud-rain"></i>{{" 降雨概率：" + rainfall}}</p>
                <p><i className="bi bi-eye"></i>{{" 视线距离：" + visibility}}</p>
                <p><i className="bi bi-wind"></i>{{" 风速情况：" + windInfo}}</p>
            </template>
        </a-popover>
    </a-space>
</template>

<script setup>
import {defineProps, ref, watch, onMounted} from "vue";
import {device} from "../javascripts/publicConstants";
import {getWeatherIcon, changeThemeColor, httpRequest} from "../javascripts/publicFunctions";

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
let weatherInfo = ref("暂无天气信息");
let region = ref("暂无地区信息");
let humidity = ref("暂无湿度信息")
let pm25 = ref("暂无PM2.5信息");
let rainfall = ref("暂无降雨信息");
let visibility = ref("暂无视距信息");
let windInfo = ref("暂无风况信息");

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#buttonWeather", backgroundColor.value, fontColor.value);
    }
})

onMounted(() => {
    if(device === "iPhone" || device === "Android") {
        display.value = "none";
    }
    else {
        let url = "https://v2.jinrishici.com/info";
        let data = {};
        httpRequest(url, data, "GET")
            .then(function(resultData){
                if (resultData.status === "success"  && resultData.data.weatherData !== null) {
                    weatherIcon.value = getWeatherIcon(resultData.data.weatherData.weather);
                    weatherInfo.value = resultData.data.weatherData.weather  + "｜"
                        + resultData.data.weatherData.temperature + "°C";
                    region.value = resultData.data.region.replace("|", " · ");
                    humidity.value = resultData.data.weatherData.humidity;
                    pm25.value = resultData.data.weatherData.pm25;
                    rainfall.value = resultData.data.weatherData.rainfall + "%";
                    visibility.value = resultData.data.weatherData.visibility;
                    windInfo.value = resultData.data.weatherData.windDirection + resultData.data.weatherData.windPower + "级";
                }
            })
            .catch(function(){})
    }
})
</script>

<style scoped>

</style>