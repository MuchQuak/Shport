import './style/Article.css';

export default function Article(props) {
    if (!props || !props.prefs || !props.news) {
        return null;
    }
    
    return (
        <div className='article'>
            <a href={props.news.url} target="_blank">
                <p className='article-title'>{props.news.title}</p>
                <img
                    className='article-img'
                    src={props.news.image}/>
            </a>
            <p className='article-desc'>{props.news.description}</p>
        </div>
    );
}