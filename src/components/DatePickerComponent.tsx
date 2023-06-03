import { DatePicker, LocalizationProvider } from "@mui/lab"
import AdapterDateFns from '@mui/lab/AdapterDateFns'

type Props = {
    label : string;
    valueDatePicker : Date | null;
    onChangeDatePicker : ()=>void;
}

export const DatePickerComponent = ({label, valueDatePicker, onChangeDatePicker} : Props) => {
    return(
        <LocalizationProvider dateAdapter={AdapterDateFns} >
            <DatePicker
                label
            />
        </LocalizationProvider>
    )
}