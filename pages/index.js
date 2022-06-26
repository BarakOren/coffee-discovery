import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Banner from '../components/banner/banner'
import Card from '../components/card/card'
import { fetchCoffeeStores } from '../lib/coffee-stores'
import useTrackLocation from '../hooks/use-track-location'
import {useEffect, useState, useContext, useRef, useCallback} from "react";
import { ACTION_TYPES, StoreContext} from '../store/store-context'

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



  useEffect(() => {
    if(textRef.current !== null){
        textRef.current.scrollIntoView({behavior: "smooth"})
    }
  }, [coffeeStores])

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
      
      <Banner coffeeStoresError={coffeeStoresError} locationErrorMsg={locationErrorMsg} coffeeStores={coffeeStores} loading={loading} handleOnClick={handleTrackLocation}/>

      <section>
      {coffeeStores.length > 0 && <h1 ref={textRef} className={styles.nearby}>Best Stores Nearby</h1>}
      <div className={styles.cardsContainer}>
      {coffeeStores.map((store, index) => {
        return(
          <Card 
          key={index}
          index={index}
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
      </section>

    </div>
  )
}
