import Button, { ButtonProps } from '@mui/material/Button';

interface ButtonComponentProps extends ButtonProps  {
    onClick : () => void;
}



export const ButtonComponent : React.FC<ButtonComponentProps> = ({ variant, color, children, onClick }) => {
    return (
        <Button variant={variant} color={color} onClick={onClick}  >{children}</Button>
    )
}