import { createSlice } from "@reduxjs/toolkit";

const savedTodos = localStorage.getItem("todos");

const initialState =  {
    item: savedTodos ? JSON.parse(savedTodos) : [],
    editing: null
}

export const list = createSlice({
    name: 'list',
    initialState,
    reducers: {
        add: (state, action) => {
            state.item.push(action.payload);
        },
        del : (state, action) => {
            state.item = state.item.filter(todo => todo.uuid !== action.payload)
        },
        setEdit: (state, action) => {
            state.editing = action.payload; 
        },
        update: (state, action) => {
            const { uuid, newText } = action.payload;

            const todo = state.item.find(
                (item) => item.uuid === uuid
            );

            if (todo) {
                todo.toDo = newText;
            }
        },
    }
})

export const {add, del, update, setEdit} = list.actions;
export default list.reducer;