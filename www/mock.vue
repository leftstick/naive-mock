<template>
    <div id="root">
        <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" router>
            <el-menu-item index="1" :route="{ path: '/apis' }">API Management</el-menu-item>
            <el-menu-item index="2" :route="{ path: '/settings' }">Settings</el-menu-item>
            <el-menu-item index="3" :route="{ path: '/about' }" class="about">About</el-menu-item>
        </el-menu>
        <router-view id="view"></router-view>
    </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    mounted() {
        console.log(this.$route);
    },
    methods: {
        ...mapActions([
            'fetchSettings'
        ])
    },
    components: {}
};

</script>

<style scoped>
    #root {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .el-menu {
        margin-bottom: 10px;
    }

    .el-menu--horizontal .el-menu-item.about {
        float: right;
    }
</style>