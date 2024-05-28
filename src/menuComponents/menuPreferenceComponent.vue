<template>
    <a-card :body-style="{backgroundColor: backgroundColor}"
            :header-style="{backgroundColor: backgroundColor, borderBottom: '1px solid ' + fontColor}"
            :style="{border: '1px solid' + fontColor}"
            size="small"
            title="偏好设置"
    >
        <template #extra>
            <icon-settings/>
        </template>
        <a-form :model="preferenceData" auto-label-width :disabled="formDisabled">
            <a-form-item field="searchEngine" label="搜索引擎" :style="{display: ['iPhone', 'Android'].indexOf(device) === -1 ? 'flex' : 'none'}">
                <a-radio-group v-model="preferenceData.searchEngine"
                               :style="{width: '100%'}" @change="searchEngineRadioOnChange">
                    <a-row>
                        <a-col :span="12">
                            <a-radio value="bing" id="bing">必应</a-radio>
                        </a-col>
                        <a-col :span="12">
                            <a-radio value="google" id="google">谷歌</a-radio>
                        </a-col>
                    </a-row>
                </a-radio-group>
            </a-form-item>
            <a-form-item field="buttonShape" label="按钮形状">
                <a-radio-group v-model="preferenceData.buttonShape"
                               :style="{width: '100%'}" @change="buttonShapeRadioOnChange">
                    <a-row>
                        <a-col :span="12">
                            <a-radio value="round" id="round">圆形</a-radio>
                        </a-col>
                        <a-col :span="12">
                            <a-radio value="default" id="default">方形</a-radio>
                        </a-col>
                    </a-row>
                </a-radio-group>
            </a-form-item>
            <a-form-item field="dynamicEffect" label="鼠标互动" :style="{display: ['iPhone', 'Android'].indexOf(device) === -1 ? 'flex' : 'none'}">
                <a-radio-group v-model="preferenceData.dynamicEffect"
                               @change="dynamicEffectRadioOnChange">
                    <a-row :gutter="[0, 8]">
                        <a-col :span="12">
                            <a-radio value="all" id="all">视差</a-radio>
                        </a-col>
                        <a-col :span="12">
                            <a-radio value="translate" id="translate">平移</a-radio>
                        </a-col>
                        <a-col :span="12">
                            <a-radio value="rotate" id="rotate">旋转</a-radio>
                        </a-col>
                        <a-col :span="12">
                            <a-radio value="close" id="close">关闭</a-radio>
                        </a-col>
                    </a-row>
                </a-radio-group>
            </a-form-item>
            <a-form-item field="imageQuality" label="图片质量">
                <a-radio-group v-model="preferenceData.imageQuality"
                               :style="{width: '100%'}" @change="imageQualityRadioOnChange">
                    <a-row>
                        <a-col :span="12">
                            <a-radio value="full" id="full">清晰</a-radio>
                        </a-col>
                        <a-col :span="12">
                            <a-radio value="regular" id="regular">标准</a-radio>
                        </a-col>
                    </a-row>
                </a-radio-group>
            </a-form-item>
            <a-form-item field="imageTopics" label="图片主题">
                <a-checkbox-group v-model="preferenceData.imageTopics" :disabled="disableImageTopic"
                                  direction="horizontal" @change="imageTopicsCheckboxOnChange">
                    <a-row :gutter="[0, 8]">
                        <a-col :span="12">
                            <a-checkbox name="travel" value="Fzo3zuOHN6w" id="Fzo3zuOHN6w">旅游</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="wallpapers" value="bo8jQKTaE0Y" id="bo8jQKTaE0Y">壁纸</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="3d-renders" value="CDwuwXJAbEw" id="CDwuwXJAbEw">三维</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="textures-patterns" value="iUIsnVtjB0Y" id="iUIsnVtjB0Y">纹理
                            </a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="experimental" value="qPYsDzvJOYc" id="qPYsDzvJOYc">实验</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="architecture" value="rnSKDHwwYUk" id="rnSKDHwwYUk">建筑</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="nature" value="6sMVjTLSkeQ" id="6sMVjTLSkeQ">自然</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="business-work" value="aeu6rL-j6ew" id="aeu6rL-j6ew">商务</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="fashion" value="S4MKLAsBB74" id="S4MKLAsBB74">时尚</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="film" value="hmenvQhUmxM" id="hmenvQhUmxM">电影</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="food-drink" value="xjPR4hlkBGA" id="xjPR4hlkBGA">饮食</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="health" value="_hb-dl4Q-4U" id="_hb-dl4Q-4U">健康</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="people" value="towJZFskpGg" id="towJZFskpGg">人物</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="interiors" value="R_Fyn-Gwtlw" id="R_Fyn-Gwtlw">精神</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="street-photography" value="xHxYTMHLgOc" id="xHxYTMHLgOc">街头
                            </a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="animals" value="Jpg6Kidl-Hk" id="Jpg6Kidl-Hk">动物</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="spirituality" value="_8zFHuhRhyo" id="_8zFHuhRhyo">灵魂</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="arts-culture" value="bDo48cUhwnY" id="bDo48cUhwnY">文化</a-checkbox>
                        </a-col>
