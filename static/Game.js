console.log("wczytano plik Game.js")
class Game {
    constructor() {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(
            45,    // kąt patrzenia kamery (FOV - field of view)
            window.innerWidth / window.innerHeight,    // proporcje widoku, powinny odpowiadać proporcjom naszego ekranu przeglądarki
            0.1,    // minimalna renderowana odległość
            10000    // maksymalna renderowana odległość od kamery
        )
        this.renderer = new THREE.WebGLRenderer()
        this.axes = new THREE.AxesHelper(1000)
        this.light = new THREE.DirectionalLight(0xffff00, 10)
        this.raycaster = new THREE.Raycaster()
        this.mouseVector = new THREE.Vector2()
        this.board = [
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1]
        ]
        this.counters = [
            [0, 2, 0, 2, 0, 2, 0, 2],
            [2, 0, 2, 0, 2, 0, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0]
        ]
        this.objCountersArray=[]
        this.objFieldsArray=[]
        this.setGame()
        this.resize()
    }
    setGame() {
        $(document).ready(() => {
            this.renderer.setClearColor(0x000000)
            this.renderer.setSize(window.innerWidth, window.innerHeight)
            $("#root").append(this.renderer.domElement)
            this.camera.position.set(900, 400, 0)
            this.camera.lookAt(this.scene.position)
            this.camera.fov = 34
            this.scene.add(this.axes)
            this.light.position.set(1, 1, 1)
            this.scene.add(this.light)
            this.createBoard()
            // this.placeCounters()
            this.render()
        })
    }
    render() {
        requestAnimationFrame(this.render.bind(this))
        this.renderer.render(this.scene, this.camera)
        console.log("rendering")
    }
    resize() {
        $(window).resize(() => {
            this.camera.aspect = window.innerWidth / window.innerHeight
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(window.innerWidth, window.innerHeight)
        })
    }
    createBoard(){
        let a = -350
        let c = 350
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.board[i][j] == 1) {
                    var field = new Field("white",a,0,c)
                    field.position.set(a, 0, c)
                    // field.userData.i=`${i}`
                    // field.userData.j=`${j}`
                    field.userData.i=i
                    field.userData.j=j
                    this.scene.add(field)
                    this.objFieldsArray.push(field)
                }
                else if (this.board[i][j] == 0) {
                    var field = new Field("black",a,0,c)
                    field.position.set(a, 0, c)
                    // field.userData.i=`${i}`
                    // field.userData.j=`${j}`
                    field.userData.i=i
                    field.userData.j=j
                    this.scene.add(field)
                    this.objFieldsArray.push(field)
                }
                c -= 100
            }
            c = 350
            a += 100
        }
    }
    startGame() {
        this.setCamera()
        this.placeCounters()
        this.raycasterMesh()
    }
    setCamera() {
        if (this.sideColor == "white") {
            this.camera.position.set(900, 400, 0)
            this.camera.lookAt(this.scene.position)
        }
        else if (this.sideColor== "black") {
            this.camera.position.set(-900, 400, 0)
            this.camera.lookAt(this.scene.position)
        }
    }
    placeCounters() {
        let a = -350
        let c = 350
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.counters[i][j] == 1) {
                    var pionek = new Pionek("white")
                    pionek.position.set(a, 20, c)
                    // pionek.userData.i=`${i}`
                    // pionek.userData.j=`${j}`
                    pionek.userData.i=i
                    pionek.userData.j=j
                    this.scene.add(pionek)
                    this.objCountersArray.push(pionek)
                    
                }
                else if (this.counters[i][j] == 2) {
                    var pionek = new Pionek("black")
                    pionek.position.set(a, 20, c)
                    // pionek.userData.i=`${i}`
                    // pionek.userData.j=`${j}`
                    pionek.userData.i=i
                    pionek.userData.j=j
                    this.scene.add(pionek)
                    this.objCountersArray.push(pionek)
                }
                c -= 100
            }
            c = 350
            a += 100
        }
    }
    raycasterMesh() {
        this.tmpPionkiArr=[]
        document.addEventListener("mousedown", (event) => {
            this.mouseVector.x = (event.clientX / $(window).width()) * 2 - 1
            this.mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1
            this.raycaster.setFromCamera(this.mouseVector, this.camera)
            this.intersects = this.raycaster.intersectObjects(this.scene.children)
            if(this.intersects.length>0){                                       //checking if any of 3d objects are clicked
                this.clickedObject=this.intersects[0].object
                if (this.clickedObject instanceof Pionek){                      //actions for Pionek
                    let clickedObjectColor=this.clickedObject.getColor()        //checking if the color is right
                    if(clickedObjectColor==this.sideColor){
                        this.counterSelection()
                    }
                }
                else if(this.clickedObject instanceof Field){                   //actions for Fields
                    let clickedObjectColor=this.clickedObject.getColor()        //checking if the color is black so you can move
                    if(clickedObjectColor=="black"){
                        // console.log(this.clickedObject.userData.i+" "+this.clickedObject.userData.j)
                        if(this.tmpPionkiArr.length>0){   
                            this.moveRestriction()                         //checking if Pionek is selected
                            if(this.moveRestrictionBool==false){
                                let objPionek={
                                    i:this.selectedPionek.userData.i,
                                    j:this.selectedPionek.userData.j
                                }
                                let objPole={
                                    i:this.selectedField.userData.i,
                                    j:this.selectedField.userData.j
                                }
                                this.counterMove()
                                this.countersArrayUpdate()
                                net.move("MOVE",objPionek,objPole)
                                net.checkMove()
                                ui.waitingForMove()
                            }
                        }
                    }
                }
            }
        })
    }
    counterSelection(){
        for(let i=0;i<this.tmpPionkiArr.length;i++){
            if(this.sideColor=="white"){
                this.tmpPionkiArr[i].setColor("white")
                this.tmpPionkiArr=[]
            }
            else if(this.sideColor=="black"){
                this.tmpPionkiArr[i].setColor("black")
                this.tmpPionkiArr=[]
            }
        }
        this.clickedObject.setColor("#FFFF00")
        this.tmpPionkiArr.push(this.clickedObject)
    }
    moveRestriction(){
        this.selectedField=this.clickedObject
        this.selectedPionek=this.tmpPionkiArr[0]
        switch(this.sideColor){
            case "white":
                if(this.selectedPionek.position.x-100==this.clickedObject.position.x && this.selectedPionek.position.z-100==this.clickedObject.position.z){
                    this.moveRestrictionBool=false
                }
                else if(this.selectedPionek.position.x-100==this.clickedObject.position.x && this.selectedPionek.position.z+100==this.clickedObject.position.z){
                    this.moveRestrictionBool=false 
                }
                else {
                    this.moveRestrictionBool=true
                }
                break
                case "black":
                    if(this.selectedPionek.position.x+100==this.clickedObject.position.x && this.selectedPionek.position.z-100==this.clickedObject.position.z){
                        this.moveRestrictionBool=false
                    }
                    else if(this.selectedPionek.position.x+100==this.clickedObject.position.x && this.selectedPionek.position.z+100==this.clickedObject.position.z){
                        this.moveRestrictionBool=false 
                    }
                    else {
                        this.moveRestrictionBool=true
                    }
                break
        }
        for(let i=0;i<this.objCountersArray.length;i++){
            if(this.objCountersArray[i].position.x==this.clickedObject.position.x&&this.objCountersArray[i].position.z==this.clickedObject.position.z){         //checking if on this field is already other Pionek standing
                this.moveRestrictionBool=true
            }
        }
    }
    counterMove(){
        switch(this.sideColor){
            case "white":
                this.selectedPionek.setColor("white")
            break
            case "black":
                    this.selectedPionek.setColor("black")
            break
        }
        this.selectedPionek.position.set(this.clickedObject.position.x,20,this.clickedObject.position.z)
    }
    moveUpdate(coords){
        for(let i=0;i<this.objCountersArray.length;i++){
            if(coords.counterI==this.objCountersArray[i].userData.i && coords.counterJ==this.objCountersArray[i].userData.j){
                var pion=this.objCountersArray[i]
            }
        }
        for(let i=0;i<this.objFieldsArray.length;i++){
            if(coords.fieldI==this.objFieldsArray[i].userData.i && coords.fieldJ==this.objFieldsArray[i].userData.j){
                var pole=this.objFieldsArray[i]
            }
        }
        pion.position.set(pole.position.x,20,pole.position.z)
        this.counters[pion.userData.i][pion.userData.j]=0
        pion.userData.i=pole.userData.i
        pion.userData.j=pole.userData.j
        switch(this.sideColor){
            case "white":
                this.counters[pion.userData.i][pion.userData.j]=2
            break
            case "black":
                this.counters[pion.userData.i][pion.userData.j]=1
            break
        }
        console.log(this.counters)
    }
    countersArrayUpdate(){
        this.counters[this.selectedPionek.userData.i][this.selectedPionek.userData.j]=0
        this.selectedPionek.userData.i=this.clickedObject.userData.i
        this.selectedPionek.userData.j=this.clickedObject.userData.j
        switch(this.sideColor){
            case "white":
                this.counters[this.selectedPionek.userData.i][this.selectedPionek.userData.j]=1
            break
            case "black":
                    this.counters[this.selectedPionek.userData.i][this.selectedPionek.userData.j]=2
            break
        }
        this.tmpPionkiArr=[]
        console.log(this.counters)
    }
}