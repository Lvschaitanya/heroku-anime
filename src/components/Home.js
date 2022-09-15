import React, { useEffect, useState } from 'react'
import DisplayPaginate from './DisplayPaginate'
import './Home.css'

const Home = () => {

    const genres =[]
    const [toBeAdded, setToBeAdded] =useState([])
    const [watchlist,setWatchlist] = useState([])

    const [animeList, setanimeList] = useState([])
    const [Reset] = useState(false)
    const [text,setText] = useState('')
    const [selectedGenre, setSelectedGenre] = useState('')
    let [currentPage, setCurrentPage] = useState(1)

    useEffect(()=>{
        const data = localStorage.getItem('watchlist')
        const _watchlist = data ? JSON.parse(data) : []
        setWatchlist(_watchlist)
    },[])

    const list = async () => {
        const data = await fetch ('https://api.jikan.moe/v4/anime')

        const res = data.json()

        return res
    }

    useEffect(()=>{
        const getData = async () =>{
            const data = await list()
            // console.log(data.data)
            const anime = data.data
            setanimeList(anime)
        }

        getData()

        // console.log(animeList)
    },[])

    animeList.forEach(anime=>(
        anime.genres.forEach(genre =>{
            if(!genres.includes(genre.name)){
                genres.push(genre.name)
            }
        })
    ))

    const update = () =>{
        const select = document.getElementById('selector')
        const opt = select.options[select.selectedIndex]
        // console.log(opt.value)
        setSelectedGenre(opt.value)
        if(opt.value===''){
            setCurrentPage(1)
        }
        // selectedGenre = opt.value
        // console.log(selectedGenre)
    }

    const reset = () => {
        const select = document.getElementById('selector')
        select.selectedIndex=0
        setSelectedGenre('')
        // setReset(true)
        setCurrentPage(1)
        setText('')
    }

    const textChange = (e) => {
        setText(e.target.value)
        if(e.target.value===''){
            console.log(1)
            setCurrentPage(1)
        }
    }

    useEffect(()=>{
        if(toBeAdded.length>0){
            document.getElementById('addToWatchlist').removeAttribute('disabled')
        }else{
            // console.log(1)
            document.getElementById('addToWatchlist').setAttribute('disabled','disabled')
        }
        // console.log(toBeAdded.length)
    },[toBeAdded])

    const addToWatchlist = () =>{


        toBeAdded.forEach(anime=>{
            if(!watchlist.includes(anime)){
                const data = localStorage.getItem('watchlist')
                const _watchlist = data ? JSON.parse(data) : []
                // console.log(_watchlist)
                _watchlist.push(anime)
                localStorage.setItem('watchlist',JSON.stringify(_watchlist))
                setWatchlist(_watchlist)
                document.getElementById(anime).checked=false
            }else{
                setToBeAdded(toBeAdded.filter(name=>name!==anime))
                document.getElementById(anime).checked=false
            }
            setToBeAdded([])
            document.getElementById('addToWatchlist').setAttribute('disabled','disabled')
        })
    }

    return(
        <div>
            <div className='buttons'>
                <input className='search' type='text' placeholder='search anime' value={text} onChange={textChange}/>
                <label className='dropdown'>
                    <select id='selector' onChange={update}>
                        <option value=''>Select Genre</option>
                        {genres.map(genre=>(
                            <option key={genre} value={genre}>{genre}</option>
                        ))}
                    </select>
                </label>
                <button className='reset' onClick={reset}>Reset</button>
                <button className='watchlist-button' id='addToWatchlist' onClick={addToWatchlist} >Add to watchlist</button>
            </div>
            <DisplayPaginate text={text} genre={selectedGenre} animeList={animeList} reset={Reset} currentPage={currentPage} setCurrentPage={setCurrentPage} toBeAdded={toBeAdded} setToBeAdded={setToBeAdded} watchlist={watchlist} setWatchlist={setWatchlist} />
        </div>
    )
}

export default Home