<!--                        <a-col :span="12">-->
<!--                            <a-checkbox name="history" value="dijpbw99kQQ" id="dijpbw99kQQ">历史</a-checkbox>-->
<!--                        </a-col>-->
                        <a-col :span="12">
                            <a-checkbox name="athletics" value="Bn-DjrcBrwo" id="Bn-DjrcBrwo">体育</a-checkbox>
                        </a-col>
                    </a-row>
                </a-checkbox-group>
                <template #extra>
                    <a-typography-text :style="{color: fontColor}">{{ imageTopicStatus }}
                    </a-typography-text>
                </template>
            </a-form-item>
            <a-form-item label="自定主题">
                <a-space>
                    <a-form-item field="customTopic" no-style>
                        <a-input :style="{width:'170px'}" v-model="customTopicInputValue" @change="customTopicInputOnChange" allow-clear placeholder="英文搜索最准确"/>
                    </a-form-item>
                    <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                              type="text" @click="submitCustomTopicBtnOnClick"
                              @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)"
                    >
                        <template #icon>
                            <icon-check/>
                        </template>
                    </a-button>
                    <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                              type="text" @click="clearCustomTopicBtnOnClick"
                              @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)"
                    >
                        <template #icon>
                            <icon-stop/>
                        </template>
                    </a-button>
                </a-space>
                <template #extra>
                    <a-typography-text :style="{color: fontColor}">{{ customTopicStatus }}
                    </a-typography-text>
                </template>
            </a-form-item>
            <a-form-item field="changeImageTime" label="切换间隔">
                <a-select v-model="preferenceData.changeImageTime" :style="{width:'170px'}"
                          @change="changeImageTimeOnChange">
                    <a-option value="900000">{{ "每隔 15 分钟" }}</a-option>
                    <a-option value="1800000">{{ "每隔 30 分钟" }}</a-option>
                    <a-option value="3600000">{{ "每隔 1 小时" }}</a-option>
                    <a-option value="21600000">{{ "每隔 6 小时" }}</a-option>
                    <a-option value="43200000">{{ "每隔 12 小时" }}</a-option>
                    <a-option value="86400000">{{ "每隔 1 天" }}</a-option>
                </a-select>
                <template #extra>
                    <a-typography-text :style="{color: fontColor}">{{ "上次切换：" + lastRequestTime }}
                    </a-typography-text>
                </template>
            </a-form-item>
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-form-item field="nightMode" label="降低亮度" :style="{display: ['iPhone', 'Android'].indexOf(device) === -1 ? 'flex' : 'none'}">
                        <a-switch v-model="preferenceData.nightMode" id="nightModeSwitch" @change="nightModeSwitchOnChange">
                            <template #checked>
                                已开启
                            </template>
                            <template #unchecked>
                                已关闭
                            </template>
                        </a-switch>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item field="noImageMode" label="纯色模式" :style="{display: ['iPhone', 'Android'].indexOf(device) === -1 ? 'flex' : 'none'}">
                        <a-switch v-model="preferenceData.noImageMode" id="noImageModeSwitch" @change="noImageModeSwitchOnChange">
                            <template #checked>
                                已开启
                            </template>
                            <template #unchecked>
                                已关闭
                            </template>
                        </a-switch>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item field="simpleMode" label="极简模式" :style="{display: ['iPhone', 'Android'].indexOf(device) === -1 ? 'flex' : 'none'}">
                        <a-switch v-model="preferenceData.simpleMode" id="simpleModeSwitch" @change="simpleModeSwitchOnChange">
                            <template #checked>
                                已开启
                            </template>
                            <template #unchecked>
                                已关闭
                            </template>
                        </a-switch>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-form-item field="manageDataButton" label="数据管理" :style="{display: ['iPhone', 'Android'].indexOf(device) === -1 ? 'flex' : 'none'}">
                <a-space>
                    <a-upload
                        accept="application/json"
                        limit="1"
                        :auto-upload="false"
                        :on-before-upload="(file) => {importDataBtnOnClick(file)}"
                        :show-file-list="false"
                    >
                        <template #upload-button>
                            <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}" type="text"
                                      @mouseout="btnMouseOut(fontColor, $event)"
                                      @mouseover="btnMouseOver(hoverColor, $event)"
                            >
                                <template #icon>
                                    <icon-import />
                                </template>
                                导入数据
                            </a-button>
                        </template>
                    </a-upload>
                    <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}" type="text"
                              @mouseout="btnMouseOut(fontColor, $event)"
                              @mouseover="btnMouseOver(hoverColor, $event)"
                              @click="exportDataBtnOnClick"
                    >
                        <template #icon>
                            <icon-export />
                        </template>
                        导出数据
                    </a-button>
                </a-space>
            </a-form-item>
            <a-form-item field="clearStorageButton" label="危险设置">
                <a-space>
                    <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}" type="text"
                              @mouseout="btnMouseOut(fontColor, $event)"
                              @mouseover="btnMouseOver(hoverColor, $event)"
                              @click="resetPreferenceBtnOnClick"
                    >
                        <template #icon>
                            <icon-redo/>
                        </template>
                        重置设置
                    </a-button>
                    <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}" type="text"
                              @mouseout="btnMouseOut(fontColor, $event)"
                              @mouseover="btnMouseOver(hoverColor, $event)"
                              @click="clearStorageBtnOnClick"
                    >
                        <template #icon>
                            <icon-redo/>
                        </template>
                        重置插件
                    </a-button>
                </a-space>
                <template #extra>
                    <a-typography-text :style="{color: fontColor}">{{ "出现异常时可尝试重置设置或插件" }}
                    </a-typography-text>
                </template>
            </a-form-item>
        </a-form>
    </a-card>
    <a-modal v-model:visible="displayResetPreferenceModal" :closable="false"
             :mask-style="{backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)'}"
             unmount-on-close @cancel="resetPreferenceCancelBtnOnClick" @ok="resetPreferenceOkBtnOnClick">
        <template #title>
            <a-row :style="{width: '100%'}" align="center">
                <a-col :span="24" :style="{display: 'flex', alignItems: 'center'}">
                    <a-typography-text :style="{color: fontColor}">
                        {{ "确定重置设置？" }}
                    </a-typography-text>
                </a-col>
            </a-row>
        </template>
        <a-typography-text :style="{color: fontColor}">
            {{ "注意：所有设置项将被重置为默认值" }}
        </a-typography-text>
    </a-modal>
    <a-modal v-model:visible="displayClearStorageModal" :closable="false"
             :mask-style="{backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)'}"
             unmount-on-close @cancel="clearStorageBtnCancelOnClick" @ok="clearStorageOkBtnOnClick">
        <template #title>
            <a-row :style="{width: '100%'}" align="center">
                <a-col :span="24" :style="{display: 'flex', alignItems: 'center'}">
                    <a-typography-text :style="{color: fontColor}">
                        {{ "确定重置插件？" }}
                    </a-typography-text>
                </a-col>
            </a-row>
        </template>
        <a-typography-text :style="{color: fontColor}">
            {{ "注意：所有设置项将被重置为默认值，所有数据将被清空" }}
        </a-typography-text>
    </a-modal>
