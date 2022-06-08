import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Banner from '../components/banner/banner'
import Header from '../components/header/header'
import Card from '../components/card/card'
import coffeeStores from "../data/data.json"
import { fetchCoffeeStores } from '../lib/coffee-stores'
import useTrackLocation from '../hooks/use-track-location'
import {useEffect, useState, useContext, useRef, useCallback} from "react";
import { ACTION_TYPES, StoreContext} from '../store/store-context'
import Loader from "../components/loader/loader.js"
import splash from "../public/static/splash2.png"
import Button from "../components/button/button.js"



export async function getStaticProps(context){
  const coffeeStores = await fetchCoffeeStores()

  return {
    props:{
      coffeeStores
    }
  }
}
 
export default function Home(props) {
  const {dispatch, state} = useContext(StoreContext)
  const {coffeeStores, latLong} = state;
  const {handleTrackLocation, isFindingLocation, locationErrorMsg} = useTrackLocation()

  const [coffeeStoresError, setCoffeeStoresError] = useState(null)
  const [loading, setLoading] = useState(false)
  const textRef = useRef(null)

  // const getData = useCallback(async (latLong) => {
  //   if(latLong){
  //   setLoading(true)
  //     try{
  //       const res = await fetch(`/api/getCoffeeStoresByLocation?latLong=${latLong}`)
  //       const coffeeStores = await res.json()
  //       dispatch({
  //         type: ACTION_TYPES.SET_COFFEE_STORES,
  //         payload: {coffeeStores: coffeeStores}
  //       })
  //       setCoffeeStoresError('')
  //       setLoading(false)
  //     } catch (error) {
  //       console.log(error)
  //       setCoffeeStoresError(error.message)
  //       setLoading(false)
  //     }
  //   }
  // }, [dispatch])

  
  
  useEffect(() => {
    const getData = async () => {
      if(latLong){
      setLoading(true)
        try{
          const res = await fetch(`/api/getCoffeeStoresByLocation?latLong=${latLong}`)
          const coffeeStores = await res.json()
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {coffeeStores: coffeeStores}
          })
          setCoffeeStoresError('')
          setLoading(false)
        } catch (error) {
          console.log(error)
          setCoffeeStoresError(error.message)
          setLoading(false)
        }
      }
    }
    getData()
  }, [latLong, dispatch])

  function scroll(){
    // setTimeout(() => {
    //   textRef.current.scrollIntoView({behavior: "smooth"})
    // }, 1000)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Explorer</title>
        <meta
          name="description"
          content="allows you to discover coffee stores"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Banner />

      {locationErrorMsg && <p>{locationErrorMsg}</p>}
      {coffeeStoresError && <p>{coffeeStoresError}</p>}


      <p className={styles.pOne}>Discover the best coffee shops in your area</p>
      <Image src={splash} alt="coffe-splash" width={150} height={150} />
      <p className={styles.pTwo}>Helping coffee lovers since 2003</p>
      <Button 
      handleOnClick={handleTrackLocation}
      scroll={scroll}
      />


      {coffeeStores.length > 0 && <h1 ref={textRef} className={styles.nearby}>Stores Nearby</h1>}
      {loading && <div className={styles.loaderContainer}>
      <Loader />
      </div>
      }

      <div className={styles.cardsContainer}>
      {coffeeStores.map((store, index) => {
        return(
          <Card 
          key={index}
          name={store.name}
          distance={store.distance}
          href={`/coffee-store/${store.id}`}
          address={store.address}
          city={store.region}
          imgUrl={store.imgUrl || 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=8'}
          />
        )
      })}
      </div>

    </div>
  )
}
