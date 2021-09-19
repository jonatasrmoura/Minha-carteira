import {
  Container,
  ToggleLabel,
  ToggleSelector,
} from './styles';

const Toggle = () => (
  <Container>
    <ToggleLabel>Light</ToggleLabel>
    <ToggleSelector
      checked
      uncheckedIcon={false}
      checkedIcon={false}
      onChange={() => console.log('Mudou!')}
    />
    <ToggleLabel>Dark</ToggleLabel>
  </Container>
);

export { Toggle };