</template>

<script setup>
import {IconCheck, IconRedo, IconSettings, IconStop, IconImport, IconExport} from "@arco-design/web-vue/es/icon";
import {
    btnMouseOut,
    btnMouseOver,
    getPreferenceDataStorage, getTimeDetails,
    isEmpty
} from "@/javascripts/publicFunctions";
import {defineProps, onMounted, ref} from "vue";
import {Message} from "@arco-design/web-vue";
import {defaultPreferenceData, device} from "@/javascripts/publicConstants";

let formDisabled = ref(false);
let lastRequestTime = ref("暂无信息");
let disableImageTopic = ref(false);
let imageTopicStatus = ref("已启用图片主题");
let customTopicStatus = ref("已禁用自定主题");
let customTopicInputValue = ref(getPreferenceDataStorage().customTopic);
let displayResetPreferenceModal = ref(false);
let displayClearStorageModal = ref(false);
let preferenceData = ref(getPreferenceDataStorage());

defineProps({
    hoverColor: {
        type: String,
        required: true,
        default: () => {
            return ""
        }
    },
    backgroundColor: {
        type: String,
        required: true,
        default: () => {
            return ""
        }
    },
    fontColor: {
        type: String,
        required: true,
        default: () => {
            return ""
        }
    }
});

const emit = defineEmits(["preferenceData"]);

