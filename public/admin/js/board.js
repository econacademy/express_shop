console.log(BOARD_LIST);

const boardlist=document.querySelector("#boardList");
const board=boardlist.querySelector(".boardClass");
BOARD_LIST.forEach((list)=>{
    const tr=board.cloneNode(true);
    tr.className="";
    let key;
    for(key in list){
        const board_value=tr.querySelector("."+key);
        board_value.innerText=list[key];
    }
    boardlist.append(tr);
})