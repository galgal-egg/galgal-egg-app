<template>
  <div class="todolist">
    <div>
      筋トレリスト
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
        種目や回数を入力：
        <input  v-model="inputTodo" />
        <button v-on:click="addTodo">追加</button>
      </div>
    </div>
    <div>
        <div v-for="(todo , key) in todos" v-bind:key="key" class = "todo">
         <div class = "todo_checkbox">
           <input type="checkbox" v-model="isComplete" v-on:click="updateTodo(todo,key)" />

           {{ todo.name }}
           <button v-on:click="removeTodo(key)">×</button>
         </div>
       </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  data() {
    return {
      selectedWorkout: "",
      optionWorkout: [
        { id: 1, name: "胸の日" },
        { id: 2, name: "背中の日" },
        { id: 3, name: "肩の日" },
        { id: 4, name: "腕の日" },
        { id: 5, name: "脚の日" },
      ],
      inputTodo: "",
      inputHansei: "",
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
        obj[doc.id] = doc.date()
      })
      this.todos = obj
    })
  },
  methods: {
    addTodo() {
      if (this.inputTodo !== "") { return }
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

.todo:hover {
  color: white;
  background-color: #b23b61;
}

.todo__text {
  margin-left: 2rem;
  text-align: left;
}

.todo__text--done {
  text-decoration-line: line-through;
}

.todo__delete {
  margin-left: 2rem;
  padding: 0.5rem 0.5rem;
}

.todo__delete:hover {
  margin-left: 2rem;
  background-color: #b2ae3b;
  border-radius: 5px;
}
</style>