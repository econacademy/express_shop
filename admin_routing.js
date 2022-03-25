const express=require("express");
const fs=require("fs");
const app=express();

//app.use() 미들웨어 :요청이 들어오면 먼저 검사를 실시하고 요청으로 보내는 것 [검문소]
app.use(express.static("public"))
//모든 정적리소스(css,img,js 등이 요청이 들어오면 public 폴더에서 찾아서 응답해준다/)

const mysql=require("mysql");
const { resolve } = require("path");
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
app.get("/admin/product/list/:page",async(req,res)=>{
    let sql="SELECT * FROM PRODUCT";
    let data=fsData("./public/admin/product_list.html");
    let result=mysqlQuery(sql,[]);
    result=await result;
    data=await data;
    res.write(`<script>
    const ITEM_LIST=${JSON.stringify(result)};
    console.log(ITEM_LIST);
    </script>`);
    res.write(data);
    res.send();
    // result.end((e)=>{}) = > //왜 안되는지 모르겟네;
});
app.get("/admin/board/list/:page",async(req,res)=>{
    let sql="select * from board";
    let result_board=mysqlQuery(sql,[]);
    let data=fsData("./public/admin/board_list.html");
    result_board =await result_board;
    data=await data;
    res.write(`<script>const BOARD_LIST=${JSON.stringify(result_board)};
                       console.log(BOARD_LIST)</script>`);
    res.write(data);
    res.send();
})
app.listen(1234);
function fsData(path){
    return new Promise((resolve)=>{
        fs.readFile(path,(e,data)=>{
            if(e){console.log(e.message); data="<h1>404파일없음</h1>"}
            resolve(data);
        });
    });
}
function mysqlQuery(sql,params=[]){
    return (new Promise((resolve)=>{
        const create_conn=mysql.createConnection(con_info)
        create_conn.connect((e)=>{
            if(e){create_conn.end((e)=>{}); throw new Error("mysql 접속 에러 :"+e.message)}
            resolve(create_conn);
        })
    }).then((conn)=>{
        return new Promise((resolve)=>{
            conn.query(sql,params,(e,result)=>{
                if(e){conn.end((e)=>{});throw new Error(e)}
                resolve(result);
            })
        })
    })
    )
}




