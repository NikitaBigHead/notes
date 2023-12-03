import React, { useContext, useEffect, useState } from "react";
import copy from "../../images/copy-two-paper-sheets-interface-symbol.png";
import del from "../../images/delete (1).png";
import create from "../../images/new-folder.png";
import "./navBar.css";
import { Data } from "../../data/getFiles";
import Validation from "../../js/Validation";

import login from "../../images/note_icons/enter.png";
import user from "../../images/note_icons/user-interface.png";

import { userDataContext } from "../../hooks/contexts/context";
import Autorization from "../Autorization/Autorization";

const NavBar = ({
    path,
    setPath,
    selectedFileIndexes,
    setSelectedFileIndexes,
    isArchive = false,
}) => {
    const currentDir =
        path.length !== 0 ? path[path.length - 1] : { title: "", files: [] };

    const { isLogin, setLogin, username, setUsername, setjwtToken } =
        useContext(userDataContext);

    const [isFormOpened, setOpenedForm] = useState(false);
    const openAutorizForm = (e) => {
        setOpenedForm(true);
    };
    const closeAutorizForm = (e) => {
        setOpenedForm(false);
    };
    const signOut = (e) => {
        const res = window.confirm("Вы уверены, что хотите выйти? ");
        if (!res) return;

        setLogin(false);
        setUsername("Гость");
        setjwtToken("");
    };
    const createFolder = (e) => {
        setPath((prev) => {
            let newTitle = Validation.renameSameFile(
                "Новая папка",
                currentDir.files
            );
            let filesCopied = Data.getDirWithNewFile(prev, {
                title: newTitle,
                type: "folder",
                files: [],
            });
            Data.setFiles(filesCopied);

            prev = [...prev];
            prev[prev.length - 1] = Data.getCurrentPathFolder(prev);
            return prev;
        });
    };

    const deleteFile = (e) => {
        let answer = window.confirm("Удалить файлы?");
        if (!answer) return;

        setPath((prev) => {
            let filesCopied = Data.getDirWithDeletedFiles(
                prev,
                selectedFileIndexes
            );
            Data.setFiles(filesCopied);

            prev = [...prev];
            prev[prev.length - 1] = Data.getCurrentPathFolder(path);
            return prev;
        });
        setSelectedFileIndexes([]);
    };

    return (
        <div className="nav_bar">
            <div className="logo">Notes</div>
            <div className="icons">
                <div className="icon" onClick={deleteFile}>
                    <img className="image" src={del} />
                </div>

                {!isArchive && (
                    <div className="icon" onClick={createFolder}>
                        <img className="image" src={create} />
                    </div>
                )}

                <div className="icon">
                    <h3>{username}</h3>
                    {!isLogin && (
                        <img
                            className="image"
                            src={login}
                            onClick={openAutorizForm}
                        />
                    )}
                    {isLogin && (
                        <img
                            className="image profile"
                            src={user}
                            onClick={signOut}
                        />
                    )}
                </div>
            </div>

            {isFormOpened && (
                <Autorization closeAutorizForm={closeAutorizForm} />
            )}
        </div>
    );
};

export default NavBar;
