class Validation{
    static renameSameFile(title,files){
        for(let el of files){
            if(el.title === title){
                return this.renameSameFile(title + "_c",files);
            }
        }
        return title;
    }
}
export default Validation;