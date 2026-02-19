import '../styles/List.css';
import { useSelector, useDispatch } from 'react-redux';
import {del, setEdit } from '../feature/todos';
import { useEffect } from 'react';
import { FaPencilAlt, FaTrashAlt  } from "react-icons/fa";
import Swal from 'sweetalert2'

export default function List() {
    const item = useSelector((state) => state.list.item);
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(item);
    }, []);

    const remove = (uuid) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to retrieve your To-Do record!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3887BE",
            cancelButtonColor: "#DC8686",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
        if (result.isConfirmed) {
            dispatch(del(uuid));
            dispatch(setEdit(null));
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
            }
        });
    };

    const edit = (uuid, todo) => {
        dispatch(setEdit({ uuid, todo }));
    };

    return (
        <>
            {item.length > 0 && (
                <div className="list-container">
                    <div className="list-item">
                        {item.map((m, i) => (
                            <div key={i} className='content'>
                                <span className='content-details'>Task : {i + 1} {m.toDo} <small>({m.currentDateTime})</small></span>
                                <div className="action">
                                    <button className='btn-action' onClick={() => remove(m.uuid)}>
                                        <FaTrashAlt size={17} color={'#DC8686'}/>
                                    </button>
                                    <button className='btn-action' onClick={() => edit(m.uuid, m.toDo)}>
                                        <FaPencilAlt size={17} color={'#3887BE'}/>
                                    </button>
                                </div>
                            </div>
                        ))}
                        
                    </div>
                </div>
            )}
            
        </>
    )
}