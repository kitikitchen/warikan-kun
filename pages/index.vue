<template>
  <div class="container" :class="containerClasses">
    <div class="content">
      <div class="block">
        <Header />
        <p class="read">金額と人数を入力して<br>計算するボタンを押してください。</p>
        <AppTotalPrice :is-success="isSuccess" :remainder="remainder" @update="onUpdateTotalPrice" />
        <div class="bottons">
          <div class="peoples"><button type="button" @click="onClickIncrementButton">＋</button><span>{{users.length}} 人</span><button type="button" @click="removePeoples(); checkInput();">−</button></div>
          <div class="button">
            <button type="button" @click="calc" :disabled="!this.users.length"><span v-show="isSuccess">再</span>計算する</button>
          </div>
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
              <td class="delete"><button type="button" @click="removePeople(user.id); checkInput();">❌</button></td>
              <td class="name"><input type="text" v-model="user.name" tabindex="1"></td>
              <td class="ratio"><button type="button" @click="changeRatio(user.id, 'plus');" :disabled="user.fixed">＋</button><span>{{user.ratio}}</span><button type="button" @click="changeRatio(user.id, 'minus');" :disabled="user.fixed">−</button></td>
              <td class="price"><input type="number" v-model="user.price" @input="checkInput();" :disabled="user.fixed" tabindex="2"></td>
              <td class="fixed"><input type="checkbox" v-model="user.fixed" @click="switchFixed(user.id);" tabindex="2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import AppTotalPrice from '~/components/AppTotalPrice.vue'
  import Header from '~/components/Header.vue'

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
      Header,
      AppTotalPrice
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
      checkInput() {
        if (this.isSuccess) {
          this.isError = true;
        }
      },

      calc: function() {
        let num = this.users.length;
        let division_num = num;
        let price = this.totalPrice;
        let ratios = 0;
        let remainder = 0;

        this.isSuccess = true;
        this.isError = false;

        for (let i = 0; i < num; i++) {
          if (this.users[i].fixed) {
            price -= this.users[i].price;
          } else {
            ratios += this.users[i].ratio;
          }
        }

        for (
          let i = 0; i < num; i++) {
          if (!this.users[i].fixed) {
            this.users[i].price = parseInt(Math.ceil(price / ratios * this.users[i].ratio), 10);
            remainder += this.users[i].price;
          }
        }

        this.remainder = remainder - price;
      },

      onUpdateTotalPrice(totalPrice) {
        this.totalPrice = totalPrice;
      },

      onClickIncrementButton() {
        this.checkInput();
        this.addUser();
      },

      onClickDecreaseButton() {
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

      removePeoples: function() {
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

.peoples {
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

.button {
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
