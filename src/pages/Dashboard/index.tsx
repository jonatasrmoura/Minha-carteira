import {
  ContentHeader,
  SelectInput,
} from '../../components';

import {
  Container
} from './styles';

const Dashboard = () => {
  const options = [
    {value: 'Jonatas', label: 'Jonatas'},
    {value: 'Rodrigo', label: 'Rodrigo'},
    {value: 'Maria', label: 'Maria'},
  ];

  return (
    <Container>
      <ContentHeader
        title="Dashboard"
        lineColor="#F7931B"
      >
        <SelectInput option={options}/>
      </ContentHeader>
    </Container>
  );
}

export { Dashboard };
