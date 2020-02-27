<template>
  <div class="total_price">
    <div class="total_price_price">
      <p>合計金額</p>
      <input type="number" placeholder="¥0" v-model="totalPrice">
    </div>
    <div class="total_price_remainder" v-if="isSuccess">
      余り<br>¥{{ remainder }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isSuccess: {
      type: Boolean
    },
    totalPrice: {
      type: Number
    },
    remainder: {
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped>
.total_price {
  position: relative;
  padding: 10px vw(40);

  p {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 40px;
    bottom: 0;
    margin: auto;
    line-height: 1;
    font-size: 12px;
  }

  input {
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

.total_price_price {
  .is-success & {
    width: 80%;
  }
}

.total_price_remainder {
  color: $color-white;
  text-align: center;
  line-height: 1.4;
  .is-success & {
    padding-left: 20px;
    width: 20%;
  }
}
</style>
