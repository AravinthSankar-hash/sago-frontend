import Container from '@mui/material/Container';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import '../css/index.css';

export default function DateSelector({ customLabel }) {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container components={['DatePicker']}>
          <DatePicker
            label={customLabel}
            slotProps={{
              textField: {
                size: 'small',
                style: {
                  backgroundColor: 'white'
                }
              }
            }}
          />
        </Container>
      </LocalizationProvider>
    </div>
  );
}
