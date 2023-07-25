<template>
    <a-space>
        <a-popover
            :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
            :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
            :style="{width: '300px'}"
        >
            <template #title>
                <a-row>
                    <a-col :span="12" :style="{display: 'flex', alignItems: 'center'}">
                        <a-typography-text :style="{color: fontColor}">{{"倒数日 " + dailySize + " / " + dailyMaxSize }}</a-typography-text>
                    </a-col>
                    <a-col :span="12" :style="{textAlign: 'right'}">
                        <a-space>
                            <a-button type="text" shape="circle" size="mini" :style="{color: fontColor}" :onmouseover="btnMouseOver" :onmouseout="btnMouseOut" @click="showAddModalBtnOnClick">
                                <template #icon>
                                    <icon-plus />
                                </template>
                            </a-button>
                            <a-button type="text" shape="circle" size="mini" :style="{color: fontColor}" :onmouseover="btnMouseOver" :onmouseout="btnMouseOut" @click="removeAllBtnOnClick">
                                <template #icon>
                                    <icon-delete />
                                </template>
                            </a-button>
                        </a-space>
                    </a-col>
                </a-row>
            </template>
            <a-badge :count="listItems.length">
                <a-button type="primary" shape="round" size="large" id="dailyBtn" class="componentTheme zIndexHigh">
                    <template #icon>
                        <icon-calendar-clock />
                    </template>
                </a-button>
            </a-badge>
            <template #content>
                <a-list :bordered=false>
                    <a-list-item v-for="item in listItems" :key="item.timestamp">
                        <a-list-item-meta :title=item.title :description=item.description>
<!--                            <template #description>-->
<!--                                <a-typography-text :style="{color: (item.status === 'expired' ? 'red':'blue')}">{{item.description}}</a-typography-text>-->
<!--                            </template>-->
                        </a-list-item-meta>
                        <template #actions>
                            <a-button type="text" shape="circle" size="mini" @click="removeBtnOnClick(item)" :style="{color: fontColor}" :onmouseover="btnMouseOver" :onmouseout="btnMouseOut">
                                <template #icon><icon-close /></template>
                            </a-button>
                        </template>
                    </a-list-item>
                </a-list>
            </template>
        </a-popover>
    </a-space>
    <a-modal v-model:visible="displayModal" :closable="false" @ok="modalOkBtnOnClick" @cancel="modalCancelBtnOnClick" unmount-on-close :mask-style="{backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)'}">
        <template #title>{{"添加倒数日 " + dailySize + " / " + dailyMaxSize}}</template>
        <a-form>
            <a-form-item field="dailyInput" label="标题" validate-trigger="change" required>
                <a-input placeholder="请输入标题" id="dailyInput" maxLength="10" allow-clear showWordLimit/>
            </a-form-item>
            <a-form-item field="dailyDatePicker" label="日期" validate-trigger="change" required>
                <a-date-picker @change="datePickerOnChange" id="dailyDatePicker"/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {IconCalendarClock, IconDelete, IconPlus} from "@arco-design/web-vue/es/icon";
import {changeThemeColor, getFontColor, getTimeDetails} from "../javascripts/publicFunctions";
import {Message} from "@arco-design/web-vue";

const $ = require("jquery");

const props = defineProps({
    themeColor: {
        type: Object,
        required: true,
        default: ()=> {
            return {
                "themeColor": "",
                "componentBackgroundColor": "",
                "componentFontColor": ""
            }
        }
    }
});

let hoverColor = ref("");
let backgroundColor = ref("");
let fontColor = ref("");
let displayModal = ref(false);
let listItems = ref([]);
let dailySize = ref(0);
let dailyMaxSize = ref(5);
let selectedTimeStamp = ref(0);

onMounted(()=>{
    let daily = [];
    let tempDaily = localStorage.getItem("daily");
    if(tempDaily){
        daily = JSON.parse(tempDaily);
    }

    listItems.value = daily;
    dailySize.value = daily.length;
})

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        hoverColor.value = props.themeColor.themeColor;
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#dailyBtn", backgroundColor.value, fontColor.value);
    }
})

function btnMouseOver() {
  this.style.backgroundColor = hoverColor.value;
  this.style.color = getFontColor(hoverColor.value);
}

function btnMouseOut() {
  this.style.backgroundColor = "transparent";
  this.style.color = fontColor.value;
}

function removeAllBtnOnClick() {
    let tempDaily = localStorage.getItem("daily");
    if(tempDaily){
        localStorage.removeItem("daily");

        listItems.value = [];
        dailySize.value = 0;
    }
}

function removeBtnOnClick(item) {
    let daily = [];
    let tempDaily = localStorage.getItem("daily");
    if(tempDaily){
        daily = JSON.parse(tempDaily);
        let index = -1;
        for(let i = 0; i < daily.length; i++) {
            if (item.timeStamp === daily[i].timeStamp) {
                index = i;
                break;
            }
        }
        if(index !== -1) {
            daily.splice(index, 1);
        }
        localStorage.setItem("daily", JSON.stringify(daily));

        listItems.value = daily
        dailySize.value = daily.length;
    }
}

function showAddModalBtnOnClick() {
    let daily = [];
    let tempDaily = localStorage.getItem("daily");
    if(tempDaily){
        daily = JSON.parse(tempDaily);
    }
    if(daily.length < dailyMaxSize.value) {
        // $("#dailyInput").children("input").val("");
        displayModal.value = true;
        selectedTimeStamp.value = 0;
    }
    else {
        Message.error("倒数日数量最多为" + dailyMaxSize.value + "个");
    }
}

function modalOkBtnOnClick() {
    let title = $("#dailyInput").children("input").val();

    if(title && title.length > 0 && selectedTimeStamp.value !== 0) {
        let daily = [];
        let tempDaily = localStorage.getItem("daily");
        if(tempDaily){
            daily = JSON.parse(tempDaily);
        }
        if(daily.length < dailyMaxSize.value) {
            let todayTimeStamp = new Date(getTimeDetails(new Date()).showDate5).getTime();
            let description, status;
            if (todayTimeStamp - selectedTimeStamp.value > 0) {
                description = "已过 " + ((todayTimeStamp - selectedTimeStamp.value) / 86400000) + " 天";
                status = "expired";
            }
            else if (todayTimeStamp - selectedTimeStamp.value === 0) {
                description = "就是今天";
                status = "today";
            }
            else {
                description = "还剩 " + ((selectedTimeStamp.value - todayTimeStamp) / 86400000) + " 天";
                status = "not expired";
            }

            daily.push({"title": title, "description": description, "status": status, "timeStamp": Date.now ()});
            localStorage.setItem("daily", JSON.stringify(daily));

            displayModal.value = false;
            listItems.value = daily;
            dailySize.value = daily.length;
            Message.success("添加成功");
        }
        else {
            Message.error("倒数日数量最多为" + dailyMaxSize.value + "个");
        }
    }
    else {
        Message.error("倒数日内容不能为空");
    }
}

function modalCancelBtnOnClick() {
    displayModal.value =  false
}

function datePickerOnChange(value, date, dateString) {
    selectedTimeStamp.value = new Date(value).getTime();
    console.log(date, dateString);
}

</script>

<style scoped>

</style>