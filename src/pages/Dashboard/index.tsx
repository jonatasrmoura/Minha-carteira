import { useMemo, useState } from 'react';

import { WalletBox, MessageBox } from '../../components';

import { gains } from '../../repositories/gains';
import { expenses } from '../../repositories/expenses';

import { listOfMonths } from '../../utils/listOfMonths';

// import happyImg from '../../assets/happy.svg';
import SadImg from '../../assets/sad.svg';

import {
  ContentHeader,
  SelectInput,
} from '../../components';

import {
  Container,
  Content,
} from './styles';

const Dashboard = () => {
  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
  
  // const options = [
  //   {value: 'Jonatas', label: 'Jonatas'},
  //   {value: 'Rodrigo', label: 'Rodrigo'},
  //   {value: 'Maria', label: 'Maria'},
  // ];

  const years = useMemo(() => {
    let uniqueYears: number[] = [];
    
    [...expenses, ...gains].forEach(item => {
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
  }, []);

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      }
    });
  }, []);

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

  return (
    <Container>
      <ContentHeader
        title="Dashboard"
        lineColor="#F7931B"
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

      <Content>
        <WalletBox
          title="Saldo"
          color="#4E41F0"
          amount={150.00}
          footerLabel="Atualizado com base nas entradas e saídas."
          icon="dolar"
        />

        <WalletBox
          title="Entradas"
          color="#F7931B"
          amount={5000.00}
          footerLabel="Atualizado com base nas entradas e saídas."
          icon="arrowDownImg"
        />

        <WalletBox
          title="Saídas"
          color="#E44C4E"
          amount={4850.00}
          footerLabel="Atualizado com base nas entradas e saídas."
          icon="arrowUpImg"
        />

        <MessageBox
          title="Muito bem!"
          icon={SadImg}
          description="Sua carteira está positiva!"
          footerText="Continue assim. Considere investir o seu saldo."
        />
      </Content>
    </Container>
  );
}

export { Dashboard };
