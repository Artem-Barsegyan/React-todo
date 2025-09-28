import React, { type JSX } from "react";

import styles from './Button.module.css';


const Button = ({ text, onClickFunction, disabled = false, buttonRef, titleMessage }:
    { text: string, onClickFunction?: () => void, disabled?: boolean, buttonRef?: React.RefObject<HTMLButtonElement | null>, titleMessage?: string }): JSX.Element => {
    return (
        <div title={disabled ? titleMessage : ''}>
            <button
                className={styles.button}
                type="button"
                onClick={onClickFunction}
                disabled={disabled}
                ref={buttonRef}
                aria-label={
                    text === 'Add' ? 'A button for adding a task' :
                        text === 'Clear All' ? 'A button for deleting all tasks' :
                            text === 'Done' ? (
                                disabled ? 'The edited task cannot be marked as completed' : 'A button for marking a completed task'
                            ) :
                                text === 'Return' ? 'The button to return the task back to the worksheet' :
                                    text === 'Delete' ? 'The button to delete a task' :
                                        text === 'Edit' ? (
                                            disabled ? 'You cannot edit a completed task' : 'The button for editing a task'
                                        ) :
                                            text === 'Save' ? 'The button to save the edited task' : ''}>{text}</button>
        </div>
    )
}

export default Button;