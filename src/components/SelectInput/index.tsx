import { Container } from "./styles";

interface ISelectInputProps {
  option: {
    value: string | number;
    label: string | number;
  }[],
}

const SelectInput = ({ option }: ISelectInputProps) => {
  return (
    <Container>
      <select>
        {
          option.map(option => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))
        }
      </select>
    </Container>
  );
};

export { SelectInput };
