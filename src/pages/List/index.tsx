import { useMemo, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  ContentHeader,
  SelectInput,
  HistoryFinanceCard
} from '../../components';

import { gains } from '../../repositories/gains';
import { expenses } from '../../repositories/expenses';

import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { listOfMonths } from '../../utils/listOfMonths';

import { IRouteParams, IData } from './props';

import {
  Container,
  Content,
  Filters,
} from './styles';

const List = ({ match }: IRouteParams) => {
  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
  const [frequencyFilterSelected, setFrequencyFilterSelected] = useState(['recorrente', 'eventual']);

  const { type: movimentType } = match.params;

  const pageDate = useMemo(() => {
    if (movimentType === 'entry-balance') {
      return {
        title: 'Entradas',
        lineColor: '#4E41F0',
        data: gains,
      }
    } else {
      return {
        title: 'Saídas',
        lineColor: '#E44C4E',
        data: expenses,
      }
    }
  }, [movimentType]);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];
    const { data } = pageDate;
    
    data.forEach(item => {
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
  }, [pageDate]);

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      }
    });
  }, []);

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency);

    if (alreadySelected >= 0) {
      const filtered = frequencyFilterSelected.filter(item => item !== frequency);
      setFrequencyFilterSelected(filtered);
    } else {
      setFrequencyFilterSelected((prev) => [...prev, frequency]);
    }
  };

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch(err) { 
      throw new Error('invalid month value. Is accept 0 - 24.');
    }
  }

  const handYearSelected = (year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch(err) { 
      throw new Error('invalid year value. Is accept integer numbers');
    }
  }

  useEffect(() => {
    const { data } = pageDate;

    const filteredDate = data.filter(item => {
      const date = new Date(item.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return month === monthSelected && year === yearSelected && frequencyFilterSelected.includes(item.frequency);
    });

    const formattedData = filteredDate.map(item => {
      return {
        id: uuidv4(),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
      }
    });

    setData(formattedData);
  }, [pageDate, monthSelected, yearSelected, frequencyFilterSelected]);

  return (
    <Container>
      <ContentHeader
        title={pageDate.title}
        lineColor={pageDate.lineColor}
      >
        <SelectInput
          option={months}
          onChange={(e) => handleMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          option={years}
          onChange={(e) => handYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>

      <Filters>
        <button
          type="button"
          className={`
          tag-filter 
          tag-filter-recurrent
          ${frequencyFilterSelected.includes('recorrente') && 'tag-actived'}`}
          onClick={() => handleFrequencyClick('recorrente')}
        >
          Recorrentes
        </button>

        <button
          type="button"
          className={`
          tag-filter 
          tag-filter-eventual
          ${frequencyFilterSelected.includes('eventual') && 'tag-actived'}`}
          onClick={() => handleFrequencyClick('eventual')}
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
              subtitle={item.dateFormatted}
              amount={item.amountFormatted}
            />
          ))
        }
      </Content>
    </Container>
  );
}

export { List };
