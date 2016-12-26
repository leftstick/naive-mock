<template>
    <div>
        <api-form @save="save" @back="back" type="Modify" :info="apiInfo" v-if="apiInfo"></api-form>
    </div>
</template>

<script>
import {mapActions} from 'vuex';

import apiForm from './base/apiForm';

export default {
    data() {
        return {
            apiInfo: null
        };
    },
    methods: {
        ...mapActions([
            'getAPI',
            'updateAPI'
        ]),
        save(api) {
            this
                .updateAPI(api)
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
    mounted() {
        this
            .getAPI(this.$route.params.id)
            .then((item) => {
                this.apiInfo = item;
            });
    },
    components: {
        apiForm
    }
};

</script>

<style scoped>

</style>