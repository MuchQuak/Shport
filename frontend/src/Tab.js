export default function Tab(props) {
    if (!props || !props.title) {
        return null;
    }
    return (
        <div className='tab'>
            <p className='tab-title'>{props.title}</p>
            {props.children}
        </div>
    );
}