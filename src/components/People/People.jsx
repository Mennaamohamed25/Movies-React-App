
import React, { useContext } from 'react'
 import styles from '../Movies/Movies.module.scss'
import { Link } from "react-router-dom";
import { MediaContext } from "../../Context/MediaStore";
import { Helmet } from 'react-helmet';

export default function People({showItems}) {
 
  let {trendingPeople} = useContext(MediaContext)
  return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>People</title>
             
            </Helmet>
        <div className="row gy-3 py-2">
      <div className="col-md-4">
<div className="welcome pt-5">
  <div className={`w-25 mb-3 ${styles.line}`}></div>
  <h3>Trending</h3>
  <h3>People</h3>
  <h3>to watch now</h3>
  <div className={styles.watched}>
    Most watched People by week
  </div>
  <div className={`w-100 mt-3 ${styles.line}`}></div>
</div>
      </div>
      {trendingPeople.slice(0,showItems).map((item,index)=>(
<div key={index} className="col-md-2">
<Link className='nav-link' to={`/details/${item.id}/${item.media_type}`}>
<div className="item position-relative">
  <img className='w-100' src={"https://image.tmdb.org/t/p/original" + item.profile_path} alt={item.name} />
  <h2 className='h6 mt-2'>{item.name}</h2>
  
</div>
</Link>
</div>
      ))}
    </div>
    </>
  )
}
