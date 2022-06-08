import React from "react";
import Link from "next/link"
import Image from "next/image"
import styles from "./card.module.css"

const Card = (props) => {
    const {name, href, imgUrl, address} = props
    return (
        <Link href={href}>
            <a className={styles.container} style={{backgroundImage: `url(${imgUrl})`}}>
            {/* <Image className={styles.image} src={imgUrl} width={500} height={300} /> */}
            <div className={styles.details} >
            <h1 className={styles.name}>{name}</h1>
            <p className={styles.address}>{address}</p>
            </div>
            </a>
        </Link>
    )
}

export default Card;