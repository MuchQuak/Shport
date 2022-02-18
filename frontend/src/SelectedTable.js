import Button from "react-bootstrap/Button";

export default function SelectedTable(props) {
  if (!props || props.selectedData.length < 1){
    return null;
  }
    const rows = props.selectedData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.city} {row.name}</td>
                <td>{row.sport}</td>
                <td>
                    <Button onClick={() => props.removeSelected(index)}>Remove</Button>
                </td>
            </tr>
        );
    });
  return (
    <table className='teamsTable'>
        <p className='nomargin bold underline'>Selected</p>
        <tbody>
        {rows}
        </tbody>
    </table>
  );
}