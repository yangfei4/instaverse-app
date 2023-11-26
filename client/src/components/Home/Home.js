import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import StoryList from "../StoryList";
import StoryForm from '../StoryForm';

import {getStories} from "../../actions/stories";

import style from "./style";

import { Layout } from 'antd';
const { Sider, Content } = Layout;

const Home = () => {
    const [selectedId, setSelectedId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStories());
    }, [dispatch]);

    return (
        <Layout>
            <Sider width={400} style={style.sider}>
                <StoryForm selectedId={selectedId} setSelectedId={setSelectedId}/>
            </Sider>
            <Content style={style.content}>
                <StoryList setSelectedId={setSelectedId}/>
            </Content>
        </Layout>
    )
};

export default Home;