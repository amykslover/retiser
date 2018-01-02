import React from "react";
// import "./EmptyPanel.css";
import { Panel } from 'react-bootstrap';
function addAccount() {
  alert('You have clicked on me');
}

const EmptyPanel = (
  <Panel onClick={addAccount}>
    Basic panel example
  </Panel>
);

export default EmptyPanel;