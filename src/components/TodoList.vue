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
<<<<<<< HEAD
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
=======
      筋トレリスト
      <div class="bui">
        トレーニングする部位：
        <select v-model="selectedWorkout">
          <option disabled value="">今日はどこの部位？</option>
          <option
            v-for="workout in optionWorkout"
            v-bind:value="workout.name"
            v-bind:key="workout.id"
          >
            {{ workout.name }}
          </option>
        </select>
      </div>
    </div>
    <div>
      <div v-if="todos">
        <div v-for="(todo, index) in todos" v-bind:key="index" class="todo">
          <div class="todo__checkbox">
            <input type="checkbox" v-model="todo.isDone" />
          </div>
          <div v-if="todo.isDone" class="todo__text todo__text--done">
            {{ index }}:{{ todo.text }}
          </div>
          <div v-else class="todo__text">{{ index }}:{{ todo.text }}</div>
          <button v-on:click="deleteTodo(index)" class="todo__delete">
            削除
          </button>
        </div>
      </div>
    </div>
    <div class="syumoku">
>>>>>>> 987607cec72735188f60059ac1873062ac47a277
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
<<<<<<< HEAD
=======
  props: {
    youbi: String,
  },
>>>>>>> 987607cec72735188f60059ac1873062ac47a277
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
<<<<<<< HEAD
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
=======
      todos: [],
      inputHansei: "",
      menus: [],
    }
  },
  created: function () {
    const memo = localStorage.menus
    this.menus = JSON.parse(memo)
    for (let i = 0; i < this.menus.length; i++) {
      if (this.menus[i].youbi === this.youbi) {
        this.todos.push(this.menus[i].todos)
      }
    }
>>>>>>> 987607cec72735188f60059ac1873062ac47a277
  },
  methods: {
    makeMO(){
      this.muneosusumeON = true
    },
    addTodo() {
<<<<<<< HEAD
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
=======
      if (this.inputTodo !== "") {
        const todo = { text: this.inputTodo, isDone: false }
        //this.todos.push(todo)
        firebase
          .firestore()
          .collection("todos")
          .add(todo)
          .then((ref) => {
            this.todos.push({
              id: ref.todo,
              ...todo,
            })
          })
      }
    },
    deleteTodo(index) {
      this.todos.splice(index, 1)
    },

    hozon() {
      //console.log(this.youbi)
      const menu = {
        youbi: this.youbi,
        selectedWorkout: this.selectedWorkout,
        todos: this.todos,
        inputHansei: this.inputHansei,
      }
      this.menus.push(menu)
      //localStorage.menus = JSON.stringify(this.menus)
      localStorage.setItem("menus", JSON.stringify(this.menus))
      const art = JSON.parse(localStorage.getItem("menus"))
      this.menus = art
>>>>>>> 987607cec72735188f60059ac1873062ac47a277
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