import './GameSchedule.css';
import NBAGame from "./NBAGame";
import Tabbed from "./Tabbed";

export default function Schedule(props) {
    if (!props || !props.prefs || !props.today || !props.yesterday || !props.tomorrow || !props.stats) {
        return null;
    }
    const yesterday_games = props.yesterday.map((game, index) => {
        return (<NBAGame game={game} key={index} stats={props.stats} />);
    });
    const today_games = props.today.map((game, index) => {
        return (<NBAGame game={game} key={index} stats={props.stats} />);
    });
    const tomorrow_games = props.tomorrow.map((game, index) => {
        return (<NBAGame game={game} key={index} stats={props.stats} />);
    });
    return (
        <Tabbed titles={['Yesterday', 'Today', 'Tomorrow']} default={1}>
            <div className='schedule'>{yesterday_games}</div>
            <div className='schedule'>{today_games}</div>
            <div className='schedule'>{tomorrow_games}</div>
        </Tabbed>
    );
}