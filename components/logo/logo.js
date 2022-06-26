import styles from "./logo.module.css";
import Link from 'next/link'
import { useRouter } from 'next/router'

const Logo = () => {
    const router = useRouter()

    return <Link href="/">
        <a style={{color: router.pathname === "/" ? "#F2D895" : "#282828"}}
        className={styles.logo}>
            Coffee Discovery
        </a>
    </Link>
}

export default Logo;