import { ReactNode } from 'react';

import {
  Container,
  TitleContainer,
  Controllers,
} from './styles';

interface IContentHeaderProps {
  title: string;
  lineColor: string;
  children: ReactNode;
}

const ContentHeader = ({
  title,
  lineColor,
  children
}: IContentHeaderProps) => (
  <Container>
    <TitleContainer lineColor={lineColor}>
      <h1>{title}</h1>
    </TitleContainer>

    <Controllers>
      {children}
    </Controllers>
  </Container>
);

export { ContentHeader };
