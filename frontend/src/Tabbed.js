import React from 'react';

export default function Tabbed(props) {
    const [currentTab, setCurrentTab] = React.useState(0);
    if (!props || !props.children || !props.titles) {
        return null;
    }
    function setTab(index) {
        setCurrentTab(index);
    }
    function titles() {
        return (
            <div className='tabs'>
                {props.titles.map((title, index) => {
                    return (<p className='tab-title' id={index} tabIndex={index} onClick={() => setTab(index)}>{title}</p>);
                })}
            </div>
        )
    }
    return (
        <div className='tab-group'>
            {titles()}
            {props.children[currentTab]}
        </div>
    );
}