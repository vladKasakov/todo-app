import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodo } from '../../models/index';

interface InitialState {
  todos: ITodo[];
  filteredTodos: ITodo[];
}

const initialState: InitialState = {
  todos: [],
  filteredTodos: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.todos.unshift({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    deleteTodo(state, action: PayloadAction<number>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo(state, action: PayloadAction<number>) {
      let toggledTodo = state.todos.find((todo) => todo.id === action.payload);
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo.completed;
      }
    },
    deleteCompleted(state) {
      state.todos = state.todos.filter((el) => !el.completed);
    },
    reorderTodos(state, action: PayloadAction<ITodo[]>) {
      state.todos = action.payload;
    },
    setFilteredTodos(state, active: PayloadAction<ITodo[]>) {
      state.filteredTodos = active.payload;
    },
  },
});

export const {
  addTodo,
  deleteCompleted,
  deleteTodo,
  toggleTodo,
  reorderTodos,
  setFilteredTodos,
} = todoSlice.actions;

export default todoSlice.reducer;
