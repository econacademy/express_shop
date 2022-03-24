const express=require("express");
const app=express();
app.use(express.static("public"))
//모든 정적리소스(css,img,js 등이 요청이 들어오면 public 폴더에서 찾아서 응답해준다/)

const mysql=require("mysql");
const con_info={
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mysql",
    database: "EXPRESS_SHOP"
}
app.get("/admin/",(req,res)=>{
    res.sendFile(__dirname+"/public/admin_index.html")
})
app.get("/admin/mem/list/:page",(req,res)=>{
    const conn=mysql.createConnection(con_info);
    conn.connect((e)=>{
        if(e)throw new Error(e.message);
        conn.query("SELECT * FROM MEMBER",(e,result)=>{
            res.sendFile(__dirname+"/public/mem_list.html");

            conn.end(()=>{})
        })
    })
})

app.listen(1234);


