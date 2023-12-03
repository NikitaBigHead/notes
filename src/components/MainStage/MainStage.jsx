import React, { useState } from 'react';
import "./MainStage.css"
import CreateNote from '../CreateNote/CreateNote';
import FilesStage from '../FilesStage/FilesStage';


const MainStage = ({path,setPath,
    selectedFileIndexes,setSelectedFileIndexes,
    setActiveNote,setInputFiledData = null,isArchive = false}) => {
    
    return (
        <div className='mainFile'>
            {!isArchive &&
            <CreateNote 
                path={path}
                setPath = {setPath}
            />
            }
            <FilesStage
                path={path}
                setPath = {setPath}
                selectedFileIndexes = {selectedFileIndexes}
                setSelectedFileIndexes = {setSelectedFileIndexes}
                setActiveNote = {setActiveNote}
                setInputFiledData = {setInputFiledData}
                isArchive = {isArchive}
            />
        </div>
    );
}

export default MainStage;
