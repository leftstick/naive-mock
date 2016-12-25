<template>
    <div class="title">
        <slot><h1>untitled</h1></slot>
    </div>
</template>

<script>

export default { };

</script>

<style scoped>
    .title{
        border-bottom: 1px solid #eee;
        flex-shrink: 0;
    }
</style>