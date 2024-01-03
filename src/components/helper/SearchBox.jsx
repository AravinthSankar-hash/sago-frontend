import { useState, useEffect, useCallback } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { debounce } from 'lodash';

import '../../css/index.css';

export default function SearchBox(props) {
  const { placeHolder, inputValueChanged, debounceTimeInMilliSecs = 1000 } = props;
  const [value, setValue] = useState('');
  useEffect(() => {
    return () => debouncerFun.cancel();
  }, []);

  const debouncerFun = useCallback(
    debounce((inputValue) => {
      if (inputValueChanged) {
        inputValueChanged(inputValue);
      }
    }, debounceTimeInMilliSecs),
    [inputValueChanged]
  );

  const inputChangeHandler = (changedInput) => {
    setValue(changedInput);
    debouncerFun(changedInput);
  };

  return (
    <div>
      <TextField
        placeholder={placeHolder}
        fullWidth
        type="text"
        variant="outlined"
        size="small"
        onChange={(e) => inputChangeHandler(e.target.value)}
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