onMounted(() => {
    let tempLastRequestTime = localStorage.getItem("lastImageRequestTime");
    if (tempLastRequestTime !== null) {
        lastRequestTime.value = getTimeDetails(new Date(parseInt(tempLastRequestTime))).showDetail;
    }
    
    disableImageTopic.value = !isEmpty(preferenceData.value.customTopic);
    if (disableImageTopic.value) {
        imageTopicStatus.value = "已禁用自定主题";
        customTopicStatus.value = "已启用自定主题";
    }
})

// 搜索引擎
function searchEngineRadioOnChange(value) {
    preferenceData.value.searchEngine = value;
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    emit("preferenceData", preferenceData.value);

    Message.success("已更换搜索引擎");
    // resetRadioColor(value, ["bing", "google"], props.hoverColor);
}

function buttonShapeRadioOnChange(value) {
    preferenceData.value.buttonShape = value;
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    emit("preferenceData", preferenceData.value);

    Message.success("已更换按钮形状");
    // resetRadioColor(value, ["round", "default"], props.hoverColor);
}

// 动效样式
function dynamicEffectRadioOnChange(value) {
    preferenceData.value.dynamicEffect = value;
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    emit("preferenceData", preferenceData.value);

    Message.success("已更换显示效果，一秒后刷新页面");
    // resetRadioColor(value, ["all", "translate", "rotate", "close"], props.hoverColor);
    formDisabled.value = true;
    refreshWindow();
}

// 图片质量
function imageQualityRadioOnChange(value) {
    preferenceData.value.imageQuality = value;
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    emit("preferenceData", preferenceData.value);

    Message.success("已更新图片质量，一秒后刷新页面");
    // resetRadioColor(value, ["full", "regular"], props.hoverColor);
    formDisabled.value = true;
    refreshWindow();
}

// 图片主题
function imageTopicsCheckboxOnChange(values) {
    preferenceData.value.imageTopics = values;
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    emit("preferenceData", preferenceData.value);

    Message.success("已更换图片主题，下次切换图片时生效");
    if (values.length === 0) {
        Message.info("全不选与全选的效果一样");
    }

    // resetCheckboxColor(values, imageTopics, props.hoverColor);
}

function customTopicInputOnChange(value) {
    customTopicInputValue.value = value;
}

