class Field extends THREE.Mesh{
    constructor(color,pos_a,pos_b,pos_c){
        super()
        this.pos_a=pos_a
        this.pos_b=pos_b
        this.pos_c=pos_c
        this.color=color
        this.materials()
        this.geometry=new THREE.BoxGeometry(100, 20, 100)
    }
    materials(){
        if (this.color=="white"){
            this.material= new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                wireframe: false,
                transparent: false, 
                map: new THREE.TextureLoader().load("mats/biale.jpg"),
            })
        }
        else if(this.color=="black"){
            this.material= new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                wireframe: false,
                transparent: false, 
                map: new THREE.TextureLoader().load("mats/czarne.png"),
            })
        }
        else {
            this.material= new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                wireframe: false,
                transparent: false, 
                color:this.color,
            })
        }
    }
    setColor(val){
        // console.log("set c0lor")
        this.color=val
        this.materials()
    }
    getColor(){
        // console.log("get color "+this.color)
        return this.color
    }
    getPosition(){
        let pos=[this.pos_a,this.pos_b,this.pos_c]
        return pos
    }
}