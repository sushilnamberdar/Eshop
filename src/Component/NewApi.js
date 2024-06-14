
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const NewApi = ({ sprice, srate, categoryman, categorywomenc, categoryjewelry, categoryelectronic }) => {
  const [data, setData] = useState([]);
  const [coll, setcoll] = useState('')
  const itemsonpage = parseInt(coll); //it convert the value to the intiger
  const [currentpage, setCurrentPage] = useState(1);
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
      if (!sprice || sprice === '') {
        return true;
      } else {
        return item.price < sprice;
      }
    });
  };




  const priceFilteredData = () => {
    return filteredData().filter(item => {
      if (!srate || srate === '') {
        return true;
      } else {
        return item.rating.rate <= parseInt(srate);
      }
    })
  }


  const filterByCategory = () => {
    return priceFilteredData().filter(item => {
      // If no category is selected, return true for all items
      if (!categoryman && !categorywomenc && !categoryjewelry && !categoryelectronic) {
        return true;
      }

      // Check if the item matches any selected category
      return ((categoryman && item.category === "men's clothing") || (categorywomenc && item.category === "women's clothing") || (categoryjewelry && item.category === "jewelery") || (categoryelectronic && item.category === "electronics")
      );
    });
  };


  const colnumber = (e) => {
    const value = e.target.value;
    // console.log("col value ",value)
    if (value !== '') {
      setcoll(value)
    }
    else {
      setcoll(parseInt(data.id));
    }
  }

 

  /// for the next page 
  const nextpage = () => {
    if(currentpage<page){
    setCurrentPage(prevPage => prevPage + 1);
    }
  }

  // for the previous page 
  const previouspage = () => {
    if(currentpage>1){
    setCurrentPage(prevPage => prevPage - 1);
    }
  }
  const pagebutton = [];

  // total page 
  const page = filterByCategory().length / itemsonpage;

  // for handling the page 
  const lastitemindex = currentpage * itemsonpage;
  const firstitemindex = lastitemindex - itemsonpage;
  const currentitem = coll ? filterByCategory().slice(firstitemindex, lastitemindex) : filterByCategory();
  return (

    <div className="container mx-auto py-8 mt-40 ">
      <div className='grid justify-center'>
        <p>Enter the Number of Itesms</p>
        <input className='border border-1 mb-4' type='number' onInput={colnumber} />
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
      <div style={{marginTop:'100px'}}>
        <div className='flex items-center  justify-center h-10 ' style={{ marginTop: '50px' }}>
          <Button className='mr-1 mt-2' onClick={previouspage}>Previous Page</Button>
          {/* // code for the number of page */}
          <div>
            {
              (() => {
                const pageButtons = [];
                for (let i = 0; i < page; i++) {
                  const pageNumber = i + 1;
                  pageButtons.push(
                    <Button key={pageNumber} className='mr-1 ml-1 mt-2' onClick={() => setCurrentPage(pageNumber)}>
                      {pageNumber}
                    </Button>
                  );
                }
                return pageButtons;
              })()
            }
          </div>
          <Button className='ml-1 mt-2' onClick={nextpage}> Next </Button>
        </div>
        </div>
      </div>
      );
};

      export default NewApi;
