// import React, { PureComponent } from 'react';
// import {
//   PieChart,
//   Pie,
//   Sector,
//   Cell,
//   ResponsiveContainer,
// } from 'recharts';

import {
  Container,
  SideLeft,
  LegendContainer,
  Legend,
  // SideRight,
} from "./styles";

const PieChar = () => (
  <Container>
    <SideLeft>
      <h2>Relação</h2>
      <LegendContainer>
        <Legend color="#F7931B">
          <div>95%</div>
          <span>Entradas</span>
        </Legend>

        <Legend color="#E44C4E">
          <div>5%</div>
          <span>Saídas</span>
        </Legend>

        <Legend color="#F7931B">
          <div>5%</div>
          <span>Saídas</span>
        </Legend>

        <Legend color="#E44C4E">
          <div>5%</div>
          <span>Saídas</span>
        </Legend>

        <Legend color="#F7931B">
          <div>5%</div>
          <span>Saídas</span>
        </Legend>
      </LegendContainer>
    </SideLeft>
  </Container>
);

export { PieChar };
