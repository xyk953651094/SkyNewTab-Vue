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
    let imageXHR=new XMLHttpRequest();
    imageXHR.open("GET","https://v2.jinrishici.com/info");
    imageXHR.onload=function(){
        if(imageXHR.status===200){
            let imageData=JSON.parse(imageXHR.responseText);

            if (imageData.status === 'success') {
                let weatherData = imageData.data.weatherData;
                weatherInfo.value = weatherData.weather  + " ｜ " + weatherData.temperature + "°C";
            }
        }
    }
    imageXHR.onerror=function(){}
    imageXHR.send();
})
</script>

<style scoped>

</style>