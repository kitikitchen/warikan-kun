<template>
  <div class="container" :class="containerClasses">
    <div class="content">
      <div class="block">
        <AppHeader />
        <p class="read">金額と人数を入力して<br>計算するボタンを押してください。</p>
        <AppTotalPrice :is-success="isSuccess" :remainder="remainder" @update="onUpdateTotalPrice" />
        <div class="bottons">
          <AppCounter :users="users" @increment="onIncrementPerson" @decrement="onDecreasePerson" />
          <AppCalculator :users="users" :is-success="isSuccess" @calculate="splitPrice" />
        </div>
      </div>
      <div class="block" v-if="isSuccess">
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
              <td class="delete"><button type="button" @click="removePeople(user.id); validate();">❌</button></td>
              <td class="name"><input type="text" v-model="user.name" tabindex="1"></td>
              <td class="ratio"><button type="button" @click="changeRatio(user.id, 'plus');" :disabled="user.fixed">＋</button><span>{{user.ratio}}</span><button type="button" @click="changeRatio(user.id, 'minus');" :disabled="user.fixed">−</button></td>
              <td class="price"><input type="number" v-model="user.price" @input="validate();" :disabled="user.fixed" tabindex="2"></td>
              <td class="fixed"><input type="checkbox" v-model="user.fixed" @click="switchFixed(user.id);" tabindex="2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import AppCalculator from '~/components/AppCalculator.vue'
  import AppCounter from '~/components/AppCounter.vue'
  import AppHeader from '~/components/AppHeader.vue'
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
      AppTotalPrice,
    },

    created() {
      this.addUser();
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

      onIncrementPerson() {
        this.validate();
        this.addUser();
      },

      onDecreasePerson() {
        this.removeUser();
        this.validate();
      },

      addUser() {
        const newUser = {
          id: this.id++,
          name: `${this.id}さん`,
          ratio: 1,
          price: null,
          fixed: false
        };
        this.users = [...this.users, newUser];
      },

      removeUser() {
        this.users.shift();

        if (!this.users.length) {
          this.isSuccess = false;
          this.isError = false;
        }
      },

      removePeople: function(id) {
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

.read {
  text-align: center;
  margin-bottom: 10px;
  transition: margin ease 0.5s;

  .is-success & {
    opacity: 0;
    margin-top: -70px;
  }
}

.bottons {
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

input {
  width: 100%;
  padding: 3px 5px;
  border: 2px solid $color-gray;
  background: $color-gray-light;

  &[disabled] {
    border: 2px solid $color-white !important;
    background: $color-white !important;
  }
}

.table {
  width: 100%;
  margin-top: 20px;

  td,th {
    padding: 0 10px;
  }

}

.delete {
  width: 5%;
  text-align: center;
}

.name {
  width: 20%;
}

.ratio {
  width: 2%;

  .table_item & {
    width: 100%;
    display: flex;
  }

  button,input {
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

.price {
  width: 20%;

  input {
    text-align: right;
  }
}

.table_item {
  margin-top: 10px;
  height: 100%;
  td {
    padding: 5px;
  }
}

.fixed {
  width: 9%;
  height: 100%;

  .table_item & {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}

.table_head {
  font-size: 12px;
}
</style>
