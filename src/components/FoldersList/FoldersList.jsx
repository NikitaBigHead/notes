import React, { useState } from 'react';
import "./FoldersList.css";

import  arrow from '../../images/free-icon-arrows-507256.png';
import openFolderIco from '../../images/folder.png';
import closedFolderIco from '../../images/free-icon-file-and-folder-6209214.png';
import { Data } from '../../data/getFiles';

const FoldersList = ({path,setPath}) => {
    const currentDir = path.length!==0 ? path[path.length - 1] : {title:"",files:[]};
    const onArrowClick = (e) => {
        setPath(prev=>{
            if(prev[prev.length - 1].title === "root") return prev;
            let prevCopied = [...prev];
            prevCopied.pop();
            return prevCopied;}
        );
    }
    return (
        <div className='foldersList'>
            <div className='currentFolder'>
                <img src={arrow} onClick={onArrowClick}/>
                <div className='foldersDir'>
                    {
                    path.map((el,i)=><span key={i}>{el.title}/</span>)}

                </div>
            </div>

            {Data.getListFolders(currentDir).map((el,index)=>
                <div key={index}
                    className='folderElementList'>
                <img src={closedFolderIco}/>
                {el}
                </div>
            )}
        </div>
    );
}

export default FoldersList;
