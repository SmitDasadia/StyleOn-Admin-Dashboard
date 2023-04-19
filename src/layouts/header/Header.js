/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import LogoWhite from "../../assets/images/logos/monsterlogowhite.svg";
import user1 from "../../assets/images/users/user1.jpg";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

const Header = ({ showMobmenu}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };

  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState()
  // const [userName, setuserName] = useState({value: null})
  const router = useRouter()

  useEffect(() => {
    console.log("I am for useEffect form _app.js.")
    
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ value: token })
      // setuserName({value: token.name})
      setKey(Math.random())
    }
  }, [router.query])

  const logout = () => {
    localStorage.removeItem('token')
    setUser({ value: null })
    setKey(Math.random())
    router.push('/')
    toast.success('You are successfully logged out.', {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }


  return (
    <Navbar color="dark" dark expand="md">
       
      <div className="d-flex align-items-center">
      <ToastContainer
      position="top-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
        <NavbarBrand href="/" className="d-lg-none">
          {/* <Image src={LogoWhite} alt="logo" /> */}
        </NavbarBrand>
        {/* <div className="text-white ">
          StyleOn Admin Dashboard
        </div> */}
        <Button color="dark" className="d-lg-none" onClick={showMobmenu}>
          <i className="bi bi-list"></i>
        </Button>
      </div>
      {/* <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div> */}



     

          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle color="dark">
              <div style={{ lineHeight: "0px" }}>
                <img
                  src='https://cdn-icons-png.flaticon.com/512/1154/1154459.png?w=740&t=st=1678703296~exp=1678703896~hmac=3c973ff9bb5a45b73b75022a45fa1bdf4410fe8c2b158cb5685a1958361b09b2'
                  alt="profile"
                  className="rounded-circle"
                  width="40"
                  height="40  "
                />
              </div>
            </DropdownToggle>
            <DropdownMenu className="m-2 p-3 " tyle={{ width: "250px", height: "150px" }}>
              <DropdownItem header>Info</DropdownItem>
              <DropdownItem>My Account</DropdownItem>
              <DropdownItem>Edit Profile</DropdownItem>
              
              <DropdownItem></DropdownItem>
              <DropdownItem></DropdownItem>

              {/* <button type="button" className="btn btn-dark">Dark</button> */}

              <DropdownItem className="btn bg-dark rounded-4 px-4 text-center text-white mt-10" onClick={logout}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>

        



      {/* <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link href="/">
              <a className="nav-link">Starter</a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/about">
              <a className="nav-link">About</a>
            </Link>
          </NavItem>
          <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
              DD Menu
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        
      </Collapse> */}
    </Navbar>
  );
};

export default Header;
