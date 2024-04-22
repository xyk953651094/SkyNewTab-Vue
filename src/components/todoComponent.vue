<template>
    <a-space>
        <a-popover
            :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
            :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
            :style="{width: '550px'}"
            position="br"
        >
            <a-button id="todoBtn" :shape="preferenceData.buttonShape" :style="{cursor: 'default', display: display}"
                      class="componentTheme zIndexHigh"
                      size="large"
                      type="primary">
                <template #icon>
                    <icon-check-square/>
                </template>
                {{ todoList.length + " 个" }}
            </a-button>
            <template #title>
                <a-row align="center">
                    <a-col :span="8">
                        <a-typography-text :style="{color: fontColor}">
                            {{ "待办事项 " + todoList.length + " / " + todoMaxSize }}
                        </a-typography-text>
                    </a-col>
                    <a-col :span="16" :style="{textAlign: 'right'}">
                        <a-space>
                            <a-switch v-model="notification" id="todoNotificationSwitch" @change="notificationSwitchOnChange">
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
                                {{ "添加待办事项" }}
                            </a-button>
                            <a-button :shape="preferenceData.buttonShape"
                                      :style="{color: fontColor}" type="text"
                                      @click="finishAllBtnOnClick"
                                      @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                <template #icon>
                                    <icon-check/>
                                </template>
                                {{ "全部完成" }}
                            </a-button>
                        </a-space>
                    </a-col>
                </a-row>
            </template>
            <template #content>
                <a-list :bordered=false>
                    <a-list-item v-for="item in todoList" :key="item.timestamp">
                        <a-row>
                            <a-col :span="12">
                                <a-button :shape="preferenceData.buttonShape"
                                          :style="{color: fontColor, cursor: 'default'}"
                                          type="text"
                                          @mouseout="btnMouseOut(fontColor, $event)"
                                          @mouseover="btnMouseOver(hoverColor, $event)">
                                    <template #icon>
                                        <icon-check-square/>
                                    </template>
                                    {{ item.title }}
                                </a-button>
                            </a-col>
                            <a-col :span="12">
                                <a-button :shape="preferenceData.buttonShape"
                                          :style="{color: fontColor, cursor: 'default'}"
                                          type="text"
                                          @mouseout="btnMouseOut(fontColor, $event)"
                                          @mouseover="btnMouseOver(hoverColor, $event)">
                                    <template #icon>
                                        <icon-tag/>
                                    </template>
                                    {{ item.tag + " ｜ " + item.priority }}
                                </a-button>
                            </a-col>
                        </a-row>
                        <template #actions>
                            <a-button :shape="preferenceData.buttonShape"
                                      :style="{color: fontColor}" type="text"
                                      @click="finishBtnOnClick(item)"
                                      @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                <template #icon>
                                    <icon-check/>
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
                        {{ "添加待办事项 " + todoList.length + " / " + todoMaxSize }}
                    </a-typography-text>
                </a-col>
            </a-row>
        </template>
        <a-form>
            <a-form-item field="todoInput" label="待办内容">
                <a-input placeholder="请输入待办内容" v-model="inputValue" @change="inputOnChange"
                         maxLength="10" show-word-limit allow-clear/>
            </a-form-item>
            <a-form-item field="todoSelect" label="标签分类">
                <a-select id="todoSelect" default-value="work" @change="selectOnChange">
                    <a-option value="work">工作</a-option>
                    <a-option value="study">学习</a-option>
                    <a-option value="life">生活</a-option>
                    <a-option value="rest">休闲</a-option>
                    <a-option value="other">其它</a-option>
                </a-select>
            </a-form-item>
            <a-form-item field="todoRate" label="优先级别">
                <a-rate :allow-clear="true" :color="hoverColor" default-value="1" @change="rateOnChange"/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {IconCheck, IconCheckSquare, IconPlus, IconTag} from "@arco-design/web-vue/es/icon";
import {btnMouseOut, btnMouseOver, changeThemeColor} from "@/javascripts/publicFunctions";
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
let todoList = ref([]);
let tag = ref("工作");
let priority = ref("★");
const todoMaxSize = 10;

onMounted(() => {
    let notificationStorage = localStorage.getItem("todoNotification");
    if (notificationStorage) {
        notification.value = JSON.parse(notificationStorage);
    } else {
        localStorage.setItem("todoNotification", JSON.stringify(false));
    }

    let todoListStorage = localStorage.getItem("todos");
    if (todoListStorage) {
        todoList.value = JSON.parse(todoListStorage);
        if (notification.value && todoList.value.length > 0) {
            Message.warning({content: "剩余 " + todoList.value.length + " 个待办事项未处理", position: "bottom"});
        }
    }
})

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        hoverColor.value = props.themeColor.themeColor;
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#todoBtn", backgroundColor.value, fontColor.value);
    }
})

watch(() => props.preferenceData.simpleMode, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        display.value = newValue ? "none" : "block";
    }
}, {immediate: true})

function finishAllBtnOnClick() {
    todoList.value = [];
    localStorage.removeItem("todos");
}

function finishBtnOnClick(item) {
    let index = -1;
    for (let i = 0; i < todoList.value.length; i++) {
        if (item.timeStamp === todoList.value[i].timeStamp) {
            index = i;
            break;
        }
    }
    if (index !== -1) {
        todoList.value.splice(index, 1);
    }

    todoList.value.sort((a, b) => {
        return b.priority.length - a.priority.length;
    });

    localStorage.setItem("todos", JSON.stringify(todoList.value));
}

function notificationSwitchOnChange(checked) {
    notification.value = checked;
    localStorage.setItem("todoNotification", JSON.stringify(checked));
}

function showAddModalBtnOnClick() {
    if (todoList.value.length < todoMaxSize) {
        displayModal.value = true;
        inputValue.value = "";
        tag.value = "工作";
        priority.value = "★";
    } else {
        Message.error("待办数量最多为" + todoMaxSize + "个");
    }
}

function inputOnChange(value) {
    inputValue.value = value;
}

function modalBeforeOk() {
    if (inputValue.value && inputValue.value.length > 0) {
        return true;
    } else {
        Message.error("表单不能为空");
        return false;
    }
}

function modalOkBtnOnClick() {
    todoList.value.push({
        "title": inputValue.value,
        "tag": tag.value,
        "priority": priority.value,
        "timeStamp": Date.now()
    });

    todoList.value.sort((a, b) => {
        return b.priority.length - a.priority.length;
    });

    displayModal.value = false;
    localStorage.setItem("todos", JSON.stringify(todoList.value));
    Message.success("添加成功");
}

function modalCancelBtnOnClick() {
    displayModal.value = false;
}

function selectOnChange(value) {
    switch (value) {
        case "work":
            tag.value = "工作";
            break;
        case "study":
            tag.value = "学习";
            break;
        case "life":
            tag.value = "生活";
            break;
        case "rest":
            tag.value = "休闲";
            break;
        case "other":
            tag.value = "其它";
            break;
        default:
            tag.value = "工作";
    }
}

function rateOnChange(value) {
    priority.value = "★".repeat(value);
}

</script>

<style scoped>

</style>