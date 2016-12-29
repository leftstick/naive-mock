<template>
    <div class="help">
        <div class="content">
            <h1 class="title">FAQ</h1>
            <div class="block">
                <h2 id="what-is-mock" class="sub-title"><a href v-anchor="'what-is-mock'">What is naive mock?</a></h2>
                <p class="desc"><code>naive mock</code> is a dead simple mock system which aims helping front-end developers build up applications quickly, parallel with API development.</p>
            </div>
            <div class="block">
                <h2 id="how-to-create-mock-api" class="sub-title"><a href v-anchor="'how-to-create-mock-api'">How to create a mock API?</a></h2>
                <p>Go to <router-link :to="{ path: '/apimanager' }">API Management</router-link> page. Find <code>Actions</code> menu-item at the top-right corner, Click <code>Create API</code> menu. As below figure:</p>
                <img src="../../img/help/click-menu.png">
                <p>Type API meta you want to mock, as below figure:</p>
                <img src="../../img/help/create-api.png">
                <p>The mock API shall be available once you click <code>Create</code> button.</p>
                <p>At <router-link :to="{ path: '/apimanager' }">API Management</router-link> page, you may find newly created API, click the <code>API</code> column, verify command will be displayed for you. </p>
                <img src="../../img/help/api-verify.png">
                <blockquote>
                    Note: the <code>header</code> of <code>category</code> is mandatory, otherwise, you will get <code>404</code> while using this mock API.
                </blockquote>
            </div>
            <div class="block">
                <h2 id="how-to-mock-variable" class="sub-title"><a href v-anchor="'how-to-mock-variable'">Possible to use pattern as API?</a></h2>
                <p>Sure, <code>naive-mock</code> Support it. For example: create API with <strong>*</strong> as below</p>
                <img src="../../img/help/create-api-pattern.png">
                <blockquote>You would get the same response no matter what <strong>*</strong> is</blockquote>
            </div>
            <div class="block">
                <h2 id="what-is-fallback" class="sub-title"><a href v-anchor="'what-is-fallback'">What is fallback?</a></h2>
                <p><code>fallback</code> is a backup server used when the API is not mocked with <code>naive-mock</code>. This is useful when you use <code>naive-mock</code> as replacement of your real backend server, but you do not want to mock all the server APIs in <code>naive-mock</code>.</p>
                <p>Go to <router-link :to="{ path: '/settings' }">Settings</router-link> page. You will see <code>Fallback Domain</code> config. As below figure:</p>
                <img src="../../img/help/settings-fallback.png">
            </div>
            <div class="block">
                <h2 id="what-is-savefallbackresult" class="sub-title"><a href v-anchor="'what-is-savefallbackresult'">What is Save Fallback Result?</a></h2>
                <p><code>Save Fallback Result</code> is useful when you intent to cache result at <code>naive-mock</code> from <code>fallback</code> server. And proper API will be generated automatically. You can update those APIs later as needed</p>
                <p>Go to <router-link :to="{ path: '/settings' }">Settings</router-link> page. You will see <code>Save Fallback Result</code> config. As below figure:</p>
                <img src="../../img/help/settings-save-fallback-result.png">
            </div>
        </div>
    </div>
</template>

<script>
const scrollTo = function(el) {
    setTimeout(function() {
        window.scrollTo(0, el.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop));
    });
};

export default {
    mounted() {
        const hash = this.$route.hash;
        if (hash) {
            scrollTo(document.querySelector(hash));
        }
    },
    directives: {
        anchor: {
            bind(el, binding, vnode) {
                el.addEventListener('click', function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    window.location.hash = binding.value;
                    scrollTo(el);
                }, false);
            }
        }
    }
};

</script>

<style scoped>
    a {
        text-decoration: none;
    }
    p {
        margin: 5px 0;
        line-height: 20px;
    }
    .help {
        width: 100%;
        height: 100%;
    }

    .content {
        width: 1200px;
        min-height: 100%;
        margin: 0 auto 0 auto;
        padding: 5px;
        background-color: #f9f9f9;
    }

    @media screen and (max-width: 1200px) {
        .content {
            width: 1000px;
        }
    }

    @media screen and (max-width: 992px) {
        .content {
            width: 800px;
        }
    }

    @media screen and (max-width: 768px) {
        .content {
            width: 100%;
        }
    }

    .title,
    .sub-title {
        margin-bottom: 15px;
        a {
            color: #0271a8;
        }
    }

    .block {
        margin-bottom: 30px;
    }

    img {
        margin: 15px 0 15px 0;
        width: 75%;
    }

    blockquote {
        padding: 0 1em;
        border-left: 5px solid #bbb;
    }

    .desc {
        font-size: 17px;
    }
</style>