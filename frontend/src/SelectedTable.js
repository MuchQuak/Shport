import Button from "react-bootstrap/Button";
import {getTeamLogo} from "./SportHandler";

export default function SelectedTable(props) {
  if (!props || props.selectedData.length < 1){
    return null;
  }
    const rows = props.selectedData.map((row, index) => {
        return (
            <tr key={index}>
                <td><div className='logo-multiline-words'>{getTeamLogo(row.sport, row.code, null)}{row.city} {row.name}</div></td>
                <td>{row.sport}</td>
                <td>
                    <Button onClick={() => props.removeSelected(index)}>Remove</Button>
                </td>
            </tr>
        );
    });
  return (
      <>
          <p className='nomargin bold underline'>Selected</p>
          <table className='teamsTable'>
              <tbody>
              {rows}
              </tbody>
          </table>
      </>
  );
}