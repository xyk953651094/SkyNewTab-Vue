<template>
    <a-row :style="{display: display}">
        <a-col :span="24" class="alignCenter">
            <a-space>
                <a-tooltip v-for="item in collectionData" :key="item.timeStamp"
                           :background-color="backgroundColor" :content-style="{color: fontColor}"
                           :content="'前往 ' + item.webName"
                           position="bottom">
                    <a-button :shape="preferenceData.buttonShape"
                              :style="{color: fontColor, backgroundColor: backgroundColor}"
                              class="componentTheme zIndexHigh"
                              type="primary"
                              @click="collectionBtnOnClick(item)">
                        {{ item.webName }}
                    </a-button>
                </a-tooltip>
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
        </a-col>
    </a-row>
    <a-modal v-model:visible="displayAddModal" :closable="false"
             :mask-style="{backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)'}"
             :onBeforeOk="addModalBeforeOk" unmount-on-close
             @cancel="addModalCancelBtnOnClick" @ok="addModalOkBtnOnClick">
        <template #title>
            <a-row :style="{width: '100%'}" align="center">
                <a-col :span="12">
                    <a-typography-text :style="{color: fontColor}">
                        {{ "添加链接 " + collectionSize + " / " + collectionMaxSize }}
                    </a-typography-text>
                </a-col>
                <a-col :span="12" :style="{textAlign: 'right'}">
                    <icon-link />
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
    <a-modal v-model:visible="displayEditModal" :closable="false" unmount-on-close
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
                <a-space>
                    <a-input allow-clear :style="{width: '150px'}" @press-enter="editNameInputOnPressEnter(item, $event)" :default-value="item.webName" maxLength="5" showWordLimit/>
                    <a-input allow-clear :style="{width: '250px'}" @press-enter="editUrlInputOnPressEnter(item, $event)" :default-value="item.webUrl" showWordLimit/>
                </a-space>
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
            <template #footer>
                <a-typography-text :style="{color: fontColor, display: collectionData.length > 0 ? 'inline-block' : 'none'}">
                    {{ "在输入框中修改内容后按回车生效" }}
                </a-typography-text>
            </template>
        </a-list>
    </a-modal>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {IconDelete, IconEdit, IconPlus, IconLink} from "@arco-design/web-vue/es/icon";
import {Message} from "@arco-design/web-vue";
import {btnMouseOut, btnMouseOver, getExtensionStorage, setExtensionStorage, removeExtensionStorage} from "@/javascripts/publicFunctions";
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
    getExtensionStorage("collections", []).then((collections) => {
        if (collections.length < collectionMaxSize.value) {
            displayAddModal.value = true
        } else {
            Message.error("链接数量最多为" + collectionMaxSize.value + "个");
        }
    });
}

function addModalBeforeOk() {
    let webName = $("#webNameInput").children("input").val();
    let webUrl = $("#webUrlInput").children("input").val();
    if (webName && webUrl && webName.length > 0 && webUrl.length > 0) {
        getExtensionStorage("collections", []).then((collections) => {
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
        });
    } else {
        Message.error("表单不能为空");
        return false;
    }
}

function addModalOkBtnOnClick() {
    let webName = $("#webNameInput").children("input").val();
    let webUrl = $("#webUrlInput").children("input").val();

    getExtensionStorage("collections", []).then((collections) => {
        collections.push({"webName": webName, "webUrl": webUrl, "timeStamp": Date.now()});
        setExtensionStorage("collections", collections);

        displayAddModal.value = false;
        collectionData.value = collections;
        collectionSize.value = collections.length;
        Message.success("添加成功");
    });
}

function addModalCancelBtnOnClick() {
    displayAddModal.value = false
}

// 编辑导航弹窗
function showEditModalBtnOnClick() {
    getExtensionStorage("collections", []).then((collections) => {
        displayEditModal.value = true;
        collectionData.value = collections;
    });
}

function editNameInputOnPressEnter(item, e) {
    if (e.target.value.length > 0) {
        getExtensionStorage("collections", null).then((collections) => {
            if (collections) {
                let index = -1;
                for (let i = 0; i < collectionData.value.length; i++) {
                    if (item.timeStamp === collectionData.value[i].timeStamp) {
                        index = i;
                        break;
                    }
                }
                if (index !== -1) {
                    collections[index].webName = e.target.value;

                    setExtensionStorage("collections", collections);

                    collectionData.value = collections;
                    collectionSize.value = collections.length;
                    Message.success("修改成功");
                } else {
                    Message.error("修改失败");
                }
            }
        });
    } else {
        Message.warning("链接名称不能为空");
    }
}

function editUrlInputOnPressEnter(item, e) {
    if (e.target.value.length > 0) {
        getExtensionStorage("collections", null).then((collections) => {
            if (collections) {
                let index = -1;
                for (let i = 0; i < collectionData.value.length; i++) {
                    if (item.timeStamp === collectionData.value[i].timeStamp) {
                        index = i;
                        break;
                    }
                }
                if (index !== -1) {
                    collections[index].webUrl = e.target.value;

                    setExtensionStorage("collections", collections);

                    collectionData.value = collections;
                    collectionSize.value = collections.length;
                    Message.success("修改成功");
                } else {
                    Message.error("修改失败");
                }
            }
        });
    } else {
        Message.warning("链接地址不能为空");
    }
}

function editModalOkBtnOnClick() {
    displayEditModal.value = false;
}

function editModalCancelBtnOnClick() {
    displayEditModal.value = false;
}

function removeBtnOnClick(item) {
    getExtensionStorage("collections", null).then((collections) => {
        if (collections) {
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
            setExtensionStorage("collections", collections);

            collectionData.value = collections;
            collectionSize.value = collections.length;
            Message.success("删除成功");
        }
    });
}

function removeAllBtnOnClick() {
    getExtensionStorage("collections", null).then((collections) => {
        if (collections) {
            removeExtensionStorage("collections");

            collectionData.value = [];
            collectionSize.value = 0;
            Message.success("删除成功");
        }
    });
}

</script>

<style scoped>

</style>