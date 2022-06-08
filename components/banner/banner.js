import styles from "./banner.module.css"
import Button from "../button/button.js"

const Banner = (props) => {

    return(
        <div className={styles.container}>
            {/* <div className={styles.fade}/> */}
            <div className={styles.content}>
            <h1 className={styles.title}>
                <span className={styles.title1}>Coffee </span>
                <span className={styles.title2}>Discovery</span>
            </h1>
            <p className={styles.subTitle}>Discover your local coffee shops</p>
            <div className={styles.buttonWrapper}>
            {/* <Button handleOnClick={props.handleOnClick}/> */}
            </div>
            </div>
        </div>
    )
}

export default Banner;