import { useGetCsrfTokenQuery } from "../../../redux/apis/getCsrfToken";
import ManagementPanelUI from "../../componentsUI/componentPages/Management_Panel.UI";
import ErrorPage from "../../errors/ErrorPage";
import LoadingPage from "../../errors/LoadingPage";
import { useAppSelector } from "../../../redux/stores/hooks";
import { RootState } from "../../../redux/stores/store";

import { AddUserApiProps } from "../../../interface/UserData";
import {
  useSetUserMutation,
  useSetSuperUserMutation,
} from "../../../redux/apis/setUserApi";
import { useErrorBoundary } from "react-error-boundary";
import showMessage from "../../../messages/showMessage";

const ManagementPanel = () => {
  const { showBoundary } = useErrorBoundary();
  const [setUser] = useSetUserMutation();
  const [setSuperUser] = useSetSuperUserMutation();
  const allUserData = useAppSelector(
    (state: RootState) => state.UserDataReducer.AllUserData
  );
  const allSuperUserData = useAppSelector(
    (state: RootState) => state.UserDataReducer.AllSuperUserData
  );
  const {data: responseCsrf, isLoading: csrfLoading, isError: csrfError } = useGetCsrfTokenQuery();
  const csrfToken = responseCsrf?.csrfToken;


  if(csrfLoading){
    return <LoadingPage/>
  }
  if(csrfError){
    return <ErrorPage messageTitle="ERROR" messageBody="CSRF Error"/>
  }

  const handleSubmitUser = () => {
    const addUserProps: AddUserApiProps = {
      users: allUserData,
      csrfData: csrfToken,
    };
    setUser(addUserProps)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {    
        const result = res.error ? res.error : res.data;   
        if(result && result.data && result.data.errors && result.data.errors.length > 0){
         return result.data.errors.forEach((error: { msg: string; })=>{
            return showMessage(error.msg, "error");
          })    
        }
        if(result){
          return window.location.reload();
        }
      })
      .catch((err) => {
        return showBoundary(err);
      });
  };
  const handleSubmitSuperUser = () => {
    const addSuperUserProps: AddUserApiProps = {
      users: allSuperUserData,
      csrfData: csrfToken,
    };
    setSuperUser(addSuperUserProps)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res:any) => {
        const result = res.error ? res.error : res.data;   
        if(result && result.data && result.data.errors && result.data.errors.length > 0){
         return result.data.errors.forEach((error: { msg: string; })=>{
            return showMessage(error.msg, "error");
          })    
        }
        if(result){
          return window.location.reload();
        }
      })
      .catch((err) => {
        return showBoundary(err);
      });
  };

  return (
    <ManagementPanelUI
      handleSubmitUser={handleSubmitUser}
      handleSubmitSuperUser={handleSubmitSuperUser}
    />
  );
};
export default ManagementPanel;
