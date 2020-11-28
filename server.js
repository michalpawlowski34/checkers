var http = require("http");
var fs = require("fs");
var qs = require("querystring");
var server = http.createServer(function (req, res) {
  switch (req.method) {
    case "GET":
      if (req.url == "/") {
        fs.readFile("static/index.html", function (error, data) {
          if (error) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
            res.end();
          } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.end();
          }
        });
      } else if (req.url == "/jquery.js") {
        fs.readFile("static/jquery.js", function (error, data) {
          if (error) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
            res.end();
          } else {
            res.writeHead(200, { "Content-Type": "application/javascript" });
            res.write(data);
            res.end();
          }
        });
      }
      else if (req.url == "/three.js") {
        fs.readFile("static/three.js", function (error, data) {
          if (error) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
            res.end();
          } else {
            res.writeHead(200, { "Content-Type": "application/javascript" });
            res.write(data);
            res.end();
          }
        });
      }
      else if (req.url == "/Main.js") {
        fs.readFile("static/Main.js", function (error, data) {
          if (error) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
            res.end();
          } else {
            res.writeHead(200, { "Content-Type": "application/javascript" });
            res.write(data);
            res.end();
          }
        });
      } else if (req.url == "/Net.js") {
        fs.readFile("static/Net.js", function (error, data) {
          if (error) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
            res.end();
          } else {
            res.writeHead(200, { "Content-Type": "application/javascript" });
            res.write(data);
            res.end();
          }
        });
      } else if (req.url == "/Ui.js") {
        fs.readFile("static/Ui.js", function (error, data) {
          if (error) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
            res.end();
          } else {
            res.writeHead(200, { "Content-Type": "application/javascript" });
            res.write(data);
            res.end();
          }
        });
      } else if (req.url == "/Game.js") {
        fs.readFile("static/Game.js", function (error, data) {
          if (error) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
            res.end();
          } else {
            res.writeHead(200, { "Content-Type": "application/javascript" });
            res.write(data);
            res.end();
          }
        });
      }
      else if (req.url == "/Pionek.js") {
        fs.readFile("static/Pionek.js", function (error, data) {
          if (error) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
            res.end();
          } else {
            res.writeHead(200, { "Content-Type": "application/javascript" });
            res.write(data);
            res.end();
          }
        });
      }
      else if (req.url == "/Field.js") {
        fs.readFile("static/Field.js", function (error, data) {
          if (error) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
            res.end();
          } else {
            res.writeHead(200, { "Content-Type": "application/javascript" });
            res.write(data);
            res.end();
          }
        });
      }
       else if (req.url == "/style.css") {
        fs.readFile("static/style.css", function (error, data) {
          if (error) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
            res.end();
          } else {
            res.writeHead(200, { "Content-Type": "text/css" });
            res.write(data);
            res.end();
          }
        });
      }
      else if (req.url == "/mats/czarne.png") {
        fs.readFile(`static/mats/czarne.png`, function (error, data) {
          if (error) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
            res.end();
          } else {
            res.writeHead(200, { "Content-Type": "image/png" });
            res.write(data);
            res.end();
          }
        });
      }
      else if (req.url == "/mats/biale.jpg") {
        fs.readFile(`static/mats/biale.jpg`, function (error, data) {
          if (error) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
            res.end();
          } else {
            res.writeHead(200, { "Content-Type": "image/jpeg" });
            res.write(data);
            res.end();
          }
        });
      }
      else if (req.url == "/mats/pionekbialy.jpg") {
        fs.readFile(`static/mats/pionekbialy.jpg`, function (error, data) {
          if (error) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
            res.end();
          } else {
            res.writeHead(200, { "Content-Type": "image/jpeg" });
            res.write(data);
            res.end();
          }
        });
      }
      else if (req.url == "/mats/pionekczarny.jpg") {
        fs.readFile(`static/mats/pionekczarny.jpg`, function (error, data) {
          if (error) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
            res.end();
          } else {
            res.writeHead(200, { "Content-Type": "image/jpeg" });
            res.write(data);
            res.end();
          }
        });
      }
      break;
    case "POST":
      servResponse(req, res);
      break;
    default:
      break;
  }
});
var users = []
var usedName = false
var info
var isFull=false
var currentMove=null
function servResponse(req, res) {
  let ajaxData = "";
  req.on("data", function (data) {
    ajaxData += data;
    ajaxData = qs.parse(ajaxData);
    return ajaxData;
  });
  req.on("end", function () {
    if (ajaxData.action == "ADD_USER") {
      for (let i = 0; i < users.length; i++) {
        if (users[i] == ajaxData.user) {
          usedName = true
        }
      }
      if (users.length == 2) {
        // res.end(JSON.stringify("osiagnieto maksymalną ilość graczy"))
        info = "maxusers"
        isFull=true
        res.end(JSON.stringify(info))
      }
      else if (usedName == true) {
        // res.end(JSON.stringify("jest juz taki user"))
        info = "userexists"
        res.end(JSON.stringify(info))
        usedName = false
      }
      else {
        users.push(ajaxData.user)
        if (users.length == 1) {
          info = "useradded1"
        }
        else if (users.length == 2) {
          info = "useradded2"
        }
        res.end(JSON.stringify(info))
        // res.end(JSON.stringify("dodano usera "+ajaxData.user))
      }
      console.log(users)
    }
    else if(ajaxData.action=="RESET"){
      users=[]
      isFull=false
      info="resetted"
      res.end(JSON.stringify(info))
      console.log(users)
    }
    else if(ajaxData.action=="USERS_CHECK"){
      if(isFull==false){
        info=users.length
        // res.end(JSON.stringify(info))
      }
      else{
        info=false
      }
      res.end(JSON.stringify(info))
    }
    else if(ajaxData.action=="MOVE"){
      currentMove={
        counterI: ajaxData.counterI,
        counterJ: ajaxData.counterJ,
        fieldI: ajaxData.fieldI,
        fieldJ: ajaxData.fieldJ
    }
      console.log(ajaxData)
      info=null
      res.end(JSON.stringify(info))
    }
    else if(ajaxData.action="CHECK_MOVE"){
      res.end(JSON.stringify(currentMove))
      currentMove=null
    }
  })
}
server.listen(3000, function () {
  console.log("serwer startuje na porcie 3000");
});
