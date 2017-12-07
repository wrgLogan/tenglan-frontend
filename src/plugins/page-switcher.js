var install = function (Vue, options) {
    var router = options.router;
    var root = options.vm;
    var defaultForward = options.defaultForward;
    var defaultBackward = options.defaultBackward;

    if (!root.animation) {
        root.$data.animation = '';
    }

    root.$data.animation = defaultBackward || 'backward'; 

    Vue.prototype.$switchTo = function(path, animation) {
        console.log(router);
        root.$data.animation = animation || defaultForward || 'forward';
        router.push(path);
        setTimeout(function() {
            root.$data.animation = defaultBackward || 'backward';
        }, 300)
        
    };

    Vue.prototype.$goBackward = function(animation) {
        root.$data.animation = animation || defaultBackward || 'backward';
        router.back();
    };

    Vue.prototype.$replace = function(path) {
        root.$data.animation = 'fade';
        router.replace(path);
        setTimeout(function() {
            root.$data.animation = defaultBackward || 'backward';
        }, 300)
    };
};

export default {
    install: install
};