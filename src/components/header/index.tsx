import styles from "./header.module.css"
import { Link } from "react-router-dom"


export function Header(){
    return(
        <header className={styles.container}>
            <Link to="/" className={styles.logo}>
                <span>DevCripto</span>
            </Link>
        </header>
    )
}