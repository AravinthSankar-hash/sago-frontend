import { useState } from 'react';
import { TextField, IconButton, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const YourComponent = () => {
  const [rows, setRows] = useState([{ id: 1 }]);

  const handleAddRow = () => {
    setRows((prevRows) => {
      const newRow = { id: prevRows.length + 1 };
      return [...prevRows, newRow];
    });
  };

  const handleDeleteRow = (index) => {
    setRows((prevRows) => {
      return prevRows.filter((row, i) => i !== index);
    });
  };

  return (
    <div>
      {rows.map((row, index) => (
        <Grid container spacing={2} alignItems="center" key={index}>
          <Grid item xs={4}>
            <TextField label="inpu1" fullWidth />
          </Grid>
          <Grid item xs={4}>
            <TextField label="inpu2" fullWidth />
          </Grid>
          <Grid item xs={4}>
            <IconButton
              onClick={() => (index === rows.length - 1 ? handleAddRow() : handleDeleteRow(index))}>
              {index === rows.length - 1 ? <AddIcon /> : <DeleteIcon />}
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default YourComponent;
