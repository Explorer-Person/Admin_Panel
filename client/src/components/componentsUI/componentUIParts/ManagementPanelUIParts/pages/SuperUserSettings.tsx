import { Container, Row, Col, Button } from "reactstrap";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../redux/stores/hooks";
import { RootState } from "../../../../../redux/stores/store";
import {
  useDisplayUserInput,
  useIncreaseUserInput,
  useSetInputValue,
} from "../actions/SuperUserSettings.A";
import { removeSuperUserInput } from "../../../../../redux/slices/InputSlices";
import { useState, useEffect } from "react";
import { Users } from "../../../../../interface/UserData";
import { v4 as uuidv4 } from "uuid";
import DOMPurify from "dompurify";
import { takeAllSuperUserData } from "../../../../../redux/slices/UserDataSlices";
import { useGetAllSuperUserQuery } from "../../../../../redux/apis/getAllUserApi";
import { Confirm } from "semantic-ui-react";
import { manageConfirmBox } from "../../../../../redux/slices/PagesSlices";
import showMessage from "../../../../../messages/showMessage";
import ErrorPage from "../../../../errors/ErrorPage";
import LoadingPage from "../../../../errors/LoadingPage";

interface HandleSubmitSuperUserProps {
  handleSubmitSuperUser: () => void;
}

const SuperUserSettings = ({
  handleSubmitSuperUser,
}: HandleSubmitSuperUserProps) => {
  const dispatch = useAppDispatch();

  const userId = uuidv4();

  const {data: response, isLoading: superUsersLoading, isError: superUsersError} = useGetAllSuperUserQuery();
  const superUsers = response?.content;

  const confirmBoxData = useAppSelector(
    (state: RootState) => state.PagesReducer.confirmBoxData
  );

  const [userData, setUserData] = useState<Users[]>([]);
  const Users: Users = {
    user_id: userId,
    username: "",
    password: "",
    email: "",
  };
  const superUserData = useAppSelector(
    (state: RootState) => state.UserDataReducer.AllSuperUserData
  );
  const superUserContents = useAppSelector(
    (state: RootState) => state.InputReducer.SuperUserContents
  );

  const handleInputDataChange = (
    event: React.ChangeEvent<unknown>,
    userId: string
  ) => {
    const { name, value } = event.target as HTMLInputElement;

    setUserData((prevData) => {
      return prevData.map((element) => {
        if (element.user_id === userId) {
          return {
            ...element,
            [name]: DOMPurify.sanitize(value.trim()),
            user_id: userId,
          };
        }
        return element;
      });
    });
  };
  const displayInputValue = useDisplayUserInput(handleInputDataChange, superUsers);
  const setInputValue = useSetInputValue(handleInputDataChange);
  const increaseContent = useIncreaseUserInput(handleInputDataChange, userId);

  const decreaseUsers = (userId: string) => {
    if(superUserData.length === 1){
      return showMessage("The Last Super User Cannot Deletable!", "error")
    }
    dispatch(removeSuperUserInput(userId));
    setUserData((prevData) => {
      return prevData.filter((element) => {
        return element.user_id !== userId;
      });
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const displayUsers = () => {
    displayInputValue();
    if(superUsers && superUserData.length === 0){
      return setUserData(superUsers);
    } 
  };

  const increaseUsers = () => {
    increaseContent();
    setUserData([...userData, Users]);
  };

  const handleEditButton = (userId: string) => {
    setInputValue(userId);
  };

  const setConfirmBoxData = (id: string) =>{
    dispatch(manageConfirmBox(id));
  }


  useEffect(()=>{
      displayUsers();
  },[displayUsers, superUsers])

  useEffect(() => {   
    dispatch(takeAllSuperUserData(userData));
  }, [dispatch, userData]);

  if(superUsersLoading){
    <LoadingPage/>
  }
  if(superUsersError){
    <ErrorPage messageTitle="ERROR!" messageBody="User Cannot Loaded!"/>
  }

  return (
    <div>
      <div>
        <Container>
          <Row>
            <h1 style={{ color: "#212529" }} className="text-center my-3">
              SUPER USER SETTINGS
            </h1>
          </Row>
          {superUserContents.map((userContent) => (
            <Row key={userContent.id}>
              <Col xs="11">{userContent.element}</Col>
              <Col xs="1" className="d-flex my-4">
                <Button
                  onClick={() => handleEditButton(userContent.id)}
                  className="bg-warning"
                >
                  <h2>✎</h2>
                </Button>{" "}
                <Button
                  onClick={() => decreaseUsers(userContent.id)}
                  className="bg-danger mx-2"
                >
                  <h2 className="px-2">x</h2>
                </Button>
              </Col>
            </Row>
          ))}

          <Row className="justify-content-center">
            <Button
              style={{ width: "10%" }}
              onClick={increaseUsers}
              className="bg-primary mt-3"
            >
              <h2>+</h2>
            </Button>
          </Row>
          <div className="text-center">
            <Button
              onClick={() => setConfirmBoxData("datas")}
              style={{marginBottom: "8%"}}
              className="mt-4 bg-dark w-50"
            >
              <h1>Save Changes</h1>
            </Button>
            <Confirm
              open={confirmBoxData.status}
              content={`Do you sure for saving changes ?`}
              onCancel={() => setConfirmBoxData("")}
              onConfirm={handleSubmitSuperUser}
              style={{ marginLeft: "25%", marginTop: "15%", height: "20%" }}
            />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default SuperUserSettings;
