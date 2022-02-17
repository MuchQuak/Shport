import React from 'react';



function TableBody (props) {
  const rows = props.selectedData.map((row, index) => {
    return (
<tr key={index}>
  <td>{row.name}</td>
  <td>{row.league}</td>
  <td>
    <button onClick={() => props.removeSelected(index)}>Remove</button>
  </td>
</tr>
    );
  });
  return (
      <tbody>
         {rows}
      </tbody>
   );
}


function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>League</th>
      </tr>
    </thead>
  );
}

function SelectedTable(props) {
  if(props.selectedData.length < 1){
    return (<></>);
  }
  return (
    <table>
      <TableHeader />
      <TableBody selectedData={props.selectedData} removeSelected={props.removeSelected} />
    </table>
  );
}

export default SelectedTable;

