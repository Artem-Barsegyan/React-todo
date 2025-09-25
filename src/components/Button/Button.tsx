import type { JSX } from "react"

import styles from './Button.module.css';

const Button = ({ text, onClickFunction, disabled }: { text: string, onClickFunction?: () => void, disabled?: boolean }): JSX.Element => {
    return (
        <button
            className={styles.button}
            type="button"
            onClick={onClickFunction}
            disabled={disabled}>{text}</button>
    )
}

export default Button;