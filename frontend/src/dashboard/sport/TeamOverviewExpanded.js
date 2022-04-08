export function TeamOverviewExpanded(props) {
    if (!props || !props.team) {
        return <p className='nomargin'>No team information</p>;
    }
    const team = props.team;
    return <p>Expanded team information.</p>
}