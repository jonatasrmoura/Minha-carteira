import {
  Container,
  ToggleLabel,
  ToggleSelector,
} from './styles';

interface IToggleProps {
  labelLeft: string;
  labelRight: string;
  checked: boolean;
  onChance(): void; 
};

const Toggle = ({
  labelLeft,
  labelRight,
  checked,
  onChance,
}: IToggleProps) => (
  <Container>
    <ToggleLabel>{labelLeft}</ToggleLabel>
    <ToggleSelector
      checked={checked}
      uncheckedIcon={false}
      checkedIcon={false}
      onChange={onChance}
    />
    <ToggleLabel>{labelRight}</ToggleLabel>
  </Container>
);

export { Toggle };
