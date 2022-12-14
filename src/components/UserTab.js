import axios from 'axios';
import React, {useState, useRef, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {showUsers, setUsers} from '../Reducer/userSlice';
import Accordion from 'react-bootstrap/Accordion';
import {showUser, searchText, filterRole} from '../Reducer/actions';
import { Form } from 'react-bootstrap';
import _ from 'lodash';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';





export default function UserTab(){
    let user = useSelector(state => state.users);
    let list;
    const dispatch = useDispatch();
    function handleSubmit(event){
        event.preventDefault();
        dispatch(showUser(user.currentUser.access_token));

    }

    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();
      
        useEffect(() => {
          //Initialize debounce function to search once user has stopped typing every half second
          //This will run only once to intitialize, not on evry re render
          inputRef.current = _.debounce(onSearchText, 500);
        }, []);
      
        const onSearchText = (input) => {
            setLoading(true);
            dispatch(searchText(input)).then(
                (response) => {
                    setLoading(false);
                }
            );
        
        };

    const [order, setOrder] = React.useState('asc');
    const [sort, setSort] = React.useState("id");

    
      
        const handleInputChange = (event) => {
          const input = event.target.value;
          setInput(input);
          inputRef.current(input);
        };
      
    
        const handleRole = (event, role) => {
            setLoading(true);
            event.preventDefault();
            dispatch(filterRole(role)).then(
                setLoading(false),
            )
        }

    return (
        <div>
        <Accordion>
        <Accordion.Item eventKey = "Show all users">
        <Accordion.Header onClick = {handleSubmit}>Show all users</Accordion.Header>    
        <Accordion.Body>
            <div className = "dropDownHeading">
            <h6>Apply Filters</h6>
            </div>
        
      <div className = "dropDown">
        <DropdownButton
      align="end"
      title="Role"
      id="dropdown-menu-align-end"
      size = "sm"
    >
      
        <Dropdown.Item onClick = {(event) => handleSubmit(event)}>None</Dropdown.Item>
        <Dropdown.Item onClick = {(event) => handleRole(event, 'admin')}>Admin</Dropdown.Item>
        <Dropdown.Item onClick = {(event) => handleRole(event, 'normal')}>Normal</Dropdown.Item>
      
    </DropdownButton>
    </div>
        <Form>
                <Form.Group controlId="search">
                  <Form.Control
                    type="search"
                    placeholder="Enter text to search"
                    onChange={handleInputChange}
                    value={input}
                    autoComplete="off"
                  />
            </Form.Group>  
        </Form>  
        {loading && <p>...Loading</p>}
        {loading == false && user.users.map((user) => (
            
        <Accordion key = {user.id}>
        <Accordion.Item eventKey= {JSON.stringify(user.id)}>
            <Accordion.Header>{user.id}</Accordion.Header>
            <Accordion.Body>
            <p>ID = {user.id}</p>
            <p>Name = {user.name}</p>
            <p>Email = {user.email}</p>
            <p>Role = {user.role}</p>
            </Accordion.Body>
        </Accordion.Item>
        </Accordion>
        
        ))}
</Accordion.Body>        
</Accordion.Item>
</Accordion>    

        </div>
    )
}

