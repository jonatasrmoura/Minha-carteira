import { useMemo, useState, useEffect } from 'react';

import {
  ContentHeader,
  SelectInput,
  HistoryFinanceCard
} from '../../components';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';

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

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dataFormatted: string;
  tagColor: string;
}

const List = ({ match }: IRouteParams) => {
  const [data, setData] = useState<IData[]>([]);

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

  const listData = useMemo(() => {
    return type === 'entry-balance' ? gains : expenses;
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

  useEffect(() => {
    const response = listData.map(item => {
      return {
        id: String(Math.random() * data.length),
        description: item.description,
        amountFormatted: item.amount,
        frequency: item.frequency,
        dataFormatted: item.date,
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
      }
    });

    setData(response);
  }, []);

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
        {
          data.map(item => (
            <HistoryFinanceCard
              key={item.id}
              tagColor={item.tagColor}
              title={item.description}
              subtitle={item.dataFormatted}
              amount={item.amountFormatted}
            />
          ))
        }
      </Content>
    </Container>
  );
}

export { List };
