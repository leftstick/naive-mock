<template>
    <el-table :data="apisList" height="650" border style="width: 100%">
        <el-table-column prop="api" label="API" sortable show-overflow-tooltip></el-table-column>
        <el-table-column prop="category" label="Category" sortable width="150"></el-table-column>
        <el-table-column prop="status" label="Status" sortable width="100"></el-table-column>
        <el-table-column :context="_self" inline-template label="Oper" width="90">
            <div>
                <el-button size="small" type="text" icon="edit" :disabled="row.category === 'example'" @click="handleEdit($index, row)"></el-button>
                <el-button size="small" type="text" icon="delete" :disabled="row.category === 'example'" @click="handleDelete($index, row)"></el-button>
            </div>
        </el-table-column>
    </el-table>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    computed: {
        ...mapGetters([
            'apisList'
        ])
    },
    methods: {
        handleEdit(index, row) {
            this.$router.push({
                path: `/apimanager/edit/${row.id}`
            });
        },
        handleDelete(index, row) {
            
        }
    }
};

</script>

<style scoped>
</style>