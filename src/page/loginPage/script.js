var data = {
    status: 'login',
    regisStep: '1'
}

export default {
    data: function() {
        return data;
    },
    methods: {
        toRegister: function() {
            this.status = 'register';
        },
        toLogin: function() {
            this.status = 'login';
        },
        nextStep: function() {
            this.regisStep = 2;
        },
        register: function() {
            this.$switchTo('/');
        }
    }
}