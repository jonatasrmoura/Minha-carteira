import { useMemo, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  ContentHeader,
  SelectInput,
  HistoryFinanceCard
} from '../../components';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { listOfMonths } from '../../utils/listOfMonths';

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
  const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1));
  const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));

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

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    listData.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      // Verificar se o valor não está no meu select
      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });

    return uniqueYears.map(year => {
      return {
        value: year,
        label: year,
      }
    });
  }, [listData]);

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      }
    });
  }, []);

  useEffect(() => {
    const filteredDate = listData.filter(item => {
      const date = new Date(item.date);
      const month = String(date.getMonth() + 1);
      const year = String(date.getFullYear());

      return month === monthSelected && year === yearSelected;
    });

    const formattedData = filteredDate.map(item => {
      return {
        id: uuidv4(),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dataFormatted: formatDate(item.date),
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
      }
    });

    setData(formattedData);
  }, [listData, monthSelected, yearSelected]);

  return (
    <Container>
      <ContentHeader
        title={titleHeader.title}
        lineColor={titleHeader.lineColor}
      >
        <SelectInput
          option={months}
          onChange={(e) => setMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          option={years}
          onChange={(e) => setYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
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
