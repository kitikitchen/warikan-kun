<template>
  <div class="container" :class="containerClasses">
    <div class="content">
      <div class="block">
        <AppHeader />
        <p class="lead">
          金額と人数を入力して<br />計算するボタンを押してください。
        </p>
        <AppTotalPrice
          :is-success="isSuccess"
          :remainder="remainder"
          @update="onUpdateTotalPrice"
        />
        <div class="contoroller">
          <AppCounter
            :users="users"
            @increment="onIncrementUser"
            @decrement="onDecrementUser"
          />
          <AppCalculator
            :users="users"
            :is-success="isSuccess"
            @calculate="splitPrice"
          />
        </div>
      </div>
      <div v-if="isSuccess" class="block">
        <AppTable
          :users="users"
          @delete="doDeleteUser"
          @spin="validate"
          @update="validate"
          @toggle="toggleFixed"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppCalculator from '~/components/AppCalculator.vue'
import AppCounter from '~/components/AppCounter.vue'
import AppHeader from '~/components/AppHeader.vue'
import AppTable from '~/components/AppTable.vue'
import AppTotalPrice from '~/components/AppTotalPrice.vue'
import { User } from '~/interfaces/index'

export default Vue.extend({
  components: {
    AppCalculator,
    AppCounter,
    AppHeader,
    AppTable,
    AppTotalPrice,
  },
  data() {
    return {
      totalPrice: null as null | number,
      remainder: 0,
      users: [] as Array<User>,
      id: 0,
      isSuccess: false,
      isError: false,
    }
  },

  computed: {
    containerClasses(): {} {
      return {
        'is-success': this.isSuccess,
        'is-error': this.isError,
      }
    },
  },

  created() {
    this.createUser()
  },

  methods: {
    validate() {
      if (this.isSuccess) {
        this.isError = true
      }
    },

    splitPrice() {
      if (this.totalPrice === null) {
        return
      }

      const userAll = this.users.length
      let totalPrice = this.totalPrice
      let ratios = 0
      let remainder = 0

      this.isSuccess = true
      this.isError = false

      for (let i = 0; i < userAll; i++) {
        const isFixed = this.users[i].fixed

        if (isFixed) {
          totalPrice -= this.users[i].price
        } else {
          ratios += this.users[i].ratio
        }
      }

      for (let i = 0; i < userAll; i++) {
        const isFixed = this.users[i].fixed

        if (!isFixed) {
          this.users[i].price = Math.ceil(
            (totalPrice / ratios) * this.users[i].ratio
          )
          remainder += this.users[i].price
        }
      }

      this.remainder = remainder - totalPrice
    },

    onUpdateTotalPrice(totalPrice: number) {
      this.totalPrice = totalPrice
    },

    onIncrementUser() {
      this.validate()
      this.createUser()
    },

    onDecrementUser() {
      this.destroyUser()
      this.validate()
    },

    createUser() {
      const newUser = {
        id: this.id++,
        name: `${this.id}さん`,
        ratio: 1,
        price: 0,
        fixed: false,
      }
      this.users = [...this.users, newUser]
    },

    destroyUser() {
      const length = this.users.length
      this.users.shift()

      if (!this.users.length) {
        this.isSuccess = false
        this.isError = false
      }
    },

    doDeleteUser(id: number) {
      this.validate()
      this.removeUser(id)
    },

    removeUser(id: number) {
      const users = this.users
      const index = users.findIndex((user) => {
        return user.id == id
      })
      users.splice(index, 1)
    },

    toggleFixed(id: number) {
      const users = this.users
      const index = users.findIndex((item) => {
        return item.id === id
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

.content {
  width: 100%;
}

.lead {
  text-align: center;
  margin-bottom: 10px;
  transition: margin ease 0.5s;

  .is-success & {
    opacity: 0;
    margin-top: -70px;
  }
}

.contoroller {
  display: flex;
  flex-direction: column;
  transition: ease 0.5s;
  padding: 10px vw(40);

  .is-success & {
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    background: $color-green-light;
  }

  .is-error & {
    background: $color-red-light;
  }

  .button button {
    &[disabled] {
      background: $color-gray;
    }
  }
}
</style>
