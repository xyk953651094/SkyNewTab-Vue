<template>
    <a-space>
        <a-popover :title="region" :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }">
            <a-button type="primary" shape="round" size="large" id="buttonWeather" class="frostedGlass zIndexHigh"
                      :style="{display: display, backgroundColor: backgroundColor, color: fontColor}">
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
import {changeThemeColor, getFontColor, getTimeDetails} from "@/javascripts/publicFunctions";
import $ from "jquery";

const props = defineProps({
    themeColor: {
        type: String,
        required: true
    }
});

let backgroundColor = ref("");
let fontColor = ref("");
let display = ref("none");
let weatherInfo = ref("暂无天气信息");
let region = ref("");
let pm25 = ref("");
let rainfall = ref("");
let visibility = ref("");
let windInfo = ref("");

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        backgroundColor.value = props.themeColor;
        fontColor.value = getFontColor(props.themeColor);
    }
})

onMounted(() => {
    $('#buttonWeather').hover(function(){
        $(".arco-popover-title").css("color", fontColor.value);
    });

    $.ajax({
        url: "https://v2.jinrishici.com/info",
        type: "GET",
        timeout: 5000,
        success: (resultData) => {
            if (resultData.status === 'success') {
                display.value = "block";
                weatherInfo.value = resultData.data.weatherData.weather  + " ｜ "
                    + resultData.data.weatherData.temperature + "°C";
                region.value = resultData.data.region.replace("|", "｜");
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