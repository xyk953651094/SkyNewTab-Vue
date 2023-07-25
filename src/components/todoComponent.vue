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
                        <a-typography-text :style="{color: fontColor}">{{"待办事项 " + todoSize + " / " + todoMaxSize}}</a-typography-text>
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
            <a-badge :count="checkboxOptions.length">
                <a-button type="primary" shape="round" size="large" id="todoBtn" class="componentTheme zIndexHigh">
                    <template #icon>
                        <icon-check-square />
                    </template>
                </a-button>
            </a-badge>
            <template #content>
                <a-checkbox-group direction="vertical" :options="checkboxOptions" @change="checkboxOnChange"/>
            </template>
        </a-popover>
    </a-space>
    <a-modal v-model:visible="displayModal" :closable="false" @ok="modalOkBtnOnClick" @cancel="modalCancelBtnOnClick" unmount-on-close :mask-style="{backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)'}">
        <template #title>{{"添加待办事项 " + todoSize + " / " + todoMaxSize}}</template>
        <a-form>
            <a-form-item field="todoInput" label="待办内容" validate-trigger="change" required>
                <a-input placeholder="请输入待办内容" id="todoInput" maxLength="10" allow-clear showWordLimit/>
            </a-form-item>
            <a-form-item field="todoRate" label="优先级别" validate-trigger="change" required>
                <!--TODO:rate深色主题下底色问题，无法与React版保持一致-->
                <a-rate @change="rateOnChange" :allow-clear="true" :color="fontColor"/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {IconCheckSquare, IconDelete, IconPlus} from "@arco-design/web-vue/es/icon";
import {changeThemeColor, getFontColor} from "../javascripts/publicFunctions";
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
let checkboxOptions = ref([]);
let todoSize = ref(0);
let todoMaxSize = ref(5);
let priority = ref(0);

onMounted(()=>{
    let todos = [];
    let tempTodos = localStorage.getItem("todos");
    if(tempTodos){
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
    if(tempTodos){
        localStorage.removeItem("todos");

        checkboxOptions.value = [];
        todoSize.value = 0;
    }
}

function showAddModalBtnOnClick() {
    let todos = [];
    let tempTodos = localStorage.getItem("todos");
    if(tempTodos){
        todos = JSON.parse(tempTodos);
    }
    if(todos.length < todoMaxSize.value) {
        // $("#todoInput").children("input").val("");
        displayModal.value = true;
        priority.value = 0;
    }
    else {
        Message.error("待办数量最多为" + todoMaxSize.value + "个");
    }
}

function modalOkBtnOnClick() {
    let todoContent = $("#todoInput").children("input").val();
    if(todoContent && todoContent.length > 0) {
        let todos = [];
        let tempTodos = localStorage.getItem("todos");
        if(tempTodos){
            todos = JSON.parse(tempTodos);
        }
        if(todos.length < todoMaxSize.value) {
            todoContent = todoContent + " ";
            todos.push({"label": todoContent + "★".repeat(priority.value), "value": todoContent + "★".repeat(priority.value)});
            localStorage.setItem("todos", JSON.stringify(todos));

            displayModal.value = false;
            checkboxOptions.value = todos;
            todoSize.value = todos.length;
            Message.success("添加成功");
        }
        else {
            Message.error("待办数量最多为" + todoMaxSize.value + "个");
        }
    }
    else {
        Message.error("待办内容不能为空");
        event.preventDefault();
    }
}

function modalCancelBtnOnClick() {
    displayModal.value =  false
}

function checkboxOnChange(checkedValues) {
    console.log('checked = ', checkedValues);
    let todos = [];
    let tempTodos = localStorage.getItem("todos");
    if(tempTodos){
        todos = JSON.parse(tempTodos);
        let index = -1;
        for(let i = 0; i < todos.length; i++) {
            if (checkedValues[checkedValues.length - 1] === todos[i].label) {
                index = i;
                break;
            }
        }
        if(index !== -1) {
            todos.splice(index, 1);
        }
        localStorage.setItem("todos", JSON.stringify(todos));

        checkboxOptions.value = todos;
        todoSize.value = todos.length;
    }
}

function rateOnChange(value) {
    priority.value = value;
}

</script>

<style scoped>

</style>