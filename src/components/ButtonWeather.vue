<template>
    <a-space>
        <a-tooltip :content=weatherInfo>
            <a-button type="primary" shape="round" size="large" class="frostedGlass zIndexHigh"
                      :style="{backgroundColor: backgroundColor, color: fontColor}">
                {{ weatherInfo }}
            </a-button>
        </a-tooltip>
    </a-space>
</template>

<script setup>
import {defineProps, ref, watch, onMounted} from "vue";
import {getFontColor} from "@/javascripts/publicFunctions";

const props = defineProps({
    imageColor: {
        type: String,
        default: () => {
            return "#2c3e50";
        },
        required: true
    }
});

let backgroundColor = ref(props.imageColor);
let fontColor = ref(getFontColor(backgroundColor.value));
let weatherInfo = ref("暂无天气信息");
watch(() => props.imageColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        backgroundColor.value = props.imageColor;
        fontColor.value = getFontColor(backgroundColor.value);
    }
})

onMounted(() => {
    let weatherXHR = new XMLHttpRequest();
    weatherXHR.open("GET","https://v2.jinrishici.com/info");
    weatherXHR.onload = function(){
        if(weatherXHR.status === 200){
            let result = JSON.parse(weatherXHR.responseText);

            if (result.status === 'success') {
                weatherInfo.value = result.data.weatherData.weather  + " ｜ "
                    + result.data.weatherData.temperature + "°C";
            }
        }
    }
    weatherXHR.onerror=function(){}
    weatherXHR.send();
})
</script>

<style scoped>

</style>