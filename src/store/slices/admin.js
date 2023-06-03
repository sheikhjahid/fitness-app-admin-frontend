import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/index";

// Define the initial state using that type
const initialState = {
  Clientlist: [],
  adminAuthDetails: {},
};

export const fetchClientList = createAsyncThunk(
  "todo-list/fetch-client-list",
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
export const submitFormOne = createAsyncThunk(
  "todo-list/fetch-client-list",
  async () => {
    const response = await api.post(
      "https://transfermarket.p.rapidapi.com/search"
    );
    console.log(response.data)
  }
);
export const submitFormTwo = createAsyncThunk(
  "todo-list/fetch-client-list",
  async () => {
    const response = await api.post(
      "https://transfermarket.p.rapidapi.com/search"
    );
    console.log(response.data)
  }
);
export const submitFormThree = createAsyncThunk(
  "todo-list/fetch-client-list",
  async () => {
    const response = await api.post(
      "https://transfermarket.p.rapidapi.com/search"
    );
    console.log(response.data)
  }
);


export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setClientList: (state, action) => {
      state.todolist = action.payload;
    },
    setAdminAuthDetails: (state, action) => {
      state.particularTodo = action.payload;
    },
  },
  extraReducers: (builder) => { },
});

export const { setTodoList } = todoSlice.actions;
export const { setParticularTodo } = todoSlice.actions;
export const getClientList = (state) => state.todoList.todolist;
export const getAdminAuthDetails = (state) =>
  state.todoList.particularTodo;

export default todoSlice.reducer;
