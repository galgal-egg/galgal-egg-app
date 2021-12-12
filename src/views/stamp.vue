<template>
  <div class="text-center section">
    <h1 class="h1">Diary Calendar</h1>
    <p class="text-lg font-medium text-gray-600 mb-6"></p>
    <v-calendar
      class="custom-calendar max-w-full"
      :masks="masks"
      :attributes="attributes"
      disable-page-swipe
      is-expanded
    >
      <template v-slot:day-content="{ day, attributes,}">
        <div class="flex flex-col h-full z-10 overflow-hidden">
          <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
          <div>
           <!-- <p
              v-for="b in but"
              :key="b.key"
            > -->
            <button  class="diary" v-on:click="addTodo(day)" >Diary</button>
            <p
              v-for="attr in attributes"
              :key="attr.key"
              class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
              :class="attr.customData.class"
            >
             <textarea v-model="attr.customData.title" />
              <!-- {{ attr.customData.title }} -->
            </p>
          </div>
        </div>
      </template>
    </v-calendar>
  </div>
</template>
<script>
//import firebase from "firebase"
export default {
  data() {
    return {
     // atrON: true,
      masks: {
        weekdays: "WWW",
      },
      attributes: [],
    }
  },
  // created(){
  //   this.todos.splice(0)
  //   const db = firebase.firestore()
  //   db.collection("users").doc(this.user.uid)
  //   .collection("art")
  //   .get()
  //   .then(( snapshot ) => {
  //     snapshot.docs.forEach((doc) => {
  //       this.attributes.push({
  //         id: doc.id,
  //         ...doc.data()
  //       })

  //     })
  //     console.log(this.attributes)
  //   })
  // },
  methods: {
    addTodo(day) {
      // if(this.atrON){
      //   this.atrON = false
      // }
      // else{
      //   this.atrON = true
      // }
      const todo = {
        key: day.id,
        customData: {
          title: "",
          class: "",
        },
        dates: day.date,
      }
      this.attributes.push(todo)
      console.log(todo)
      console.log(day)
    },
  },
  watch: {
    attributes: {
      handler: function () {
        localStorage.setItem("attributes", JSON.stringify(this.attributes))
      },
      deep: true,
    },
  },
  created: function () {
    if (localStorage.getItem("attributes")) {
      const art = JSON.parse(localStorage.getItem("attributes"))
      this.attributes = art
    }
  }
}
</script>

<style scoped>
.diary{
  background-color: #dd6e42d7;
  border-radius: 10px;
}
.text-center {
  width: 100vw;
  height: 100vh;
  background-color: #dd6e42d7;
  position: absolute;
}

.h1 {
  color: #ffffff;
  font-size: 40px;
  letter-spacing: 5px;
}
</style>
