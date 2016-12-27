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
                .catch(this._onerror);
        },
        back() {
            this.$router.push({
                path: '/apimanager'
            });
        },
        _onerror(err) {
            this.$message.error(err.message);
        }
    },
    components: {
        apiForm
    }
};

</script>

<style scoped>

</style>