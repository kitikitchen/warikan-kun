<template>
  <div class="container" v-bind:class="{ calc: calc_flg, recalc: recalc_flg }">
    <div class="content">
      <div class="block">
        <header class="header">
          <h1 class="title"><img src="@/static/logo.svg" alt=""><span>割り勘<span class="small">くん</span></span></h1>
        </header>
        <p class="read">金額と人数を入力して<br>計算するボタンを押してください。</p>
        <div class="total_price">
          <div class="total_price_price"><p>合計金額</p><input type="number" placeholder="¥0" v-model="total_price" @input="checkInput"></div>
          <div class="total_price_amari" v-if="calc_flg">
            余り<br>¥{{remainder}}
          </div>
        </div>
        <div class="bottons">
          <div class="peoples"><button type="button" @click="addPeoples(); checkInput();">＋</button><span>{{peoples.length}} 人</span><button type="button" @click="removePeoples(); checkInput();">−</button></div>
          <div class="button">
            <button type="button" @click="calc" :disabled="!this.peoples.length"><span v-show="calc_flg">再</span>計算する</button>
          </div>
        </div>
      </div>
      <div class="block" v-if="calc_flg">
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
            <tr class="table_item" v-for="people in peoples" v-bind:key="people.id">
              <td class="delete"><button type="button" @click="removePeople(people.id); checkInput();">❌</button></td>
              <td class="name"><input type="text" v-model="people.name" tabindex="1"></td>
              <td class="ratio"><button type="button" @click="changeRatio(people.id, 'plus'); checkInput();" :disabled="people.fixed">＋</button><span>{{people.ratio}}</span><button type="button" @click="changeRatio(people.id, 'minus'); checkInput();" :disabled="people.fixed">−</button></td>
              <td class="price"><input type="number" v-model="people.price" @input="checkInput();" :disabled="people.fixed" tabindex="2"></td>
              <td class="fixed"><input type="checkbox" v-model="people.fixed" @click="switchFixed(people.id);" tabindex="2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '~/components/Header.vue'

  export default {
    components: {
      Header,
    },
    data: function() {
      return {
        total_price: null,
        people_num: 2,
        remainder: 0,
        peoples: [],
        id: 0,
        calc_flg: false,
        recalc_flg: false,
      };
    },

    created: function(){
      this.addPeoples();
    },

    methods: {
      calc: function() {
        let num = this.peoples.length;
        let division_num = num;
        let price = this.total_price;
        let ratios = 0;
        let remainder = 0;

        this.calc_flg = true;
        this.recalc_flg = false;

        for (let i = 0; i < num; i++) {
          if (this.peoples[i].fixed) {
            price -= this.peoples[i].price;
          } else {
            ratios += this.peoples[i].ratio;
          }
        }

        for (
          let i = 0; i < num; i++) {
          if (!this.peoples[i].fixed) {
            this.peoples[i].price = parseInt(Math.ceil(price / ratios * this.peoples[i].ratio), 10);
            remainder += this.peoples[i].price;
          }
        }

        this.remainder = remainder - price;
      },

      checkInput: function() {
        if (this.calc_flg) {
          this.recalc_flg = true;
        }
      },

      addPeoples: function() {
        const num = this.peoples.length+1;
        const people = {
          id: this.id++,
          name: `${num}さん`,
          ratio: 1,
          price: null,
          fixed: false
        };
        this.peoples.unshift(people);
      },

      removePeoples: function() {
        this.peoples.shift();

        if (!this.peoples.length) {
          this.calc_flg = false;
          this.recalc_flg = false;
        }
      },

      removePeople: function(id) {
        const peoples = this.peoples;
        const index = peoples.findIndex(item => {
          return item.id === id;
        });
        peoples.splice(index, 1);
      },

      changeRatio: function(id, direction) {
        const peoples = this.peoples;
        const ratio = 0.1;
        const index = peoples.findIndex(item => {
          return item.id === id;
        });

        if (direction === 'plus') {
          let aaa = peoples[index].ratio + ratio;
          let bbb = Math.round(aaa * 10)
          let ccc = bbb / 10;

          peoples[index].ratio = ccc;

        } else if (direction === 'minus') {
          let aaa = peoples[index].ratio - ratio;
          let bbb = Math.round(aaa * 10)
          let ccc = bbb / 10;

          peoples[index].ratio = ccc;
        }
      },

      switchFixed: function(id) {
        const peoples = this.peoples;
        const index = peoples.findIndex(item => {
          return item.id === id;
        });
        // peoples[index].ratio -= 0.1;
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
  // padding: vw(40);
}

.header {
  padding: 100px vw(40) 40px;
  transition: ease 0.5s;

  .calc & {
    padding: 15px vw(40) 10px;
  }
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color: $color-red;
  line-height: 1;
  letter-spacing: 1px;
  text-align: center;
  font-size: 40px;
  transition: ease 0.5s;

  img {
    width: 40px;
    margin-right: 10px;
    transition: ease 0.5s;
  }

  .small {
    font-size: 0.7em;
    margin-left: 0.1rem;
  }

  .calc & {
    font-size: 20px;

    img {
      width: 26px;
      margin-right: 10px;
    }
  }
}

.read {
  text-align: center;
  margin-bottom: 10px;
  // padding: 20px 0;
  transition: margin ease 0.5s;

  .calc & {
    opacity: 0;
    margin-top: -70px;
  }
}

// .block {
//   border: 1px solid #ccc;
//   padding: vw(20);

//   + .block {
//     margin-top: 10px;
//   }
// }

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
    // color: $color-gray-dark;
  }

  input {
    width: 100%;
    text-align: right;
    border: 2px solid $color-gray;
    background: $color-gray-light;
    padding: 5px 20px 5px 86px;
    font-size: 24px;
    transition: ease 0.5s;

    .calc & {
      background: $color-white;
    }
  }

  .calc & {
    margin-top: 20px;
    background: $color-green;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .recalc & {
    background: $color-red;
  }
}

.total_price_price {
  .calc & {
    width: 80%;
  }
}
.total_price_amari {
  color: $color-white;
  text-align: center;
  line-height: 1.4;
  .calc & {
    padding-left: 20px;
    width: 20%;
  }
}

.bottons {
  display: flex;
  flex-direction: column;
  transition: ease 0.5s;
  padding: 10px vw(40);

  .calc & {
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    background: $color-green-light;
  }

  .recalc & {
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

  .calc & {
    margin-top: 0;
  }
}

.button {
  margin-top: 30px;
  // display: flex;
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

    .calc & {
      width: 100%;
      background: $color-gray;
      font-size: 16px;
    }

    .recalc & {
      width: 100%;
      background: $color-green;
      font-size: 16px;
    }
  }

  .calc & {
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
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // flex-shrink: 1;
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
