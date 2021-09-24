import { InputHTMLAttributes } from 'react';
import { Container } from "./styles";

type IInputProps = InputHTMLAttributes<HTMLInputElement>;
 
const Input = ({ ...rest }: IInputProps) => (
  <Container {...rest} />
);

export { Input };
