import { Container } from "./styles";

interface ISelectInputProps {
  option: {
    value: string | number;
    label: string | number;
  }[],
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void | undefined;
  defaultValue?: string | number;
};

const SelectInput = ({ option, onChange, defaultValue }: ISelectInputProps) => (
  <Container>
    <select onChange={onChange} defaultValue={defaultValue}>
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

export { SelectInput };
