<template>
    <api-form @save="save" @back="back" type="Create"></api-form>
</template>

<script>
import {mapActions} from 'vuex';

import apiForm from './base/apiForm';

export default {
    methods: {
        ...mapActions([
            'createAPI'
        ]),
        save(api) {
            this
                .createAPI(api)
                .then(() => {
                    this.$router.push({
                        path: '/apimanager'
                    });
                })
                .catch(err => {
                    this.$message.error(err.message);
                });
        },
        back() {
            this.$router.push({
                path: '/apimanager'
            });
        }
    },
    components: {
        apiForm
    }
};

</script>

<style scoped>

</style>