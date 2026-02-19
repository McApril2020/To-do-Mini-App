import { useState, useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import {add, update, setEdit } from '../feature/todos';
import '../styles/Add.css';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2'

export default function Add() {

    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [toDo, setTodo] = useState("");
    const [uuid, setUuid] = useState(""); 

    const editing = useSelector(state => state.list.editing);
    const add_item = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (editing) {
            setTodo(editing.todo);   
            setUuid(editing.uuid);   
        } else {
            setTodo("");
        }
    }, [editing]);

    const addTodo = () => {
        if(!toDo) {
            Swal.fire({
                text: "Fill out your To-Do field!",
                icon: "warning"
              });
            return;
        }

        if(editing) {
            add_item(update({ uuid, newText: toDo }));
            add_item(setEdit(null));
        } else {
            const currDateTime = new Date(currentDateTime)

            setUuid(uuidv4());
            add_item(add({
                uuid: uuidv4(),
                toDo,
                currentDateTime: currDateTime.toLocaleString()
            }));
        }

        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: `Successfully ${editing ? 'Updated' : 'Created'}`
          });
        
        setTodo("");
        setUuid("");
    };

    return (
        <>
            <div className="add-container">
                <span className='current-date'>
                    {/* <FaClock size={20}/> */}
                    {currentDateTime.toLocaleString()}
                    </span>
                <div>
                    <input className='todo' type='test' placeholder='To Do' value={toDo} onChange={(e => setTodo(e.target.value))}/>
                    <button className="add-btn" onClick={addTodo}>{!editing ? 'ADD' : 'UPDATE'}</button>
                </div>
            </div>
        </>
    )
}