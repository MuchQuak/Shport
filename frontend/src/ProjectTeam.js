import NavBar from './NavBar';
import InfoContent from "./InfoContent";

export default function ProjectTeam() {
    return (
      <main>
        <NavBar/>
          <InfoContent title='Our Team'>
              <p>Logan Wilt</p>
              <p>Bradley Hewitt</p>
              <p>Humberto Rendon</p>
              <p>Ryan Tsai</p>
          </InfoContent>
      </main>
    );
  }