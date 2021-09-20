import {
  ContentHeader,
  SelectInput,
  HistoryFinanceCard
} from '../../components';

import { Container, Content } from './styles';

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

      <Content>
        <HistoryFinanceCard
          tagColor="#E44C4E"
          title="Conta de Luz"
          subtitle="17/07/2021"
          amount="R$ 125,50"
        />
      </Content>
    </Container>
  );
}

export { List };
