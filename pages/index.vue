<template>
  <section>
    <Header />
    <div class="block">
      <div>
        <div class="total_price">合計金額：<input type="number" v-model="total_price"></div>
        <div class="peoples">人数：{{peoples.length}} <button type="button" @click="removePeoples">−</button> <button type="button" @click="addPeoples">＋</button></div>
      </div>
      <div>
        <button type="button" @click="calc">計算</button>
      </div>
    </div>
    <div class="block" v-if="calc_flg">
      <table>
        <thead>
          <tr>
            <th class="delete">&nbsp;</th>
            <th class="name">名前</th>
            <th class="ratio">比率</th>
            <th class="price">金額</th>
            <th class="fixed">固定</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table_item" v-for="people in peoples" v-bind:key="people.id">
            <td class="delete"><button type="button" @click="removePeople(people.id)">❌</button></td>
            <td class="name"><input type="text" v-model="people.name"></td>
            <td class="ratio"><input type="number" v-model="people.ratio"></td>
            <td class="price"><input type="number" v-model="people.price"></td>
            <td class="fixed"><input type="checkbox" v-model="people.fixed"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
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
      people_number: 2,
      peoples: [],
      id: 0,
      calc_flg: false
    };
  },
  computed: {
    aaa: function() {

    }
  },
  methods: {
    calc: function() {
      const num = this.peoples.length;
      const price = this.total_price;

      this.calc_flg = true;

      for (let i = 0; i < num; i++) {
        this.peoples[i].price = Math.ceil(price / num);
      }
    },

    addPeoples: function() {
      const num = this.peoples.length+1;
      const people = {
        id: this.id++,
        name: `${num}さん`,
        ratio: 1.0,
        price: null,
        fixed: false
      };
      this.peoples.unshift(people);
    },

    removePeoples: function() {
      this.peoples.shift();
    },

    removePeople: function(id) {
      const peoples = this.peoples;
      const index = peoples.findIndex(item => {
        return item.id === id;
      });
      peoples.splice(index, 1);
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  border: 1px solid #ccc;
  padding: vw(20);

  + .block {
    margin-top: 10px;
  }
}

.table {

}

.delete {
  width: 50px;
  flex-shrink: 1;
}

.name {

}

.ratio {
  width: 50px;
  flex-shrink: 1;
}

.price {

}

.fixed {
  width: 50px;
  flex-shrink: 1;
}

</style>
