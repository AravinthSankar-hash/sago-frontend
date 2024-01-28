import { useState } from 'react';
import Container from '@mui/material/Container';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import '../../css/index.css';
import dayjs from 'dayjs';

export default function DateSelector({ customLabel, dateChangeHanlder }) {
  const currentDate = dayjs();

  const handleDateChange = (date) => {
    dateChangeHanlder(date ? new Date(date) : date, customLabel?.toLowerCase());
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container components={['DatePicker']}>
          <DatePicker
            label={customLabel}
            onChange={handleDateChange}
            maxDate={currentDate}
            sx={{ width: 180 }}
            slotProps={{
              textField: {
                size: 'small',
                style: {
                  backgroundColor: 'white'
                }
              },
              field: { clearable: true, onClear: () => handleDateChange(null) }
            }}
          />
        </Container>
      </LocalizationProvider>
    </div>
  );
}
