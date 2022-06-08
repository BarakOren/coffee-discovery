import { useRouter } from "next/router";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/store-context"
import { isEmpty } from "../../utils";
import useSWR from "swr";
import styles from "./id.module.css";
import styled from "styled-components"
import {StarFill} from "@styled-icons/bootstrap/StarFill"
import {Title} from "@styled-icons/material-rounded/Title"
import Loader from "../../components/loader/loader.js"
import {Location} from "@styled-icons/entypo/Location"


const TitleIcon = styled(Title)`
  color: var(--text-darker-brown);
  width: 3vw;
  margin-right: 10px;
`

const LocationIcon = styled(Location)`
  color: var(--text-darker-brown);
  width: 3vw;
  margin-right: 10px;
`

const Star = styled(StarFill)`
  color: var(--text-darker-brown);
  width: 3vw;
  margin-right: 10px;
`

export async function getStaticProps(staticProps){
    const params = staticProps.params;
    const coffeeStores = await fetchCoffeeStores()
    const findCoffeeStoreById = coffeeStores.find((store) => store.id.toString() === params.id)
    return {
        props: {
          coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
          }
        }
  }

export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStores();
    const paths = coffeeStores.map((coffeeStore) => {
      return {
        params: {
          id: coffeeStore.id.toString(),
        },
      };
    });
    return {
      paths,
      fallback: true,
    };
  }
  
const CoffeeStore = (initialProps) => {
    const router = useRouter()

    const id = router.query.id;
    

    const {state: {
      coffeeStores
    }} = useContext(StoreContext);
    
    const handleCreateCoffeeStore = async (coffeeStore) => {
      try {
        const {id, name, voting, imgUrl, address} = coffeeStore;
        const response = await fetch("/api/createCoffeeStore", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: id.fsq_id, 
            name, 
            voting: 0, 
            imgUrl, 
            address: address || ""
          })
        })
        const dbCoffeeStore = await response.json()

      } catch (error) {
        res.json({message: "wtf.", err})
      }
    }

    const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore || {})

    useEffect(() => {
      if(initialProps.coffeeStore){
        if(isEmpty(initialProps.coffeeStore)){
          if(coffeeStores.length > 0){
            const coffeeStoreFromContext = coffeeStores.find((store) => {return store.id.fsq_id === id})
            if(coffeeStoreFromContext){
              setCoffeeStore(coffeeStoreFromContext)
              handleCreateCoffeeStore(coffeeStoreFromContext)
            }
        }
        } else {
          //SSG
          handleCreateCoffeeStore(initialProps.coffeeStore)
        }
      }
      
    }, [id, initialProps, initialProps.coffeeStore, coffeeStores])



    const [votingCount, setVotingCount] = useState(0)
    const [voted, setVoted] = useState(false)

    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher)

    useEffect(() => {
      if(data && data.length > 0){
        setCoffeeStore(data[0])
        setVotingCount(data[0].voting)
      }     
    }, [data])

    const handleUpVoteButton = async () => {
      try {
        const response = await fetch("/api/favouriteCoffeeStoreById", {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: id, 
            voting: 0, 
          })
        })
        const dbCoffeeStore = await response.json()
        if(dbCoffeeStore && dbCoffeeStore.length > 0){
          setVotingCount(votingCount + 1)
          setVoted(true)
        }
      } catch (error) {
        res.json({message: "Error upvoting the coffee store.", err})
      }
    }


    const {
      address = "",
      name = "",
      imgUrl = "",
    } = coffeeStore;

    if(error) {
      return <div>something went wrong~!@!@$</div>
    }

    return (
        <div className={styles.container}>
          {name === "" && <Loader />}
          {name !== "" &&
          <div className={styles.content}>
            <div className={styles.image} style={{backgroundImage: `url(${imgUrl})`}} alt="coffee-shop-image" />
              
              <div className={styles.details}>
              <div className={styles.row}>
              <TitleIcon />
              <h1 className={styles.title}>{name}</h1>
              </div>
              {address && address.length > 0 && <div className={styles.row}>
              <LocationIcon />
              <p className={styles.text}>{address}</p></div>}

              <div className={styles.row}>
                <Star />
                <p className={styles.text}>{votingCount}</p>
              <button disabled={voted} className={styles.button} onClick={handleUpVoteButton}>upvote</button>

              </div>

            </div>
            </div>
          }

        </div>
    )
}

export default CoffeeStore;