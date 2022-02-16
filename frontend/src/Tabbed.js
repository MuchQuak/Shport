import "./style/Tab.css";
import React from 'react';
import Tab from "./Tab";

export default function Tabbed(props) {
    const [currentTab, setCurrentTab] = React.useState(props.default ? props.default : 0);
    if (!props || !props.children || !props.titles) {
        return null;
    }
    const icons = props.icons ? props.icons : [];
    console.log(icons);
    const tabs = props.titles.map((title, index) => {
        const icon = icons[index] != null ? icons[index] : null;
        return (
            <Tab active={currentTab === index} icon={icon} title={title} key={index} click={() => setTab(index)}/>
        );
    })
    let pages;
    try {
        pages = props.children.map((child, index) => {
            return (
                <div className='tab-content' key={index}>
                    {child}
                </div>
            )
        });
    } catch(error) {
        pages = [(
            <div className='tab-content'>
                {props.children}
            </div>
        )]
    }
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