import { Container } from "./styles";

interface IMessageBoxProps {
  title: string;
  description: string;
  footerText: string;
  icon: string;
}

const MessageBox = (props: IMessageBoxProps) => (
  <Container>
    <header>
      <h1>
        {props.title}
        <img src={props.icon} alt={props.title} />
      </h1>

      <p> {props.description}</p>
    </header>

    <footer>
      <span>{props.footerText}</span>
    </footer>
  </Container>
);

export { MessageBox };
