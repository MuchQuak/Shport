import "./style/Tab.css";

export default function Tab(props) {
    if (!props || !props.title || !props.click) {
        return null;
    }
    const icon = props.icon ? props.icon : null;
    function className() {
        return 'tab-title noselect ' + (props.active === true ? 'tab-active' : 'tab-inactive');
    }
    return (
        <div className={className()} onClick={props.click}><div className='logo-name-record'>{icon}{props.title}</div></div>
    );
}