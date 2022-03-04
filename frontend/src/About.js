import NavBar from './NavBar';
import InfoContent from "./InfoContent";

export default function About() {
    return (
      <main>
        <NavBar/>
        <InfoContent title='About Us'>
            <p>Our dashboard provides you up-to-date, relevant information concerning your sports interests.</p>
            <p>We currently provide support for the NBA and NHL.</p>
        </InfoContent>
      </main>
    );
}