import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

export default function SearchBox() {
  const [value, setValue] = useState('');

  return (
    <div>
      <TextField
        placeholder="Search"
        fullWidth
        type="text"
        variant="outlined"
        size="small"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
    </div>
  );
}
