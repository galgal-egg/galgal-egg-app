<template>
  <div class="todolist"> 
    <h1>My Training</h1>
    <div class="OS">部位ごとのアプリ製作者のおすすめを紹介します!!</div>
    <div class="Mosusume">
      <div class="muneS" v-show="muneosusumeON" >
        <bar>おすすめのトレーニング種目はダンベルフライです!</bar>
        <bar>胸筋にストレッチの不可をかけることで筋肥大効果up!!!</bar>
         <img alt="Vue logo " src="../assets/dumbelfry.jpg" style="height:25%; width:25%"/>
      </div>
     <button class="Mbutton" v-on:click="makeMO()">
       胸部トレーニング
     </button>
    </div>
    <div class="Sosusume">
      <div class="senakaS" v-show="senakaosusumeON">
        <bar>背中のおすすめのトレーニング種目はラットプルダウンです!</bar>
        <bar>この種目は背中を広くさせるのにもってこいです!!!</bar>
        <bar>背中を広くさせることでウエストを細く見せることができます!</bar>
         <img alt="Vue logo " src="../assets/ratpull.jpg" style="height:25%; width:25%"/>
      </div>
     <button class="Sbutton" v-on:click="makeSO()">
       背中トレーニング
     </button>
    </div>
    <div class="Aosusume">
      <div class="asiS" v-show="asiosusumeON">
        <bar>おすすめの種目はスクワットです!</bar>
        <bar>脚だけでなくお尻の筋肉にも効果ありです!!!</bar>
         <img alt="Vue logo " src="../assets/asiw.jpg" style="height:25%; width:25%"/> <img alt="Vue logo " src="../assets/asim.jpg" style="height:25%; width:25%"/>
      </div>
     <button class="Abutton" v-on:click="makeAO()">
       脚トレーニング
     </button>
    </div>
    <div class="Uosusume">
      <div class="udeS" v-show="udeosusumeON">
        <bar>腕トレーニングのおすすめの種目はケーブルプッシュダウンです!</bar>
        <bar>この種目は二の腕を引き締めるのに効果的です!!!</bar>
         <img alt="Vue logo " src="../assets/cablepush.jpg" style="height:25%; width:25%"/> 
      </div>
     <button class="Ubutton" v-on:click="makeUO()">
       腕トレーニング
     </button>
    </div>
    <div class="Kosusume">
      <div class="kataS" v-show="kataosusumeON">
        <bar>おすすめの種目はサイドレイズです!</bar>
        <bar>この種目をやることで形を良くすることができます!!!</bar>
         <img alt="Vue logo " src="../assets/katam.jpg" style="height:25%; width:25%"/>  <img alt="Vue logo " src="../assets/kataw.jpg" style="height:25%; width:25%"/> 
      </div>
     <button class="Kbutton" v-on:click="makeKO()">
       肩トレーニング
     </button>
    </div>
    <div>
      <select v-model="selectedWorkout">
        <option disabled value="">今日はどこの日？</option>
        <option
          v-for="workout in optionWorkout"
          v-bind:value="workout.name"
          v-bind:key="workout.id"
        >
          {{ workout.name }}
        </option>
      </select>
    </div>
    <div>
      <div>
        今日やること：
        <input  v-model="inputTodo" placeholder="例：腕立て伏せ 10回 3set"/>
        <button v-on:click="addTodo()">追加</button>
      </div>
    </div>
    <div>
        <div v-for="(todo , key) in todos" v-bind:key="key" class = "todo">
         <div class = "todo_checkbox">
           <input type="checkbox" v-model="todo.isComplete" v-on:click="updateTodo(todo,key)" />
           {{ todo.name }}
           <button v-on:click="removeTodo(todo.id)">×</button>
         </div>
       </div>
    </div>
    <div>
      今日の感想
    </div>
    <textarea class="kannsou" v-model="kannsou" cols="50" rows="10"></textarea>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  data() {
    return {
      kataosusumeON: false,
      udeosusumeON: false,
      asiosusumeON: false,
      senakaosusumeON: false,
      muneosusumeON: false,
      selectedWorkout: "",
      optionWorkout: [
        { id: 1, name: "胸の日" },
        { id: 2, name: "背中の日" },
        { id: 3, name: "肩の日" },
        { id: 4, name: "腕の日" },
        { id: 5, name: "脚の日" },
      ],
      inputTodo: "",
      kannsou: "",
      menus: [],
      db: null,
      todosRef: null,
      todos: []
    }
  },
   computed: {
    user() {
      return this.$auth.currentUser
    },
  },
  created(){
    this.todos.splice(0)
    const db = firebase.firestore()
    db.collection("users").doc(this.user.uid)
    .collection("todos")
    .get()
    .then(( snapshot ) => {
      snapshot.docs.forEach((doc) => {
        this.todos.push({
          id: doc.id,
          ...doc.data()
        })

      })
      console.log(this.todos)
    })
  },
  methods: {
    makeMO(){
      if(this.muneosusumeON){
        this.muneosusumeON = false
      }
      else{
        this.muneosusumeON = true
      }
    },
    makeSO(){
      if(this.senakaosusumeON){
        this.senakaosusumeON = false
      }
      else{
        this.senakaosusumeON = true
      }
    },
    makeAO(){
      if(this.asiosusumeON){
        this.asiosusumeON = false
      }
      else{
        this.asiosusumeON = true
      }
    },
    makeUO(){
      if(this.udeosusumeON){
        this.udeosusumeON = false
      }
      else{
        this.udeosusumeON = true
      }
    },
    makeKO(){
      if(this.kataosusumeON){
        this.kataosusumeON = false
      }
      else{
        this.kataosusumeON = true
      }
    },
    async addTodo() {
      await firebase
        .firestore()
        .collection("users")
        .doc(this.user.uid)
        .collection("todos")
        .add({
          name: this.inputTodo,
          isComplete: false,
        })
      window.location.reload();
      this.inputTodo = this.user.name
    },
    updateTodo(todo,key){
        todo.isComplete = !todo.isComplete
        this.db.doc(key).update(todo)
      },
    async removeTodo(id){
      await firebase
        .firestore()
        .collection("users")
        .doc(this.user.uid)
        .collection("todos")
        .doc(id)
        .delete()
         window.location.reload();
    },
  },
}
</script>

