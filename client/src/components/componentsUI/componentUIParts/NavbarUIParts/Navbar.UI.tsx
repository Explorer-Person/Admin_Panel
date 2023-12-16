import {Navbar, NavbarBrand, NavItem} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import hubCSS from '/public/css/hub.module.css';
import { useAppDispatch } from '../../../../redux/stores/hooks';
import { toggleSideBar } from '../../../../redux/slices/PagesSlices';

export interface NavbarUIProps{
  isAuthUser: boolean | undefined;
}

const NavbarUI = ({isAuthUser}: NavbarUIProps) =>{
  const dispatch = useAppDispatch();
  const toggleSideMenu = () =>{
     dispatch(toggleSideBar("0"))
  }
    return(
        <Navbar className="m-0 d-flex" color="dark" dark>
        <NavbarBrand className="d-flex align-items-center" href="/admin/hub">
          <img color="white" src="/logos/icon-navbar.png"></img>
          <h2>ADMIN PANEL</h2>
        </NavbarBrand>
        <NavItem className="d-flex">
          {
               !isAuthUser ? <h3 className='mt-4'><NavbarBrand href='/login' className='text-light'>Login</NavbarBrand></h3> : <FontAwesomeIcon onClick={toggleSideMenu}  className={`text-light h1 m-2 mt-5 ${hubCSS.pointer}`} icon={faBars} />
          }
         
  
        </NavItem>
      </Navbar>
    )
}

export default NavbarUI;