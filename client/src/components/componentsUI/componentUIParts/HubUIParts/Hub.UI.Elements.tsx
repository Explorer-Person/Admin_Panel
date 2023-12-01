import React from "react";
import hubCss from '/public/css/hub.module.css';
import { Container } from "reactstrap";

interface text {
  text: string;
  index: number;
}
export const ConfigureBoxWithHover = ({ text, index }: text) => {
  const [hover, setHover] = React.useState(false);

  return (
    <Container
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`w-75 ${hubCss.configureBox} ${
        hover ? hubCss[`box${index}`] : false
      }`}
    >
      <Container className="h3">{text}</Container>
    </Container>
  );
};
