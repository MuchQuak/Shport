import React from 'react';
import CloseButton from "react-bootstrap/CloseButton";

function CloseableItem(props) {
    const [itemVisible, setItemVisible] = React.useState(true);
    const setInvisible = () => {
        setItemVisible(false);
    };
    function title() {
        return props.title ? props.title : 'Untitled Item';
    }
    function logo() {
        return props.logo ? props.logo : null;
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
              {props.children}
            </div>
          </div>
        );
    }
    return null;
}

export default CloseableItem;