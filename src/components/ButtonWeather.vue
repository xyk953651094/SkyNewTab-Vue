<template>
    <a-space>
        <a-popover :title="region"
                   :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
                   :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }">
            <a-button type="primary" shape="round" size="large" id="buttonWeather" class="componentTheme zIndexHigh"
                      :style="{display: display}">
                {{ weatherInfo }}
            </a-button>
            <template #content>
                <p>{{"空气：" + pm25}}</p>
                <p>{{"降雨：" + rainfall}}</p>
                <p>{{"视距：" + visibility}}</p>
                <p>{{"风况：" + windInfo}}</p>
            </template>
        </a-popover>
    </a-space>
</template>

<script setup>
import {defineProps, ref, watch, onMounted} from "vue";
import {changeThemeColor} from "../javascripts/publicFunctions";
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
                weatherInfo.value = resultData.data.weatherData.weather  + " ｜ "
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