import Vue from 'vue';
import ElementUI from 'element-ui';
import extensions from './ext';
import VueRouter from 'vue-router';
import store from './store';
import mock from './mock';
import routes from './features/routes';

import 'element-ui/lib/theme-default/index.css';
import locale from 'element-ui/lib/locale/lang/en';

class App {

    constructor() {
        Vue.use(VueRouter);
        Vue.use(ElementUI, {
            locale
        });
        Vue.config.devtools = process.env.NODE_ENV !== 'production';
    }

    registerExts() {
        this.plugins = extensions();
    }

    createVueOpts() {
        this.vueOps = Object.assign({}, {
            components: {
                mock
            },
            store: store()
        }, this.plugins);
    }

    setDefaultPath() {
        const defaultRoute = routes
            .find(route => route.isDefault);
        this.routes = routes;
        if (!routes.length) {
            return;
        }
        if (!defaultRoute) {
            this.routes = [...this.routes, {
                path: '*',
                redirect: routes[0].path
            }];
            return;
        }
        this.routes = [...this.routes, {
            path: '*',
            redirect: defaultRoute.path
        }];
    }

    registerRouters() {
        this.router = new VueRouter({
            mode: 'history',
            routes: this.routes,
            scrollBehavior(to, from, savedPosition) {
                if (savedPosition) {
                    return savedPosition;
                }
                return {
                    x: 0,
                    y: 0
                };
            }
        });
        this.vueOps.router = this.router;
    }

    destroySplash() {
        document.head.removeChild(document.querySelector('#splash-spinner'));
        document.body.removeChild(document.querySelector('.spinner'));
    }

    launch() {
        new Vue(this.vueOps).$mount('#application');
    }

    run() {
        this.registerExts();
        this.createVueOpts();
        this.setDefaultPath();
        this.registerRouters();
        this.destroySplash();
        this.launch();
    }

}

new App().run();
