import "./style/Tab.css";
import React from 'react';
import Tab from "./Tab";

export default function Tabbed(props) {
    const [currentTab, setCurrentTab] = React.useState(props.default ? props.default : 0);
    if (!props || !props.children || !props.titles) {
        return null;
    }
    // const icons = props.icons ? props.icons : [];
    const tabs = props.titles.map((title, index) => {
        return (
            <Tab active={currentTab === index} title={title} key={index} click={() => setTab(index)}/>
        );
    })
    const pages = props.children.map((child, index) => {
        return (
            <div className='tab-content' key={index}>
                {child}
            </div>
        )
    });
    function setTab(index) {
        setCurrentTab(index);
    }
    return (
        <div className='tab-group'>
            <div className='tabs'>
                {tabs}
            </div>
            {pages[currentTab]}
        </div>
    );
}