import styles from "./button.module.css"
import Loader from "../loader/loader";

const Button = (props) => {
    const {coffeeStores, loading, handleOnClick} = props
    return (
        <button onClick={() => {handleOnClick()}} 
        className={styles.button} 
        disabled={coffeeStores.length > 0}
        >
            {loading && <Loader />}
            {!loading && coffeeStores.length === 0 && "Discover"}
            {coffeeStores.length > 0 && "scroll down.."}        
        </button>
    )
}

export default Button;