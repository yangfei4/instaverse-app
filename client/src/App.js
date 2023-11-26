import React from 'react';
import { Layout } from "antd";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import AuthForm from "./components/AuthForm";
import AppBar from './components/AppBar/AppBar';

import style from "./style";

const { Footer } = Layout;

const App = () => {
    return (
        <BrowserRouter>
            <Layout style={style.layout}>
                <AppBar />
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/authform' element={<AuthForm />}/>
                </Routes>
                <Footer style={style.footer}>2023 Instaverse</Footer>
            </Layout>
        </BrowserRouter>
    )
};

export default App;