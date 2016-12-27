<template>
    <div class="help">
        <div class="content">
            <h1 class="title">FAQ</h1>
            <div class="block">
                <h2 class="sub-title">What is naive mock?</h2>
                <p class="desc"><code>naive mock</code> is a dead simple mock system which aims helping front-end developers build up applications quickly, parallel with API development.</p>
            </div>
            <div class="block">
                <h2 class="sub-title">How to create a mock API?</h2>
                <p>Go to <router-link :to="{ path: '/apimanager' }">API Management</router-link> page. Find <code>Actions</code> menu-item at the top-right corner, Click <code>Create API</code> menu. As below figure:</p>
                <img src="../../img/help/click-menu.png">
                <p>Type API meta you want to mock, as below figure:</p>
                <img src="../../img/help/create-api.png">
                <p>The mock API shall be available once you click <code>Create</code> button.</p><br/>
                <p>At <router-link :to="{ path: '/apimanager' }">API Management</router-link> page, you may find newly created API, click the <code>API</code> column, verify command will be displayed for you. </p>
                <img src="../../img/help/api-verify.png">
                <blockquote>
                    Note: the <code>header</code> of <code>category</code> is mandatory, otherwise, you will get <code>404</code> while using this mock API.
                </blockquote>
            </div>
        </div>
    </div>
</template>

<script>

export default {
};

</script>

<style scoped>
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
        color: #0271a8;
        margin-bottom: 15px;
    }

    .block {
        margin-bottom: 15px;
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