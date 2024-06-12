import './App.css';
import Navbar from './Component/Navbar';
import NewApi from './Component/NewApi';
import Offcanvass from './Component/Offcanvass';
import { useState } from 'react';

function App() {

  const [price, setprice] = useState("")
  const [rate, setrating] = useState("")
  const [checkboxformenclothing, setcheckboxformenclothing] = useState()
  const [checkboxforwomenclothing, setCheckboxforwomenclothing] = useState();
  const [jewelrycheckbox, setJewelrycheckbox] = useState();
  const [electronicscheckbox, setElectronicscheckbox] = useState();



  // for checkbox handling the value 
  const sprice = (value) => {
    setprice(value);
  }
  const rating = (value) => {
    setrating(value);
  }

  // for checkbox 
  // const checkboxmenclothing = (val) =>{
  //   setcheckboxformenclothing(val)

  // }

  console.log("menclothing checkbox in App.js ",checkboxformenclothing)
  console.log("womenclothing checkbox in App.js ",checkboxforwomenclothing)
  console.log("jewelry  checkbox in App.js ", jewelrycheckbox)
  console.log("Electronic checkbox in App.js ",electronicscheckbox)

  return (
    <>
      <Navbar />
      <Offcanvass newprice={sprice} newrating={setrating} menclothing={setcheckboxformenclothing} womenclothing={setCheckboxforwomenclothing}  jewelry={setJewelrycheckbox} electronic={setElectronicscheckbox}/>
      <NewApi sprice={price} srate={rate} categoryman={checkboxformenclothing} categorywomenc={checkboxforwomenclothing} categoryjewelry={jewelrycheckbox} categoryelectronic={electronicscheckbox} />

    </>

  );
}

export default App;
