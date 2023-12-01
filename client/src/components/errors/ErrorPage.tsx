import { Container, Row } from "reactstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorPageUIProps } from "../../interface/Interfaces";
import { useAppSelector } from "../../redux/stores/hooks";
import { RootState } from "../../redux/stores/store";

function ErrorPage({
  messageBody,
  messageTitle,
}: ErrorPageUIProps): JSX.Element {
  const navigate = useNavigate();
  const isAuthUser = useAppSelector(
    (state: RootState) => state.AuthInfoReducer.userAuthInfo.isAuthUser
  );

  useEffect(() => {
    const route = !isAuthUser ? "/login" : "/admin/hub";
    setTimeout(() => {
      return navigate(route);
    }, 3000);
  });
  return (
    <div>
      <Container
        style={{ marginLeft: "25%", marginTop: "20%" }}
        className=" h-50 w-50 border border-muted shadow"
      >
        <Row
          style={{ backgroundColor: "darkred" }}
          className="border border-bottom text-light"
        >
          <h1 className="text-center">{messageTitle}</h1>
        </Row>
        <Row className="my-5">
          <h3 className="text-center">{messageBody}</h3>
        </Row>
      </Container>
    </div>
  );
}

export default ErrorPage;
