<template>
    <div class="page">
        <slot name="title"></slot>
        <slot name="content"></slot>
    </div>
</template>

<script>

export default { };

</script>

<style scoped>
    .page{
        padding: 0 10px 10px 10px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
</style>