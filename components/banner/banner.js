import styles from "./banner.module.css"
import Header from "../header/header"
import Button from "../button/button"

const Banner = (props) => {
    const {coffeeStores,locationErrorMsg, loading, handleOnClick, coffeeStoresError} = props
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
                <Button coffeeStores={coffeeStores} loading={loading} handleOnClick={handleOnClick}/>
                {coffeeStoresError && <p className={styles.error}>{coffeeStoresError}</p>}
                {locationErrorMsg && <p className={styles.error}>{locationErrorMsg}</p>}
            </div>
            </div>
        </div>
    )
}

export default Banner;