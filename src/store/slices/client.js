import type { RootState } from "..";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ITodoList from "../../types/todo";
import api from "@/utills/axios";

// Define the initial state using that type
const initialState = {
  todolist: [],
  particularTodo: {},
};

export const fetchTodoList = createAsyncThunk(
  "todo-list/fetch-todo",
  async () => {
    // const response = await fetch(
    //   "https://jsonplaceholder.typicode.com/todos"
    // ).then((response) => response.json());
    const response = await api.get(
      "https://transfermarket.p.rapidapi.com/search"
    );
    // "https://transfermarket.p.rapidapi.com/search"
    console.log(response.data)
    return response.data.slice(0, 10);
  }
);

export const fetchParticularTodo = createAsyncThunk(
  "todo-list/fetch-particular-todo",
  async (id: number) => {
    // const response = await fetch(
    //   `https://jsonplaceholder.typicode.com/todos/${id}`
    // ).then((response) => response.json());

    const response = await api.get(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    return response.data;
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodoList: (state, action) => {
      state.todolist = action.payload;
    },
    setParticularTodo: (state, action) => {
      state.particularTodo = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setTodoList } = todoSlice.actions;
export const { setParticularTodo } = todoSlice.actions;
export const getTodoList = (state: RootState) => state.todoList.todolist;
export const getParticularTodo = (state: RootState) =>
  state.todoList.particularTodo;

export default todoSlice.reducer;
