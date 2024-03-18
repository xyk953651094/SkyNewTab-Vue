<template>
    <a-space>
        <a-popover
            :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
            :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
            :style="{width: '550px'}"
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
                    <a-col :span="10">
                        <a-typography-text :style="{color: fontColor}">{{
                                "倒数日 " + dailyList.length + " / " + dailyMaxSize
                            }}
                        </a-typography-text>
                    </a-col>
                    <a-col :span="14" :style="{textAlign: 'right'}">
                        <a-space>
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
                            <a-col :span="10">
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
                            <a-col :span="14">
                                <a-button :shape="preferenceData.buttonShape"
                                          :style="{color: fontColor, cursor: 'default'}"
                                          type="text"
                                          @mouseout="btnMouseOut(fontColor, $event)"
                                          @mouseover="btnMouseOver(hoverColor, $event)">
                                    <template #icon>
                                        <icon-clock-circle/>
                                    </template>
                                    {{
                                        getTimeDetails(new Date(item.selectedTimeStamp)).showDate4 + " ｜ " + getDailyDescription(item.selectedTimeStamp)
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
                <a-col :span="24" :style="{display: 'flex', alignItems: 'center'}">
                    <a-typography-text :style="{color: fontColor}">
                        {{ "添加倒数日 " + dailyList.length + " / " + dailyMaxSize }}
                    </a-typography-text>
                </a-col>
            </a-row>
        </template>
        <a-form>
            <a-form-item field="dailyInput" label="倒数标题">
                <a-input placeholder="请输入标题"  v-model="inputValue" @change="inputOnChange"
                         maxLength="10" show-word-limit allow-clear/>
            </a-form-item>
            <a-form-item field="dailyDatePicker" label="倒数日期">
                <a-date-picker id="dailyDatePicker" :allow-clear="false" @change="datePickerOnChange"/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {IconCalendarClock, IconClockCircle, IconDelete, IconPlus} from "@arco-design/web-vue/es/icon";
import {btnMouseOut, btnMouseOver, changeThemeColor, getTimeDetails} from "@/javascripts/publicFunctions";
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
let displayModal = ref(false);
let inputValue = ref("");
let dailyList = ref([]);
let selectedTimeStamp = ref(0);
const dailyMaxSize = 10;

onMounted(() => {
    let dailyListStorage = localStorage.getItem("daily");
    if (dailyListStorage) {
        dailyList.value = JSON.parse(dailyListStorage);
    }
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
}

function showAddModalBtnOnClick() {
    if (dailyList.value.length < dailyMaxSize) {
        displayModal.value = true;
        inputValue.value = "";
        selectedTimeStamp.value = 0;
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
    } else {
        selectedTimeStamp.value = 0;
    }
    console.log(date, dateString);
}

</script>

<style scoped>

</style>