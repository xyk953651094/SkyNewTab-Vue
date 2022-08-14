<template>
  <a-space>
    <a-button type="primary" shape="round" size="large" class="zIndexHigh"
              :style="{ cursor: 'default', backgroundColor: backgroundColor, color: fontColor}">
      <template #icon>
          <icon-calendar-clock />
      </template>
      <template #default>
        {{greetContent}}
      </template>
    </a-button>
  </a-space>
</template>

<script setup>
import "../css/publicStyles.css"
import { defineProps, onMounted, ref, watch } from "vue"
import { IconCalendarClock } from "@arco-design/web-vue/es/icon";
import { getDate, getFontColor, getGreet } from "@/javascripts/publicFunctions";

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
let greetContent = ref(getGreet());
watch(() => props.imageColor, (newValue, oldValue) => {
    if(newValue !== oldValue) {
        backgroundColor.value = props.imageColor;
        fontColor.value = getFontColor(backgroundColor.value);
    }
})

onMounted(()=>{
    let tempDate = getDate();
    let date = tempDate.year + tempDate.month + tempDate.day;

    let appId = 'cicgheqakgmpjclo'
    let appSecret = 'RVlRVjZTYXVqeHB3WCtQUG5lM0h0UT09'
    let holidayXHR = new XMLHttpRequest();
    holidayXHR.open('GET','https://www.mxnzp.com/api/holiday/single/' + date + '?app_id=' + appId + '&app_secret=' + appSecret)
    holidayXHR.onload = function() {
        if (holidayXHR.status === 200) {
            let holidayData = JSON.parse(holidayXHR.responseText);
            if(holidayData.code === 1) {
                let holidayContent = holidayData.data.solarTerms;
                if(holidayData.data.solarTerms.indexOf('后') === -1) {
                    holidayContent = '今日' + holidayContent;
                }
                greetContent.value += " | " + holidayContent;
            }
        }
    }
    holidayXHR.onerror=function(){

    }
    holidayXHR.send();
})
</script>

<style scoped>

</style>