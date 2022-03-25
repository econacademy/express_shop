const express=require("express");
const app=express();
const mysql=require("mysql");
const fs=require("fs");

app.use(express.static("public"))

app.get("/",async(req,res)=>{
   const data=await fsData("./public/index.html");
   res.write(data);
   res.send();
})
app.get("/sign/in",(req,res)=>{
    res.sendFile(__dirname+"/public/login.html")
})
app.listen("9876");


function fsData(path){
    return new Promise((resolve)=>{
        fs.readFile(path,(e,data)=>{
            if(e){console.log(e.message); data="<h1>404파일없음</h1>"}
            resolve(data);
        });
    });
}
function mysqlConn(){
    return new Promise((resolve)=>{
        const conn=mysql.createConnection(con_info)
        conn.connect((e)=>{
            if(e){conn.end((e)=>{}); throw new Error("mysql 접속 에러 :"+e.message)}
            resolve(conn);
        })
    })
}
function queryResult(conn,sql,params=[]){
    return new Promise((resolve)=>{
        conn.query(sql,params,(e,result)=>{
            if(e){conn.end((e)=>{}); throw new Error("query 에러 :"+e.message)}
            resolve(result);
        })
    });
}
