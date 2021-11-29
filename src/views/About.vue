<template>
  <div class="about">
    <h1>体調管理</h1>
    <p>身長<input v-model="cm" />cm</p>
    <p>体重<input v-model="kg" />kg</p>
    <p>年齢<input v-model="age" />歳</p>
    <button @click="Men">男性</button>
    <button @click="Women">女性</button>
    <p>基礎代謝<input v-model="cal" />cal</p>
    <p>水分摂取量<input v-model="mL" />mL</p>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      cm: 0,
      kg: 0,
      age: 0,
      cal: 0,
      mL: 0,
    }
  },
  methods: {
    Men() {
      return (
        (this.cal =
          this.cm * 4.799 + this.kg * 13.397 + this.age * 5.677 + 88.362),
        (this.mL = this.kg * 40)
      )
    },
    Women() {
      return (
        (this.cal =
          this.cm * 3.098 + this.kg * 9.247 + this.age * 4.33 + 447.592),
        (this.mL = this.kg * 40)
      )
    },
  },
}
</script>
