<template>
    <a-row justify="center">
        <a-col :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :span="24"
               :style="{padding: '5px', borderRadius: '10px'}"
               class="zIndexHigh">
            <a-space id="clock" align="center" size="mini">
                <a-typography-text :style="{color: backgroundColor}" class="clockText">
                    {{ currentTime }}
                </a-typography-text>
                <a-space align="center" direction="vertical" size="mini">
                    <a-typography-text :style="{color: backgroundColor}" class="dateText">
                        {{ currentWeek }}
                    </a-typography-text>
                    <a-typography-text :style="{color: backgroundColor}" class="dateText">
                        {{ currentDate }}
                    </a-typography-text>
                </a-space>
            </a-space>
        </a-col>
    </a-row>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {changeBackgroundColor, changeFontColor, getTimeDetails} from "../javascripts/publicFunctions";
import "../stylesheets/clockComponent.less";

// const $ = require("jquery");

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
    }
});

let backgroundColor = ref("");
let fontColor = ref("");
let currentTime = ref(getTimeDetails(new Date()).showTime);
let currentWeek = ref(getTimeDetails(new Date()).showWeek);
let currentDate = ref(getTimeDetails(new Date()).showDate);

onMounted(() => {
    setInterval(() => {
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

function btnMouseOver() {
    setTimeout(() => {
        this.classList.add("componentTheme");
    }, 300);
    changeBackgroundColor(this, backgroundColor.value);
    changeFontColor(".clockText, .dateText", fontColor.value);
}

function btnMouseOut() {
    setTimeout(() => {
        this.classList.remove("componentTheme");
    }, 300);
    changeBackgroundColor(this, "transparent");
    changeFontColor(".clockText, .dateText", backgroundColor.value);
}

</script>

<style scoped>

</style>