// 自定义主题
function submitCustomTopicBtnOnClick() {
    preferenceData.value.customTopic = customTopicInputValue.value;
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    emit("preferenceData", preferenceData.value);

    disableImageTopic.value = !isEmpty(customTopicInputValue.value);
    imageTopicStatus.value = isEmpty(customTopicInputValue.value)? "已启用图片主题" : "已禁用图片主题";
    customTopicStatus.value = isEmpty(customTopicInputValue.value)? "已禁用自定主题" : "已启用自定主题";

    if (!isEmpty(customTopicInputValue.value)) {
        Message.success("已启用自定主题，下次切换图片时生效");
    } else {
        Message.success("已禁用自定主题，一秒后刷新页面");
        formDisabled.value = true;
        refreshWindow();
    }
}

function clearCustomTopicBtnOnClick() {
    preferenceData.value.customTopic = "";
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    emit("preferenceData", preferenceData.value);
    
    disableImageTopic.value = false;
    imageTopicStatus.value = "已启用图片主题";
    customTopicStatus.value = "已禁用自定主题";

    Message.success("已禁用自定主题，一秒后刷新页面");
    formDisabled.value = true;
    refreshWindow();
}

function changeImageTimeOnChange(value) {
    preferenceData.value.changeImageTime = value;
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    emit("preferenceData", preferenceData.value);

    Message.success("已修改切换间隔，一秒后刷新页面");
    formDisabled.value = true;
    refreshWindow();
}

function nightModeSwitchOnChange(checked) {
    preferenceData.value.nightMode = checked;
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    emit("preferenceData", preferenceData.value);

    if (checked) {
        Message.success("已降低背景亮度");
    } else {
        Message.success("已恢复背景亮度");
    }

    // resetSwitchColor("#nightModeSwitch", checked, props.hoverColor);
}

function noImageModeSwitchOnChange(checked) {
    preferenceData.value.noImageMode = checked;
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    emit("preferenceData", preferenceData.value);

    if (checked) {
        Message.success("已开启纯色模式，一秒后刷新页面");
    } else {
        Message.success("已关闭纯色模式，一秒后刷新页面");
    }

    // resetSwitchColor("#noImageModeSwitch", checked, props.hoverColor);
    formDisabled.value = true;
    refreshWindow();
}

function simpleModeSwitchOnChange(checked) {
    preferenceData.value.simpleMode = checked;
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    emit("preferenceData", preferenceData.value);

    if (checked) {
        Message.success("已开启极简模式");
    } else {
        Message.success("已关闭极简模式，一秒后刷新页面");
        formDisabled.value = true;
        refreshWindow();
    }
    // resetSwitchColor("#simpleModeSwitch", checked, props.hoverColor);
}

// 导入数据
function importDataBtnOnClick(file) {
    if (device !== "") {
        Message.error("暂不支持移动端");
    } else {
        if (file.name.indexOf("云开新标签页") === 0) {
            file.text().then(result =>{
                let importData = JSON.parse(result);
                if (importData) {
                    localStorage.setItem("daily", JSON.stringify(importData.dailyList ? importData.dailyList : []));
                    localStorage.setItem("dailyNotification", JSON.stringify(importData.dailyNotification ? importData.dailyNotification : false));
                    localStorage.setItem("todos", JSON.stringify(importData.todoList ? importData.todoList : []));
                    localStorage.setItem("todoNotification", JSON.stringify(importData.todoNotification ? importData.todoNotification : false));
                    localStorage.setItem("filterList", JSON.stringify(importData.filterList ? importData.filterList : []));
                    localStorage.setItem("collections", JSON.stringify(importData.collectionList ? importData.collectionList : []));
                    localStorage.setItem("preferenceData", JSON.stringify(importData.preferenceData ? importData.preferenceData : defaultPreferenceData));
                    formDisabled.value = true;
                    Message.success("导入数据成功，一秒后刷新页面");
                    refreshWindow();
                }
                else {
                    Message.error("导入数据失败");
                }
            })
        } else {
            Message.error("请选择正确的文件");
        }
    }
    return false;
}

