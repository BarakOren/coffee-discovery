import styles from "./banner.module.css"


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
            <div 
            className={styles.button} onClick={props.handleOnClick}
            >
            <div className={styles.drip1}></div>
            <div className={styles.drip2}></div>
            <div className={styles.drip3}></div>
            <div className={styles.drip4}></div>
            <div className={styles.drip5}></div>
            <div className={styles.drip6}></div>
            <div className={styles.drip7}></div>
            <div className={styles.drip8}></div>
            <div className={styles.drip9}></div>
            <div className={styles.drip10}></div>
            View stores nearby >></div>
            </div>
            </div>
        </div>
    )
}

export default Banner;