console.log("wczytano plik Net.js")
class Net{
    constructor(){
    }
    sendData(action,user){
        $.ajax({
            url: "/",
            data: {action:action,user:user},
            type: "POST",
            success: data=> {   
                data = JSON.parse(data);
                if(action=="ADD_USER"){
                    ui.status(data,user)
                    clearInterval(this.checkUsersInterval)
                    this.checkUsersInterval=window.setInterval(()=>{
                        this.sendData("USERS_CHECK",user)
                    },1000)
                }
                else if (action=="RESET"){
                    ui.resetInfo()
                }
                else if (action=="USERS_CHECK"){
                    if(data==2){
                            console.log("połączyło się dwóch graczy")
                            console.log("request od usera "+user)
                            game.startGame()
                            ui.overlayWaitingVanish()
                            if(game.sideColor=="black"){
                                ui.waitingForMove()
                            }
                            clearInterval(this.checkUsersInterval)
                    }
                }
            },
            error: function (xhr, status, error) {
              console.log(xhr)
            },
        });
    }
    move(action,counter,field){
        $.ajax({
            url: "/",
            data: {action:action,counterI:counter.i,counterJ:counter.j,fieldI:field.i,fieldJ:field.j},
            type: "POST",
            success: data=> {   
                data = JSON.parse(data);
            },
            error: function (xhr, status, error) {
              console.log(xhr)
            },
        });
    }
    checkMove(){
        let time=30
        var interval=setInterval(()=>{
            if(time==0){
                ui.timeWin()
                clearInterval(interval)
            }
            ui.updateTimer(time)
            time--
            $.ajax({
                url: "/",
                type: "POST",
                data: {action:"CHECK_MOVE"},
                success: data=> {   
                    data = JSON.parse(data);
                    if(data!=null){
                        clearInterval(interval)
                        game.moveUpdate(data)
                        ui.waitingForMoveVanish()
                    }
                },
                error: function (xhr, status, error) {
                  console.log(xhr)
                },
            });
            
        },1000)
    }
}