import React from 'react';
import './App.css';

function Article(props) {
    return (
        <p>Article about {props.about}</p>
    );
}

export default Article;