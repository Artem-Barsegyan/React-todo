import React, { type JSX, useRef, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setValue, addItem, clearItems } from "../../redux/todoSlice";
import { toast } from "sonner";
import { debounce } from "lodash";

import Button from "../Button/Button";

import styles from './TodoInput.module.css';

const TodoInput = (): JSX.Element => {
    const value = useAppSelector((state) => state.todoReducer.value);
    const items = useAppSelector((state) => state.todoReducer.items);
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState('');

    const clearInput = () => {
        setInputValue('');
        inputRef.current?.focus();
    }

    const debounceValue = useCallback(
        debounce((str: string) => {
            dispatch(setValue(str));
        }, 500),
        []
    )

    const changeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event) {
            const { value } = event.target;
            setInputValue(value);
            debounceValue(value);
        }
    }

    const handleAdd = () => {
        if (value) {
            dispatch(addItem(value));
            setInputValue('');
            inputRef.current?.focus();
        } else {
            toast.warning('The text field cannot be empty!');
            inputRef.current?.focus();
        }
    }

    const handleAllDelete = () => {
        if (items.length !== 0) {
            toast.warning('Delete all tasks?', {
                action: {
                    label: 'Delete',
                    onClick: () => {
                        dispatch(clearItems());
                        toast.success('All tasks deleted!', { duration: 1500 })
                    }
                },
                cancel: {
                    label: 'Cancel',
                    onClick: () => { }
                }
            });
        }
    }

    const handleAddKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    }

    const handleClearKeyAddDown = (e: React.KeyboardEvent<HTMLOrSVGElement>) => {
        if (e.key === 'Enter') {
            setInputValue('');
            inputRef.current?.focus();
        }
    }

    return (
        <div className={styles['todo-input']}>
            <input
                ref={inputRef}
                type="text"
                name="text"
                placeholder="Add a new task..."
                value={inputValue}
                onChange={changeInputValue}
                onKeyDown={handleAddKeyDown}
                aria-label="A text field for entering a task" />
            {inputValue && <svg
                className={styles['clear-icon']}
                onClick={clearInput}
                onKeyDown={handleClearKeyAddDown}
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{
                    cursor: 'pointer',
                    minWidth: '32px',
                    minHeight: '32px'
                }}
                xmlns="http://www.w3.org/2000/svg"
                role="button"
                tabIndex={0}
                aria-label="The button for deleting text"
            >
                <path d="M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z" />
            </svg>}
            <div className={styles['input-buttons']}>
                <Button
                    text="Add"
                    onClickFunction={handleAdd} />
                <Button
                    text="Clear all"
                    onClickFunction={handleAllDelete} />
            </div>
        </div>
    )
}

export default TodoInput;