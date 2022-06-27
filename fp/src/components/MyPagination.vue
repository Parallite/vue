<template>
    <div class="wrp">
        <div @click="onClick(cur - 1)">&#8592;</div>
        <div v-for="i in amount"
        :key="i"
        class="active"
        @click="onClick(i)">
        {{ i }}
        </div>
        <div @click="onClick(cur + 1)">&#8594;</div>
    </div>
</template>

<script>
export default {
    name: "MyPagination",
    props: {
        length: Number,
        n: Number,
        cur: Number,
    },
    computed: {
        amount() {
            return Math.ceil(this.length / this.n)
        }
    },
    methods: {
        onClick(p) {
            if(p < 1 || p > this.amount) {
                return;
            }
            this.$emit('changePage', p);
        }
    }
}
</script>

<style scoped>
.wrp {
    display: flex;
    justify-content: center;
    margin-top: 50px;
}
.active {
    background-color: #E0E0E0;
    padding: 0 10px 0 10px;
}
</style>