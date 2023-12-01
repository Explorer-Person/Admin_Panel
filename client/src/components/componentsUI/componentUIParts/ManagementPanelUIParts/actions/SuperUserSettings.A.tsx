import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../redux/stores/hooks";
import {
  addSuperUserInput,
  editStatusSuperUserInput,
} from "../../../../../redux/slices/InputSlices";
import { RootState } from "../../../../../redux/stores/store";
import { SuperUserContentsInputP } from "../../../../../interface/Interfaces";
import React from "react";
import { Users } from "../../../../../interface/UserData";

type MyChangeEvent = React.ChangeEvent<unknown>;

// eslint-disable-next-line react-refresh/only-export-components
const UserSettingsContent = (
  userId: string,
  handleInputDataChange: (event: MyChangeEvent, userId: string) => void
) => {
  const element = (
    <div>
      <Container key={userId} className="border border-muted shadow my-3">
        <Row>
          <Container>
            <Row>
              <Col className="text-center p-3">
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0 d-flex">
                  <Label for="username" className="mr-sm-2 m-2">
                    Username:
                  </Label>
                  <Input
                    className="Inputs"
                    type="text"
                    name="username"
                    onChange={(e) => handleInputDataChange(e, userId)}
                    id={`username-${userId}`}
                    placeholder="username"
                    disabled={false}
                  />
                </FormGroup>
              </Col>
              <Col className="text-center p-3">
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0 d-flex">
                  <Label for="password" className="mr-sm-2 m-2">
                    Password:
                  </Label>
                  <Input
                    className="Inputs"
                    type="password"
                    name="password"
                    onChange={(e) => handleInputDataChange(e, userId)}
                    id={`password-${userId}`}
                    placeholder="password"
                    disabled={false}
                  />
                  <Button
                    style={{
                      cursor: "pointer",
                      backgroundColor: "darkslategray",
                    }}
                    className="p-1"
                  >
                    <h2>👁</h2>
                  </Button>
                </FormGroup>
              </Col>
              <Col className="text-center p-3">
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0 d-flex">
                  <Label for="email" className="mr-sm-2 m-2">
                    Email:
                  </Label>
                  <Input
                    className="Inputs"
                    type="email"
                    name="email"
                    onChange={(e) => handleInputDataChange(e, userId)}
                    id={`email-${userId}`}
                    placeholder="something@idk.cool"
                    disabled={false}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
    </div>
  );
  const notEditableElement = (
    <div>
      <Container key={userId} className="border border-muted shadow my-3">
        <Row>
          <Container>
            <Row>
              <Col className="text-center p-3">
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0 d-flex">
                  <Label for="username" className="mr-sm-2 m-2">
                    Username:
                  </Label>
                  <Input
                    className="Inputs"
                    type="text"
                    name="username"
                    onChange={(e) => handleInputDataChange(e, userId)}
                    id={`username-${userId}`}
                    placeholder="username"
                    disabled={true}
                  />
                </FormGroup>
              </Col>
              <Col className="text-center p-3">
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0 d-flex">
                  <Label for="password" className="mr-sm-2 m-2">
                    Password:
                  </Label>
                  <Input
                    className="Inputs"
                    type="password"
                    name="password"
                    onChange={(e) => handleInputDataChange(e, userId)}
                    id={`password-${userId}`}
                    placeholder="password"
                    disabled={true}
                  />
                  <Button
                    style={{
                      cursor: "pointer",
                      backgroundColor: "darkslategray",
                    }}
                    className="p-1"
                  >
                    <h2>👁</h2>
                  </Button>
                </FormGroup>
              </Col>
              <Col className="text-center p-3">
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0 d-flex">
                  <Label for="email" className="mr-sm-2 m-2">
                    Email:
                  </Label>
                  <Input
                    className="Inputs"
                    type="email"
                    name="email"
                    onChange={(e) => handleInputDataChange(e, userId)}
                    id={`email-${userId}`}
                    placeholder="something@idk.cool"
                    disabled={true}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
    </div>
  );

  return { element, notEditableElement };
};

