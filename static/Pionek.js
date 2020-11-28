class Pionek extends THREE.Mesh{
    constructor(color){
        super()
        this.color=color
        this.materials()
        this.geometry=new THREE.CylinderGeometry(40,40,20,80)
    }
    materials(){
        if (this.color=="white"){
            this.material= new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                wireframe: false,
                transparent: false, 
                map: new THREE.TextureLoader().load("mats/pionekbialy.jpg"),
            })
        }
        else if(this.color=="black"){
            this.material= new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                wireframe: false,
                transparent: false, 
                map: new THREE.TextureLoader().load("mats/pionekczarny.jpg"),
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
}