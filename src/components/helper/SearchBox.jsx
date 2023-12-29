import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import '../../css/index.css';

export default function SearchBox(props) {
  const [value, setValue] = useState('');

  return (
    <div>
      <TextField
        placeholder={props.placeHolder}
        fullWidth
        type="text"
        variant="outlined"
        size="small"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        InputProps={{
          style: {
            height: '38px',
            backgroundColor: 'white'
          },
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
