<template>
    <div class="page" v-loading.fullscreen.lock="fullscreenLoading">
        <div class="banner-container">
            <img src="../../assets/image/fileupbg.jpg" />
        </div>
        <div class="main-container">
            <div class="title-container">
                <img src="../../assets/image/applicationtitle.png" />
            </div>
            <div class="upload-group-container">
                <div class="upload-group">
                    <div class="sec1 add-button">
                        <input type="file" @change="getFile($event, 'applyFile')" />
                    </div>
                    <div class="sec2">
                        <div class="title">请上传您的报名表</div>
                        <div class="desc">&nbsp;</div>
                        <div class="filename">{{applyFile.name}}&nbsp;</div>
                        <div class="sec2-button">
                            <a :href="project.attributes.downloadFile.attributes.file.attributes.url" download>报名表下载</a>
                        </div>
                    </div>
                </div>
                <div class="upload-group">
                    <div class="sec1 add-button">
                        <input type="file" @change="getFile($event, 'videoFile')" />
                    </div>
                    <div class="sec2">
                        <div class="title">请上传您3分钟自我介绍</div>
                        <div class="desc">自我介绍格式为：.mp3、.wma</div>
                        <div class="filename">{{videoFile.name}}&nbsp;</div>
                        <div class="sec2-button" @click="dialogVisible = true">上传帮助</div>
                    </div>
                </div>
                <div class="upload-group">
                    <div class="sec1 add-button">
                        <input type="file" @change="getFile($event, 'reportCardFile')" />
                    </div>
                    <div class="sec2">
                        <div class="title">请上传您的雅思/托福成绩单</div>
                        <div class="desc">自我介绍格式为.jpg</div>
                        <div class="filename">{{reportCardFile.name}}&nbsp;</div>
                        <div class="sec2-button" >参考样式</div>
                    </div>
                </div>
            </div>
            <div class="sub-button" @click="submit">
                提交
            </div>
        </div>
        <div class="footer">
            <div class="footer-sec2">
                COPYRIGHT Ⓒ 2017 SEESEED 沪ICP备16035344号-2网站地图
            </div>
        </div>

        <el-dialog
            title="上传帮助"
            :visible.sync="dialogVisible"
            
            width="300px">
            <p>您可以使用手机的录像功能，录制3分钟的自我介绍视频，保存为.mp4格式，然后上传到指定区域。</p>
            <br>
            <p>3分钟的视频包括：您的姓名、学校、爱好以及报名原因。请尽量用英文介绍。</p>
            <div class="dialog-header"></div>
        </el-dialog>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>