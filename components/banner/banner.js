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
            <div className={styles.content}>
                <h1 className={styles.title}>IMPROVE THE WAY COFFEE TASTES</h1>
                <p className={styles.subTitle}>Discover The Best Coffee Nearby</p>
                <div className={styles.buttonWrapper}>
                    <Button coffeeStores={coffeeStores} loading={loading} handleOnClick={handleOnClick}/>
                    {coffeeStoresError && <a className={styles.error}>{coffeeStoresError}</a>}
                    {locationErrorMsg === "no access" && <p className={styles.error}>You have to let us access your location, please visit <a href="https://www.lifewire.com/denying-access-to-your-location-4027789" target="_blank">this link</a></p>}
                    {locationErrorMsg === "not supported" && <p className={styles.error}>We are sorry, it seems that your browser is not supporting geolocation.</p>}
                </div>
            </div>
        </div>
    )
}

export default Banner;