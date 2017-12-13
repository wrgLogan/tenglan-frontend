import NavHeader from '@/components/NavHeader.vue'
import poster from '@/assets/image/pic11.jpg'

export default {
    data(){
        return {
           pageName: 'Index',
           poster: poster
        }
    },
    mounted() {
        console.log(this.$parent.$data);
        var AV = this.AV;
        var _this = this;
        
        window.video = document.getElementById('video-item');
        video.onclick = function() {
            if (this.paused) {
                this.play();
                
            } else {
                this.pause();
            }
            
        };

        video.onmouseover = function() {
            this.controls = true;
        }

        video.onmouseout = function() {
            this.controls = false;
        }
    },
    methods: {
        handleCheck(item) {
            console.log(item);
        },
    },
    components: {
        NavHeader: NavHeader
    }
}