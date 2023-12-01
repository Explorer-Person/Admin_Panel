import { Container, Row } from "reactstrap";

function LoadingPage(){
    
    return (
        <div>
        <Container style={{marginLeft: "25%", marginTop: "20%"}} className=" h-50 w-50 border border-muted shadow">
            <Row className="text-muted">
                <h1 className="text-center">Loading...</h1>
            </Row>
        </Container>
    </div>
    );
}

export default LoadingPage;