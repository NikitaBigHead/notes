import React, { useEffect, useRef, useState } from 'react';
import "./CreateNote.css";
import { Data } from '../../data/getFiles';
import Validation from '../../js/Validation';

const CreateNote = ({path,setPath}) => {
    const currentDir = path.length!==0 ? path[path.length - 1] : {title:"",files:[]};

    const onKeyDown = (element) =>{
        element = element.target;

        element.style.height = "1px";
        element.style.height = (25+element.scrollHeight)+"px";
    }
    const onFocusContainer = (element) =>{
        if(inputElement.current === null || textarea.current === null) return;
        
        if(element.target!== textarea.current
            && element.target!==inputElement.current){
                inputElement.current.className = "unvisible";

                if(inputElement.current.value==="" || textarea.current.value===""){
                    inputElement.current.value = "";
                    textarea.current.value = "";
                    return;
                }

                
                setPath(prev=>{
                    let newTitle = Validation.renameSameFile(inputElement.current.value,currentDir.files);
                    let filesCopied = Data.getDirWithNewFile(prev, 
                        {title:newTitle,
                        type:"note",
                        elements:[{type:"text",text:textarea.current.value}]}
                    );
                    Data.setFiles(filesCopied);
                    
                    inputElement.current.value = "";
                    textarea.current.value = "";


                    prev = [...prev];
                    prev[prev.length - 1] = Data.getCurrentPathFolder(prev);
                    return prev;}
                );

            }
        else{          
            inputElement.current.className = "";
        }
    }
    const inputElement = useRef(null);
    const textarea = useRef(null);
    const divElement = useRef(null);



    const onChangeTextArea = () =>{

    }
    const onChangeInput = () => {

    }

    useEffect(()=>{
        window.addEventListener("click",(e)=>onFocusContainer(e));
    },[])

    return (
        <div ref = {divElement}  className='createNote' >
            <input  ref = {inputElement} className='unvisible'
            type='text' placeholder='Введите заголовок'
                onChange={onChangeInput}
            />

            <textarea ref = {textarea} onKeyDown={onKeyDown}
            placeholder='Заметка...'
            onChange={onChangeTextArea}
            />
        </div>
    );
}

export default CreateNote;
