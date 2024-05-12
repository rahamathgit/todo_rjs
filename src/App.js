import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

const App = () => {
    const [edit, setEdit] = useState('');
    const [list, setList] = useState([]);

    function addsome(){
        if(!edit){
            alert('Empty Value')
            return
        }
        axios.post('http://localhost:1994/todo',{task:edit, checked:false}).then(res=>{
            
            setList([...list,res.data]);
        })
        setEdit('')
    }

    function updateList(id){
        let oldadd = [...list]
        oldadd = oldadd.map(list => {
            if(id === list.id)
                list.checked = !list.checked

                return list;
        })
        setList(oldadd)
    }

    function deleteTodo(id){
        const fun = list.filter(list => list.id !== id)
        setList(fun)
    }
    useEffect(()=>{
        axios.get('http://localhost:1994/todo').then(res=>{
            setList(res.data)
        })
        
    },[])
    return(
        <div className="container">
            <input className="copy" type="text" value={edit} onChange={(e)=>{setEdit(e.target.value)}} />
            <button className="btn" onClick={addsome}>ADD</button>
            <ul>
                {
                    list.map(list => (
                        <li key={list.id}>
                            <input type="checkbox" onChange={() => {updateList(list.id)}} />
                            <span style={{textDecoration:list.checked?'line-through':''}}>{list.task}</span>
                            <button className="btnel" style={{borderRadius:"50%", border:"none", padding:"5px 8px", margin:"10px", cursor:"pointer", color:"red", fontWeight:"bold"}}
                            onClick={()=>{deleteTodo(list.id)}}>X</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default App;