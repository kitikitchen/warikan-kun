<template>
  <table class="table">
    <thead>
      <tr class="table_head">
        <th class="delete">
          &nbsp;
        </th>
        <th class="name">
          名前
        </th>
        <th class="ratio">
          比率
        </th>
        <th class="price">
          金額
        </th>
        <th class="fixed">
          固定
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id" class="table_item">
        <td class="delete">
          <button :data-id="user.id" type="button" @click="onClickDeleteButton">
            ❌
          </button>
        </td>
        <td class="name">
          <input v-model="user.name" type="text" tabindex="1" />
        </td>
        <td class="ratio">
          <input
            v-model.number="user.ratio"
            type="number"
            :disabled="user.fixed"
            min="0"
            max="100"
            step="0.1"
            @change="onChangeSpinner"
          />
        </td>
        <td class="price">
          <input
            v-model.number="user.price"
            type="number"
            :disabled="user.fixed"
            tabindex="2"
            @input="onChangeTextField"
          />
        </td>
        <td class="fixed">
          <input
            v-model="user.fixed"
            :data-id="user.id"
            type="checkbox"
            tabindex="3"
            @click="onClickFixedCheckbox"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { User } from '~/interfaces/index'

@Component
export default class AppTable extends Vue {
  @Prop({
    type: Array
  })
  users!: User[]

  onClickDeleteButton({
    currentTarget,
  }: {
    currentTarget: HTMLElement
  }): void {
    const id = currentTarget.getAttribute('data-id')
    this.$emit('delete', id)
  }

  onChangeSpinner() {
    this.$emit('spin')
  }

  onChangeTextField() {
    this.$emit('update')
  }

  onClickFixedCheckbox({
    currentTarget,
  }: {
    currentTarget: HTMLElement
  }): void {
    const id = currentTarget.getAttribute('data-id')
    this.$emit('toggle', id)
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
