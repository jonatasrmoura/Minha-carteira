import { useMemo, useState, useCallback } from 'react';

import {
  ContentHeader,
  SelectInput,
  WalletBox,
  MessageBox,
  PieChartBox,
  HistoryBox,
  BarChartBox,
} from '../../components';

import { gains } from '../../repositories/gains';
import { expenses } from '../../repositories/expenses';

import { listOfMonths } from '../../utils/listOfMonths';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import flushedImg from '../../assets/flushed.png';
import thinkingImg from '../../assets/thinking.png';

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
    } else if (totalGains === 0 && totalExpenses === 0) {
      return {
        title: "Opsss!",
        description:"Neste mês, não há registros de entradas ou saídas.",
        footerText:"Parece que você não fez nenhum registro no mês e ano selecionado.",
        icon: thinkingImg,
      } 
    } else if (totalBalance === 0) {
      return {
        title: "Ufaaa!",
        description:"Neste mês, você gastou exatamente o que ganhou.",
        footerText:"Tome cuidado, No próximo mês tente poupar o seu dinheiro.",
        icon: flushedImg,
      } 
    } else {
      return {
        title: "Muito bem!",
        description:"Sua carteira está positiva!",
        footerText:"Continue assim. Considere investir o seu saldo.",
        icon: happyImg,
      }
    }
  }, [totalBalance, totalExpenses, totalGains]);

  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;

    const percentGains = Number(((totalGains / total) * 100).toFixed(1));
    const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1));

    const data = [
      {
        name: "Entradas",
        value: totalGains,
        percent: percentGains ? percentGains : 0,
        color: '#E44C4E',

      },
      {
        name: "Saídas",
        value: totalExpenses,
        percent: percentExpenses ? percentExpenses : 0,
        color: '#F7931B',
      }
    ];

    return data;
  }, [totalGains, totalExpenses]);

  const historyData = useMemo(() => {
    return listOfMonths.map((_, month) => {
      let amountEntry = 0;
      gains.forEach(gain => {
        const date = new Date(gain.date);
        const gainMonth = date.getMonth();
        const gainYear = date.getFullYear();

        if (gainMonth === month && gainYear === yearSelected) {
          try {
            amountEntry += Number(gain.amount);
          } catch {
            throw new Error('amountEntry  is invalid. amountEntry must be valid number.');
          }
        } 
      });

      let amountOutput = 0;
      expenses.forEach(expense => {
        const date = new Date(expense.date);
        const expenseMonth = date.getMonth();
        const expenseYear = date.getFullYear();

        if (expenseMonth === month && expenseYear === yearSelected) {
          try {
            amountOutput += Number(expense.amount);
          } catch {
            throw new Error('amountOutput  is invalid. amountOutput must be valid number.');
          }
        } 
      });

      return {
        monthNumber: month,
        month: listOfMonths[month].substr(0, 3),
        amountEntry,
        amountOutput,
      }
    })
    .filter(item => {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear);
    });
  }, [yearSelected]);

  const relationExpensevesRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent: number = 0;
    let amountEventual: number = 0;

    expenses.filter((expense) => {
      const date = new Date(expense.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      return month === monthSelected && year === yearSelected;
    })
    .forEach((expense) => {
      if(expense.frequency === 'recorrente') {
        return amountRecurrent += Number(expense.amount);
      }

      if(expense.frequency === 'eventual') {
        return amountEventual += Number(expense.amount);
      }
    });

    const total = amountRecurrent + amountEventual;

    const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
    const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: percentRecurrent ? percentRecurrent : 0,
        color: "#F7931B",
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: percentEventual ? percentEventual : 0,
        color: "#E44C4E",
      }
    ];
  }, [monthSelected, yearSelected]);

  const relationGainsRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent: number = 0;
    let amountEventual: number = 0;

    gains.filter((gain) => {
      const date = new Date(gain.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      return month === monthSelected && year === yearSelected;
    })
    .forEach((gain) => {
      if(gain.frequency === 'recorrente') {
        return amountRecurrent += Number(gain.amount);
      }

      if(gain.frequency === 'eventual') {
        return amountEventual += Number(gain.amount);
      }
    });

    const total = amountRecurrent + amountEventual;

    const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
    const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: percentRecurrent ? percentRecurrent : 0,
        color: "#F7931B",
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: percentEventual ? percentEventual : 0,
        color: "#E44C4E",
      }
    ];
  }, [monthSelected, yearSelected]);

  const handleMonthSelected = useCallback((month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch { 
      throw new Error('invalid month value. Is accept 0 - 24.');
    }
  }, []);

  const handYearSelected = useCallback((year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch(err) { 
      throw new Error('invalid year value. Is accept integer numbers');
    }
  }, []);

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
          icon="arrowUpImg"
        />

        <WalletBox
          title="Saídas"
          color="#E44C4E"
          amount={totalExpenses}
          footerLabel="Atualizado com base nas entradas e saídas."
          icon="arrowDownImg"
        />

        <MessageBox
          title={message.title}
          icon={message.icon}
          description={message.description}
          footerText={message.footerText}
        />

        <PieChartBox data={relationExpensesVersusGains} />

        <HistoryBox
          data={historyData}
          lineColorAmountEntry="#F7931B"
          lineColorAmountOutput="#E44C4E"
        />

        <BarChartBox
          title="Saídas"
          data={relationExpensevesRecurrentVersusEventual}
        />

        <BarChartBox
          title="Entradas"
          data={relationGainsRecurrentVersusEventual}
        />
      </Content>
    </Container>
  );
}

export { Dashboard };
