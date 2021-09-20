import { useMemo } from 'react';

import {
  ContentHeader,
  SelectInput,
  HistoryFinanceCard
} from '../../components';

import {
  Container,
  Content,
  Filters,
} from './styles';

interface IRouteParams {
  match: {
    params: {
      type: string;
    }
  }
}

const List = ({ match }: IRouteParams) => {
  const { type } = match.params;

  const titleHeader = useMemo(() => {
    return type === 'entry-balance' ? 
    {
      title: 'Entradas',
      lineColor: '#4E41F0',
    } 
    : 
    {
      title: 'Saídas',
      lineColor: '#E44C4E',
    };
  }, [type]);

  const months = [
    {value: 9, label: 'Setembro'},
    {value: 8, label: 'Agosto'},
    {value: 7, label: 'Julho'},
  ];

  const years = [
    {value: 2021, label: 2021},
    {value: 2020, label: 2020},
    {value: 2019, label: 2019},
  ];

  return (
    <Container>
      <ContentHeader
        title={titleHeader.title}
        lineColor={titleHeader.lineColor}
      >
        <SelectInput option={months}/>
        <SelectInput option={years}/>
      </ContentHeader>

      <Filters>
        <button
          type="button"
          className="tag-filter tag-filter-recurrent"
        >
          Recorrentes
        </button>

        <button
          type="button"
          className="tag-filter tag-filter-eventual"
        >
          Eventuais
        </button>
      </Filters>

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
