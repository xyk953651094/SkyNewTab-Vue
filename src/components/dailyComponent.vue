<template>
    <a-space>
        <a-popover
            :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
            :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
            :style="{width: '550px'}"
            position="br"
        >
            <template #title>
                <a-row align="center">
                    <a-col :span="10">
                        <a-typography-text :style="{color: fontColor}">{{
                                "倒数日 " + dailySize + " / " + dailyMaxSize
                            }}
                        </a-typography-text>
                    </a-col>
                    <a-col :span="14" :style="{textAlign: 'right'}">
                        <a-space>
                            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                                      shape="round"
                                      type="text" @click="showAddModalBtnOnClick">
                                <template #icon>
                                    <icon-plus/>
                                </template>
                                {{ "添加倒数日" }}
                            </a-button>
                            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                                      shape="round"
                                      type="text" @click="removeAllBtnOnClick">
                                <template #icon>
                                    <icon-delete/>
                                </template>
                                {{ "全部删除" }}
                            </a-button>
                        </a-space>
                    </a-col>
                </a-row>
            </template>
            <a-badge :count="listItems.length">
                <a-button id="dailyBtn" :style="{cursor: 'default', display: display}" class="componentTheme zIndexHigh" shape="round"
                          size="large"
                          type="primary">
                    <template #icon>
                        <icon-calendar-clock/>
                    </template>
                </a-button>
            </a-badge>
            <template #content>
                <a-list :bordered=false>
                    <a-list-item v-for="item in listItems" :key="item.timestamp">
                        <a-row>
                            <a-col :span="10">
                                <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                                          :style="{color: fontColor, cursor: 'default'}" shape="round"
                                          type="text">
                                    {{ item.title }}
                                </a-button>
                            </a-col>
                            <a-col :span="14">
                                <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                                          :style="{color: fontColor, cursor: 'default'}" shape="round"
                                          type="text">
                                    {{
                                        getTimeDetails(new Date(item.selectedTimeStamp)).showDate4 + "｜" + getDailyDescription(item.selectedTimeStamp)
                                    }}
                                </a-button>
                            </a-col>
                        </a-row>
                        <template #actions>
                            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                                      shape="circle"
                                      type="text" @click="removeBtnOnClick(item)">
                                <template #icon>
                                    <icon-delete/>
                                </template>
                            </a-button>
                        </template>
                    </a-list-item>
                </a-list>
            </template>
        </a-popover>
    </a-space>
    <a-modal v-model:visible="displayModal" :closable="false"
             :mask-style="{backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)'}"
             :onBeforeOk="modalBeforeOk"
             unmount-on-close @cancel="modalCancelBtnOnClick" @ok="modalOkBtnOnClick">
        <template #title>{{ "添加倒数日 " + dailySize + " / " + dailyMaxSize }}</template>
        <a-form>
            <a-form-item field="dailyInput" label="标题">
                <a-input id="dailyInput" allow-clear maxLength="10" placeholder="请输入标题" showWordLimit/>
            </a-form-item>
            <a-form-item field="dailyDatePicker" label="日期">
                <a-date-picker id="dailyDatePicker" @change="datePickerOnChange"/>
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
        default: () => {
            return {
                "themeColor": "",
                "componentBackgroundColor": "",
                "componentFontColor": ""
            }
        }
    },
    simpleMode: {
        type: Boolean,
        required: true,
        default: () => {
            return false
        }
    }
});

let display = ref("block");
let hoverColor = ref("");
let backgroundColor = ref("");
let fontColor = ref("");
let displayModal = ref(false);
let listItems = ref([]);
let dailySize = ref(0);
let dailyMaxSize = ref(5);
let selectedTimeStamp = ref(0);

onMounted(() => {
    let daily = [];
    let tempDaily = localStorage.getItem("daily");
    if (tempDaily) {
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

watch(() => props.simpleMode, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        display.value = newValue? "none" : "block";
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
    if (tempDaily) {
        localStorage.removeItem("daily");

        listItems.value = [];
        dailySize.value = 0;
    }
}

function removeBtnOnClick(item) {
    let daily = [];
    let tempDaily = localStorage.getItem("daily");
    if (tempDaily) {
        daily = JSON.parse(tempDaily);
        let index = -1;
        for (let i = 0; i < daily.length; i++) {
            if (item.timeStamp === daily[i].timeStamp) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
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
    if (tempDaily) {
        daily = JSON.parse(tempDaily);
    }
    if (daily.length < dailyMaxSize.value) {
        // $("#dailyInput").children("input").val("");
        displayModal.value = true;
        selectedTimeStamp.value = 0;
    } else {
        Message.error("倒数日数量最多为" + dailyMaxSize.value + "个");
    }
}

function modalBeforeOk() {
    let title = $("#dailyInput").children("input").val();
    if (title && title.length > 0 && selectedTimeStamp.value !== 0) {
        let daily = [];
        let tempDaily = localStorage.getItem("daily");
        if (tempDaily) {
            daily = JSON.parse(tempDaily);
        }
        if (daily.length < dailyMaxSize.value) {
            return true;
        } else {
            Message.error("倒数日数量最多为" + dailyMaxSize.value + "个");
            return false;
        }
    } else {
        Message.error("倒数日内容不能为空");
        return false;
    }
}

function modalOkBtnOnClick() {
    let title = $("#dailyInput").children("input").val();
    let daily = [];
    let tempDaily = localStorage.getItem("daily");
    if (tempDaily) {
        daily = JSON.parse(tempDaily);
    }

    daily.push({
        "title": title,
        "selectedTimeStamp": selectedTimeStamp.value,
        "timeStamp": Date.now()
    });
    localStorage.setItem("daily", JSON.stringify(daily));

    displayModal.value = false;
    listItems.value = daily;
    dailySize.value = daily.length;
    Message.success("添加成功");
}

function modalCancelBtnOnClick() {
    displayModal.value = false
}

function getDailyDescription(selectedTimeStamp) {
    let todayTimeStamp = new Date(getTimeDetails(new Date()).showDate5).getTime();
    let description;
    if (todayTimeStamp - selectedTimeStamp > 0) {
        description = "已过 " + ((todayTimeStamp - selectedTimeStamp) / 86400000) + " 天";
    } else if (todayTimeStamp - selectedTimeStamp === 0) {
        description = "就是今天";
    } else {
        description = "还剩 " + ((selectedTimeStamp - todayTimeStamp) / 86400000) + " 天";
    }
    return description;
}

function datePickerOnChange(value, date, dateString) {
    selectedTimeStamp.value = new Date(value).getTime();
    console.log(date, dateString);
}

</script>

<style scoped>

</style>