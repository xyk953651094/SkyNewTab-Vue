<template>
    <a-row justify="center">
        <a-col :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :span="24"
               :style="{padding: '5px 10px', borderRadius: '4px'}"
               class="zIndexHigh">
            <a-space id="clock" align="center">
                <a-typography-text :style="{color: backgroundColor, cursor: 'default'}" class="textShadow clockText">
                    {{ currentTime }}
                </a-typography-text>
                <a-space align="center" direction="vertical">
                    <a-typography-text :style="{color: backgroundColor, cursor: 'default'}" class="textShadow dateText">
                        {{ currentWeek }}
                    </a-typography-text>
                    <a-typography-text :style="{color: backgroundColor, cursor: 'default'}" class="textShadow dateText">
                        {{ currentDate }}
                    </a-typography-text>
                </a-space>
            </a-space>
        </a-col>
    </a-row>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {getTimeDetails} from "@/javascripts/publicFunctions";
import "@/stylesheets/clockComponent.less";

const $ = require("jquery");

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
});

function btnMouseOver() {
    $(".clockText, .dateText").removeClass("textShadow").css("color", fontColor.value);
    this.style.backgroundColor = backgroundColor.value;
    this.classList.add("componentTheme");

    // new Promise((resolve) => {
    //     $(".clockText, .dateText").removeClass("textShadow");
    //     changeBackgroundColor(this, backgroundColor.value, 150);
    //     changeFontColor(".clockText, .dateText", fontColor.value, 150);
    //     resolve("success");
    // }).then(() => {
    //     this.classList.add("componentTheme");
    // })
}

function btnMouseOut() {
    $(".clockText, .dateText").addClass("textShadow").css("color", backgroundColor.value);
    this.style.backgroundColor = "transparent";
    this.classList.remove("componentTheme");

    // this.classList.remove("componentTheme");
    // $(".clockText, .dateText").addClass("textShadow");
    // changeBackgroundColor(this, "transparent", 150);
    // changeFontColor(".clockText, .dateText", backgroundColor.value, 150);
}

</script>

<style scoped>

</style>