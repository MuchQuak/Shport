export default function Tabbed(props) {
    if (!props || !props.children) {
        return null;
    }
    return (
        <div className='tabgroup'>
            {props.children}
        </div>
    );
}