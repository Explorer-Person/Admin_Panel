import { Container } from "reactstrap";
import hubCss from "/public/css/hub.module.css";
import { Link } from "react-router-dom";
import { ConfigureBoxWithHover } from "../componentUIParts/HubUIParts/Hub.UI.Elements";
import { useAppDispatch } from "../../../redux/stores/hooks";
import { toggleSideBar } from "../../../redux/slices/PagesSlices";

interface HubUIProps{
  rootAccess: boolean;
}

const HUB_UI = ({rootAccess}: HubUIProps) => {
  const dispatch = useAppDispatch();
  const toggleSideMenu = () => {
    dispatch(toggleSideBar("-15%"));
  };
  return (
    <div onClick={toggleSideMenu}>
      <Container className={hubCss.mainBox}>
        <div className={hubCss.flexBox}>
          <div className={`${hubCss.linkBoxes} text-center`}>
            <Link to="/admin/seeContents">
              <ConfigureBoxWithHover index={1} text="See Contents" />
            </Link>
          </div>
          <div className={`${hubCss.linkBoxes} text-center`}>
            <Link to="/admin/addContent">
              <ConfigureBoxWithHover index={2} text="Add Content" />
            </Link>
          </div>
        </div>
        {
         !rootAccess ? null : <div>
          <div>
            <Link className={`${hubCss.linkBoxes} text-center`} to="/admin/management">
              <Container className={`h2 text-light ${hubCss.box5}`}>Manage Admin Users</Container>
            </Link>
          </div>
        </div>
        }
        
        <div className={hubCss.flexBox}>
          <div className={`${hubCss.linkBoxes} text-center`}>
            <Link to="/admin/updateContents">
              <ConfigureBoxWithHover index={3} text="Update Contents" />
            </Link>
          </div>
          <div className={`${hubCss.linkBoxes} text-center align-items-center`}>
            <Link to="/admin/deleteContents">
              <ConfigureBoxWithHover index={4} text="Delete Contents" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HUB_UI;
