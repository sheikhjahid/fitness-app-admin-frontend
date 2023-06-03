import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect } from 'react';

const tableData = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', crm: 'Konnective' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', crm: 'Konnective' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', crm: 'Konnective' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', crm: 'Konnective' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', crm: 'Konnective' },
  { id: 6, lastName: 'Melisandre', firstName: 'John', crm: 'Konnective' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', crm: 'Konnective' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', crm: 'Konnective' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', crm: 'Konnective' },
  // Add more objects as needed
];



function ClientTable() {
  function disableClient(id) {
    // Define the logic for handling the button click here
    console.log(`Button clicked for row with id ${id}`);
  }
  function loginClient(id) {
    // Define the logic for handling the button click here
    console.log(`Button clicked for row with id ${id}`);
  }

  useEffect(() => {
    loadData();
  })

  const loadData = () => {

  }


  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>CRM</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.crm}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => loginClient(row.id)}>Login</Button>
                <Button variant="contained" color="error" sx={{ m: 3 }} onClick={() => disableClient(row.id)}>Disable</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ClientTable;