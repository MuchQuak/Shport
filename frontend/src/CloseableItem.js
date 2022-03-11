import "./style/Item.scss";
import React, {useState} from 'react';
import CloseButton from "react-bootstrap/CloseButton";

export default function CloseableItem(props) {
    const [itemVisible, setItemVisible] = useState(true);
    if (!props) {
        return null;
    }
    let prefs = [];
    if (props.prefs) {
        prefs = props.prefs;
    }
    let sports = [];
    if (props.sports) {
        sports = props.sports;
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
        return props.children ? React.cloneElement(props.children, { prefs: prefs, sports: sports }) : null;
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