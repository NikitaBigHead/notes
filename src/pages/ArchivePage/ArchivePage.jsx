import React from 'react';
import '../../App.css';
import NavBar from '../../components/NavBar/NavBar';
import LeftBar from "../..//components/LeftBar/LeftBar";
import MainStage from "../..//components/MainStage/MainStage";
import Note from '../../components/Note/Note';
import { useEffect, useState } from 'react';
import {Data} from '../../data/getFiles';

const ArchivePage = () => {
    const [path,setPath]= useState([]);

    const [selectedFileIndexes,setSelectedFileIndexes] = useState([]);

    const [activeNote,setActiveNote] = useState(false);

    useEffect(()=>{
        let temp = Data.getFilesFromLocalStorage("archive");
        setPath([temp]);
    },[]);

    const isArchive = true;

    return (
        <div className="App">
        {activeNote?<Note
          activeNote = {activeNote}
          setActiveNote = {setActiveNote}
          path = {path}
          setPath = {setPath} 
          />:
          <></>
        }
  
        <NavBar
            path = {path}
            setPath = {setPath} 
            selectedFileIndexes = {selectedFileIndexes}
            setSelectedFileIndexes = {setSelectedFileIndexes}
            isArchive = {isArchive}
            />
  
        <div className='Body'>
          <LeftBar
            path = {path}
            isArchive = {isArchive}
            />
  
          <MainStage
            path = {path}
            setPath = {setPath}

            selectedFileIndexes = {selectedFileIndexes}
            setSelectedFileIndexes = {setSelectedFileIndexes}
            setActiveNote = {setActiveNote}
            isArchive = {isArchive}
            />
        </div>
      </div> 
    );
}

export default ArchivePage;
