import React, { useState } from 'react';

// cssssss

import './Sidebar.css';

//  framer motion





// this is for image
// import Logo from "../../../src/assets/img/stickynotelogo.png"
import Logo  from "../../../src/assets/img/colorslogo1.png";
 
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DoubleRightOutlined,
  UnorderedListOutlined,
  CalendarOutlined,
  FileTextOutlined,
  SearchOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Input, Divider } from 'antd';

import { Link } from 'react-router-dom';
import Routes from './Routes';
import { signOut } from 'firebase/auth';
import { useAuthContext } from '../../pages/Context/AuthContext'
import { auth } from '../../config/firebase';
const { Header, Sider, Content } = Layout;
const { Search } = Input;
export default function Sidbar() {

  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { isAuth, user, dispatch } = useAuthContext()

  const HandleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" })
        window.notify("SignOut User successfuly!", "Success")
      })
      .catch((err) => {
        window.notify("Something wants wrong", "error")
      })
  }





  return (




    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className='bg-white p-3'>

        
      <img src={Logo} 
   
        alt="Image Description"  
        style={{ width: '90px', height: '90px' , marginLeft:"2px", marginRight: "50px" , paddingBottom: "20px",paddingRight:"20px", marginBottom:"500px", position:"absolute", top:"0"}}
        />  
 

        <div className="demo-logo-vertical" />

   


     {/* this is for logo */}
        {/* <img src={Logo} 
        alt="Image Description"  
        style={{ width: '100px', height: '100px' , marginLeft:"2px", marginRight: "50px" , paddingBottom: "20px",paddingRight:"20px", marginTop:"5px"}}
        /> 
 */}


        <p className='ps-3 fw-bold mt-5' >Menu</p>
        <Input addonBefore={<SearchOutlined />} placeholder="Search" />


        <p className='ps-3 mt-4  fs-6' >Task</p>

        <Menu
          theme="light"
          mode="inline"
          style={{
            border: "none"
          }}
          defaultSelectedKeys={["/"]}


          items={[

            {
              key: '/upcoming',
              icon: <DoubleRightOutlined />,
              label: <Link to="/upcoming" className='nav-link'>Upcoming</Link>,
            },
            {
              key: '/today',
              icon: <UnorderedListOutlined />,
              label: <Link to="/today" className='nav-link'>Today</Link>,
            },
            {
              key: '/calendar',
              icon: <CalendarOutlined />,
              label: <Link to="/calender" className='nav-link'>Calender</Link>,
            },
            {
              key: '/',
              icon: <FileTextOutlined />,
              label: <Link to="/" className='nav-link'>Sticky Wall</Link>,
            },
          ]}
        />

        <Divider />

        <p className='ps-3 mt-4 fs-6' >List</p>
        <Menu
          theme="light"
          mode="inline"
          style={{
            border: "none"
          }}
          items={[
            {
              key: '/personal',
              icon: <div className='bg-danger ' style={{ width: "10px", height: "10px", borderRadius: "3px" }}></div>,
              label: <Link to="/personal" className='nav-link'>Personal</Link>,
            },
            {
              key: '/work',
              icon: <div className='bg-dark ' style={{ width: "10px", height: "10px", borderRadius: "3px" }}></div>,
              label: <Link to="/work" className='nav-link'>Work</Link>,
            },
            {
              key: '3',
              icon: <div className='bg-warning ' style={{ width: "10px", height: "10px", borderRadius: "3px" }}></div>,
              label: 'List 1 ',
            },
            {
              key: 'NewList',
              icon: <PlusOutlined className='me-2' />,
              label: <Link to="/work" className='nav-link'>Add New List</Link>,
            },
          ]}
        />

        <Divider />
        <Menu
          theme="light"
          mode="inline"
          style={{
            border: "none"
          }}

          items={[

            {
              key: '3',
              icon: <i className="fa-solid fa-arrow-right-from-bracket"></i>,
              label: <a className=' nav-link' onClick={HandleLogout} > Sign Out</a>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}

          />






          <span className='fs-3 fw-bold ms-2'><span style={{color:"red"}}>S</span><span style={{color:"#bc6c25"}}>t</span><span >i</span><span style={{color:"green"}}>c</span><span style={{color:"orange"}}>k</span><span style={{color: "skyblue"}}>y</span>  <span style={{color:"#ffc300"}}>W</span><span style={{color:"#f08080"}}>a</span><span style={{color:"#0fa3b1"}}>l</span><span style={{color:"#f95738"}}></span><span style={{color:"#57cc99"}}>l</span></span>

         

     

        </Header>
        <Content
          style={{
            margin: '24px 16px',
           
            minHeight: 280,
            background: colorBgContainer,
          }}
        >

          <Routes />
        </Content>
      </Layout>
    </Layout>
  );
}



