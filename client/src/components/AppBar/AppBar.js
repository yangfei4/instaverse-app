import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Layout, Image, Typography, Avatar, Button } from "antd";
import { useDispatch } from "react-redux";

import Logo from "../../images/Instaverse.png";
import style from "./style";
import { LOGOUT } from '../../constants/actionTypes';
import decode from "jwt-decode";

const { Title } = Typography;
const { Header } = Layout;

export default function AppBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    useEffect(()=>{
        const token = user?.token;

        if (token){
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        };

        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]); // when url changes, set the user

    const logout = () => {
        dispatch({ type: LOGOUT });
        navigate("/authform");
        setUser(null);
    }

    return (
    <Header style={style.header}>
        <Link to="/" >
            <div style={style.homeLink}>
                <Image style={style.image} width={45} preview={false} src={Logo} />
                &nbsp;
                <Title style={style.title}>Instaverse</Title>
            </div>
        </Link>
        {!user ? (
            <Link to="/authform">
                <Button htmlType="button" style={style.login}>
                    Log In
                </Button>
            </Link>
        ) : (
            <div style={style.userInfo}>
                <Avatar style={style.avatar} alt="username" size="large">
                    {user?.result?.username?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Title style={{...style.title, "margin-right": "10px"}} level={4}>
                    {user?.result?.username}
                </Title>
                <Button onClick={logout} htmlType='button'>
                    Log Out
                </Button>
            </div>
        )
        }
    </Header>
  )
}
