const video = document.getElementById("video")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = 640
canvas.height = 480

function detectJutsu(landmarks){

let thumb = landmarks[4].y
let index = landmarks[8].y

if(index < thumb){
return "Fireball Jutsu 🔥"
}else{
return "Shadow Clone Jutsu 👥"
}

}

function onResults(results){

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.drawImage(results.image,0,0,canvas.width,canvas.height)

if(results.multiHandLandmarks){

for(const landmarks of results.multiHandLandmarks){

for(const point of landmarks){

ctx.beginPath()
ctx.arc(point.x*640, point.y*480,5,0,2*Math.PI)
ctx.fillStyle="cyan"
ctx.fill()

}

let jutsu = detectJutsu(landmarks)

document.getElementById("jutsu").innerText = jutsu

}

}

}

const hands = new Hands({
locateFile: (file)=>{
return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
}
})

hands.setOptions({
maxNumHands:1,
modelComplexity:1,
minDetectionConfidence:0.7,
minTrackingConfidence:0.5
})

hands.onResults(onResults)

const camera = new Camera(video,{
onFrame: async()=>{
await hands.send({image:video})
},
width:640,
height:480
})

camera.start()
let scene = new THREE.Scene()
let camera3d = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)

let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth,300)

document.body.appendChild(renderer.domElement)

let geometry = new THREE.SphereGeometry(1,32,32)
let material = new THREE.MeshBasicMaterial({color:0x00ffff,wireframe:true})

let chakra = new THREE.Mesh(geometry,material)
scene.add(chakra)

camera3d.position.z = 5

function animate(){
requestAnimationFrame(animate)

chakra.rotation.x += 0.02
chakra.rotation.y += 0.02

renderer.render(scene,camera3d)
}

animate()
