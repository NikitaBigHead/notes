import React, { useEffect, useRef, useState } from "react";
import "./Note.css";
import { Data } from "../../data/getFiles";
import Validation from "../../js/Validation";

import archiveImg from "../../images/note_icons/free-icon-archive-1343124.png";
import closeImg from "../../images/note_icons/free-icon-close-4013407.png";
import photosImg from "../../images/note_icons/free-icon-photos-4618132.png";
import recylceImg from "../../images/note_icons/free-icon-recycle-bin-3156999.png";
import todoImg from "../../images/note_icons/free-icon-wishlist-4947789.png";

const Note = ({
    activeNote,
    setActiveNote,
    inputFieldData = null,
    setInputFiledData = null,
    path,
    setPath,
}) => {
    const currentDir =
        path.length !== 0 ? path[path.length - 1] : { title: "", files: [] };

    const onKeyDown = (event) => {
        let element = event.target;

        element.style.height = "1px";
        element.style.height = 25 + element.scrollHeight + "px";
    };

    const saveNote = () => {
        setPath((prev) => {
            let filesCopied = Data.getDirRenamedFiles(prev, inputFieldData);
            Data.setFiles(filesCopied);

            let prev_copied = [...prev];
            prev_copied[prev_copied.length - 1] =
                Data.getCurrentPathFolder(prev_copied);

            return prev_copied;
        });
    };

    const onClose = (e) => {
        if (e.target === e.currentTarget) {
            saveNote();
            noteRef.current.className = "note";
            noteContentRef.current.className = "note_content";
            setTimeout(() => setActiveNote(false), 300);
        }
    };

    const onMoveToArchive = (e) => {
        Data.setFiles();
    };
    const onDelete = (e) => {
        let answer = window.confirm("Удалить заметку?");
        if (!answer) return;

        setPath((prev) => {
            let filesCopied = Data.getDirWithDeletedFiles(prev, [
                inputFieldData.index,
            ]);
            Data.setFiles(filesCopied);

            let prev_copied = [...prev];
            prev_copied[prev_copied.length - 1] =
                Data.getCurrentPathFolder(path);

            noteRef.current.className = "note";
            noteContentRef.current.className = "note_content";
            setTimeout(() => setActiveNote(false), 300);

            return prev_copied;
        });
    };

    const onAddImage = (e) => {
        if (e.target !== e.currentTarget) return;

        let input = document.createElement("input");
        input.type = "file";
        input.style.display = "none";
        input.accept = "image/*";

        input.onchange = (e) => {
            var file = e.target.files[0];

            var reader = new FileReader();

            reader.onload = (e) => {
                let src = e.target.result;

                setInputFiledData((prev) => {
                    let data = Object.assign({}, prev);
                    data.elements.push({ type: "img", src: src });
                    return data;
                });
            };

            reader.readAsDataURL(file);
        };
        input.click();
    };
    const onDeleteImage = (e, i) => {
        setInputFiledData((prev) => {
            //let data = [...prev];
            let data = Object.assign({}, prev);
            data.elements.splice(i, 1);
            return data;
        });
    };

    const onAddText = (e) => {
        if (e.target !== e.currentTarget) return;

        setInputFiledData((prev) => {
            //let data = [...prev];
            let data = Object.assign({}, prev);
            data.elements.push({ type: "text", text: "" });
            return data;
        });
    };

    const onDeleteText = (e, i) => {
        setInputFiledData((prev) => {
            let data = Object.assign({}, prev);
            data.elements.splice(i, 1);
            return data;
        });
    };

    const onChangeTextArea = (e, i) => {
        //let elName = e.currentTarget.nodeName;
        let event = Object.assign({}, e);

        setInputFiledData((prev) => {
            //let fieldData = [...prev];
            let data = Object.assign({}, prev);
            data.elements[i].text = event.currentTarget.value;
            return data;
        });
    };

    const onChangeTitleNote = (e) => {
        let event = Object.assign({}, e);
        setInputFiledData((prev) => {
            let data = Object.assign({}, prev);
            data.title = event.currentTarget.value;
            return data;
        });
    };

    const onAddToDoList = (e) => {
        if (e.target !== e.currentTarget) return;

        setInputFiledData((prev) => {
            // let data = [...prev];
            let data = Object.assign({}, prev);
            data.elements.push({
                type: "todo",
                title: "Список",
                elements: [{ text: "пункт списка", checked: false }],
            });
            return data;
        });
    };

    const onDeleteToDoList = (e, i) => {
        setInputFiledData((prev) => {
            let data = Object.assign({}, prev);
            data.elements.splice(i, 1);
            return data;
        });
    };

    const onChangeCheckedToDoList = (e, i, j) => {
        let event = Object.assign({}, e);
        setInputFiledData((prev) => {
            // let fieldData = [...prev];
            let data = Object.assign({}, prev);
            data.elements[i].elements[j].checked =
                !data.elements[i].elements[j].checked;
            return data;
        });
    };

    const onChangeTextToDoList = (e, i, j) => {
        let event = Object.assign({}, e);
        setInputFiledData((prev) => {
            // let fieldData = [...prev];
            let data = Object.assign({}, prev);
            data.elements[i].elements[j].text = event.currentTarget.value;
            return data;
        });
    };

    const onDeleteItemToDoList = (e, i, j) => {
        let event = Object.assign({}, e);

        setInputFiledData((prev) => {
            // let fieldData = [...prev];
            let data = Object.assign({}, prev);
            data.elements[i].elements.splice(j, 1);
            return data;
        });
    };

    const onChangeTitleToDoList = (e, i) => {
        let event = Object.assign({}, e);

        setInputFiledData((prev) => {
            // let fieldData = [...prev];
            let data = Object.assign({}, prev);
            data.elements[i].title = event.currentTarget.value;
            return data;
        });
    };

    const onAddNewElementToDoList = (e, i) => {
        let value = e.currentTarget.parentNode.firstChild.value;
        // let event = Object.assign({},e);
        e.currentTarget.parentNode.firstChild.value = "";
        setInputFiledData((prev) => {
            // let fieldData = [...prev];
            let data = Object.assign({}, prev);
            data.elements[i].elements.push({ text: value, checked: false });
            return data;
        });
    };

    const setJSX = (el, i) => {
        if (el.type === "text") {
            return (
                <div className="textArea_container">
                    <textarea
                        className="note_text"
                        placeholder="Введите текст..."
                        key={i}
                        value={inputFieldData.elements[i].text}
                        onKeyDown={onKeyDown}
                        onChange={(e) => onChangeTextArea(e, i)}
                    />
                    <button
                        className="item_button"
                        onClick={(e) => onDeleteText(e, i)}
                    >
                        Удалить
                    </button>
                </div>
            );
        } else if (el.type === "todo") {
            return (
                <fieldset className="todo_container">
                    <legend>
                        <input
                            className="item_text legend_name"
                            placeholder="Название списка"
                            value={inputFieldData.elements[i].title}
                            onChange={(e) => onChangeTitleToDoList(e, i)}
                        />
                    </legend>
                    <ul className="todo">
                        {inputFieldData.elements[i].elements.map((el, j) => (
                            <li className="todo_item" key={i * 10 + j}>
                                <input
                                    className="item_checkbox"
                                    type="checkbox"
                                    checked={el.checked}
                                    onChange={(e) =>
                                        onChangeCheckedToDoList(e, i, j)
                                    }
                                />

                                <input
                                    className={
                                        el.checked
                                            ? "item_text complete"
                                            : "item_text"
                                    }
                                    placeholder="..."
                                    value={el.text}
                                    onChange={(e) =>
                                        onChangeTextToDoList(e, i, j)
                                    }
                                />

                                <button
                                    className="item_el_button"
                                    onClick={(e) =>
                                        onDeleteItemToDoList(e, i, j)
                                    }
                                >
                                    x
                                </button>
                            </li>
                        ))}
                        <li className="todo_item add_todo_el">
                            <input className="add_todo_input" />
                            <button
                                className="add_todo_button"
                                onClick={(e) => onAddNewElementToDoList(e, i)}
                            >
                                Добавить
                            </button>
                        </li>
                    </ul>
                    <button
                        className="item_button"
                        onClick={(e) => onDeleteToDoList(e, i)}
                    >
                        Удалить
                    </button>
                </fieldset>
            );
        } else if (el.type === "img") {
            return (
                <div className="item_image_container">
                    <img className="item_image" src={el.src} />
                    <button
                        className="item_button"
                        onClick={(e) => onDeleteImage(e, i)}
                    >
                        Удалить
                    </button>
                </div>
            );
        }

        return <></>;
    };

    const inputRef = useRef(null);
    const noteRef = useRef(null);
    const noteContentRef = useRef(null);
    const inputField = useRef(null);

    return (
        <div
            className={activeNote ? "note active" : "note"}
            ref={noteRef}
            onClick={onClose}
        >
            <div
                className={activeNote ? "note_content active" : "note_content"}
                ref={noteContentRef}
            >
                <input
                    className="note_title"
                    placeholder="Введите заголовок..."
                    ref={inputRef}
                    value={inputFieldData.title}
                    onKeyDown={onKeyDown}
                    onChange={onChangeTitleNote}
                />

                <div
                    className="inputField"
                    ref={inputField}
                    onClick={onAddText}
                >
                    {inputFieldData.elements.map((el, i) => setJSX(el, i))}
                </div>

                <div className="buttons">
                    <img
                        src={archiveImg}
                        className="button_icon"
                        onClick={onMoveToArchive}
                    ></img>
                    <img
                        src={photosImg}
                        className="button_icon"
                        onClick={onAddImage}
                    ></img>
                    <img
                        src={todoImg}
                        className="button_icon"
                        onClick={onAddToDoList}
                    ></img>
                    <img
                        src={recylceImg}
                        className="button_icon"
                        onClick={onDelete}
                    ></img>
                    <img
                        src={closeImg}
                        className="button_icon"
                        onClick={onClose}
                    ></img>
                </div>
            </div>
        </div>
    );
};

export default Note;
