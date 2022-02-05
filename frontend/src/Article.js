import React from 'react';
import './App.css';

function Article(props) {
    return (
        <div className='article'>
            <p className='article-date'>{props.date}</p>
            <p className='article-body'>Article about {props.about}</p>
        </div>
    );
}

export default Article;