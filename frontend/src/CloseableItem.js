import React from 'react';
import CloseButton from "react-bootstrap/CloseButton";

export default function CloseableItem(props) {
    const [itemVisible, setItemVisible] = React.useState(true);
    if (!props) {
        return null;
    }
    if (!props.prefs) {
        props.prefs = [];
    }
    const setInvisible = () => {
        setItemVisible(false);
    };
    function title() {
        return props.title ? props.title : 'Untitled Item';
    }
    function logo() {
        return props.logo ? props.logo : null;
    }
    function children() {
        return props.children ? React.cloneElement(props.children, { prefs: props.prefs }) : null;
    }
    if (itemVisible) {
        return (
          <div className='item'>
            <div className='item-title'>
              <div className='leftSpace'>
                {logo()}
              </div>
              <div className='middleSpace'>
                <p>{title()}</p>
              </div>
              <div className='rightSpace'>
                <CloseButton className='closeButton' variant='white' aria-label='Hide' onClick={setInvisible}/>
              </div>
            </div>
            <div className='item-body'>
                {children()}
            </div>
          </div>
        );
    }
    return null;
}