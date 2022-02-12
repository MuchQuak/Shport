import './GameSchedule.css';
import NBAGame from "./NBAGame";

export default function Schedule(props) {
    if (!props || !props.games || !props.prefs) {
        return null;
    }
    const games = props.games.map((game, index) => {
        return (<NBAGame game={game} key={index} />);
    });
    return (
        <div className='schedule'>{games}</div>
    );
}