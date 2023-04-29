import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom'



export default function Details() {
const [itemsDetails, setItemsDetails] = useState({});

let params = useParams();

// console.log(params);


let getItemDetails= async()=>{
  let {data}= await axios.get(`https://api.themoviedb.org/3/${params.mediaType}/${params.id}?api_key=c636ed7787cc302d96bf88ccf334e0d8&language=en-US`)
  setItemsDetails(data);
  console.log(data);
}


useEffect(() => {
  getItemDetails();
}, []);



  return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Details</title>
               
            </Helmet>
    <div className="row py-3">
      <div className="col-md-3">
      {params.mediaType==='person'?
      <img className='w-100' src={"https://image.tmdb.org/t/p/original" +itemsDetails.profile_path} alt="" />
      :<img className='w-100' src={"https://image.tmdb.org/t/p/original" +itemsDetails.poster_path} alt="" />
      }
      </div>
      <div className="col-md-9 ">
        <h3 className='moviesName'>{itemsDetails.title}{itemsDetails.name}</h3>
        <p className='dark-text pt-3 pb-3'>{itemsDetails.tagline}{itemsDetails.place_of_birth}</p>
        <ul className="list-unstyled d-flex">
                  {itemsDetails?.genres?.map((genre) => (
                    <li className="bg-info me-3 p-1 rounded-1 text-lead">{genre.name}</li>
                  ))}
                </ul>
                {params.mediaType==='person'?
        '':<h3 className='h6 pt-2'>Vote : {itemsDetails.vote_average}</h3>}
        
        {params.mediaType==='person'?
        '':<h3 className='h6 pt-4'>Vote Count : {itemsDetails.vote_count}</h3>}
        
        
        
        <h3 className='h6 pt-4'>popularity : {itemsDetails.popularity}</h3>
        {params.mediaType==='person'?
        '':<h3 className='h6 pt-4'>release date : {itemsDetails.release_date} </h3>}

        <p className='my-4 dark-text'>{itemsDetails.overview}{itemsDetails.biography}</p>
        <a href={itemsDetails.homepage}className='btn btn-danger' >
  Watch Now
</a>
     
      </div>
    </div>
    </>
  )
}
