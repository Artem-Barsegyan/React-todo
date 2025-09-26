import { type JSX, useState, useRef, useEffect } from "react";
import { useAppDispatch } from "../../redux/store";
import { setCompletedItem, deleteItem, saveEdit } from "../../redux/todoSlice";
import { toast } from "sonner";

import Button from "../Button/Button";

import styles from './TodoItem.module.css';

const TodoItem = ({ id, task, completed }: { id: string, task: string, completed: boolean }): JSX.Element => {
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const editButtonRef = useRef<HTMLButtonElement>(null)
    const [edit, setEdit] = useState(false);

    const handleDelete = () => {
        toast.warning('Delete task?', {
            action: {
                label: 'Delete',
                onClick: () => {
                    dispatch(deleteItem(id));
                    toast.success('Task deleted!', { duration: 1500 });
                }
            },
            cancel: {
                label: 'Cancel',
                onClick: () => { }
            }
        });
    }

    useEffect(() => {
        if (edit) {
            inputRef.current?.focus();
        }
    }, [edit]);

    const editItem = () => {
        setEdit(true);
    }

    const saveEditItem = (id: string) => {
        const newEditValue = inputRef.current?.value?.trim();
        if (newEditValue) {
            setEdit(false);
            dispatch(saveEdit({ id, task: newEditValue }));
            toast.success('The changes are saved!', { duration: 1500 });
        } else {
            toast.warning('The text field cannot be empty!');
            inputRef.current?.focus();
        }
    }

    const handleSaveKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
        if (e.key === 'Enter') {
            saveEditItem(id);
        }
        setTimeout(() => {
            editButtonRef.current?.focus();
        }, 10)
    }

    return (
        <div
            className={styles['todo-item']}
            id={id}>
            {edit ? <input
                id="text"
                type="text"
                ref={inputRef}
                defaultValue={task}
                disabled={!edit}
                onKeyDown={e => handleSaveKeyDown(e, id)}
                aria-label="A text field for editing an task"
            /> : <span
                className={completed ? styles['completed-task'] : styles.task}
                role="text"
                tabIndex={0}
                aria-label={`Task: ${task} Status: ${completed ? 'is completed' : 'has not been completed'}`}>{task}</span>}

            <div className={styles.buttons}>
                <Button
                    text={completed ? 'Return' : 'Done'}
                    onClickFunction={() => dispatch(setCompletedItem(id))} />
                <Button
                    onClickFunction={handleDelete} text={'Delete'} />
                {edit ?
                    <Button
                        text={'Save'}
                        onClickFunction={() => saveEditItem(id)} /> :
                    <Button
                        text={'Edit'}
                        onClickFunction={editItem}
                        disabled={completed ? true : false}
                        buttonRef={editButtonRef} />}
            </div>
        </div>
    )
}

export default TodoItem;