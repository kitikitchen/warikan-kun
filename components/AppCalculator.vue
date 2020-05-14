<template>
  <div class="calculator">
    <button type="button" :disabled="!this.users.length" @click="calculate">
      <span v-show="isSuccess">再</span>計算する
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    users: {
      type: Array,
    },
    isSuccess: {
      type: Boolean,
    },
  },
  methods: {
    calculate() {
      this.$emit('calculate')
    },
  },
})
</script>

<style lang="scss" scoped>
.calculator {
  margin-top: 30px;
  text-align: center;

  button {
    border-radius: 50px;
    margin: auto;
    background: $color-green;
    color: $color-white;
    width: 80%;
    padding: 5px 30px;
    font-weight: bold;

    font-size: 20px;

    .is-success & {
      width: 100%;
      background: $color-gray;
      font-size: 16px;
    }

    .is-error & {
      width: 100%;
      background: $color-green;
      font-size: 16px;
    }
  }

  .is-success & {
    margin-top: 0;
  }
}
</style>
