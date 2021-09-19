import {
  ContentHeader,SelectInput
} from '../../components';
import { Container } from './styles';

const List = () => {
  const options = [
    {value: 'Jonatas', label: 'Jonatas'},
    {value: 'Rodrigo', label: 'Rodrigo'},
    {value: 'Maria', label: 'Maria'},
  ];

  return (
    <Container>
      <ContentHeader
        title="Saídas"
        lineColor="#E44C4E"
      >
        <SelectInput option={options}/>
      </ContentHeader>
    </Container>
  );
}

export { List };
