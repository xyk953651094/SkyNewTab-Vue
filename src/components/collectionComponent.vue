<template>
    <a-row :style="{display: display}">
        <a-col :span="24" class="alignCenter">
            <a-space>
                <a-tooltip v-for="item in collectionData" :key="item.timeStamp" :background-color="backgroundColor"
                           :content="item.webUrl"
                           :content-style="{color: fontColor}" position="bottom">
                    <a-button :shape="preferenceData.buttonShape"
                              :style="{color: fontColor, backgroundColor: backgroundColor}"
                              class="componentTheme zIndexHigh"
                              type="primary"
                              @click="collectionBtnOnClick(item)">
                        {{ item.webName }}
                    </a-button>
                </a-tooltip>

                <a-space>
                    <a-tooltip :background-color="backgroundColor" :content-style="{color: fontColor}"
                               content="添加链接"
                               position="bottom">
                        <a-button :shape="preferenceData.buttonShape"
                                  :style="{color: fontColor, backgroundColor: backgroundColor}"
                                  class="componentTheme zIndexHigh"
                                  type="primary"
                                  @click="showAddModalBtnOnClick">
                            <template #icon>
                                <icon-plus/>
                            </template>
                        </a-button>
                    </a-tooltip>
                    <a-tooltip :background-color="backgroundColor" :content-style="{color: fontColor}"
                               content="编辑链接"
                               position="bottom">
                        <a-button :shape="preferenceData.buttonShape"
                                  :style="{color: fontColor, backgroundColor: backgroundColor}"
                                  class="componentTheme zIndexHigh"
                                  type="primary"
                                  @click="showEditModalBtnOnClick">
                            <template #icon>
                                <icon-edit/>
                            </template>
                        </a-button>
                    </a-tooltip>
                    <a-tooltip :background-color="backgroundColor" :content-style="{color: fontColor}"
                               content="全部删除"
                               position="bottom">
                        <a-button :shape="preferenceData.buttonShape"
                                  :style="{color: fontColor, backgroundColor: backgroundColor}"
                                  class="componentTheme zIndexHigh"
                                  type="primary"
                                  @click="removeAllBtnOnClick">
                            <template #icon>
                                <icon-delete/>
                            </template>
                        </a-button>
                    </a-tooltip>
                </a-space>
            </a-space>
        </a-col>
    </a-row>
    <a-modal v-model:visible="displayAddModal" :closable="false"
             :mask-style="{backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)'}"
             :onBeforeOk="addModalBeforeOk" unmount-on-close
             @cancel="addModalCancelBtnOnClick" @ok="addModalOkBtnOnClick">
        <template #title>
            <a-row :style="{width: '100%'}" align="center">
                <a-col :span="24" :style="{display: 'flex', alignItems: 'center'}">
                    <a-typography-text :style="{color: fontColor}">
                        {{ "添加链接 " + collectionSize + " / " + collectionMaxSize }}
                    </a-typography-text>
                </a-col>
            </a-row>
        </template>
        <a-form>
            <a-form-item field="name" label="链接名称">
                <a-input id="webNameInput" allow-clear maxLength="5" placeholder="请输入链接名称" showWordLimit/>
            </a-form-item>
            <a-form-item field="post" label="链接地址">
                <a-input id="webUrlInput" allow-clear placeholder="请输入链接地址"/>
            </a-form-item>
        </a-form>
    </a-modal>
    <a-modal v-model:visible="displayEditModal" :closable="false"
             :mask-style="{backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)'}"
             @cancel="editModalCancelBtnOnClick"
             @ok="editModalOkBtnOnClick">
        <template #title>
            <a-row :style="{width: '100%'}" align="center">
                <a-col :span="12" :style="{display: 'flex', alignItems: 'center'}">
                    <a-typography-text :style="{color: fontColor}">
                        {{ "编辑链接 " + collectionSize + " / " + collectionMaxSize }}
                    </a-typography-text>
                </a-col>
                <a-col :span="12" :style="{textAlign: 'right'}">
                    <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                              type="text"
                              @click="removeAllBtnOnClick"
                              @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                        <template #icon>
                            <icon-delete/>
                        </template>
                        全部删除
                    </a-button>
                </a-col>
            </a-row>
        </template>
        <a-list :bordered=false>
            <a-list-item v-for="item in collectionData" :key="item.timestamp">
                <a-row>
                    <a-col :span="8">
                        <a-button :shape="preferenceData.buttonShape"
                                  :style="{color: fontColor, cursor: 'default'}"
                                  type="text" @mouseout="btnMouseOut(fontColor, $event)"
                                  @mouseover="btnMouseOver(hoverColor, $event)">
                            <template #icon>
                                <icon-pushpin/>
                            </template>
                            {{ item.webName }}
                        </a-button>
                    </a-col>
                    <a-col :span="16">
                        <a-button :shape="preferenceData.buttonShape"
                                  :style="{color: fontColor, cursor: 'default'}"
                                  type="text" @mouseout="btnMouseOut(fontColor, $event)"
                                  @mouseover="btnMouseOver(hoverColor, $event)">
                            <template #icon>
                                <icon-link/>
                            </template>
                            {{ item.webUrl.length < 30 ? item.webUrl : item.webUrl.substring(0, 30) + "..." }}
                        </a-button>
                    </a-col>
                </a-row>
                <template #actions>
                    <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                              type="text"
                              @click="removeBtnOnClick(item)"
                              @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                        <template #icon>
                            <icon-delete/>
                        </template>
                    </a-button>
                </template>
            </a-list-item>
        </a-list>
    </a-modal>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {IconDelete, IconEdit, IconLink, IconPlus, IconPushpin} from "@arco-design/web-vue/es/icon";
