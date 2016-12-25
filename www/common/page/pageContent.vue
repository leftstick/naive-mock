<template>
    <div class="content">
        <slot>
            <i class="el-icon-document"></i>
        </slot>
    </div>
</template>

<script>

export default { };

</script>

<style scoped>
    .content{
        display: flex;
        position: relative;
        flex-grow: 5;
    }
    .el-icon-document{
        position: absolute;
        font-size: 90px;
        color: #848484;
        top: 50%;
        margin-top: -90px;
        left: 50%;
        margin-left: -45px;
    }
</style>