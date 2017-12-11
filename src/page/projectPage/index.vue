<template>
    <div class="page">
        
        <div class="banner-container">
            <img src="../../assets/image/pic12.jpg" />
        </div>
        <div class="main-container">
            <div class="aside">
                <h3>项目申请</h3>
                <div class="aside-menu">
                    <ul>
                        <li :class="{'on': asideIndex == 0}" @click="clickAsideTab(0)">即将启动</li>
                        <li :class="{'on': asideIndex == 1}" @click="clickAsideTab(1)">正在进行</li>
                        <li :class="{'on': asideIndex == 2}" @click="clickAsideTab(2)">往期项目</li>
                    </ul>
                </div>
            </div>
            <div class="content">
                <!-- 即将开始列表 -->
                <div class="proj-container" v-show="readyList.length">
                    <div id="scrollTag0"></div>
                    <div class="title">
                        <img src="../../assets/image/img2.png" />
                    </div>
                    <div class="proj-item-container" >
                        <div class="proj-item" @click="checkProject" status="ready" v-for="(proj, index) in readyList" :key="index"   >
                            <img src="../../assets/image/proj.jpg" />
                            <div class="proj-info">
                                <div class="proj-item-title">{{ proj.title }}</div>
                                <div class="proj-item-desc">整合全国积分商业体系，实现积分通用，变现落地</div>
                                <div class="proj-item-details">
                                    <div class="proj-item-detail">
                                        <div class="label">目标</div>
                                        <div class="value">{{proj.targetNum}}人</div>
                                    </div>
                                    <div class="proj-item-detail">
                                        <div class="label">已通过</div>
                                        <div class="value">{{proj.passNum}}人</div>
                                    </div>
                                    <div class="proj-item-detail">
                                        <div class="label">开始时间</div>
                                        <div class="value">{{proj.startDate}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 正在进行列表 -->
                <div class="proj-container" v-show="ongoingList.length">
                    <div id="scrollTag1"></div>
                    <div class="title">
                        <img src="../../assets/image/img1.png" />
                    </div>
                    <div class="proj-item-container" >
                        <div class="proj-item" @click="checkProject" status="ongoing" v-for="(proj, index) in ongoingList" :key="index"   >
                            <img src="../../assets/image/proj.jpg" />
                            <div class="proj-info">
                                <div class="proj-item-title">{{ proj.title }}</div>
                                <div class="proj-item-desc">整合全国积分商业体系，实现积分通用，变现落地</div>
                                <div class="proj-item-details">
                                    <div class="proj-item-detail">
                                        <div class="label">目标</div>
                                        <div class="value">{{proj.targetNum}}人</div>
                                    </div>
                                    <div class="proj-item-detail">
                                        <div class="label">已通过</div>
                                        <div class="value">{{proj.passNum}}人</div>
                                    </div>
                                    <div class="proj-item-detail">
                                        <div class="label">开始时间</div>
                                        <div class="value">{{proj.startDate}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 往期列表 -->
                <div class="proj-container" v-show="pastList.length">
                    <div id="scrollTag2"></div>
                    <div class="title">
                        <img src="../../assets/image/img3.png" />
                    </div>
                    <div class="proj-item-container" >
                        <div class="proj-item" @click="checkProject" status="past" v-for="(proj, index) in pastList" :key="index"   >
                            <img src="../../assets/image/proj.jpg" />
                            <div class="proj-info">
                                <div class="proj-item-title">{{ proj.title }}</div>
                                <div class="proj-item-desc">整合全国积分商业体系，实现积分通用，变现落地</div>
                                <div class="proj-item-details">
                                    <div class="proj-item-detail">
                                        <div class="label">目标</div>
                                        <div class="value">{{proj.targetNum}}人</div>
                                    </div>
                                    <div class="proj-item-detail">
                                        <div class="label">已通过</div>
                                        <div class="value">{{proj.passNum}}人</div>
                                    </div>
                                    <div class="proj-item-detail">
                                        <div class="label">开始时间</div>
                                        <div class="value">{{proj.startDate}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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