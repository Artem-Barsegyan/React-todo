import { useEffect, type JSX } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { loadItems } from "../../redux/todoSlice";

import TodoInput from "../TodoInput/TodoInput";
import TodoItem from "../TodoItem/TodoItem";

import '../../reset.css';
import '../../index.css';
import styles from './App.module.css';
import svg from './../../assets/empty-list.jpg';

const App = (): JSX.Element => {
    const items = useAppSelector((state) => state.todoReducer.items);
    const dispatch = useAppDispatch();
    const todoItems = items.length !== 0 ? items.map(({ id, task, completed }) => {
        return (
            <TodoItem
                key={id}
                id={id}
                task={task}
                completed={completed} />
        )
    }) : <div className={styles['no-todos-img']}><img src={svg} alt="no-todos" /></div>

    useEffect(() => {
        const saved = localStorage.getItem('todos');
        if (saved) {
            const savedItems = JSON.parse(saved);
            if (Array.isArray(savedItems)) {
                dispatch(loadItems(savedItems));
            }
        }
    }, [dispatch])

    return (
        <div className="container">
            <div className="container__content">
                <h1>Todo App</h1>
                <TodoInput />
                {todoItems}
            </div>
        </div>
    )
}

export default App;