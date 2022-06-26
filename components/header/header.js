import React from "react";
import styles from "./header.module.css"
import Link from "next/link"

const Header = () => {
    return(
        <header className={styles.container}>
                <Link href="/"><a className={styles.link}>Home</a></Link>
                <p className={styles.link}>About</p>
        </header>
    )
}

export default Header;