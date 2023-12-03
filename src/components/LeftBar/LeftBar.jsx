import React from 'react';
import "./LeftBar.css";

import archive from "../../images/archive.png";
import notes from "../../images/sticky-notes.png";

import FoldersList from '../FoldersList/FoldersList';
import { Link } from 'react-router-dom';

const linkStyle = {
    textDecoration:"none",color:'black'
};
const LeftBar = ({path,setPath = null,isArchive = false}) => {
    return (
        <div className='leftBar'>
            {/* <div className='nav'>
                <div className='navElement'>
                    <img src = {notes}/>
                    <Link style={linkStyle}
                        to = "/">Заметки</Link>
                </div>
                <div className='navElement'>
                    <img src = {archive}/> 
                    <Link style={linkStyle} 
                        to = "/archive">Архив</Link>
                </div>
            </div> */}
            {!isArchive?
            <FoldersList 
                path={path}
                setPath={ setPath}
            />:
            <></>
            }
        </div>
    );
}

export default LeftBar;
