import './style/Article.css';
import {useEffect, useState} from "react";
import {fetchNews} from "./NewsHandler";
import {getSportsFollowed} from "./PrefHandler";
import Tabbed from "./Tabbed";


export default function Article(props) {
    const [news, setNews] = useState([]);
    useEffect(() => {
        fetchNews().then(result => {
            if (result)
                setNews(result);
        });
    }, [] );
    if (!props || !props.prefs || !props.news) {
        return null;
    }
    
    /*const temp = news.map((article) => 
        <div>{article.url}</div>
    );
    */
    return (
        <div className='article'>
            <a href={props.news.url}>
                <p className='article-title'>{props.news.title}</p>
                <img
                    className='article-img'
                    src={props.news.image}/>
            </a>
            <p className='article-desc'>{props.news.description}</p>
        </div>
    );
}