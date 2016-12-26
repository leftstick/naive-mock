<template>
    <div id="root">
        <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" router>
            <el-menu-item index="1" :route="{ path: '/apimanager' }">API Management</el-menu-item>
            <el-menu-item index="2" :route="{ path: '/settings' }">Settings</el-menu-item>
            <el-menu-item index="3" :route="{ path: '/help' }" class="help">Help</el-menu-item>
        </el-menu>
        <router-view id="view"></router-view>
    </div>
</template>

<script>
export default { };

</script>

<style scoped>
    #root {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .el-menu {
            width: 100%;
        }
    }

    #view {
        padding: 10px 10px 0 10px;
    }

    .el-menu--horizontal .el-menu-item.help {
        float: right;
    }
</style>