// 导出数据
function exportDataBtnOnClick() {
    if (device !== "") {
        Message.error("暂不支持移动端");
    } else {
        // 倒数日
        let tempDailyList = [];
        let dailyListStorage = localStorage.getItem("daily");
        if (dailyListStorage) {
            tempDailyList = JSON.parse(dailyListStorage);
        }

        let tempDailyNotification = false;
        let dailyNotificationStorage = localStorage.getItem("dailyNotification");
        if (dailyNotificationStorage) {
            tempDailyNotification = JSON.parse(dailyNotificationStorage);
        }

        // 待办事项
        let tempTodoList = [];
        let todoListStorage = localStorage.getItem("todos");
        if (todoListStorage) {
            tempTodoList = JSON.parse(todoListStorage);
        }

        let tempTodoNotification = false;
        let todoNotificationStorage = localStorage.getItem("todoNotification");
        if (todoNotificationStorage) {
            tempTodoNotification = JSON.parse(todoNotificationStorage);
        }

        // 专注模式过滤名单
        let tempFilterList = [];
        let filterListStorage = localStorage.getItem("filterList");
        if (filterListStorage) {
            tempFilterList = JSON.parse(filterListStorage);
        }

        // 快捷链接
        let tempCollectionList = [];
        let collectionStorage = localStorage.getItem("collections");
        if (collectionStorage) {
            tempCollectionList = JSON.parse(collectionStorage);
        }

        let exportData = {
            title: "云开新标签页",
            attention: "请不要修改本文件的名称和内容",
            dailyList: tempDailyList,
            dailyNotification: tempDailyNotification,
            todoList: tempTodoList,
            todoNotification: tempTodoNotification,
            filterList: tempFilterList,
            collectionList: tempCollectionList,
            preferenceData: preferenceData.value,
        }

        let file = new Blob([JSON.stringify(exportData)], {type: "application/json"});
        const objectURL = URL.createObjectURL(file);
        let a = document.createElement("a");
        a.href = objectURL;
        a.download = "云开新标签页.json";
        a.click();
        URL.revokeObjectURL(objectURL);
        Message.success("导出数据成功");
    }
}

// 重置设置
function resetPreferenceBtnOnClick() {
    let resetTimeStampStorage = localStorage.getItem("resetTimeStamp");
    if (resetTimeStampStorage && new Date().getTime() - parseInt(resetTimeStampStorage) < 60 * 1000) {
        Message.error("操作过于频繁，请稍后再试");
    } else {
        displayResetPreferenceModal.value = true;
    }
}

function resetPreferenceOkBtnOnClick() {
    displayResetPreferenceModal.value = false;
    localStorage.setItem("preferenceData", JSON.stringify(defaultPreferenceData));
    localStorage.setItem("resetTimeStamp", JSON.stringify(new Date().getTime()));
    Message.success("已重置设置，一秒后刷新页面");
    formDisabled.value = true;
    refreshWindow();
}

function resetPreferenceCancelBtnOnClick() {
    displayResetPreferenceModal.value = false;
}

// 重置插件
function clearStorageBtnOnClick() {
    let resetTimeStampStorage = localStorage.getItem("resetTimeStamp");
    if (resetTimeStampStorage && new Date().getTime() - parseInt(resetTimeStampStorage) < 60 * 1000) {
        Message.error("操作过于频繁，请稍后再试");
    } else {
        displayClearStorageModal.value = true;
    }
}

function clearStorageOkBtnOnClick() {
    displayClearStorageModal.value = false;
    localStorage.clear();
    localStorage.setItem("resetTimeStamp", JSON.stringify(new Date().getTime()));
    Message.success("已重置插件，一秒后刷新页面");
    formDisabled.value = true;
    refreshWindow();
}

function clearStorageBtnCancelOnClick() {
    displayClearStorageModal.value = false;
}

function refreshWindow() {
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}
</script>

<style scoped>

</style>