import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TodoEl {
    id: string;
    task: string;
    completed: boolean;
}

export interface TodoState {
    items: TodoEl[],
    value: string,
}

const initialState: TodoState = {
    items: [],
    value: '',
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setValue(state, action: PayloadAction<string>) {
            state.value = action.payload;
        },
        loadItems(state, action: PayloadAction<TodoEl[]>) {
            state.items = action.payload;
        },
        addItem(state, action: PayloadAction<string>) {
            const newItem = {
                id: Math.random().toString(16).slice(2),
                task: action.payload,
                completed: false,
            }
            state.items = [...state.items, newItem];
            state.value = '';
            localStorage.setItem('todos', JSON.stringify(state.items));
        },
        setCompletedItem(state, action: PayloadAction<string>) {
            state.items = state.items.map((obj) => {
                return obj.id === action.payload ? { ...obj, completed: !obj.completed } : obj;
            })
            localStorage.setItem('todos', JSON.stringify(state.items));
        },
        deleteItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter((obj) => obj.id !== action.payload);
            localStorage.setItem('todos', JSON.stringify(state.items));
        },
        clearItems(state) {
            state.items = [];
            localStorage.setItem('todos', JSON.stringify(state.items));
        },
        saveEdit(state, action: PayloadAction<{ id: string, task: string }>) {
            const { id, task } = action.payload;
            state.items = state.items.map((obj) => {
                return obj.id === id ? { ...obj, task: task } : obj;
            });
            localStorage.setItem('todos', JSON.stringify(state.items));
        },
    }
})

export const { setValue, addItem, setCompletedItem, deleteItem, clearItems, loadItems, saveEdit } = todoSlice.actions

export default todoSlice.reducer