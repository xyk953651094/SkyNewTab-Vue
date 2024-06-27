<template>
    <a-space>
        <a-popover
            :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
            :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
            :style="{width: '600px'}"
            position="br"
        >
            <a-button id="dailyBtn" :shape="preferenceData.buttonShape" :style="{cursor: 'default', display: display}"
                      class="componentTheme zIndexHigh"
                      size="large"
                      type="primary">
                <template #icon>
                    <icon-calendar-clock/>
                </template>
                {{ dailyList.length + " 个" }}
            </a-button>
            <template #title>
                <a-row align="center">
                    <a-col :span="8">
                        <a-typography-text :style="{color: fontColor}">{{
                                "倒数日 " + dailyList.length + " / " + dailyMaxSize
                            }}
                        </a-typography-text>
                    </a-col>
                    <a-col :span="16" :style="{textAlign: 'right'}">
                        <a-space>
                            <a-switch v-model="notification" id="dailyNotificationSwitch" @change="notificationSwitchOnChange">
                                <template #checked>已提醒</template>
                                <template #unchecked>不提醒</template>
                            </a-switch>
                            <a-button :shape="preferenceData.buttonShape"
                                      :style="{color: fontColor}" type="text"
                                      @click="showAddModalBtnOnClick"
                                      @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                <template #icon>
                                    <icon-plus/>
                                </template>
                                {{ "添加倒数日" }}
                            </a-button>
                            <a-button :shape="preferenceData.buttonShape"
                                      :style="{color: fontColor}" type="text"
                                      @click="removeAllBtnOnClick"
                                      @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                <template #icon>
                                    <icon-delete/>
                                </template>
                                {{ "全部删除" }}
                            </a-button>
                        </a-space>
                    </a-col>
                </a-row>
            </template>
            <template #content>
                <a-list :bordered=false>
                    <a-list-item v-for="item in dailyList" :key="item.timestamp">
                        <a-row>
                            <a-col :span="9">
                                <a-button :shape="preferenceData.buttonShape"
                                          :style="{color: fontColor, cursor: 'default'}"
                                          type="text"
                                          @mouseout="btnMouseOut(fontColor, $event)"
                                          @mouseover="btnMouseOver(hoverColor, $event)">
                                    <template #icon>
                                        <icon-calendar-clock/>
                                    </template>
                                    {{ item.title }}
                                </a-button>
                            </a-col>
                            <a-col :span="15">
                                <a-button :shape="preferenceData.buttonShape"
                                          :style="{color: fontColor, cursor: 'default'}"
                                          type="text"
                                          @mouseout="btnMouseOut(fontColor, $event)"
                                          @mouseover="btnMouseOver(hoverColor, $event)">
                                    <template #icon>
                                        <icon-clock-circle/>
                                    </template>
                                    {{
                                        getTimeDetails(new Date(item.selectedTimeStamp)).showDate4 + " ｜ " +
                                        getDailyDescription(item.selectedTimeStamp) +
                                        (isEmpty(item.loop) ? "" : " · " + item.loop)
                                    }}
                                </a-button>
                            </a-col>
                        </a-row>
                        <template #actions>
                            <a-button :shape="preferenceData.buttonShape"
                                      :style="{color: fontColor}" type="text"
                                      @click="removeBtnOnClick(item)"
                                      @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
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
        <template #title>
            <a-row :style="{width: '100%'}" align="center">
                <a-col :span="12">
                    <a-typography-text :style="{color: fontColor}">
                        {{ "添加倒数日 " + dailyList.length + " / " + dailyMaxSize }}
                    </a-typography-text>
                </a-col>
                <a-col :span="12" :style="{textAlign: 'right'}">
                    <icon-calendar-clock/>
                </a-col>
            </a-row>
        </template>
        <a-form>
            <a-form-item field="dailyInput" label="倒数标题">
                <a-input placeholder="请输入标题" v-model="inputValue" @change="inputOnChange"
                         maxLength="10" show-word-limit allow-clear/>
            </a-form-item>
            <a-form-item field="dailyDatePicker" label="倒数日期">
                <a-date-picker :disabledDate="(current) => dayjs(current).isBefore(dayjs())"
                               :allow-clear="false" @change="datePickerOnChange"
                               id="dailyDatePicker" :style="{width: '100%'}"
                />
            </a-form-item>
            <a-form-item field="dailySelect" label="循环周期">
                <a-select default-value="noLoop" @change="selectOnChange">
                    <a-option value="noLoop">{{ "不循环" }}</a-option>
                    <a-option value="everyWeek">{{ "每周" }}</a-option>
                    <a-option value="everyMonth" :disabled="dailySelectDisabled">{{ "每月（29、30、31日不生效）" }}</a-option>
                    <a-option value="everyYear" :disabled="dailySelectDisabled">{{ "每年（29、30、31日不生效）" }}</a-option>
                </a-select>
                <template #extra>
                    <a-typography-text :style="{color: fontColor}">{{ "倒数日期为29、30、31日时，循环周期不得选择每月、每年" }}
                    </a-typography-text>
                </template>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {IconCalendarClock, IconClockCircle, IconDelete, IconPlus} from "@arco-design/web-vue/es/icon";
