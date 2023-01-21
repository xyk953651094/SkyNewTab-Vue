<template>
    <a-space>
        <a-popover
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
            <template #title>
                <p><icon-location />{{" " + region}}</p>
            </template>
            <template #content>
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
import {IconLocation} from "@arco-design/web-vue/es/icon";
import {getWeatherIcon, changeThemeColor} from "../javascripts/publicFunctions";
import $ from "jquery";

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
let display = ref("none");
let weatherIcon = ref("");
let weatherInfo = ref("暂无天气信息");
let region = ref("暂无地区信息");
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
    $.ajax({
        url: "https://v2.jinrishici.com/info",
        type: "GET",
        timeout: 10000,
        success: (resultData) => {
            if (resultData.status === "success"  && resultData.data.weatherData !== null) {
                display.value = "block";
                weatherIcon.value = getWeatherIcon(resultData.data.weatherData.weather);
                weatherInfo.value = resultData.data.weatherData.weather  + "｜"
                    + resultData.data.weatherData.temperature + "°C";
                region.value = resultData.data.region.replace("|", " · ");
                pm25.value = resultData.data.weatherData.pm25;
                rainfall.value = resultData.data.weatherData.rainfall + "%";
                visibility.value = resultData.data.weatherData.visibility;
                windInfo.value = resultData.data.weatherData.windDirection + resultData.data.weatherData.windPower + "级";
            }
            else {
                display.value = "none";
            }
        },
        error: function () {}
    });
})
</script>

<style scoped>

</style>