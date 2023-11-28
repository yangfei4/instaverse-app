import React from 'react'
import { Row, Col, Spin } from "antd";
import { useSelector } from 'react-redux';

import Story from "../Story";

function StoryList({ setSelectedId }) {
  const stories = useSelector((state) => state.stories);

  return !stories.length ? 
  <div style={{textAlign: 'center'}}>
    <Spin size='large'/>
  </div> :
  (
    <Row gutter={[48, 32]}>
      {stories.map((story) => {
        return (
          <Col lg={24} xl={12} xxl={8}>
            <Story story={story} setSelectedId={setSelectedId}/>
          </Col>
        )
      })}
    </Row>
  );
 
}

export default StoryList; 