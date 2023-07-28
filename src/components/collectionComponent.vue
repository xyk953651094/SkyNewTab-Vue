<template>
    <a-col :span="24" class="center">
        <a-space class="zIndexHigh">
            <a-tooltip v-for="item in collectionData" :key="item.timeStamp" :content="item.webUrl" position="bottom" :background-color="backgroundColor" :content-style="{color: fontColor}">
                <a-button type="primary" shape="round" class="componentTheme" :style="{color: fontColor, backgroundColor: backgroundColor}"
                          @click="collectionBtnOnClick(item)">
                    {{item.webName}}
                </a-button>
            </a-tooltip>

            <a-button type="primary" shape="round" class="componentTheme" :style="{color: fontColor, backgroundColor: backgroundColor}"
                      @click="showAddModalBtnOnClick">
                <template #icon><icon-plus /></template>
            </a-button>
            <a-button type="primary" shape="round" class="componentTheme" :style="{color: fontColor, backgroundColor: backgroundColor}"
                      @click="showEditModalBtnOnClick">
                <template #icon><icon-edit /></template>
            </a-button>
            <a-button type="primary" shape="round" class="componentTheme" :style="{color: fontColor, backgroundColor: backgroundColor}"
                      @click="removeAllBtnOnClick">
              <template #icon><icon-delete /></template>
            </a-button>
        </a-space>
    </a-col>
    <a-modal v-model:visible="displayAddModal" :closable="false" @ok="addModalOkBtnOnClick" @cancel="addModalCancelBtnOnClick" unmount-on-close :mask-style="{backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)'}">
        <template #title>{{"添加链接 " + collectionSize + " / " + collectionMaxSize}}</template>
        <a-form>
            <a-form-item field="name" label="网站名称" validate-trigger="change" required>
                <a-input placeholder="请输入网站名称" id="webNameInput" maxLength="5" allow-clear showWordLimit/>
            </a-form-item>
            <a-form-item field="post" label="网站地址" validate-trigger="change" required>
                <a-input placeholder="请输入网站地址" id="webUrlInput" allow-clear/>
            </a-form-item>
        </a-form>
    </a-modal>
    <a-modal v-model:visible="displayEditModal" :closable="false" @ok="editModalOkBtnOnClick" @cancel="editModalCancelBtnOnClick" :mask-style="{backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)'}">
        <template #title>{{"编辑链接 " + collectionSize + " / " + collectionMaxSize}}</template>
        <a-list>
            <template #header>
                <a-row justify="end">
                    <a-button type="text" shape="round" @click="removeAllBtnOnClick" :style="{color: fontColor}" :onmouseover="btnMouseOver" :onmouseout="btnMouseOut">
                      <template #icon><icon-delete /></template>
                      全部删除
                    </a-button>
                </a-row>
            </template>
            <a-list-item v-for="item in collectionData" :key="item.timestamp">
                <a-list-item-meta :title=item.webName :description=item.webUrl>
                    <template #avatar>
                        <a-avatar :image-url="item.webUrl + '/favicon.ico'" :style="{backgroundColor: 'transparent'}"/>
                    </template>
                </a-list-item-meta>
                <template #actions>
                    <a-button type="text" shape="round" @click="removeBtnOnClick(item)" :style="{color: fontColor}" :onmouseover="btnMouseOver" :onmouseout="btnMouseOut">
                        <template #icon><icon-delete /></template>
                        删除
                    </a-button>
                </template>
            </a-list-item>
        </a-list>
    </a-modal>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {IconPlus, IconEdit, IconDelete} from "@arco-design/web-vue/es/icon";
// import {changeThemeColor} from "../javascripts/publicFunctions";
import {Message} from "@arco-design/web-vue";
import {getFontColor} from "../javascripts/publicFunctions";

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
let displayAddModal = ref(false);
let displayEditModal = ref(false);
let collectionData = ref([]);
let collectionSize = ref(0);
let collectionMaxSize = ref(5);

onMounted(()=>{
    let collections = [];
    let tempCollections = localStorage.getItem("collections");

    if(tempCollections){
        collections = JSON.parse(tempCollections);
        collectionData.value = collections;
        collectionSize.value = collections.length;
    }
})

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        hoverColor.value = props.themeColor.themeColor;
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
    }
})

function btnMouseOver() {
  console.log(hoverColor.value)
  this.style.backgroundColor = hoverColor.value;
  this.style.color = getFontColor(hoverColor.value);
}

function btnMouseOut() {
  this.style.backgroundColor = "transparent";
  this.style.color = fontColor.value;
}

function collectionBtnOnClick(item) {
    window.open(item.webUrl);
}

// 添加导航弹窗
function showAddModalBtnOnClick() {
    let collections = [];
    let tempCollections = localStorage.getItem("collections");
    if(tempCollections){
        collections = JSON.parse(tempCollections);
    }
    if(collections.length < collectionMaxSize.value) {
        // $("#webNameInput").children("input").val("");
        // $("#webUrlInput").children("input").val("");

        displayAddModal.value = true
    }
    else {
        Message.error("链接数量最多为" + collectionMaxSize.value + "个");
    }
}

function addModalOkBtnOnClick() {
    let webName = $("#webNameInput").children("input").val();
    let webUrl = $("#webUrlInput").children("input").val();
    if(webName && webUrl && webName.length > 0 && webUrl.length > 0) {
        let collections = [];
        let tempCollections = localStorage.getItem("collections");
        if(tempCollections){
            collections = JSON.parse(tempCollections);
        }
        if(collections.length < collectionMaxSize.value) {
            collections.push({"webName": webName, "webUrl": webUrl, "timeStamp": Date.now ()});
            localStorage.setItem("collections", JSON.stringify(collections));

            displayAddModal.value = false;
            Message.success("添加成功");

            collectionData.value = collections;
            collectionSize.value = collections.length;
        }
        else {
            Message.error("链接数量最多为" + collectionMaxSize.value + "个");
        }
    }
    else {
        Message.error("网页名称或网页地址不能为空");
    }
}

function addModalCancelBtnOnClick() {
    displayAddModal.value = false
}

// 编辑导航弹窗
function showEditModalBtnOnClick() {
    let collections = [];
    let tempCollections = localStorage.getItem("collections");
    if(tempCollections){
        collections = JSON.parse(tempCollections);
    }

    displayEditModal.value = true;
    collectionData.value = collections;
}

function editModalOkBtnOnClick() {
    displayEditModal.value = false;
}

function editModalCancelBtnOnClick() {
    displayEditModal.value = false;
}

function removeBtnOnClick(item) {
    let collections = [];
    let tempCollections = localStorage.getItem("collections");
    if(tempCollections){
        collections = JSON.parse(tempCollections);
        let index = -1;
        for(let i = 0; i < collections.length; i++) {
            if (item.timeStamp === collections[i].timeStamp) {
                index = i;
                break;
            }
        }
        if(index !== -1) {
            collections.splice(index, 1);
        }
        localStorage.setItem("collections", JSON.stringify(collections));

        collectionData.value = collections;
        collectionSize.value = collections.length;
    }
}

function removeAllBtnOnClick() {
  let tempCollections = localStorage.getItem("collections");
  if(tempCollections){
    localStorage.removeItem("collections");

    collectionData.value = [];
    collectionSize.value = 0;
    Message.success("删除成功");
  }
}

</script>

<style scoped>

</style>