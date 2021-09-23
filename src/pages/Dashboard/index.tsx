import { useMemo, useState } from 'react';

import {
  WalletBox,
  MessageBox,
  PieChartBox,
} from '../../components';

import { gains } from '../../repositories/gains';
import { expenses } from '../../repositories/expenses';

import { listOfMonths } from '../../utils/listOfMonths';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import smilingImg from '../../assets/smiling.png';

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

  const totalExpenses = useMemo(() => {
    let total: number = 0;

    expenses.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error('invalid amount! Amount must be number.');
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    let total: number = 0;

    gains.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error('invalid amount! Amount must be number.');
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalGains, totalExpenses]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: "Que triste!",
        description:"Neste mês você gastou mais do que deveria.",
        footerText:"Verifique seus gastos e tente cortar algumas coisas desnecessárias. VOCÊ CONSEGUE!",
        icon: sadImg,
      }
    } else if (totalBalance === 0) {
      return {
        title: "Ufaaa!",
        description:"Neste mês, você gastou exatamente o que ganhou.",
        footerText:"Tome cuidado, No próximo mês tente poupar o seu dinheiro.",
        icon: smilingImg,
      }
    } else {
      return {
        title: "Muito bem!",
        description:"Sua carteira está positiva!",
        footerText:"Continue assim. Considere investir o seu saldo.",
        icon: happyImg,
      }
    }
  }, [totalBalance]);

  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;

    const percentGains = (totalGains / total) * 100;
    const percentExpenses = (totalExpenses / total) * 100;

    const data = [
      {
        name: "Entradas",
        value: totalExpenses,
        percent: Number(percentGains.toFixed(1)),
        color: '#E44C4E',

      },
      {
        name: "Saídas",
        value: totalExpenses,
        percent: Number(percentExpenses.toFixed(1)),
        color: '#F7931B',
      }
    ];

    return data;
  }, [totalGains, totalExpenses]);

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch { 
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
          amount={totalBalance}
          footerLabel="Atualizado com base nas entradas e saídas."
          icon="dolar"
        />

        <WalletBox
          title="Entradas"
          color="#F7931B"
          amount={totalGains}
          footerLabel="Atualizado com base nas entradas e saídas."
          icon="arrowDownImg"
        />

        <WalletBox
          title="Saídas"
          color="#E44C4E"
          amount={totalExpenses}
          footerLabel="Atualizado com base nas entradas e saídas."
          icon="arrowUpImg"
        />

        <MessageBox
          title={message.title}
          icon={message.icon}
          description={message.description}
          footerText={message.footerText}
        />

        <PieChartBox data={relationExpensesVersusGains} />
      </Content>
    </Container>
  );
}

export { Dashboard };
