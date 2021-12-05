<template>
  <div>
    <button v-on:click="fire">ボタン</button>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  data() {
    return {}
  },
  methods: {
    fire() {
      firebase.firestore().collection("users").doc().add({
        name: "Yuto",
      })
    },
  },
}
</script>
