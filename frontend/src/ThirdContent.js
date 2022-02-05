import React from 'react';
import './App.css';

function ThirdContent(props) {
    return (
        <div className='third'>
            <div className='items'>
                {props.children}
            </div>
        </div>
    );
}

export default ThirdContent;