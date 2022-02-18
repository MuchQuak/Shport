function SelectedTable(props) {
  if (!props || props.selectedData.length < 1){
    return null;
  }
    const rows = props.selectedData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.city} {row.name}</td>
                <td>{row.sport}</td>
                <td>
                    <button onClick={() => props.removeSelected(index)}>Remove</button>
                </td>
            </tr>
        );
    });
  return (
    <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>League</th>
        </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
    </table>
  );
}

export default SelectedTable;

