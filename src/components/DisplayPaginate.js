import React, { useState } from 'react'
import AnimePaginate from './AnimePaginate'
import Pagination from './Pagination'
import './Display.css'

const DisplayPaginate = ({text,genre,animeList,currentPage,setCurrentPage, toBeAdded,setToBeAdded, watchlist, setWatchlist}) => {
    const [animePerPage] = useState(5)

    const searchTerm = text.toLowerCase()

    const genrecheck = (genres,k=0) =>{

        genres.map(value=>{
            if(value.name===genre){
                return k=1
            }
            return k
        })
        return k
    }

    const paginate = (number) => setCurrentPage(number)



    if(!text && !genre){

        const lastAnimeIndex = currentPage*animePerPage
        const firstAnimeIndex = lastAnimeIndex -animePerPage
        const currentAnimes = animeList.slice(firstAnimeIndex, lastAnimeIndex)
        const totalAnime =animeList.length
        const pageNumbers =[]
    
        for(let i=1 ; i<=Math.ceil(totalAnime/animePerPage) ; i++){
            pageNumbers.push(i)
        }
        return (
            <div>
                <div className='display'>
                    {
                        currentAnimes.map(anime =>(
                            <>
                            <AnimePaginate key={anime.mal_id} anime={anime} watchlist={watchlist} setWatchlist={setWatchlist} inWatchlist={watchlist.includes(anime.title)} toBeAdded={toBeAdded} setToBeAdded={setToBeAdded} />
                            </>
                        ))
                        
                    }
                    
                </div>
                <Pagination animePerPage={animePerPage} totalAnime={totalAnime} paginate={paginate}/>

            </div>
        )
    }else if(text && !genre){

        const lastAnimeIndex = currentPage*animePerPage
        const firstAnimeIndex = lastAnimeIndex -animePerPage

        const updatedAnimes = animeList.filter(value=>value.title.toLowerCase().includes(searchTerm))

        const currentAnimes = updatedAnimes.slice(firstAnimeIndex,lastAnimeIndex)
        const totalAnime = updatedAnimes.length
        const pageNumbers =[]
    
        for(let i=1 ; i<=Math.ceil(totalAnime/animePerPage) ; i++){
            pageNumbers.push(i)
        }
        return (
            <div>
                <div className='display'>
                    {
                        currentAnimes.map(anime =>(
                            <AnimePaginate key={anime.mal_id} anime={anime} watchlist={watchlist} setWatchlist={setWatchlist} inWatchlist={watchlist.includes(anime.title)} toBeAdded={toBeAdded} setToBeAdded={setToBeAdded} />
                        ))
                        
                    }
                    
                </div>
                <Pagination animePerPage={animePerPage} totalAnime={totalAnime} paginate={paginate}/>

            </div>
        )
    }else if(!text && genre) {

        const lastAnimeIndex = currentPage*animePerPage
        const firstAnimeIndex = lastAnimeIndex -animePerPage

        const updatedAnimes = animeList.filter(anime=>(genrecheck(anime.genres) && anime))

        const currentAnimes = updatedAnimes.slice(firstAnimeIndex,lastAnimeIndex)
        const totalAnime = updatedAnimes.length
        const pageNumbers =[]
    
        for(let i=1 ; i<=Math.ceil(totalAnime/animePerPage) ; i++){
            pageNumbers.push(i)
        }
        return (
            <div>
                <div className='display'>
                    {
                        currentAnimes.map(anime =>(
                            <AnimePaginate key={anime.mal_id} anime={anime} watchlist={watchlist} setWatchlist={setWatchlist} inWatchlist={watchlist.includes(anime.title)} toBeAdded={toBeAdded} setToBeAdded={setToBeAdded}/>
                        ))
                        
                    }
                    
                </div>
                <Pagination animePerPage={animePerPage} totalAnime={totalAnime} paginate={paginate}/>

            </div>
        )
    }else{

        const lastAnimeIndex = currentPage*animePerPage
        const firstAnimeIndex = lastAnimeIndex -animePerPage

        const updatedAnimes = animeList.filter(anime=>(genrecheck(anime.genres) && anime)).filter(value=>value.title.toLowerCase().includes(searchTerm))

        const currentAnimes = updatedAnimes.slice(firstAnimeIndex,lastAnimeIndex)
        const totalAnime = updatedAnimes.length
        const pageNumbers =[]
    
        for(let i=1 ; i<=Math.ceil(totalAnime/animePerPage) ; i++){
            pageNumbers.push(i)
        }
        return (
            <div>
                <div className='display'>
                    {
                        currentAnimes.map(anime =>(
                            <AnimePaginate key={anime.mal_id} anime={anime} watchlist={watchlist} setWatchlist={setWatchlist} inWatchlist={watchlist.includes(anime.title)} toBeAdded={toBeAdded} setToBeAdded={setToBeAdded}/>
                        ))
                        
                    }
                    
                </div>
                <Pagination animePerPage={animePerPage} totalAnime={totalAnime} paginate={paginate}/>

            </div>
        )
    }
}

export default DisplayPaginate