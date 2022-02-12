export default function Tab(props) {
    if (!props || !props.title || !props.click) {
        return null;
    }
    function className() {
        return 'tab-title' + (props.active === true ? ' tab-active' : ' tab-inactive');
    }
    return (
        <p className={className()} onClick={props.click}>{props.title}</p>
    );
}