import { Component } from 'react';
import './App.css';

var data
var datosParaDespues
var a = 1
var Maximo

const CallApi = async (InicialNombre, Diferencia) => {
  try {
    if (InicialNombre !== "" ){
      InicialNombre = "nameStartsWith=" + InicialNombre + "&"
    } 
    if (Diferencia !== ""){
      Diferencia = "&offset=" + Diferencia
    }
    const prueba = await fetch('https://gateway.marvel.com:443/v1/public/characters?' + InicialNombre + 'ts=1&apikey=696475c65314e0e9254f0708fe6b0725&hash=6f5d5243c76eb71829d44e4053988908&limit=50' + Diferencia)
    data = await prueba.json()
    PostFetch(data.data, data.data.results)
  } catch (err) {
    console.log(err)
  }
}
CallApi("", "")

function PostFetch(datos, data){
  document.getElementById("Personajes").innerHTML = ""
  datosParaDespues = datos.offset
  Maximo = datos.total
  if (data.length === 0){
    const div = document.createElement("div");
    div.setAttribute("id", "Error");
    div.innerHTML += "<h1><span id='ErrorSpan'> Error!</span> <br> Intente con otro nombre o modifique su ortografia </h1>";
    document.getElementById("Personajes").appendChild(div)
  } else {
    data.forEach((value, index) => {
      var nombre = value.name
      var key = index
      var img = value.thumbnail.path + "." + value.thumbnail.extension
      const div = document.createElement("div");
      div.setAttribute("id", "Personaje" + key);
      div.innerHTML += "<div style='background-image:url(" + img + ")' ></div>";
      div.innerHTML += "<p key=" + key + ">" + nombre + "</p>";
      document.getElementById("Personajes").appendChild(div)
    });
  }
  RevisarMax()
  RevisarMin()
}

function Buscar(){
  const BtnBuscar = document.querySelector('#Buscar')
  BtnBuscar.classList.remove('BotonBuscar')
  setTimeout(() => {BtnBuscar.classList.add('BotonBuscar')}, 100)
  a = 1
  document.getElementById("Pagina").innerHTML = a
  var InicialNombre = document.getElementById('InicialNombre').value
  CallApi(InicialNombre, "")
}

function MostrarMenos(){
  var Proximo = datosParaDespues - 50
  if (0 <= Proximo){
    var InicialNombre = document.getElementById('InicialNombre').value
    a = a - 1
    document.getElementById("Pagina").innerHTML = a
    CallApi(InicialNombre, Proximo)
    RevisarMin()
  } else {
    Proximo += 50
  }
}

function MostrarMas(){
  var Proximo = datosParaDespues + 50
  if (Maximo > Proximo){
    var InicialNombre = document.getElementById('InicialNombre').value
    a = a + 1
    document.getElementById("Pagina").innerHTML = a
    CallApi(InicialNombre, Proximo)
    if (a === 2){
      document.getElementById("Anterior").removeAttribute("class","NoHay")
    }
    RevisarMax()
  }
}

function RevisarMax(){
  if (Maximo < (datosParaDespues + 50)){
    document.getElementById("Siguiente").setAttribute("class","NoHay")
  } else {
    document.getElementById("Siguiente").removeAttribute("class","NoHay")
  }
}

function RevisarMin(){
  if(a === 1){
    document.getElementById("Anterior").setAttribute("Class","NoHay")
  }
}

class Header extends Component{
  render(){
    return(
      <div id="Header">
        <div>

        </div>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2560px-Marvel_Logo.svg.png'></img>
        <div>
          <input id="InicialNombre" maxLength="15"></input>
          <button id='Buscar' onClick={Buscar}>
            <span className="material-symbols-outlined">
              search
            </span>
          </button>
        </div>
      </div>
    )
  }
}

class Personaje extends Component{
  render(){
    return(
      <div id="Personajes">
        
      </div>
    )
  }
}

class Paginas extends Component{
  render(){
    return(
      <div id="Numeracion">
        <button onClick={MostrarMenos} id="Anterior" className='NoHay'>
          <a href='#'>
            <span className="material-symbols-outlined">
              arrow_back_ios
            </span> 
          </a>
        </button>
        <h1 id="Pagina">1</h1>
        <button onClick={MostrarMas} id="Siguiente">
          <a href='#'>
            <span className="material-symbols-outlined">
              arrow_back_ios
            </span>
          </a>
        </button>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <Header />
      <Personaje />
      <Paginas /> 
    </div>
  );
}

export default App;