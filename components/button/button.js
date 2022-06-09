import styles from "./button.module.css"

const Button = (props) => {
    return (
        <div onClick={() => {props.handleOnClick()}}
        className={styles.button} 
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
            Lets Discover</div>
    )
}

export default Button;