// eslint-disable-next-line react-refresh/only-export-components
const ExistsUserSettingsContent = (
  handleInputDataChange: (event: MyChangeEvent, userId: string) => void,
  superUsersData: Users[] | undefined
) => {
  
  const existsElement = superUsersData?.map((userData) => {
    const userId = userData.user_id;
    return {
      id: userData.user_id,
      status: false,
      element: (
        <div>
          <Container key={userId} className="border border-muted shadow my-3">
            <Row>
              <Container>
                <Row>
                  <Col className="text-center p-3">
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 d-flex">
                      <Label for="username" className="mr-sm-2 m-2">
                        Username:
                      </Label>
                      <Input
                        className="Inputs"
                        type="text"
                        name="username"
                        defaultValue={userData.username}
                        onChange={(e) => handleInputDataChange(e, userId)}
                        id={`username-${userId}`}
                        placeholder="username"
                        disabled={true}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="text-center p-3">
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 d-flex">
                      <Label for="password" className="mr-sm-2 m-2">
                        Password:
                      </Label>
                      <Input
                        className="Inputs"
                        type="password"
                        name="password"
                        defaultValue={userData.password}
                        onChange={(e) => handleInputDataChange(e, userId)}
                        id={`password-${userId}`}
                        placeholder="password"
                        disabled={true}
                      />
                      <Button
                        style={{
                          cursor: "pointer",
                          backgroundColor: "darkslategray",
                        }}
                        className="p-1"
                      >
                        <h2>👁</h2>
                      </Button>
                    </FormGroup>
                  </Col>
                  <Col className="text-center p-3">
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 d-flex">
                      <Label for="email" className="mr-sm-2 m-2">
                        Email:
                      </Label>
                      <Input
                        className="Inputs"
                        type="email"
                        name="email"
                        defaultValue={userData.email}
                        onChange={(e) => handleInputDataChange(e, userId)}
                        id={`email-${userId}`}
                        placeholder="something@idk.cool"
                        disabled={true}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Container>
            </Row>
          </Container>
        </div>
      ),
    };
  });
  const existsEditableElement = superUsersData?.map((userData) => {
    const userId = userData.user_id;
    return {
      id: userData.user_id,
      status: false,
      element: (
        <div>
          <Container key={userId} className="border border-muted shadow my-3">
            <Row>
              <Container>
                <Row>
                  <Col className="text-center p-3">
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 d-flex">
                      <Label for="username" className="mr-sm-2 m-2">
                        Username:
                      </Label>
                      <Input
                        className="Inputs"
                        type="text"
                        name="username"
                        defaultValue={userData.username}
                        onChange={(e) => handleInputDataChange(e, userId)}
                        id={`username-${userId}`}
                        placeholder="username"
                        disabled={false}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="text-center p-3">
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 d-flex">
                      <Label for="password" className="mr-sm-2 m-2">
                        Password:
                      </Label>
                      <Input
                        className="Inputs"
                        type="password"
                        name="password"
                        defaultValue={userData.password}
                        onChange={(e) => handleInputDataChange(e, userId)}
                        id={`password-${userId}`}
                        placeholder="password"
                        disabled={false}
                      />
                      <Button
                        style={{
                          cursor: "pointer",
                          backgroundColor: "darkslategray",
                        }}
                        className="p-1"
                      >
                        <h2>👁</h2>
                      </Button>
                    </FormGroup>
                  </Col>
                  <Col className="text-center p-3">
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 d-flex">
                      <Label for="email" className="mr-sm-2 m-2">
                        Email:
                      </Label>
                      <Input
                        className="Inputs"
                        type="email"
                        name="email"
                        defaultValue={userData.email}
                        onChange={(e) => handleInputDataChange(e, userId)}
                        id={`email-${userId}`}
                        placeholder="something@idk.cool"
                        disabled={false}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Container>
            </Row>
          </Container>
        </div>
      ),
    };
  });

  return { existsElement, existsEditableElement };
};

export const useDisplayUserInput = (
  handleInputDataChange: (event: MyChangeEvent, userId: string) => void,
  superUsersData: Users[] | undefined
) => {
  const dispatch = useAppDispatch();
  
  const contentState = useAppSelector((state:RootState)=>state.InputReducer.SuperUserContents);

  const existsUserElement = ExistsUserSettingsContent(
    handleInputDataChange,
    superUsersData,
  ).existsElement;
  const existsUserContents = existsUserElement?.map((userElement) => ({
    id: userElement.id,
    status: userElement.status,
    element: userElement.element,
  }));

  return () => {
    if(contentState.length === 0)
    existsUserContents?.forEach((userContent) => {
      return dispatch(addSuperUserInput(userContent))
    })
  }
};

export const useIncreaseUserInput = (
  handleInputDataChange: (event: MyChangeEvent, userId: string) => void,
  userId: string
) => {
  const dispatch = useAppDispatch();
  const newElement = UserSettingsContent(userId, handleInputDataChange).element;
  const newContent = {
    id: userId,
    status: true,
    element: newElement,
  };
  return () => {
    dispatch(addSuperUserInput(newContent));
  };
};

export const useSetInputValue = (
  handleInputDataChange: (event: MyChangeEvent, userId: string) => void
) => {
  const dispatch = useAppDispatch();
  const userContents = useAppSelector(
    (state: RootState) => state.InputReducer.SuperUserContents
  );

  return (userId: string) => {
    const selectedContent = userContents.find((content) => {
      return content.id === userId;
    });
    const editableItem = UserSettingsContent(
      userId,
      handleInputDataChange
    ).notEditableElement;
    const item = UserSettingsContent(userId, handleInputDataChange).element;

    let editableContent: SuperUserContentsInputP;
    if (selectedContent?.status === true) {
      editableContent = {
        element: editableItem,
        status: false,
        id: userId,
      };
      return dispatch(editStatusSuperUserInput(editableContent));
    }
    editableContent = {
      element: item,
      status: true,
      id: userId,
    };

    dispatch(editStatusSuperUserInput(editableContent));
  };
};
