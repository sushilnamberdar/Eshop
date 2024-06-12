
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const NewApi = ({ sprice, srate ,categoryman  , categorywomenc , categoryjewelry ,categoryelectronic}) => {
  const [data, setData] = useState([]);
  const [coll , setcoll] = useState('')
  const itemsonpage = parseInt(coll); //it convert the vaue to the intiger
  const [currentpage, setCurrentPage] = useState(1);

  console.log( "catorycheckbox in api component ",categoryman)
  // console.log("Price in Api component", sprice);
  // console.log("Rate in Api component", srate);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setData(response.data);
    });
  }, []);

  const toggleDescription = (index) => {
    const newData = [...data];
    newData[index].showDescription = !newData[index].showDescription;
    setData(newData);
  };

  const filteredData = () => {
    
    return data.filter(item => {
      if(!sprice || sprice === ''){
        return true;
      }else{
      return item.price < sprice ;
      }
    });
  };

  const priceFilteredData = () => {
    return filteredData().filter(item => {
      if(!srate || srate===''){
        return true;
      }else{
        return item.rating.rate <= parseInt(srate);
      }
    })
  }

  const categorymanclothes = () => {
    return priceFilteredData().filter(item  => {
      if(!categoryman){
        return true;
      } else{
        return item.category ==="men's clothing";
      }
    })
  }
  const categoryelectronicc = () => {
    return categorymanclothes().filter(item =>{
      if(!categoryelectronic){
        return true;
      }else {
        return item.category === "electronics";
      }
    })
  }
  const womenclothingc = () => {
    return categoryelectronicc().filter(item => {
      if(!categorywomenc){
        return true;
      }else{
        return item.category === "women's clothing";
      }
    })
  }
  const jeweleryc = () => {
    return  womenclothingc().filter(item => {
      if(!categoryjewelry){
        return true;
      } else{
        return item.category === "jewelery";
      }
    })
  }

    const colnumber = (e) => {
      const value = e.target.value;
      // console.log("col value ",value)
      if(value!==''){
        setcoll(value)
      }else{
        setcoll(itemsonpage);
      }
     
    }

  //   // for printing the value of col 
  //  useEffect(()=> {
  //   // console.log('col vlaue in col varible ',coll)
  //  },[coll])


   /// for the next page 
   const nextpage = () =>{
    setCurrentPage(prevPage => prevPage+1);
   }
// for the previous page 
const previouspage = () =>{
  setCurrentPage(prevPage => prevPage - 1);
}

   // for handling the page 
   const lastitemindex = currentpage * itemsonpage;
   const firstitemindex = lastitemindex - itemsonpage;
   const currentitem = coll ? jeweleryc().slice(firstitemindex,lastitemindex):jeweleryc();

  return (

    <div className="container mx-auto py-8 mt-40 ">
      <div className='grid justify-center'>
      <p>Enter the Number of Itesms</p>
      <input  className='border border-1 mb-4' type='number' onChange={colnumber}  />
      </div>
      <div className={`grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2`}>
        {currentitem.map((item, index) => (
          <div key={index} className="border border-gray-300 rounded p-4">
            <div>{item.title}</div>
            <div className='w-[160px]'>
              <img src={item.image} alt={item.title} className='object-contain' />
            </div>
            <div>Rating: {item.rating.rate}/5</div>
            <div>Price: {item.price} $</div>
            <button className='border border-2 p-2 mr-1'>Buy Now</button>
            <button className='border border-2 p-2 mr-1'>Add To Cart</button>
            <button className='border border-2 p-2 mt-2' onClick={() => toggleDescription(index)}>
              {item.showDescription ? 'Less' : 'More'}
            </button>
            {item.showDescription && <div>{item.description}</div>}
          </div>
        ))}
       
      </div>
      <div className='flex items-center  justify-center h-10 ' style={{marginTop:'50px'}}>
      {/* <Button className='mr-10' onClick={previouspage}>Previous Page</Button> */}
        <Button onClick={nextpage}> Next </Button>
        
        </div>
    </div>
  );
};

export default NewApi;
