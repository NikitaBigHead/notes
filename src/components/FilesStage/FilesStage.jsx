import React, { useEffect, useRef, useState } from 'react';
import folder from "../../images/folder (4).png";
import note from "../../images/post-it.png";
import "./FileStage.css";
import Validation from '../../js/Validation';
import { Data } from '../../data/getFiles';

const FilesStage = ({path,setPath,
    selectedFileIndexes,setSelectedFileIndexes,
    setActiveNote,setInputFiledData,isArchive = false}) => {

    const currentDir = path.length!==0 ? path[path.length - 1] : {title:"1",files:[]};
    
    const onchangeInputTitle = (e,i) =>{

        if(e.target.value === ""){
            e.target.value = "Файл";
        }
        
        setPath(prev=>{
            let newTitle = Validation.renameSameFile(e.target.value,currentDir.files);
            let filesCopied = Data.getDirRenamedTitleFiles(prev,i,newTitle);
    
            Data.setFiles(filesCopied);

            prev = [...prev];
            prev[prev.length - 1] = Data.getCurrentPathFolder(prev) ;
            return prev;}
        );
    }

    const filesDivEl = useRef(null);

    useEffect(()=>{
        if(selectedFileIndexes.length === 0){
            for(let i = 0;i<filesDivEl.current.childNodes.length;i++){
                filesDivEl.current.childNodes[i].className = "file";
            }
        }
    },[selectedFileIndexes]);

    let clicks = 0;
    const onClickFile = (e,i)=>{
        clicks = e.detail;
        let event = Object.assign({},e);
        if(clicks === 1 ){
            setTimeout(()=>{
                if(clicks === 1){
                    onClickDone(event,i);
                }
                else{
                    onDoubleClickDone(event,i);
                }
                clicks = 0;
            },200); 
        }
    }

    const onClickDone = (e,i) =>{
        if( e.currentTarget.classList.contains("selected")){

            e.currentTarget.classList.remove("selected");
            setSelectedFileIndexes(prev=>{
                let selectedFileIndexesCopied = [...prev];
                selectedFileIndexesCopied.splice(
                    selectedFileIndexesCopied.indexOf(i),1);

                return selectedFileIndexesCopied;
            });
        }
        else{

            e.currentTarget.classList.add("selected");
            setSelectedFileIndexes(prev=>{
                    let selectedFileIndexesCopied = [...prev];
                    selectedFileIndexesCopied.push(i);
                    return selectedFileIndexesCopied;
            });
        }
    }
    const onDoubleClickDone = (e,i) =>{
        if(currentDir.files[i].type === "folder"){

            setPath(prev=>{
                let pathCopied = [...prev];
                let newFolder = {title:currentDir.files[i].title,type:"folder", files:currentDir.files[i].files};
                pathCopied.push(newFolder);
                return pathCopied;
            });

        }
        else if (currentDir.files[i].type === "note"){
            setActiveNote(prev=>true);

            setInputFiledData(prev=>{return {
                title:currentDir.files[i].title,
                elements:currentDir.files[i].elements,
                index:i
            }
            });
            return;
        }

    }
    return (
        <div className='files' ref={filesDivEl}>
            {currentDir.files.map((el,i)=>
                <div key={i} className='file'
                onClick={(e)=>onClickFile(e,i)}>    
                    <img src={el.type ==="folder"?folder:note}/>
                    <input className='disabled'
                        onChange={(e)=>onchangeInputTitle(e,i)} value={el.title}></input>
                </div>
            )
            }
        </div>
    );
}

export default FilesStage;
