import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { InputPages } from "../componentUIParts/AddContentUIParts/Add_Content.UI.Elements";
import { ToastContainer } from "react-toastify";

interface AddContentUIProps {
  handleSubmit: () => void;
}

const AddContentUI = ({ handleSubmit }: AddContentUIProps) => {
  const [selectedPage, setSelectedPage] = useState(1);
  const selectPage: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setSelectedPage(Number(event.currentTarget.value));
  };
  const movePage: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const name = event.currentTarget.name;

    if (name === "forward") {
      const increaseNumber = selectedPage + 1;
      if (selectedPage === 3) {
        setSelectedPage(1);
      } else {
        setSelectedPage(increaseNumber);
      }
    }
    if (name === "back") {
      const decreaseNumber = selectedPage - 1;
      if (selectedPage === 1) {
        setSelectedPage(3);
      } else {
        setSelectedPage(decreaseNumber);
      }
    }
  };

  return (
    <div>
      <Container>
        <Container style={{minHeight: "550px"}} className="d-flex justify-content-center">
          <Button style={{height: "10%", marginRight: "50px", marginTop: "20%"}} className="bg-dark" name="back" onClick={movePage}>🢀</Button>
          <InputPages selectedPage={selectedPage} handleSubmit={handleSubmit} />
          <Button style={{height: "10%", marginLeft: "50px", marginTop: "20%"}} className="bg-dark" name="forward" onClick={movePage}>🢂</Button>
        </Container>
        <Container className="d-flex justify-content-center my-2">
          <Button className="bg-dark mx-1" id="prev" onClick={selectPage} name="1" value={1}>
            1
          </Button>
          <Button className="bg-dark mx-1" id="next" onClick={selectPage} name="2" value={2}>
            2
          </Button>
          <Button className="bg-dark mx-1" id="next" onClick={selectPage} name="3" value={3}>
            3
          </Button>
        </Container>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default AddContentUI;