import dayjs from "dayjs";
import {btnMouseOut, btnMouseOver, changeThemeColor, getTimeDetails, isEmpty} from "@/javascripts/publicFunctions";
import {Message} from "@arco-design/web-vue";
import {defaultPreferenceData} from "@/javascripts/publicConstants";

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
    preferenceData: {
        type: Object,
        required: true,
        default: () => {
            return defaultPreferenceData
        }
    }
});

let display = ref("block");
let hoverColor = ref("");
let backgroundColor = ref("");
let fontColor = ref("");
let notification = ref(false);
let displayModal = ref(false);
let inputValue = ref("");
let dailyList = ref([]);
let selectedTimeStamp = ref(0);
let dailySelectDisabled =  ref(false);
let loop = ref("");

const dailyMaxSize = 10;

onMounted(() => {
    let notificationStorage = localStorage.getItem("dailyNotification");
    if (notificationStorage) {
        notification.value = JSON.parse(notificationStorage);
    } else {
        localStorage.setItem("dailyNotification", JSON.stringify(false));
    }

    let tempDailyList = [];
    let dailyListStorage = localStorage.getItem("daily");
    if (dailyListStorage) {
        tempDailyList = JSON.parse(dailyListStorage);

        let tempDailyListModified = false;
        tempDailyList.map((value) => {
            let tempValue = value;
            let todayTimeStamp = new Date(getTimeDetails(new Date()).showDate5).getTime();

            // 倒数日通知
            if (notification.value && value.selectedTimeStamp === todayTimeStamp && !props.preferenceData.simpleMode) {
                Message.info({content: "今日" + value.title, position: "bottom"});
            }

            // 更新循环倒数日
            if (!isEmpty(value.loop) && value.selectedTimeStamp < todayTimeStamp) {
                tempDailyListModified = true;
                switch (value.loop) {
                    case "每周":
                        value.selectedTimeStamp += 604800000;
                        break;
                    case "每月": {
                        let loopYear = new Date(value.selectedTimeStamp).getFullYear();
                        let loopMonth = new Date(value.selectedTimeStamp).getMonth() + 1;
                        let loopDate = new Date(value.selectedTimeStamp).getDate();

                        let nextLoopYear = loopYear;
                        let nextLoopMonth = loopMonth + 1;
                        if (loopMonth === 12) {
                            nextLoopYear += 1;
                            nextLoopMonth = 1;
                        }

                        nextLoopYear = nextLoopYear.toString();
                        nextLoopMonth = nextLoopMonth < 10 ? ("0" + nextLoopMonth) : nextLoopMonth.toString();
                        loopDate = loopDate < 10 ? ("0" + loopDate) : loopDate.toString();

                        let nextLoopString = nextLoopYear.toString() + "-" + nextLoopMonth.toString() + "-" + loopDate.toString();
                        value.selectedTimeStamp = new Date(nextLoopString).getTime();
                        break;
                    }
                    case "每年": {
                        let nextLoopYear = new Date(value.selectedTimeStamp).getFullYear() + 1;
                        let loopMonth = new Date(value.selectedTimeStamp).getMonth() + 1;
                        let loopDate = new Date(value.selectedTimeStamp).getDate();

                        nextLoopYear = nextLoopYear.toString();
                        loopMonth = loopMonth < 10 ? ("0" + loopMonth) : loopMonth.toString();
                        loopDate = loopDate < 10 ? ("0" + loopDate) : loopDate.toString();

                        let nextLoopString = nextLoopYear.toString() + "-" + loopMonth.toString() + "-" + loopDate.toString();
                        value.selectedTimeStamp = new Date(nextLoopString).getTime();
                        break;
                    }
                }
            }
            return tempValue;
        });

        if (tempDailyListModified) {
            tempDailyList.sort((a, b) => {
                return a.selectedTimeStamp - b.selectedTimeStamp;
            });
            localStorage.setItem("daily", JSON.stringify(tempDailyList));
        }
    }

    dailyList.value = tempDailyList;
})

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        hoverColor.value = props.themeColor.themeColor;
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#dailyBtn", backgroundColor.value, fontColor.value);
    }
})

