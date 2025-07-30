import styles from "./home.module.css"
import { Link, useNavigate } from "react-router-dom"
import { FaSearch } from "react-icons/fa";
import { useState, FormEvent, useEffect } from "react";
import.meta.env

export interface CoinProps{
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  vwap24Hr: string;
  changePercent24Hr: string;
  rank: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  explorer: string;
  formatedPrice?: string;
  formatedMarket?: string;
  formatedVolume?: string;
}

interface DataProp{
  data: CoinProps[]
}


export function Home(){
  const [input, setInput] = useState("")
  const [coin, setCoins] = useState<CoinProps[]>([])
  const [offset, setOffset] = useState(0)

  const API_KEY = import.meta.env.VITE_COINCAP_API_KEY

  useEffect(()=> {
    getData()
  }, [offset])

  async function getData(){
    fetch(`https://rest.coincap.io/v3/assets?limit=10&offset=${offset}&apiKey=${API_KEY}`)
    .then(response => response.json())
    .then( (data: DataProp) => {
      const coinsData = data.data

      console.log(coinsData)
      
      const price = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      })

      const priceCompact = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact"

      })

      const formatedResult = coinsData.map( (item)=> {
        const formated = {
          ...item,
          formatedPrice: price.format(Number(item.priceUsd)),
          formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
          formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr))
        }
        return formated
      })

      const listCoins = [...coin, ...formatedResult]

      setCoins(listCoins)
    })
  }

  const navigate = useNavigate()

    function handleSubmit(e:FormEvent){
      e.preventDefault()

      if(input === "") return

      navigate(`/detail/${input}`)
    }

    function handleGetMore(){
      if(offset === 0){
        setOffset(10)
        return;
      }

      setOffset(offset + 10)
    }

    return(
        <main className={styles.container}>
          <form className={styles.forms} onSubmit={handleSubmit}>

            <input type="text" placeholder="Digite o nome da moeda... (ex: bitcoin)" required value={input} onChange={ (e)=> setInput(e.target.value)}/>
            <button type="submit" disabled={input.trim() === ""}>
              <FaSearch size={30} color="#fff"/>
            </button>
          </form>


          <table>
            <thead>
              <tr>
                <th scope="col">Moeda</th>
                <th scope="col">Valor mercado</th>
                <th scope="col">Preço</th>
                <th scope="col">Volume</th>
                <th scope="col">Mudança 24h</th>
              </tr>
            </thead>

            <tbody id="tbody">

            {coin.length > 0 && coin.map( (item) => (
              <tr className={styles.tr} key={item.id}>
                
                <td className={styles.tdLabel} data-label="Moeda">
                  <div className={styles.name}>
                    <img src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`} alt="Logo Cripto" className={styles.logo}/>
                    <Link to={`/detail/${item.id}`}>
                      <span>{item.name}</span> | {item.symbol}
                    </Link>
                  </div>
                </td>
                
                <td className={styles.tdLabel} data-label="Valor mercado">
                  {item.formatedMarket}
                </td>

                <td className={styles.tdLabel} data-label="Preço">
                  {item.formatedPrice}
                </td>

                <td className={styles.tdLabel} data-label="Volume">
                  {item.formatedVolume}
                </td>

                <td className={Number(item.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss} data-label="Mudança 24h">
                  <span>{Number(item.changePercent24Hr).toFixed(3)}</span>
                </td>

              </tr>  
            ))}

            </tbody>
          </table>

          <button className={styles.buttonMore} onClick={handleGetMore}>Carregar mais</button>

        </main>
    )
}