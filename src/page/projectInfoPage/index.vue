<template>
    <div class="page">
        <div class="top-container">
            <div class="main-container">
                <div class="banner">
                    <img src="../../assets/image/banner.png" />
                </div>
                <div class="text-container">
                    <div class="text-nav">
                        <div class="nav-item" :class="{'on': textNavIndex == 1}" @click="setTexIndex(1)">项目详情</div>
                        <div class="nav-item" :class="{'on': textNavIndex == 2}" @click="setTexIndex(2)">项目师资</div>
                        <div class="nav-item" :class="{'on': textNavIndex == 3}" @click="setTexIndex(3)">报名须知</div>
                    </div>
                    <div class="text-content" v-html="project.attributes.projectDetails" v-show="textNavIndex == 1"></div>
                    <div class="text-content" v-html="project.attributes.projectTeachers" v-show="textNavIndex == 2"></div>
                    <div class="text-content" v-html="project.attributes.projectNotice" v-show="textNavIndex == 3"></div>
                </div>
            </div>
            <div class="side-container">
                <div class="side-item">
                    <div class="title">
                        {{ project.attributes.title }}
                    </div>
                    <div class="body">
                        <div class="req-container">
                            <div class="req-title">报名要求</div>
                            <div class="req-items">
                                <div class="req-item">
                                    <div class="value">A</div>
                                    <div class="label">数学</div>
                                </div>
                                <div class="req-item">
                                    <div class="value">110</div>
                                    <div class="label">托福</div>
                                </div>
                                <div class="req-item">
                                    <div class="value">6</div>
                                    <div class="label">雅思</div>
                                </div>
                                <div class="req-item">
                                    <div class="value">44322元</div>
                                    <div class="label">费用</div>
                                </div>
                            </div>
                        </div>
                        <div class="infos">
                            <div class="info-item">报名人数：{{project.attributes.applyNum}}人</div>
                            <div class="info-item">通过人数：{{project.attributes.passNum}}人</div>
                            <div class="info-item">剩余时间：项目结束</div>
                        </div>
                        <div class="btn" @click="toUpload">
                            申请报名
                        </div>
                    </div>
                </div>
                <div class="side-item">
                    <div class="title">
                        资料下载
                    </div>
                    <div class="body">
                        <div class="file-content">
                            <a :href="project.attributes.downloadFile.attributes.file.attributes.url" download>点击下载资料</a>
                        </div>
                    </div>
                </div>
                <!-- <div class="side-item">
                    <div class="title">
                        项目研报
                    </div>
                    <div class="body">
                        <div class="file-content">
                            <a href="#">点击查看详情</a>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-sec1">
                <ul>
                    <li>
                        <h3 class="title">项目报名</h3>
                        <p>即将开始</p>
                        <p>正在进行</p>
                        <p>往期项目</p>
                    </li>
                    <li>
                        <h3 class="title">资料下载</h3>
                        <p>查看资料</p>
                        <p>我的下载</p>
                    </li>
                    <li>
                        <h3 class="title">关于我们</h3>
                        <p>项目简介</p>
                        <p>团队介绍</p>
                        <p>项目愿景</p>
                    </li>
                </ul>
            </div>
            <div class="footer-sec2">
                COPYRIGHT Ⓒ 2017 SEESEED 沪ICP备16035344号-2网站地图
            </div>
        </div>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>