watch(() => props.preferenceData.simpleMode, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        display.value = newValue ? "none" : "block";
    }
}, {immediate: true})

function removeAllBtnOnClick() {
    dailyList.value = [];
    localStorage.removeItem("daily");
    Message.success("删除成功");
}

function removeBtnOnClick(item) {
    let index = -1;
    for (let i = 0; i < dailyList.value.length; i++) {
        if (item.timeStamp === dailyList.value[i].timeStamp) {
            index = i;
            break;
        }
    }
    if (index !== -1) {
        dailyList.value.splice(index, 1);
    }

    dailyList.value.sort((a, b) => {
        return a.selectedTimeStamp - b.selectedTimeStamp;
    });

    localStorage.setItem("daily", JSON.stringify(dailyList.value));
    Message.success("删除成功");
}

function notificationSwitchOnChange(checked) {
    notification.value = checked;
    localStorage.setItem("dailyNotification", JSON.stringify(checked));
    if (dailyList.value.length === 0) {
        Message.warning("请添加倒数日");
    }
}

function showAddModalBtnOnClick() {
    if (dailyList.value.length < dailyMaxSize) {
        displayModal.value = true;
        inputValue.value = "";
        selectedTimeStamp.value = 0;
        loop.value = "";
    } else {
        Message.error("倒数日数量最多为" + dailyMaxSize + "个");
    }
}

function inputOnChange(value) {
    inputValue.value = value;
}

function modalBeforeOk() {
    if (inputValue.value && inputValue.value.length > 0 && selectedTimeStamp.value !== 0) {
        return true;
    } else {
        Message.error("表单不能为空");
        return false;
    }
}

function modalOkBtnOnClick() {
    dailyList.value.push({
        "title": inputValue.value,
        "selectedTimeStamp": selectedTimeStamp.value,
        "loop": loop.value,
        "timeStamp": Date.now()
    });

    dailyList.value.sort((a, b) => {
        return a.selectedTimeStamp - b.selectedTimeStamp;
    });

    displayModal.value = false;
    localStorage.setItem("daily", JSON.stringify(dailyList.value));
    Message.success("添加成功");
}

function modalCancelBtnOnClick() {
    displayModal.value = false;
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
    if (value) {
        selectedTimeStamp.value = new Date(value).getTime();
        dailySelectDisabled.value = [29, 30, 31].indexOf(new Date(dateString).getDate()) !== -1;
        if ([29, 30, 31].indexOf(new Date(dateString).getDate()) !== -1) {
            loop.value = "";
        }
    } else {
        selectedTimeStamp.value = 0;
    }
    console.log(date, dateString);
}

function selectOnChange(value) {
    let tempLoop;
    switch (value) {
        case "noLoop":
            tempLoop = "";
            break;
        case "everyWeek":
            tempLoop = "每周";
            break;
        case "everyMonth":
            tempLoop = "每月";
            break;
        case "everyYear":
            tempLoop = "每年";
            break;
        default:
            tempLoop = "";
            break;
    }

    loop.value = tempLoop;
}

</script>

<style scoped>

</style>