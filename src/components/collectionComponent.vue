<template>
    <a-col :span="24" class="center zIndexHigh">
        <a-space>
            <a-button type="primary" shape="round" class="componentTheme" :style="{color: fontColor, backgroundColor: backgroundColor}">百度</a-button>
            <a-button type="primary" shape="round" class="componentTheme" :style="{color: fontColor, backgroundColor: backgroundColor}">淘宝</a-button>
            <a-button type="primary" shape="round" class="componentTheme" :style="{color: fontColor, backgroundColor: backgroundColor}">京东</a-button>
            <a-button type="primary" shape="round" class="componentTheme" :style="{color: fontColor, backgroundColor: backgroundColor}">支付宝</a-button>
            <a-button type="primary" shape="round" class="componentTheme" :style="{color: fontColor, backgroundColor: backgroundColor}">微博</a-button>
            <a-button type="primary" shape="round" class="componentTheme" :style="{color: fontColor, backgroundColor: backgroundColor}"
                      @click="showAddModal">
                <template #icon><icon-plus /></template>
            </a-button>
            <a-button type="primary" shape="round" class="componentTheme" :style="{color: fontColor, backgroundColor: backgroundColor}"
                      @click="showEditModal">
                <template #icon><icon-edit /></template>
            </a-button>
            <a-modal v-model:visible="displayAddModal" @ok="handleAddModalOk" @cancel="handleAddModalCancel">
                <template #title>添加链接</template>
                <a-form>
                    <a-form-item field="name" label="网站名称" :rules="[{required:true,message:'网页名称不能为空'}]" :validate-trigger="['change','input']">
                        <a-input placeholder="请输入网站名称" id="webNameInput"/>
                    </a-form-item>
                    <a-form-item field="post" label="网站地址" :rules="[{required:true,message:'网页地址不能为空'}]" :validate-trigger="['change','input']">
                        <a-input placeholder="请输入网站地址" id="webUrlInput"/>
                    </a-form-item>
                </a-form>
            </a-modal>
            <a-modal v-model:visible="displayEditModal" @ok="handleEditModalOk" @cancel="handleEditModalCancel">
                <template #title>编辑链接</template>
                <a-list>
                    <a-list-item v-for="item in listData" :key="item.timestamp">
                        <a-list-item-meta :title=item.webName :description=item.webUrl>
                        </a-list-item-meta>
                        <template #actions>
                            <a-button type="text" status="danger" @click="handleRemoveCollection(item)">
                                <template #icon><icon-delete /></template>
                                删除
                            </a-button>
                        </template>
                    </a-list-item>
                </a-list>
            </a-modal>
        </a-space>
    </a-col>
</template>

<script setup>
import {defineProps, ref, watch} from "vue";
import {IconPlus, IconEdit, IconDelete} from "@arco-design/web-vue/es/icon";
// import {changeThemeColor} from "../javascripts/publicFunctions";
import {Message} from "@arco-design/web-vue";

const $ = require("jquery");

const props = defineProps({
    themeColor: {
        type: Object,
        required: true,
        default: ()=> {
            return {
                "componentBackgroundColor": "",
                "componentFontColor": ""
            }
        }
    }
});

let backgroundColor = ref("");
let fontColor = ref("");
let displayAddModal = ref(false);
let displayEditModal = ref(false);
let listData = ref([]);
let collectionMaxSize = ref(5);

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
    }
})

// 添加导航弹窗
function showAddModal() {
    let collections = [];
    let tempCollections = localStorage.getItem("collections");
    if(tempCollections){
        collections = JSON.parse(tempCollections);
    }
    if(collections.length < collectionMaxSize.value) {
        $("#webNameInput").children("input").val("");
        $("#webUrlInput").children("input").val("");

        displayAddModal.value = true
    }
    else {
        Message.error("链接数量最多为5个");
    }
}

function handleAddModalOk() {
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
        }
        else {
            Message.error("链接数量最多为5个");
        }
    }
    else {
        Message.error("网页名称或网页地址不能为空");
    }
}

function handleAddModalCancel() {
    displayAddModal.value = false
}

// 编辑导航弹窗
function showEditModal() {
    let collections = [];
    let tempCollections = localStorage.getItem("collections");
    if(tempCollections){
        collections = JSON.parse(tempCollections);
    }

    displayEditModal.value = true;
    listData.value = collections;
}

function handleEditModalOk() {
    displayEditModal.value = false;
}

function handleEditModalCancel() {
    displayEditModal.value = false;
}

function handleRemoveCollection(item) {
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

        listData.value = collections
    }
}

</script>

<style scoped>

</style>