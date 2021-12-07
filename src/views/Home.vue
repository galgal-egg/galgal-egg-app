<template>
  <button v-on:click="get">ボタン</button>
</template>

<script>
export default {
  date: function () {},
  methods: {
    get() {
      const request = require("request")
      const clientID = "b3f340a2f2b443e78eb5c3ed36131b54"
      const clientSecret = "f76f33b698724e8a8c21db2fe86d02c2"

      var options = {
        method: "POST",
        url: "https://oauth.fatsecret.com/connect/token",
        auth: {
          user: clientID,
          password: clientSecret,
        },
        headers: { "content-type": "application/json" },
        form: {
          grant_type: "client_credentials",
          scope: "basic",
        },
        json: true,
      }

      request(options, function (error, response, body) {
        if (error) throw new Error(error)

        console.log(body)
      })
    },

</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue"
export default {
  name: "Home",
  components: {
    HelloWorld,
  },
}
</script>
