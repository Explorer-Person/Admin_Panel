
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";

import { Page1 } from "./pages/Page1";
import { Page2 } from "./pages/Page2";
import { Page3 } from "./pages/Page3";


interface InputPageInterface {
  selectedPage: number;
  handleSubmit: ()=> void;
}

export const InputPages = ({ selectedPage, handleSubmit }: InputPageInterface) => {
  const [display, setDisplay] = useState({
    display1: "d-block",
    display2: "d-none",
    display3: "d-none",
  });

  useEffect(() => {
    if (selectedPage === 2) {
      setDisplay({
        display1: "d-none",
        display2: "d-block",
        display3: "d-none",
      });
    } else if (selectedPage === 1) {
      setDisplay({
        display1: "d-block",
        display2: "d-none",
        display3: "d-none",
      });
    } else if (selectedPage === 3) {
      setDisplay({
        display1: "d-none",
        display2: "d-none",
        display3: "d-block",
      });
    }
  }, [selectedPage]);



  return (
    <Form className="my-5 text-center d-flex">
      <Page1 display={display}/>
      <Page2 display={display}/>
      <Page3 display={display} handleSubmit = {handleSubmit}/>
    </Form>
  );
};
