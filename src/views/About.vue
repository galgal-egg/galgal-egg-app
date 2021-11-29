<template>
  <div class="about">
    <h1>体調管理</h1>
    <p>身長<input v-model="cm" />cm</p>
    <p>体重<input v-model="kg" />kg</p>
    <p>年齢<input v-model="age" />歳</p>
    <button @click="Keisan">計算</button>
    <p>基礎代謝<input v-model="cal" />cal</p>
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
    }
  },
  methods: {
    Keisan() {
      return (this.cal =
        this.cm * 4.799 + this.kg * 13.397 + this.age * 5.677 + 88.362)
    },
  },
}
</script>
