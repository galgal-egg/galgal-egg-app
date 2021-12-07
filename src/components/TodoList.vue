<template>
  <div class="todolist">
    <div class="osusume">
      <div v-show="muneosusumeON">
         胸筋のトレーニングのおすすめの種目はダンベルフライです！
      </div>
     <button v-on:click="makeMO()">
       胸筋
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
           <button v-on:click="removeTodo(key)">×</button>
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
      todos: {}
    }
  },
  created(){
    this.db = firebase.firestore()
    this.todosRef = this.db.collection("todos")
    this.todosRef.onSnapshot(querySnapshot => {
      const obj = {}
      querySnapshot.forEach(doc => {
        obj[doc.id] = doc.data()
      })
      this.todos = obj
    })

  },
  methods: {
    makeMO(){
      this.muneosusumeON = true
    },
    addTodo() {
      if (this.inputTodo === ""){ return }
      this.todosRef.add({
          name: this.inputTodo,
          isComplete: false,
        })
    },
    updateTodo(todo,key){
        todo.isComplete = !todo.isComplete
        this.todosRef.doc(key).update(todo)
      },
    removeTodo(key){
      this.todosRef.doc(key).delete()
    },
  },
}
</script>

<style scoped>
.todolist {
  padding-left: 5rem;
  padding-right: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-radius: 5px;
}

.kannsou {
  padding:30px 50px;
  overflow-wrap: anywhere;
}
</style>