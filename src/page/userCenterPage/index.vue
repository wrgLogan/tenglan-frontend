<template>
    <div class="page">
        <div class="banner-container">
            <img src="../../assets/image/usercenterbg.jpg" />
        </div>
        <div class="main-container">
            <div class="aside">
                <div class="aside-menu">
                    <div class="aside-menu-header" :class="{'active': asideTab == 0}" @click="asideTab = 0; asideIndex = 0;">
                        <img src="../../assets/image/usericon1.png" class="icon"/>
                        <p>我的资料</p>
                    </div>
                    <div class="aside-menu-item-container" v-show="asideTab == 0">
                        <div class="aside-menu-item" :class="{'active': asideIndex == 0}" @click="checkAside(0)">个人资料</div>
                        <!-- <div class="aside-menu-item" :class="{'active': asideIndex == 1}" @click="checkAside(1)">地址管理</div>
                        <div class="aside-menu-item" :class="{'active': asideIndex == 2}" @click="checkAside(2)">安全中心</div> -->
                    </div>
                </div>
                <div class="aside-menu">
                    <div class="aside-menu-header" :class="{'active': asideTab == 1}" @click="asideTab = 1; asideIndex = 3;">
                        <img src="../../assets/image/usericon2.png" style="height: 16px;margin-right: 9px;" class="icon"/>
                        <p>我的信息</p>
                    </div>
                    <div class="aside-menu-item-container" v-show="asideTab == 1">
                        <div class="aside-menu-item" :class="{'active': asideIndex == 3}" @click="checkAside(3)">我的通知</div>
                        <div class="aside-menu-item" :class="{'active': asideIndex == 4}" @click="checkAside(4)">申请状态</div>
                    </div>
                </div>
            </div>
            <div class="body">
                <div class="userinfo-form" v-show="asideIndex == 0">
                    <div class="form-row">
                        <div class="input-group">
                            <label for="name">姓　　名：</label>
                            <input type="text" :readonly="!editable" placeholder="姓名" v-model="user.attributes.name"/>
                        </div>
                        <div class="input-group">
                            <label for="gender">性　　别：</label>
                            <div class="radio-container" v-show="editable || user.attributes.gender == 'MALE'">
                                <input type="radio" v-show="editable" v-model="user.attributes.gender" value="MALE"/>
                                <span >先生</span>
                            </div>
                            <div class="radio-container" v-show="editable || user.attributes.gender == 'FEMALE'">
                                <input type="radio" v-show="editable" v-model="user.attributes.gender" value="FEMALE"/>
                                <span >女士</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="input-group">
                            <label for="name">手 &nbsp;机 &nbsp;号：</label>
                            <input type="text" :readonly="!editable" placeholder="手机号" v-model="user.attributes.mobilePhone"/>
                        </div>
                        <div class="input-group">
                            <label for="name">邮　　编：</label>
                            <input type="text" :readonly="!editable" placeholder="邮编" v-model="user.attributes.postCode"/>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="input-group">
                            <label for="name">城　　市：</label>
                            <input type="text" :readonly="!editable" placeholder="城市" v-model="user.attributes.city"/>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="input-group" style="width: 100%;">
                            <label for="name">详细地址：</label>
                            <input type="text" :readonly="!editable" placeholder="详细地址" v-model="user.attributes.address" style="width: 690px;"/>
                        </div>
                    </div>
                    <div class="btn-group">
                        <div class="btn-item primary" v-show="!editable" @click="editable = true">编辑</div>
                        <div class="btn-item primary" v-show="editable" @click="submitUser">保存</div>
                        <div class="btn-item" v-show="editable" @click="editable = false">取消</div>
                    </div>
                </div>
                <div class="message-container" v-show="asideIndex == 3">
                    <div class="message-item" v-for="(item, index) in messages" :key="index">
                        <div class="title">{{ item.attributes.title }}</div>
                        <div class="content">{{ item.attributes.content }}</div>
                        <div class="check-btn" @click="checkMsg(item)">查看</div>
                    </div>
                </div>
                <div class="application-container" v-show="asideIndex == 4">
                    <div class="application-item" v-for="(item, index) in applications" :key="index">
                        <div class="title" style="margin-bottom: 30px;">{{ item.attributes.project.attributes.title }}</div>
                        <div class="content">审核状态：<span style="color: #ff3030;">{{ statusEnum[item.attributes.status1] }}</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="footer-sec2">COPYRIGHT Ⓒ 2017 SEESEED 沪ICP备16035344号-2网站地图</div>
        </div>

        <el-dialog
            :title="checkedMsg.attributes.title"
            :visible.sync="dialogVisible"
            width="300px">
            {{ checkedMsg.attributes.content }}
        </el-dialog>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>