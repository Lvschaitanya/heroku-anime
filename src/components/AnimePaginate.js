import React, { useEffect } from 'react'
import './AnimePaginate.css'

const AnimePaginate = ({anime, watchlist, setWatchlist, inWatchlist,toBeAdded, setToBeAdded}) => {

  useEffect(()=>{
    if(watchlist.includes(anime.title)){
      document.getElementById(anime.title).setAttribute('disabled', 'disabled')
    }else{
      document.getElementById(anime.title).removeAttribute('disabled')
    }
  },[anime,watchlist])

  const click = () => {
    if(!inWatchlist){
      const _watchlist = [...watchlist]
      _watchlist.push(anime.title)
      localStorage.setItem('watchlist',JSON.stringify(_watchlist))
      setWatchlist(_watchlist)
    }else{
      const filteredWatchList =watchlist.filter(animeTitle=>animeTitle!==anime.title)
      setWatchlist(filteredWatchList)
      localStorage.setItem('watchlist', JSON.stringify(filteredWatchList))
    }
  }

  // const toBeAdded = []



  const checkboxChange = () => {
    const checkbox_id = document.getElementById(anime.title)
    if(checkbox_id.checked){
      setToBeAdded(toBeAdded=>[...toBeAdded , anime.title])
    }else{
      setToBeAdded(toBeAdded.filter(name=>name!==anime.title))
    }
  }

  return (

        <div className={!inWatchlist ? 'anime' : 'added anime'}>
            <p className='title'>{anime.title}</p>
            <a href={anime.url} target="_blank"  rel="noreferrer">
              <img className='image' src={anime.images.jpg.image_url} alt='' />
            </a>
            <p className='rating'>⭐ {anime.score}</p>
            <button className='btn' onClick={click} id='add'>{inWatchlist?'Remove from List':'Add to List'}</button>
            <input id={anime.title} className='check-box' type='checkbox' onChange={checkboxChange}/>
        </div>

  )
}

export default AnimePaginate