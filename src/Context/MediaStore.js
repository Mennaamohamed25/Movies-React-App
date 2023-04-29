import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let MediaContext = createContext(null);

export default function MediaContextProvider (props){
    const [trendingMove, setTrendingMove] = useState([]);
    const [trendingTvs, setTrendingTvs] = useState([]);
    const [trendingPeople, setTrendingPeople] = useState([]);

    let getTrendingItems =async(mediaType,callback)  =>{
        let {data}=await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=c636ed7787cc302d96bf88ccf334e0d8`);
        callback(data.results);
      };
      useEffect(() => {
        getTrendingItems('movie',setTrendingMove);
        getTrendingItems('tv',setTrendingTvs);
        getTrendingItems('person',setTrendingPeople);
      }, []);
    
    return <MediaContext.Provider value={{trendingMove,trendingTvs,trendingPeople}}>
    {props.children}
    </MediaContext.Provider>
};

