import CountUp from 'react-countup';

import dolarImg from '../../assets/dolar.svg';
import arrowUpImg from '../../assets/arrow-up.svg';
import arrowDownImg from '../../assets/arrow-down.svg';

import { Container } from './styles';

interface IWalletBoxProps {
  title: string;
  amount: number;
  footerLabel: string;
  icon: 'dolar' | 'arrowUpImg' | 'arrowDownImg';
  color: string;
}

const WalletBox = (props: IWalletBoxProps) => {
  const iconSelected = () => {
    switch (props.icon) {
      case 'dolar':
        return dolarImg;

      case 'arrowUpImg':
        return arrowUpImg;

      case 'arrowDownImg':
        return arrowDownImg;

      default:
        return undefined;
    }
  }

  return (
    <Container color={props.color}>
      <span>{props.title}</span>
      <h1>
        <CountUp
          start={0}
          end={props.amount}
          prefix={"R$ "}
          separator="."
          decimal=","
          decimals={2}
          duration={2.00}
        />
      </h1>
      <small>{props.footerLabel}</small>
      <img src={iconSelected()} alt={props.title} />
    </Container>
  );
}

export { WalletBox };
