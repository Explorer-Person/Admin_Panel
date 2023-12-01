import { Container, Row } from "reactstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const FallBackErrorPage = () => {

    const navigate = useNavigate();
    useEffect(() => {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    });
    return (
        <div>
        <Container style={{marginLeft: "25%", marginTop: "20%"}} className=" h-50 w-50 border border-muted shadow">
            <Row style={{backgroundColor: "darkred"}} className="border border-bottom text-light">
                <h1 className="text-center">WOOPS...</h1>
            </Row>
            <Row className="my-5">
                <h3 className="text-center">Something Went Wrong...</h3>
            </Row>
        </Container>
    </div>
    );
}

export default FallBackErrorPage;