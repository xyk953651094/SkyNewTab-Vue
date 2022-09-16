<template>
    <a-space>
        <a-tooltip :content=weatherDetail>
            <a-button type="primary" shape="round" size="large" id="buttonWeather" class="frostedGlass zIndexHigh"
                      :style="{display: display}">
                {{ weatherInfo }}
            </a-button>
        </a-tooltip>
    </a-space>
</template>

<script setup>
import {defineProps, ref, watch, onMounted} from "vue";
import {changeThemeColor} from "@/javascripts/publicFunctions";

const props = defineProps({
    themeColor: {
        type: String,
        default: () => {
            return "#2c3e50";
        },
        required: true
    }
});

let display = ref("none");
let weatherInfo = ref("暂无天气信息");
let weatherDetail = ref("暂无天气信息");
watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        changeThemeColor("#buttonWeather", props.themeColor);
    }
})

onMounted(() => {
    let weatherXHR = new XMLHttpRequest();
    weatherXHR.open("GET","https://v2.jinrishici.com/info");
    weatherXHR.onload = function(){
        if(weatherXHR.status === 200){
            let result = JSON.parse(weatherXHR.responseText);

            if (result.status === 'success') {
                display.value = "block";
                weatherInfo.value = result.data.weatherData.weather  + " ｜ "
                    + result.data.weatherData.temperature + "°C";
                weatherDetail.value = result.data.region.split("|")[1] + " ｜ " +
                    result.data.weatherData.weather  + " ｜ " +
                    result.data.weatherData.windDirection  + " ｜ " +
                    result.data.weatherData.temperature + "°C";
            }
            else {
                display.value = "none";
            }
        }
    }
    weatherXHR.onerror=function(){}
    weatherXHR.send();
})
</script>

<style scoped>

</style>