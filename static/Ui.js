console.log("wczytano plik Ui.js")
class Ui {
    constructor(){
        this.login()
        this.reset()
        this.overlay=$("#overlay")
        this.divLogin=$("#divLogin")
        this.divStatus=$("#status")
        this.playerInfo=$("#playerInfo")
        this.timeout
        this.waiting=$("#waiting")
        this.waitingMove=$("#waitingMove")
        this.waitingTimer=$("#waitingTimer")
    }
    login(){
        $("#loginButton").click(function(){
            this.nick=$("#loginInput").val()
            // console.log("click "+this.nick)
            net.sendData("ADD_USER",this.nick)
        })
    }
    reset(){
        $("#resetButton").click(()=>{
            net.sendData("RESET","")
        })
    }
    resetInfo(){
        this.divStatus.html("ZRESETOWANO GRĘ")
        clearTimeout(this.timeout)
        this.timeout=setTimeout(()=>{
            this.statusVanish()
        },2000)
    }
    status(data,user){
        if(data=="maxusers"){
            this.divStatus.html("JEST JUŻ DWÓCH GRACZY")
            clearTimeout(this.timeout)
            this.timeout=setTimeout(()=>{
                this.statusVanish()
            },2000)
        }
        else if(data=="userexists"){
            this.divStatus.html("WYBRANY NICK ISTNIEJE, WYBIERZ INNY")
            clearTimeout(this.timeout)
            this.timeout=setTimeout(()=>{
                this.statusVanish()
            },2000)
        }
        else if(data=="useradded1"){
            this.divStatus.html("DODANO GRACZA")
            clearTimeout(this.timeout)
            this.timeout=setTimeout(()=>{
                this.statusVanish()
            },2000)
            this.loginVanish()
            this.waitingForPlayers()
            this.playerInfo.html(`Witaj ${user}, grasz białymi!`)
            game.sideColor="white"
        }
        else if(data=="useradded2"){
            this.divStatus.html("DODANO GRACZA")
            clearTimeout(this.timeout)
            this.timeout=setTimeout(()=>{
                this.statusVanish()
            },2000)
            this.loginVanish()
            this.playerInfo.html(`Witaj ${user}, grasz czarnymi!`)
            game.sideColor="black"
            net.checkMove()
        }
    }
    statusVanish(){
        this.divStatus.html("")
    }
    loginVanish(){
        this.divLogin.css("visibility","hidden")
    }
    overlayWaitingVanish(){
        this.overlay.css("visibility","hidden")
        this.waiting.css("visibility","hidden")
    }
    waitingForPlayers(){
        this.waiting.css("visibility","visible")
    }
    waitingForMove(){
        this.overlay.css("visibility","visible")
        this.waitingMove.css("visibility","visible")
        this.waitingTimer.css("visibility","visible")
    }
    waitingForMoveVanish(){
        this.overlay.css("visibility","hidden")
        this.waitingMove.css("visibility","hidden")
        this.waitingTimer.css("visibility","hidden")
    }
    updateTimer(time){
        $(this.waitingTimer).html(time)
    }
    timeWin(){
      $(this.waitingForMove).html("WYGRAŁEŚ!")  
    }
}