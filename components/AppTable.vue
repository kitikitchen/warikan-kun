<template>
<table class="table">
  <thead>
    <tr class="table_head">
      <th class="delete">&nbsp;</th>
      <th class="name">名前</th>
      <th class="ratio">比率</th>
      <th class="price">金額</th>
      <th class="fixed">固定</th>
    </tr>
  </thead>
  <tbody>
    <tr class="table_item" v-for="user in users" v-bind:key="user.id">
      <td class="delete"><button :data-id="user.id" type="button" @click="onClickDeleteButton">❌</button></td>
      <td class="name"><input type="text" v-model="user.name" tabindex="1"></td>
      <td class="ratio"><input type="number" v-model.number="user.ratio" @change="onChangeSpinner" :disabled="user.fixed" min="0" max="100" step="0.1"></td>
      <td class="price"><input type="number" v-model.number="user.price" @input="onChangeTextField" :disabled="user.fixed" tabindex="2"></td>
      <td class="fixed"><input :data-id="user.id" type="checkbox" v-model="user.fixed" @click="onClickFixedCheckbox" tabindex="3"></td>
    </tr>
  </tbody>
</table>
</template>

<script>
export default {
  props: {
    users: {
      type: Array
    }
  },

  methods: {
    onClickDeleteButton(event) {
      const id = event.currentTarget.getAttribute('data-id');

      this.$emit('delete', id);
    },

    onChangeSpinner() {
      this.$emit('spin');
    },

    onChangeTextField() {
      this.$emit('update');
    },

    onClickFixedCheckbox(event) {
      const id = event.currentTarget.getAttribute('data-id');

      this.$emit('toggle', id);
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  table-layout: fixed;
  margin-top: 20px;
  width: 100%;
}

.table_head {
  font-size: 12px;
}

.table_item {
  margin-top: 10px;
  height: 100%;

  td {
    padding: 5px;
  }
}

.delete {
  width: 10px;
  text-align: center;
}

.name {
  width: 15%;
}

.price {
  width: 15%;

  input {
    width: 100%;
    text-align: right;
  }
}

.ratio {
  width: 5%;

  input {
    width: 100%;

    &[disabled] {
      color: $color-gray;

      + span {
        border-color: transparent;
        color: $color-gray;
      }
    }
  }

  span {
    width: 40px;
    padding: 2px 5px;
    border: 2px solid $color-gray-light;
  }
}

.fixed {
  width: 15px;
  height: 100%;

  input {
    vertical-align: middle;
  }
}
</style>
