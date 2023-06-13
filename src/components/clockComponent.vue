<template>
    <a-row>
        <a-space align="center" size="mini" id="clock" class="zIndexHigh">
            <a-typography-text class="clockText" :style="{color: backgroundColor}">
                {{currentTime}}
            </a-typography-text>
            <a-space align="center" size="mini" direction="vertical">
                <a-typography-text class="dateText" :style="{color: backgroundColor}">
                    {{currentWeek}}
                </a-typography-text>
                <a-typography-text class="dateText" :style="{color: backgroundColor}">
                    {{currentDate}}
                </a-typography-text>
            </a-space>
        </a-space>
    </a-row>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {getTimeDetails} from "../javascripts/publicFunctions";
import "../stylesheets/clockComponent.less"

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
let currentTime = ref(getTimeDetails(new Date()).showTime);
let currentWeek = ref(getTimeDetails(new Date()).showWeek);
let currentDate = ref(getTimeDetails(new Date()).showDate);

onMounted(()=>{
    setInterval(()=>{
        let timeDetails = getTimeDetails(new Date());
        currentTime.value = timeDetails.showTime;
        currentWeek.value = timeDetails.showWeek;
        currentDate.value = timeDetails.showDate;
    }, 1000);
})

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
    }
})

</script>

<style scoped>

</style>