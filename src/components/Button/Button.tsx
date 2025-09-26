import React, { type JSX } from "react";

import styles from './Button.module.css';


const Button = ({ text, onClickFunction, disabled, buttonRef, ariaLabelInfo }:
    { text: string, onClickFunction?: () => void, disabled?: boolean, buttonRef?: React.RefObject<HTMLButtonElement | null>, ariaLabelInfo?: string }): JSX.Element => {
    return (
        <button
            className={styles.button}
            type="button"
            onClick={onClickFunction}
            disabled={disabled}
            ref={buttonRef}
            aria-label={
                text === 'Add' ? 'A button for adding an task' :
                    text === 'Clear All' ? 'A button for deleting all tasks' :
                        text === 'Done' ? 'A button for marking a completed task' :
                            text === 'Return' ? 'The button to return the task back to the worksheet' :
                                text === 'Delete' ? 'The button to delete an task' :
                                    text === 'Edit' ? 'The button for editing an task' :
                                        text === 'Save' ? 'The button to save the edited task' : ''}>{text}</button>
    )
}

export default Button;