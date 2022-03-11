import NavBar from './NavBar';
import InfoContent from "./InfoContent";

export function GithubUser(props) {
    const username = () => {
        return props.username ? props.username : "undefined";
    }
    const name = () => {
        return props.name ? props.name : "Team Member";
    }
    const link = () => {
        return "https://github.com/" + username();
    }
    return <a href={link()} style={{textDecoration: "none"}}><div className='team-member'><img src={link() + ".png"}  alt='GitHub picture'/><p>{name()}</p></div></a>
}

export default function About() {
    return (
      <main>
        <NavBar/>
        <InfoContent title='About Us'>
            <p>Our dashboard provides you up-to-date, relevant information concerning your sports interests.</p>
            <p>We currently provide support for the NBA and NHL.</p>
            <br />
            <p style={{fontWeight: "bold", textDecoration: "underline"}}>The Team</p>
            <GithubUser username='HRen5577' name='Humberto Rendon' />
            <GithubUser username='bradleyhewitt' name='Bradley Hewitt' />
            <GithubUser username='MuchQuak' name='Logan Wilt' />
            <GithubUser username='rtblast70' name='Ryan Tsai' />
        </InfoContent>
      </main>
    );
}