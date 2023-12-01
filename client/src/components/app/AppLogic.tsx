import { ErrorBoundary } from "react-error-boundary";
import { useAppDispatch, useAppSelector } from "../../redux/stores/hooks";
import { toggleSideBar } from "../../redux/slices/PagesSlices";
import FallBackErrorPage from "../errors/FallBackErrorPage";
import { onErrorLogic, onResetLogic } from "../errors/logic/ErrorLogic";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import LoginAdmin from "../componentsLogic/configureContents/Login_Admin";
import ErrorPage from "../errors/ErrorPage";
import { AdminRoutes } from "./AdminRoutes";
import NavbarUI from "../componentsUI/componentUIParts/NavbarUIParts/Navbar.UI";
import SideBarUI from "../componentsUI/componentUIParts/NavbarUIParts/SideBar.UI";
import { useGetCsrfTokenQuery } from "../../redux/apis/getCsrfToken";
import { useLogoutAdminPanelMutation } from "../../redux/apis/authAdminApi";
import { RootState } from "../../redux/stores/store";

function AppLogic() {
  const dispatch = useAppDispatch();
  const authInfo = useAppSelector((state:RootState)=> state.AuthInfoReducer.userAuthInfo);

  const toggleSideMenu = () => {
    dispatch(toggleSideBar("-20%"));
  };

  const { data: csrfToken } = useGetCsrfTokenQuery();
  const [logout] = useLogoutAdminPanelMutation();
  const handleLogout = () => {
    if (csrfToken) {
       logout(csrfToken.csrfToken)
       .then((result)=>{
        if(result){
          window.location.reload();
          window.location.assign("/login");
        }
       });
    }
  };

  return (
    <div>
      <ToastContainer />
      <nav>
        <NavbarUI isAuthUser={authInfo.isAuthUser} />
        {!authInfo.isAuthUser ? undefined : <SideBarUI handleLogout={handleLogout}/>}
      </nav>

      <div onClick={toggleSideMenu}>
        <ErrorBoundary
          FallbackComponent={FallBackErrorPage}
          onError={onErrorLogic}
          onReset={onResetLogic}
        >
          <Routes>
            <Route path="/login" element={<LoginAdmin />} />
            <Route path="*" element={<AdminRoutes/>}/>
            <Route
              path="*"
              element={
                <ErrorPage messageTitle="404" messageBody="PAGE NOT FOUND!" />
              }
            />
          </Routes>
        </ErrorBoundary>
      </div>
    </div>
  );
}
export default AppLogic;
