<template>
  <div class="counter">
    <button type="button" @click="incrementPerson">
      ＋
    </button>
    <span>{{ users.length }}人</span>
    <button type="button" @click="decrementPerson">
      −
    </button>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { User } from '~/interfaces/index'

export default Vue.extend({
  props: {
    users: {
      type: Array
    } as PropOptions<User[]>
  },

  methods: {
    incrementPerson() {
      this.$emit('increment')
    },

    decrementPerson() {
      this.$emit('decrement')
    },
  },
})
</script>

<style lang="scss" scoped>
.counter {
  margin-top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    border: 2px solid $color-gray;
    background: $color-gray-light;
    padding: 5px 20px;
  }

  button {
    margin: 0 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .is-success & {
    margin-top: 0;
  }
}
</style>
