import {
  Container,
  ToggleLabel,
  ToggleSelector,
} from './styles';

const Toggle = () => (
  <Container>
    <ToggleLabel>Light</ToggleLabel>
    <ToggleSelector
      onChange={() => {}}
      checked={true}
      uncheckedIcon={false}
      checkedIcon={false}
    />
    <ToggleLabel>Dark</ToggleLabel>
  </Container>
);

export { Toggle };
