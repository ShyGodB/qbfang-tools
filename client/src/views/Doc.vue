<template>
    <div class="doc w-100">
        <doc-read v-if="tab === 'read'" />
        <doc-create v-if="tab === 'create'" />
    </div>
</template>

<script>
import DocRead from "../components/doc/Read.vue";
import DocCreate from "../components/doc/Create.vue";

export default {
    name: "Doc",
    data () {
        return {
            tab: '',
            model: ''
        }
    },
    components: {
        'doc-read': DocRead,
        'doc-create': DocCreate,
    },
    created () {
        this.tab = this.$route.params.tab;
        this.model = this.$route.params.model;
    }
};
</script>

<style scoped>
.doc {
    background-color: #e5e5e1;
    margin: 0 auto;
    min-height: 700px;
}
.line {
    width: 100%;
    height: 1px;
    background-color: #000000;
}
</style>
