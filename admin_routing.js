const express=require("express");
const fs=require("fs");
const app=express();

//app.use() 미들웨어 :요청이 들어오면 먼저 검사를 실시하고 요청으로 보내는 것 [검문소]
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
//app.use("/admin/",(req,res,next)=>{}) //미들웨어
app.get("/admin/",(req,res)=>{
    res.sendFile(__dirname+"/admin/index.html");
})
app.get("/admin/mem/list/:page",(req,res)=>{
    const conn=mysql.createConnection(con_info);
    conn.connect((e)=>{
        if(e)throw new Error(e.message);
        conn.query("SELECT * FROM MEMBER",(e,result)=>{
            fs.readFile("./public/admin/mem_list.html",(e,data)=>{
                if(e){console.log(e);}
                res.write(`
                        <script>
                            const MEMBER_LIST=${JSON.stringify(result)};
                            console.log(MEMBER_LIST)
                        </script>`);              
                res.write(data);              
                conn.end(()=>{})
                res.send();
            })
        })
    })
})
// admin/product/list/:page 요청이 동적리소스
// ./public/admin/product_list.html 정적리소스
app.get("/admin/product/list/:page",(req,res)=>{
    fs.readFile("./public/admin/product_list.html",(e,data)=>{
        if(e){console.log(e.message);}
        let mysqlConnPromise=mysqlConn();
        mysqlConnPromise.
        then((conn)=>{
            return new Promise((resolve)=>{
                conn.query("SELECT * FROM PRODUCT",(e,result)=>{
                    resolve(result);   
                })
            })
        })
        .then((result)=>{
            console.log(result);
        })
    })
});
app.listen(1234);
function mysqlConn(){
    return new Promise((resolve)=>{
        const conn=mysql.createConnection(con_info)
        conn.connect((e)=>{
            resolve(conn);
        })
    })
}




