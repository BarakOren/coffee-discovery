import styles from "./banner.module.css"
import Header from "../header/header"
import Button from "../button/button"

const Banner = (props) => {

    return(
        <div className={styles.container}>
            <div className={styles.circle}>
                <Header />
            </div>
            <div className={styles.content} >
            <h1 className={styles.title}>
                IMPROVE THE WAY COFFEE TASTES
            </h1>
            <p className={styles.subTitle}>Discover The Best Coffee Nearby</p>
            <div className={styles.buttonWrapper}>
                <Button coffeeStores={props.coffeeStores} loading={props.loading} handleOnClick={props.handleOnClick}/>
            </div>
            </div>
        </div>
    )
}

export default Banner;