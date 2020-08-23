import React from 'react';

import { Provider } from "react-redux";

import DynamicForm from "./components/DynamicForm";
import store from './redux/store'


function App() {
    return (
      <Provider store={store}>
        <DynamicForm/>
      </Provider>
    );
  
}

export default App;
