import React, { useState, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt  } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({isOpen = false, value = false, onClose, deleteTask, selectedChange, editTask}) => {
  const [selectStatus, setSelectStatus] = useState(false);

  useEffect(() => {
    setSelectStatus(value.completed === 1 ? "completed" : "pending")
  }, [value])

  const handleChange = (event) => {
    setSelectStatus(event.target.value);
    selectedChange(value.id, event.target.value)
  }

  return (
    <Menu right noOverlay isOpen={isOpen} onClose={onClose} itemListElement="div" width={ 350 } disableAutoFocus >
      <div className="sidebar-title__label">
        {value.title}
      </div>
      <select name="sidebar-completed" id="completed" onChange={handleChange} value={selectStatus}>
        <option value="pending">Status: Pending</option>
        <option value="completed">Status: Completed</option>
      </select>
      <div className="sidebar-created__label">Created</div>
      <div className="sidebar-text">{value.created}</div>
      <div className="sidebar-description__label">Description</div>
      <div className="sidebar-text">{value.description}</div>
      <div className="sidebar-buttons">
        <Button className="sidebar-button__edit" onClick={() => editTask(value)}>
          <FontAwesomeIcon className="sidebar-button__icon" icon={faPencilAlt} /> Edit
        </Button>
        <Button className="sidebar-button__delete" onClick={() => deleteTask(value.id)}>
          <FontAwesomeIcon className="sidebar-button__icon" icon={faTrashAlt} /> Delete
        </Button>
      </div>
    </Menu>
  );
};

export default Sidebar;