<style scoped>
.todolist h1{
  font-size: 50px;
  margin-top: 10px;
  padding-top: 10px;
}
.OS{
  font-size: 20px;
  color:blanchedalmond;
  background-color:brown;
  border-radius: 10px;
  position: relative;
  bottom: 10px;
  width: 100%;
}
.Kosusume{
  position: relative;
  left: 18%;
  bottom: 50px;
}
.kataS {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.Kbutton{
  background-color:coral;
  color: antiquewhite;
  border-radius: 10px;
  width: 200px;
  height: 50px;
  font-size: 120%;
}
.Mosusume{
  position: relative;
  right:36%;
}
.muneS {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.Mbutton{
  background-color:coral;
  color: antiquewhite;
  border-radius: 10px;
  width: 200px;
  height: 50px;
  font-size: 120%;
}
.Sosusume{
  position: relative;
  bottom: 50px;
}
.senakaS {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.Sbutton{
  background-color:coral;
  color: antiquewhite;
  border-radius: 10px;
  width: 200px;
  height: 50px;
  font-size: 120%;
}
.Aosusume{
  position: relative;
  left:36%;
  bottom: 100px;
}
.asiS {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.Abutton{
  background-color:coral;
  color: antiquewhite;
  border-radius: 10px;
  width: 200px;
  height: 50px;
  font-size: 120%;
}
.Uosusume{
  position:relative;
  right: 18%;
}
.udeS {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.Ubutton{
  background-color:coral;
  color: antiquewhite;
  border-radius: 10px;
  width: 200px;
  height: 50px;
  font-size: 120%;
}

.todolist {
  padding-left: 5rem;
  padding-right: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e8dab2;
}

.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-radius: 5px;
}

.kannsou {
  padding:15px 30px;
  overflow-wrap: anywhere;
}
</style>