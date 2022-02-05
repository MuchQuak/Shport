import React from 'react';
import './App.css';
import CloseButton from "react-bootstrap/CloseButton";

function CloseableItem(props) {
    const [itemVisible, setItemVisible] = React.useState(true);
    const setInvisible = () => {
        setItemVisible(false);
    };
    function title() {
        if (props.title) {
            return props.title
        }
        return 'Untitled Item'
    }
    if (itemVisible) {
        return (
            <div className='item'>
                <div className='item-title'>
                    <div className='leftSpace'/>
                    <div className='middleSpace'>
                        <p>{title()}</p>
                    </div>
                    <div className='rightSpace'>
                        <CloseButton className='closeButton' variant='white' aria-label='Hide' onClick={setInvisible}/>
                    </div>
                </div>
                <div className='item-body'>
                    {props.children}
                </div>
            </div>
        );
    }
    return null;
}

export default CloseableItem;