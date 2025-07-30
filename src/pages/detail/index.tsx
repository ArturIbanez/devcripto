import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import  type { CoinProps } from "../home";
import styles from "./detail.module.css"
import.meta.env

interface ResponseData{
  data: CoinProps;
}

interface ErrorData{
  error: string;
}

type DataProps = ResponseData | ErrorData

export function Detail() {

  const { cripto } = useParams()
  const navigate = useNavigate()

  const [coin, setCoin] = useState<CoinProps>()
  const [loading, setLoading] = useState(true)

  const API_KEY = import.meta.env.VITE_COINCAP_API_KEY

  useEffect( () => {
    async function getCoin(){
      try{
        fetch(`https://rest.coincap.io/v3/assets/${cripto}?apiKey=${API_KEY}`)
        .then(response => response.json()) 
        .then((data: DataProps) => {
  
          if("error" in data){
            navigate("/")
            return
          }

          const price = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
          })

          const priceCompact = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            notation: "compact"
          })

          const resultData = {
            ...data.data,
            formatedPrice: price.format(Number(data.data.priceUsd)),
            formatedMarket: priceCompact.format(Number(data.data.marketCapUsd)),
            formatedVolume: priceCompact.format(Number(data.data.volumeUsd24Hr))
          }

          setCoin(resultData)
          setLoading(false)
        })

      }catch(error){
        console.log(error)
        navigate("/")
      }
    }

    getCoin()
  }, [cripto])

  if(loading || !coin){
    return(
      <div>
        <h1>Página carregando...</h1>
      </div>
    )
  }else{
    return(
      <div className={styles.container}>
        <h1 className={styles.center}>{coin?.name}</h1>
        <h1 className={styles.center}>{coin?.symbol}</h1>
      
        <section className={styles.content}>
          <img src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLowerCase()}@2x.png`} alt="Logo Cripto" className={styles.logo}/>

          <h1>{coin?.name} | {coin?.symbol}</h1>
        
          <p><strong>Preço: {coin?.formatedPrice}</strong></p>

          <a>
            <strong>Mercado: </strong>{coin?.formatedMarket}
          </a>

          <a>
            <strong>Volume: </strong>{coin?.formatedVolume}
          </a>

          <a>
            <strong>Mudança 24h: </strong><span className={Number(coin?.changePercent24Hr) > 0 ? styles.profit : styles.loss}>{Number(coin?.changePercent24Hr).toFixed(3)}</span>
          </a>

        </section>

      </div>
    )
  }
  
}
