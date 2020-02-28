<template>
  <div class="container" :class="containerClasses">
    <div class="content">
      <div class="block">
        <AppHeader />
        <p class="lead">金額と人数を入力して<br>計算するボタンを押してください。</p>
        <AppTotalPrice :is-success="isSuccess" :remainder="remainder" @update="onUpdateTotalPrice" />
        <div class="contoroller">
          <AppCounter :users="users" @increment="onIncrementUser" @decrement="onDecrementUser" />
          <AppCalculator :users="users" :is-success="isSuccess" @calculate="splitPrice" />
        </div>
      </div>
      <div class="block" v-if="isSuccess">
        <AppTable :users="users" @delete="doDeleteUser" />
      </div>
    </div>
  </div>
</template>

<script>
  import AppCalculator from '~/components/AppCalculator.vue'
  import AppCounter from '~/components/AppCounter.vue'
  import AppHeader from '~/components/AppHeader.vue'
  import AppTable from '~/components/AppTable.vue'
  import AppTotalPrice from '~/components/AppTotalPrice.vue'

  export default {
    data() {
      return {
        totalPrice: null,
        remainder: 0,
        users: [],
        id: 0,
        isSuccess: false,
        isError: false,
      };
    },

    components: {
      AppCalculator,
      AppCounter,
      AppHeader,
      AppTable,
      AppTotalPrice,
    },

    created() {
      this.createUser();
    },

    computed: {
      containerClasses() {
        return {
          'is-success': this.isSuccess,
          'is-error': this.isError
        }
      }
    },

    methods: {
      validate() {
        if (this.isSuccess) {
          this.isError = true;
        }
      },

      splitPrice() {
        let userAll = this.users.length;
        let totalPrice = this.totalPrice;
        let ratios = 0;
        let remainder = 0;

        this.isSuccess = true;
        this.isError = false;

        for (let i = 0; i < userAll; i++) {
          const isFixed = this.users[i].fixed;

          if (isFixed) {
            totalPrice -= this.users[i].totalPrice;
          } else {
            ratios += this.users[i].ratio;
          }
        }

        for (let i = 0; i < userAll; i++) {
          const isFixed = this.users[i].fixed;

          if (!isFixed) {
            this.users[i].price = parseInt(Math.ceil(totalPrice / ratios * this.users[i].ratio), 10);
            remainder += this.users[i].price;
          }
        }

        this.remainder = remainder - totalPrice;
      },

      onUpdateTotalPrice(totalPrice) {
        this.totalPrice = totalPrice;
      },

      onIncrementUser() {
        this.validate();
        this.createUser();
      },

      onDecrementUser() {
        this.destroyUser();
        this.validate();
      },

      createUser() {
        const newUser = {
          id: this.id++,
          name: `${this.id}さん`,
          ratio: 1,
          price: null,
          fixed: false
        };
        this.users = [...this.users, newUser];
      },

      destroyUser() {
        this.users.shift();

        if (!this.users.length) {
          this.isSuccess = false;
          this.isError = false;
        }
      },

      doDeleteUser(id) {
        this.validate()
        this.removeUser(id);
      },

      removeUser(id) {
        const users = this.users;
        const index = users.findIndex(item => {
          return item.id === id;
        });
        users.splice(index, 1);
      },

      changeRatio: function(id, direction) {
        const users = this.users;
        const ratio = 0.1;
        const index = users.findIndex(item => {
          return item.id === id;
        });

        if (direction === 'plus') {
          let aaa = users[index].ratio + ratio;
          let bbb = Math.round(aaa * 10)
          let ccc = bbb / 10;

          users[index].ratio = ccc;

        } else if (direction === 'minus') {
          let aaa = users[index].ratio - ratio;
          let bbb = Math.round(aaa * 10)
          let ccc = bbb / 10;

          users[index].ratio = ccc;
        }

        this.calc();
      },

      switchFixed: function(id) {
        const users = this.users;
        const index = users.findIndex(item => {
          return item.id === id;
        });
      },
    }
  }
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
