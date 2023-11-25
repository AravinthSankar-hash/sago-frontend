import Container from '@mui/material/Container';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
export default function DateSelector({ customLabel }) {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container components={['DatePicker']}>
          <DatePicker
            sx={{ fontSize: '0.9rem' }}
            label={customLabel}
            slotProps={{ textField: { size: 'small' } }}
          />
        </Container>
      </LocalizationProvider>
    </div>
  );
}
