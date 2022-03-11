import {getLeagueLogo} from "./SportHandler";
import './style/Selector.scss';

export default function LeagueOption(props){
    if (!props || !props.league || !props.click) {
        return null;
    }
    const icon = getLeagueLogo(props.league);
    const className = () => {
        if (props.disabled === true) {
            return ' league-option-inactive';
        } else if (props.active === true) {
            return ' league-option-active'
        }
        return ''
    }
    return (
        <div className={'league-option noselect' + className()} onClick={props.click}>
            <div className='logo-name-record'>
                {icon}{props.league}
            </div>
        </div>
    );
}