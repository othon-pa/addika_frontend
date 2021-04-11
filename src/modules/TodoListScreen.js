import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import DatePicker from "react-datepicker";
import Sidebar from '../components/Sidebar'
import styled from "styled-components";
import { Table, Button, Modal } from 'react-bootstrap';
import Request from '../helpers/Request';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPlusCircle  } from "@fortawesome/free-solid-svg-icons";
import CheckMarkGray from '../images/check-mark-gray.png';
import CheckMarkGreen from '../images/check-mark-green.png';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const TodoListScreen = withRouter(({ history }) => {
  const [searching, setSearching] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todos, setTodos] = useState([]);
  const [creatingTask, setCreatingTask] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(false);
  const items = [];

  const getTodos = useCallback(() => {
    setSearching(true);
    Request.get('/todos', null, { json: true }).then((data) => {
      console.log(data)
      setSearching(false);
      setTodos(data.data);

    }).catch((error) => {
      console.log(error);
    })
  }, [])

  const saveTask = () => {
    const details = {
        'title' : inputTitle,
        'description' : inputDescription
    }

    Request.post('/todos', details).then((data) => {
      getTodos();
    }).catch((error) => {
      console.log(error)
    })
    console.log(details);
  }

  const openDetails = (value, date) => {
    value.created = date;
    console.log(isOpen)
    setValue(value);
    setIsOpen(true);
  }

  const deleteTask = (taskId) => {
    Request.delete('/todos/' + taskId, null, { json: true }).then((data) => {
      getTodos();
    }).catch((error) => {
      console.log(error)
    })
  }

  const selectedChange = (taskId, completed) => {
    let params = {'completed': completed === "completed" ? 1 : 0};
    
    Request.patch('/todos/' + taskId, params, { json: true }).then((data) => {
      getTodos();
    }).catch((error) => {
      console.log(error)
    })
  }

  const closeDetails = () => {
    setIsOpen(false);
  }
  
  useEffect(() => {
    setTodos([]);
    getTodos();
  }, [getTodos, selectedDate])

  for (const [index, value] of todos.entries()) {
    const { id, title, description, completed, created } = value;
    let dateObject = new Date(created);
    let databaseDate = dateObject.getDate() + "/" + (monthNames[dateObject.getMonth()]) + "/" + dateObject.getFullYear();
    let selectedFormatedDate = selectedDate.getDate() + "/" + (monthNames[selectedDate.getMonth()]) + "/" + selectedDate.getFullYear();
    if (selectedFormatedDate !== false && databaseDate === selectedFormatedDate) {
      items.push(
      <tr key={id} onClick={() => openDetails(value, databaseDate)}>
        <td className="list-elements__icon"><img src={ completed === 0 ? CheckMarkGray : CheckMarkGreen } alt="icon-gray" /></td>
        <td className="list-elements__title">{title}</td>
        <td className="list-elements__created">{databaseDate}</td>
        <td className="list-elements__description">{description.length > 30 ? description.substring(0, 30) + '...' : description}</td>
      </tr>)
    }
  }


  const handleClose = () => setCreatingTask(false);
  const handleShow = () => setCreatingTask(true);

  const CustomInput = React.forwardRef((props, ref) => {
    return (
      <CustomDatePickDiv>
        <label onClick={props.onClick} ref={ref}>
          {props.value || props.placeholder}
        </label>
        <FontAwesomeIcon icon={faCalendarAlt} onClick={props.onClick} />
      </CustomDatePickDiv>
    );
  });

  return (
    <div id="outer-container">
      <Sidebar 
        pageWrapId={'page-wrap'} 
        outerContainerId={'outer-container'} 
        isOpen={isOpen} 
        value={value} 
        onClose={closeDetails} 
        deleteTask={deleteTask}
        selectedChange={selectedChange}
      />
      <div className="todo-list__container" id="page-wrap">
        <div className="todo-list__header">
          <p className="list-header__subtitle">Tasks</p>
          <div className="list-header__datepicker">
            <DatePicker 
              value= {"Created: " + selectedDate.getDate() + "/" + (monthNames[selectedDate.getMonth()]) + "/" + selectedDate.getFullYear()}
              onChange={date => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              customInput={<CustomInput />}
            />
          </div>
          <div className="horizontal-division"></div>
          <Button className="list-header__add" onClick={handleShow}>
            <FontAwesomeIcon icon={faPlusCircle} /> Add Task
          </Button>
        </div>
        <Table hover>
          <thead>
            <tr>
              <th className="list-elements__icon"></th>
              <th className="list-elements__title">Title</th>
              <th className="list-elements__created">Created</th>
              <th className="list-elements__description">Description</th>
            </tr>
          </thead>
          { !searching &&
            <tbody>
              {items}
            </tbody>
          }
        </Table>

        <Modal show={creatingTask} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Task</Modal.Title>
          </Modal.Header>
          <div className="vertical-division" />
          <Modal.Body>
          <form className="modal-form__newtask">
            <div className="modal-form__label">
              Title (Required)
            </div>
            <input className="modal-input__title addika-input" type="text" name="title" onChange={e => setInputTitle(e.target.value)}/>
            <div className="modal-form__label">
              Description
            </div>
            <textarea rows="4" className="modal-textarea__description addika-input" type="text" name="description" onChange={e => setInputDescription(e.target.value)}/>
          </form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="modal-button__close" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="modal-button__save" onClick={saveTask}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        
      </div>

    </div>
  );
})

export default TodoListScreen;

const CustomDatePickDiv = styled.div`
  background-color: white;
  padding: 0.3em 1em 0 1em;
`;