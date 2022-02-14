import './style/GameSchedule.css';
import NBAGame from "./NBAGame";
import Tabbed from "./Tabbed";

/*  Master List (for supplying ALL options to user)
sports: {
    NBA: {
        "LAL": {..},
        "SAC": {..}
    }
    NHL: {
        "SJS": {..}
    }
}
*/

/*  Per User (supplied to each React component)
preferences: {
  sports: {
      following: false,
      NBA: {
          following: true,
          teams: ["LAL"]
      },
      NHL: {
          following: false
          teams: ["SJS"]
      },
   }
}
*/

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
    const leaguesFollowed = ['NBA'];
    return (
        <Tabbed titles={leaguesFollowed} default={0}>
            <Tabbed titles={['Yesterday', 'Today', 'Tomorrow']} default={1}>
                <div className='schedule'>{games(props.yesterday)}</div>
                <div className='schedule'>{games(props.today)}</div>
                <div className='schedule'>{games(props.tomorrow)}</div>
            </Tabbed>
            <Tabbed titles={['Yesterday', 'Today', 'Tomorrow']} default={1}>
                <div className='schedule'>{games(props.yesterday)}</div>
                <div className='schedule'>{games(props.today)}</div>
                <div className='schedule'>{games(props.tomorrow)}</div>
            </Tabbed>
        </Tabbed>
    );
}