import React from "react";
import "../../App.css";
import NavBar from "../../components/NavBar/NavBar";
import LeftBar from "../..//components/LeftBar/LeftBar";
import MainStage from "../..//components/MainStage/MainStage";
import { useEffect, useState } from "react";
import { Data } from "../../data/getFiles";

import Note from "../../components/Note/Note";
import { userDataContext, jwtTokenContext } from "../../hooks/contexts/context";

const NotesPage = () => {
    const [jwtToken, setjwtToken] = useState("");
    const [username, setUsername] = useState("Гость");
    const [path, setPath] = useState([]);

    const [selectedFileIndexes, setSelectedFileIndexes] = useState([]);

    const [activeNote, setActiveNote] = useState(false);
    const [inputFieldData, setInputFiledData] = useState({
        title: "",
        elements: [],
        index: 0,
    });

    const [isLogin, setLogin] = useState(false);

    useEffect(() => {
        let temp = Data.getFilesFromLocalStorage();
        setPath([temp]);
    }, []);

    useEffect(() => {
        if (jwtToken === "") return;
        Data.setFiles({});
    }, [jwtToken]);

    return (
        <userDataContext.Provider
            value={{
                isLogin,
                setLogin,
                jwtToken,
                setjwtToken,
                username,
                setUsername,
            }}
        >
            <div className="App">
                {activeNote && (
                    <Note
                        activeNote={activeNote}
                        setActiveNote={setActiveNote}
                        inputFieldData={inputFieldData}
                        setInputFiledData={setInputFiledData}
                        path={path}
                        setPath={setPath}
                    />
                )}

                <NavBar
                    path={path}
                    setPath={setPath}
                    selectedFileIndexes={selectedFileIndexes}
                    setSelectedFileIndexes={setSelectedFileIndexes}
                />

                <div className="Body">
                    <LeftBar path={path} setPath={setPath} />

                    <MainStage
                        path={path}
                        setPath={setPath}
                        selectedFileIndexes={selectedFileIndexes}
                        setSelectedFileIndexes={setSelectedFileIndexes}
                        setActiveNote={setActiveNote}
                        setInputFiledData={setInputFiledData}
                    />
                </div>
            </div>
        </userDataContext.Provider>
    );
};

export default NotesPage;
