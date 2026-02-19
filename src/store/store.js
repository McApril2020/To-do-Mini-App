import { configureStore } from "@reduxjs/toolkit";
import list from '../feature/todos';

export const data = configureStore({
    reducer: {
        list: list
    }
});

data.subscribe(() => {
    const state = data.getState();
    localStorage.setItem(
        "todos",
        JSON.stringify(state.list.item)
    );
});