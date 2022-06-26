import React from "react";
import styles from "./header.module.css"
import styled from "styled-components";
import {CoffeeTogo} from "@styled-icons/boxicons-regular/CoffeeTogo"
import Link from "next/link"

const CofffeIcon = styled(CoffeeTogo)`
    width: 30px;
    height: 30px;
    color: white;
`

const Header = () => {
    return(
        <header className={styles.container}>
                <Link href="/"><a className={styles.link}>Home</a></Link>
                <p className={styles.link}>About</p>
        </header>
    )
}

export default Header;