import {Message} from "@arco-design/web-vue";
import {btnMouseOut, btnMouseOver} from "@/javascripts/publicFunctions";
import {defaultPreferenceData} from "@/javascripts/publicConstants";

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
let displayAddModal = ref(false);
let displayEditModal = ref(false);
let collectionData = ref([]);
let collectionSize = ref(0);
let collectionMaxSize = ref(5);

onMounted(() => {
    let collections = [];
    let tempCollections = localStorage.getItem("collections");

    if (tempCollections) {
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

watch(() => props.preferenceData.simpleMode, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        display.value = newValue ? "none" : "block";
    }
}, {immediate: true})

function collectionBtnOnClick(item) {
    window.open(item.webUrl, "_self");
}

// 添加导航弹窗
function showAddModalBtnOnClick() {
    let collections = [];
    let tempCollections = localStorage.getItem("collections");
    if (tempCollections) {
        collections = JSON.parse(tempCollections);
    }
    if (collections.length < collectionMaxSize.value) {
        displayAddModal.value = true
    } else {
        Message.error("链接数量最多为" + collectionMaxSize.value + "个");
    }
}

function addModalBeforeOk() {
    let webName = $("#webNameInput").children("input").val();
    let webUrl = $("#webUrlInput").children("input").val();
    if (webName && webUrl && webName.length > 0 && webUrl.length > 0) {
        let collections = [];
        let tempCollections = localStorage.getItem("collections");
        if (tempCollections) {
            collections = JSON.parse(tempCollections);
        }
        if (collections.length < collectionMaxSize.value) {
            let urlRegExp = new RegExp("(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]", "g");
            if (urlRegExp.exec(webUrl) === null) {
                Message.error("链接地址格式错误");
                return false;
            }
            else {
                return true;
            }
        } else {
            Message.error("链接数量最多为" + collectionMaxSize.value + "个");
            return false;
        }
    } else {
        Message.error("表单不能为空");
        return false;
    }
}

function addModalOkBtnOnClick() {
    let webName = $("#webNameInput").children("input").val();
    let webUrl = $("#webUrlInput").children("input").val();
    let collections = [];
    let tempCollections = localStorage.getItem("collections");
    if (tempCollections) {
        collections = JSON.parse(tempCollections);
    }

        collections.push({"webName": webName, "webUrl": webUrl, "timeStamp": Date.now()});
        localStorage.setItem("collections", JSON.stringify(collections));

        displayAddModal.value = false;
        collectionData.value = collections;
        collectionSize.value = collections.length;
        Message.success("添加成功");
}

function addModalCancelBtnOnClick() {
    displayAddModal.value = false
}

// 编辑导航弹窗
function showEditModalBtnOnClick() {
    let collections = [];
    let tempCollections = localStorage.getItem("collections");
    if (tempCollections) {
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
    if (tempCollections) {
        collections = JSON.parse(tempCollections);
        let index = -1;
        for (let i = 0; i < collections.length; i++) {
            if (item.timeStamp === collections[i].timeStamp) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            collections.splice(index, 1);
        }
        localStorage.setItem("collections", JSON.stringify(collections));

        collectionData.value = collections;
        collectionSize.value = collections.length;
    }
}

function removeAllBtnOnClick() {
    let tempCollections = localStorage.getItem("collections");
    if (tempCollections) {
        localStorage.removeItem("collections");

        collectionData.value = [];
        collectionSize.value = 0;
        Message.success("删除成功");
    }
}

</script>

<style scoped>

</style>