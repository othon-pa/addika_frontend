import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import TodoListScreen from "./TodoListScreen"
import '../css/App.css';
import '../css/Sidebar.css';
import '../css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';

const MainPageScreen = withRouter(({ history }) => {
  const counter = useSelector(state => state.counter);
  const [creatingTask, setCreatingTask] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setCreatingTask(true);
  }, [])
  return (
    <div className="App">
      <header className="App-header" >
        <h2 className="todo-list__title">My Tasks</h2>
        <TodoListScreen/>

        {/* <h1>Counter: {counter}</h1>
        <button onClick={(() => dispatch({type: "INCREMENT"}))}>INCREMENT</button>
        <button onClick={(() => dispatch({type: "DECREMENT"}))}>DECREMENT</button> */}
      </header>
    </div>
  );
});

export default MainPageScreen;
