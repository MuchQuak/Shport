import NavBar from './NavBar';
import { Link } from "react-router-dom";

export default function ProjectTeam() {
    return (
      <main>
          <NavBar/>
          | {" "} <Link to="/">Home</Link>
            <h2>Our Team</h2>
            <p></p>
      </main>
    );
  }