<template>
    <a-space>
        <a-popover :title="lunarCalendar" position="tl"
                   :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
        >
            <a-button type="primary" shape="round" size="large" id="buttonGreet" class="frostedGlass zIndexHigh"
                      :style="{ cursor: 'default', backgroundColor: backgroundColor, color: fontColor}">
                <template #icon>
                    <icon-face-smile-fill />
                </template>
                {{ greetContent }}
            </a-button>
            <template #content>
                <p>{{"宜：" + suit}}</p>
                <p>{{"忌：" + avoid}}</p>
            </template>
        </a-popover>
    </a-space>
</template>

<script setup>
import "../stylesheets/publicStyles.css"
import {defineProps, onMounted, ref, watch} from "vue"
import {IconFaceSmileFill} from "@arco-design/web-vue/es/icon";
import {changeThemeColor, getTimeDetails, getGreet, getFontColor} from "@/javascripts/publicFunctions";
const $ = require("jquery");

const props = defineProps({
    themeColor: {
        type: String,
        required: true
    }
});

let backgroundColor = ref("");
let fontColor = ref("");
let greetContent = ref(getGreet());
let lunarCalendar = ref("");
let suit = ref("");
let avoid = ref("");

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        backgroundColor.value = props.themeColor;
        fontColor.value = getFontColor(props.themeColor);
    }
})

onMounted(() => {
    $('#buttonGreet').hover(function(){
        $(".arco-popover-title").css("color", fontColor.value);
    });

    let holidayParameters = {
        "app_id": "cicgheqakgmpjclo",
        "app_secret": "RVlRVjZTYXVqeHB3WCtQUG5lM0h0UT09",
    };
    $.ajax({
        url: "https://www.mxnzp.com/api/holiday/single/" + getTimeDetails(new Date()).showDate3,
        type: "GET",
        data: holidayParameters,
        timeout: 5000,
        success: (resultData) => {
            if (resultData.code === 1) {
                let holidayContent = resultData.data.solarTerms;
                if (resultData.data.solarTerms.indexOf('后') === -1) {
                    holidayContent = '今日' + holidayContent;
                }
                greetContent.value += " ｜ " + holidayContent;

                lunarCalendar.value = resultData.data.yearTips + resultData.data.chineseZodiac + "年｜" +
                    resultData.data.lunarCalendar;
                suit.value = resultData.data.suit;
                avoid.value = resultData.data.avoid;
            }
        },
        error: function () {}
    });
})
</script>

<style scoped>

</style>