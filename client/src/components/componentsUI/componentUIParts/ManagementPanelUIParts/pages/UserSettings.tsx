import { Container, Row, Button } from "reactstrap";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../redux/stores/hooks";
import { RootState } from "../../../../../redux/stores/store";
import {
  useDisplayUserInput,
  useIncreaseUserInput,
  useSetInputValue,
} from "../actions/UserSettings.A";
import {
  filterUserInput,
  removeUserInput,
} from "../../../../../redux/slices/InputSlices";
import { useState, useEffect } from "react";
import { Users } from "../../../../../interface/UserData";
import { v4 as uuidv4 } from "uuid";
import DOMPurify from "dompurify";

import { takeAllUserData } from "../../../../../redux/slices/UserDataSlices";
import { useGetAllUserQuery } from "../../../../../redux/apis/getAllUserApi";
import { manageConfirmBox } from "../../../../../redux/slices/PagesSlices";
import { Confirm } from "semantic-ui-react";
import showMessage from "../../../../../messages/showMessage";
import LoadingPage from "../../../../errors/LoadingPage";
import ErrorPage from "../../../../errors/ErrorPage";
import hubCSS from "/public/css/hub.module.css";

interface HandleSubmitUserProps {
  handleSubmitUser: () => void;
}

const UserSettings = ({ handleSubmitUser }: HandleSubmitUserProps) => {
  const dispatch = useAppDispatch();

  const {
    data: response,
    isLoading: usersLoading,
    isError: usersError,
  } = useGetAllUserQuery();
  const users = response?.content;

  const allUserData = useAppSelector(
    (state: RootState) => state.UserDataReducer.AllUserData
  );

  const userContents = useAppSelector(
    (state: RootState) => state.InputReducer.UserContents
  );

  const userId = uuidv4();

  const [userData, setUserData] = useState<Users[]>([]);
  const Users: Users = {
    user_id: userId,
    username: "",
    password: "",
    email: "",
  };

  const confirmBoxData = useAppSelector(
    (state: RootState) => state.PagesReducer.confirmBoxData
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
  const displayInputValue = useDisplayUserInput(handleInputDataChange, users);
  const setInputValue = useSetInputValue(handleInputDataChange);
  const increaseContent = useIncreaseUserInput(handleInputDataChange, userId);

  const decreaseUsers = (userId: string) => {
    if (allUserData.length === 1) {
      return showMessage("The Last User Cannot Deletable!", "error");
    }
    dispatch(removeUserInput(userId));
    setUserData((prevData) => {
      return prevData.filter((element) => {
        return element.user_id !== userId;
      });
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const displayUsers = () => {
    if (users && allUserData.length === 0) {
      displayInputValue();
      return setUserData(users);
    }
  };

  const increaseUsers = () => {
    increaseContent();
    setUserData([...userData, Users]);
  };

  const handleEditButton = (userId: string) => {
    setInputValue(userId);
  };

  const setConfirmBoxData = (id: string) => {
    dispatch(manageConfirmBox(id));
  };

  useEffect(() => {
    displayUsers();
  }, [dispatch, userData, displayUsers, users]);

  useEffect(() => {
    if (users && users?.length !== userContents.length) {
      const ids = allUserData.map((content) => content.user_id);
      dispatch(filterUserInput(ids));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allUserData]);

  useEffect(() => {
    dispatch(takeAllUserData(userData));
  }, [dispatch, userData]);

  if (usersLoading) {
    <LoadingPage />;
  }
  if (usersError) {
    <ErrorPage messageTitle="ERROR!" messageBody="User Cannot Loaded!" />;
  }

  return (
    <div>
      <div>
        <Container>
          <Row>
            <h1 style={{ color: "#212529" }} className="text-center my-3">
              USER SETTINGS
            </h1>
          </Row>
          {userContents.map((userContent) => (
            <div className={`${hubCSS.userPageContainer}`} key={userContent.id}>
              <Container style={{ width: "95%", marginRight: "4%" }}>
                {userContent.element}
              </Container>
              <Container
                style={{ width: "5%", height: "5%" }}
                className="d-flex justify-content-center mt-4"
              >
                <Button
                  onClick={() => handleEditButton(userContent.id)}
                  className="bg-warning mx-1 border border-light"
                >
                  <h2>✎</h2>
                </Button>{" "}
                <Button
                  onClick={() => decreaseUsers(userContent.id)}
                  className="bg-danger mx-1 border border-light"
                >
                  <h2 className="px-2">x</h2>
                </Button>
              </Container>
            </div>
          ))}
          <div className="w-100 text-center">
            <Button
              onClick={increaseUsers}
              className="bg-primary border border-light mt-3 px-4"
            >
              <h1>+</h1>
            </Button>
          </div>
          <div>
            <div className="w-100 text-center">
            <Button
              onClick={() => setConfirmBoxData("datas")}
              style={{ marginBottom: "25%" }}
              className="mt-4 bg-dark p-3"
            >
              <h1>Save Changes</h1>
            </Button>
            </div>
            
            <Confirm
              open={confirmBoxData.status}
              content={`Do you sure for saving changes ?`}
              onCancel={() => setConfirmBoxData("")}
              onConfirm={handleSubmitUser}
              style={{
                maxHeight: "20%",
                textAlign: "center",
                margin: "20% 11%",
              }}
              className={`w-75`}
            />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default UserSettings;
