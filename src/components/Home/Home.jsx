
import React from 'react'
import Movies from '../Movies/Movies'
import TvShowes from '../TvShowes/TvShowes'
import People from '../People/People'
import { Helmet } from 'react-helmet';




export default function Home() {

let showItems = 10;
  return (
  <>
  <Helmet>
  <meta charSet="utf-8" />
                <title>Home</title>
             
            </Helmet>
  <Movies showItems={showItems}/>
  <TvShowes showItems={showItems}/>
  <People showItems={showItems}/>
  </>
  )
}

