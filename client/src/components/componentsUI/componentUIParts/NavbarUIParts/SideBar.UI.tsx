import { useAppSelector } from "../../../../redux/stores/hooks";
import { RootState } from "../../../../redux/stores/store";
import hubCSS from "/public/css/hub.module.css";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

interface SidebarUIProps{
  handleLogout: ()=> void;
}

const SideBarUI = ({handleLogout}: SidebarUIProps) => {

    const sideBarLeft = useAppSelector((state: RootState)=> state.PagesReducer.sideBarLeft);
  return (
    <div style={{ right: sideBarLeft, zIndex: "2"}} className={`${hubCSS.sideBar}`}>
      <div style={{marginTop: "90%"}} className="text-center border-bottom">
        <img className="w-25 h-25 rounded-circle my-3 mb-4" src="/public/logos/adminPhoto.png" alt="" />
        <div></div>
      </div>
      <div>
        <Link to="/admin/addContent" className="text-light">
        <div className={`${hubCSS.pointer} ${hubCSS.sideBarElement} ${hubCSS.sideBarElementHover}`}>
          <h4 className="text-center py-4">ADD CONTENT</h4>
        </div>
        </Link>
        
        <Link to="/admin/updateContents" className="text-light">
        <div className={`${hubCSS.pointer} ${hubCSS.sideBarElement} ${hubCSS.sideBarElementHover}`}>
          <h4 className="text-center py-4">UPDATE CONTENT</h4>
        </div>
        </Link>

        <Link to="/admin/seeContents" className="text-light">
        <div className={`${hubCSS.pointer} ${hubCSS.sideBarElement} ${hubCSS.sideBarElementHover}`}>
          <h4 className="text-center py-4">SEE CONTENT</h4>
        </div>
        </Link>

        <Link to="/admin/deleteContents" className="text-light">
        <div className={`${hubCSS.pointer} ${hubCSS.sideBarElement} ${hubCSS.sideBarElementHover}`}>
          <h4 className="text-center py-4">DELETE CONTENT</h4>
        </div>
        </Link>
      </div>
      <div className="text-center mt-3">
        <h5><Button style={{backgroundColor:"#1E6B52"}} onClick={handleLogout}>Logout</Button></h5>
      </div>
    </div>
  );
};

export default SideBarUI;
