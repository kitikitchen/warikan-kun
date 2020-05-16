<template>
  <div class="totalprice">
    <div class="totalprice_fieldset">
      <label>
        <span class="totalprice_label">合計金額</span>
        <input
          v-model.number="totalPrice"
          class="totalprice_textbox"
          type="number"
          placeholder="¥0"
          @change="updateTotalPrice"
        />
      </label>
    </div>
    <div v-if="isSuccess" class="totalprice_remainder">
      余り<br />¥{{ remainder }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    isSuccess: {
      type: Boolean,
    },
    remainder: {
      type: Number,
    },
  },
  data() {
    return {
      totalPrice: null,
    }
  },
  methods: {
    updateTotalPrice() {
      this.$emit('update', this.totalPrice)
    },
  },
})
</script>

<style lang="scss" scoped>
.totalprice {
  padding: 10px vw(40);

  .is-success & {
    margin-top: 20px;
    background: $color-green;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .is-error & {
    background: $color-red;
  }
}

.totalprice_fieldset {
  > label {
    position: relative;
  }

  .is-success & {
    width: 80%;
  }
}

.totalprice_label {
  position: absolute;
  top: 0;
  left: 20px;
  bottom: 0;
  margin: auto;
  line-height: 1;
  font-size: 12px;
}

.totalprice_textbox {
  width: 100%;
  text-align: right;
  border: 2px solid $color-gray;
  background: $color-gray-light;
  padding: 5px 20px 5px 86px;
  font-size: 24px;
  transition: ease 0.5s;

  .is-success & {
    background: $color-white;
  }
}

.totalprice_remainder {
  color: $color-white;
  text-align: center;
  line-height: 1.4;

  .is-success & {
    padding-left: 20px;
    width: 20%;
  }
}
</style>
