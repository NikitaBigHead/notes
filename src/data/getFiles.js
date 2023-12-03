export class Data{
    static dir = {};

    static getFilesFromLocalStorage(keyName = "directory" ){
        const dataFiles = localStorage.getItem(keyName) === null?

        localStorage.setItem(keyName,JSON.stringify(
          {title:"root",type:"folder", files:[] })):

        localStorage.getItem(keyName);
        
        let temp = JSON.parse(dataFiles);
        this.setFiles(temp,keyName);
        return temp;
    }
    static setFiles(dir,keyName = "directory"){
        this.dir = Object.assign({},dir);
        localStorage.setItem(keyName,JSON.stringify(dir));
    }
    static getFiles(){
        return Object.assign({}, this.dir);
    } 
    static getListFolders(dir){
        let arr = [];
        let files = dir.files;
        for(let i = 0;i<files.length;i++){
            if(files[i].type === "folder" ){
                arr.push(files[i].title);
            }
        }
        return arr;
    } 

    static getCurrentPathFolder(path){
        let dirCopied = Object.assign({},this.dir);
        let currentFolder = dirCopied;

        let newPath = [...path];

        newPath = newPath.splice(1,newPath.length - 1);
        for( let i = 0;i<newPath.length;i++){
            let files = this.getListFolders(currentFolder);
            let index =  files.indexOf(newPath[i].title);
            currentFolder = currentFolder.files[index];
        }
        return currentFolder; 
    }


    //промежуточная функция 
    static getCurrentFolder(path,currentFolder,dirCopied){
        let newPath = [...path]

        newPath = newPath.splice(1,newPath.length - 1);
        for( let i = 0;i<newPath.length;i++){
            let files = this.getListFolders(currentFolder);
            let index =  files.indexOf(newPath[i].title);
            currentFolder = currentFolder.files[index];
        }
        return currentFolder; 
    }

    static getDirWithNewFile(path,newFile){
        let dirCopied = Object.assign({},this.dir);
        let currentFolder = dirCopied;

        currentFolder = this.getCurrentFolder(path,currentFolder,dirCopied);

        console.log(currentFolder);
        currentFolder.files.push(newFile);
        return dirCopied;
    }
    static getDirWithDeletedFiles(path,selectedFileIndexes){
        let dirCopied = Object.assign({},this.dir);
        let currentFolder = dirCopied;

        currentFolder = this.getCurrentFolder(path,currentFolder,dirCopied);

        currentFolder.files = currentFolder.files.filter( (el,i)=>selectedFileIndexes.indexOf(i) < 0);
        return dirCopied;
    }

    static getDirRenamedTitleFiles(path,i,newTitle){
        let dirCopied = Object.assign({},this.dir);
        let currentFolder = dirCopied;

        currentFolder = this.getCurrentFolder(path,currentFolder,dirCopied);

        currentFolder.files[i].title = newTitle;
        return dirCopied; 
    }

    static getDirRenamedFiles(path,file){
        let dirCopied = Object.assign({},this.dir);
        let currentFolder = dirCopied;

        currentFolder = this.getCurrentFolder(path,currentFolder,dirCopied);
        currentFolder.files[file.index].title = file.title;

        // currentFolder.files[file.index].text = file.data;
        currentFolder.files[file.index].elements = file.elements;
        return dirCopied; 
    }
    
}

 