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
                        <a-typography-text :style="{color: fontColor}">
                            {{ "待办事项 " + todoSize + " / " + todoMaxSize }}
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
                                {{ "添加待办事项" }}
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
            <a-badge :count="checkboxOptions.length" :style="{display: display}">
                <a-button id="todoBtn" :style="{cursor: 'default', display: display}" class="componentTheme zIndexHigh" shape="round"
                          size="large"
                          type="primary">
                    <template #icon>
                        <icon-check-square/>
                    </template>
                </a-button>
            </a-badge>
            <template #content>
                <a-list :bordered=false>
                    <a-list-item v-for="item in checkboxOptions" :key="item.timestamp">
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
                                    {{ "优先级：" + item.priority }}
                                </a-button>
                            </a-col>
                        </a-row>
                        <template #actions>
                            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                                      shape="circle"
                                      type="text" @click="finishBtnOnClick(item)">
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
        <template #title>{{ "添加待办事项 " + todoSize + " / " + todoMaxSize }}</template>
        <a-form>
            <a-form-item field="todoInput" label="待办内容">
                <a-input id="todoInput" allow-clear maxLength="10" placeholder="请输入待办内容" showWordLimit/>
            </a-form-item>
            <a-form-item field="todoRate" label="优先级别">
                <a-rate :allow-clear="true" :color="hoverColor" default-value="1" @change="rateOnChange"/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {IconCheck, IconCheckSquare, IconDelete, IconPlus} from "@arco-design/web-vue/es/icon";
import {changeThemeColor, getFontColor} from "../javascripts/publicFunctions";
import {Message} from "@arco-design/web-vue";
import {defaultPreferenceData} from "../javascripts/publicConstants";

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
let checkboxOptions = ref([]);
let todoSize = ref(0);
let todoMaxSize = ref(5);
let priority = ref(1);

onMounted(() => {
    let todos = [];
    let tempTodos = localStorage.getItem("todos");
    if (tempTodos) {
        todos = JSON.parse(tempTodos);
    }

    checkboxOptions.value = todos;
    todoSize.value = todos.length;
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
    let tempTodos = localStorage.getItem("todos");
    if (tempTodos) {
        localStorage.removeItem("todos");

        checkboxOptions.value = [];
        todoSize.value = 0;
    }
}

function finishBtnOnClick(item) {
    let todos = [];
    let tempTodos = localStorage.getItem("todos");
    if (tempTodos) {
        todos = JSON.parse(tempTodos);
        let index = -1;
        for (let i = 0; i < todos.length; i++) {
            if (item.timeStamp === todos[i].timeStamp) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            todos.splice(index, 1);
        }
        localStorage.setItem("todos", JSON.stringify(todos));

        checkboxOptions.value = todos;
        todoSize.value = todos.length;
    }
}

function showAddModalBtnOnClick() {
    let todos = [];
    let tempTodos = localStorage.getItem("todos");
    if (tempTodos) {
        todos = JSON.parse(tempTodos);
    }
    if (todos.length < todoMaxSize.value) {
        displayModal.value = true;
        priority.value = 1;
    } else {
        Message.error("待办数量最多为" + todoMaxSize.value + "个");
    }
}

function modalBeforeOk() {
    let todoContent = $("#todoInput").children("input").val();
    if (todoContent && todoContent.length > 0) {
        let todos = [];
        let tempTodos = localStorage.getItem("todos");
        if (tempTodos) {
            todos = JSON.parse(tempTodos);
        }
        if (todos.length < todoMaxSize.value) {
            return true;
        } else {
            Message.error("待办数量最多为" + todoMaxSize.value + "个");
            return false;
        }
    } else {
        Message.error("待办内容不能为空");
        return false;
    }
}

function modalOkBtnOnClick() {
    let todoContent = $("#todoInput").children("input").val();
    let todos = [];
    let tempTodos = localStorage.getItem("todos");
    if (tempTodos) {
        todos = JSON.parse(tempTodos);
    }

    todos.push({
        "title": todoContent,
        "priority": "★".repeat(priority.value),
        "timeStamp": Date.now()
    });
    localStorage.setItem("todos", JSON.stringify(todos));

    displayModal.value = false;
    checkboxOptions.value = todos;
    todoSize.value = todos.length;
    Message.success("添加成功");
}

function modalCancelBtnOnClick() {
    displayModal.value = false
}

function rateOnChange(value) {
    priority.value = value;
}

</script>

<style scoped>

</style>