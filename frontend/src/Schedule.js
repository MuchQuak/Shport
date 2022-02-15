import './style/GameSchedule.css';
import NBAGame from "./NBAGame";
import Tabbed from "./Tabbed";
import {all_prefs, getSportsFollowed} from "./PrefHandler";

export default function Schedule(props) {
    if (!props || !props.prefs || !props.today || !props.yesterday || !props.tomorrow || !props.stats) {
        return null;
    }
    const noGames = (
        <p className='game-empty nomargin'>No Games</p>
    );
    function games(day) {
        if (day.length < 1) {
            return noGames;
        }
        return day.map((game, index) => {
            return (<NBAGame game={game} key={index} stats={props.stats} />);
        });
    }
    const leaguesFollowed = getSportsFollowed(all_prefs); // should be replaced with user's prefs when those are fixed...
    // const teamsFollowed = getTeamsFollowedForSport(all_prefs, 'NBA'); // This check will go inside individual game code instead...
    // Code below is not dynamic yet, but leaguesFollowed will need to be map()ed to provide each page.
    return (
        <Tabbed titles={leaguesFollowed} default={0}>
            <Tabbed titles={['Yesterday', 'Today', 'Tomorrow']} default={1}>
                <div className='schedule'>{games(props.yesterday)}</div>
                <div className='schedule'>{games(props.today)}</div>
                <div className='schedule'>{games(props.tomorrow)}</div>
            </Tabbed>
            <p className='nomargin'>NFL</p>
            <p className='nomargin'>NHL</p>
            <p className='nomargin'>MLB</p>
        </Tabbed>
    );
}