import { Checkbox, Radio } from '@headlessui/react';
import React, { useState, useEffect } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';

const Offcanvass = ({newprice, newrating , menclothing , womenclothing  ,jewelry, electronic}) => {
  const [show, setShow] = useState(false);

  const [price, setprice] = useState("200");
  const [rating, setrating] = useState("3")
   const sprice = (e) =>{
    const value = e.target.value;
    setprice(value);
      newprice(value);
  }
  const srating = (e) =>{
    const value = e.target.value;
    setrating(value);
    newrating(value);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(prevShow => !prevShow);




  useEffect(() => {
    const handleClickOutside = (event) => {
      if (show && !event.target.closest('.offcanvas')) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show]);


  const manc = (e) =>{
      const val = e.target.checked;
      // console.log("checkbox value in offcanvss",val);
      menclothing(val)
  }

  const womenc = (e) => {
    const val = e.target.checked;
      womenclothing(val);  
  }

  const jeweleryc = (e) => {
    const val = e.target.checked;
    jewelry(val)
  }
  const electronicc = (e) => {
    const val = e.target.checked;
      electronic(val);
  }
  return (
    
    <div>
      <Button className="mt-10 bg-pink-800 ml-10 fixed" variant="primary"  onClick={handleShow}>
        Filters
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="start" scroll={true} backdrop={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='grid ml-10'>
            <label htmlFor="pricerange" className='mt-10'>Price Range</label>
            <div >
              <input type="range" id="pricerange" min="5" max="500" defaultValue="200" onInput={sprice}/>
            </div>
            <div>
            <span>  {price} $ </span> <span>500$</span>
            </div>
            <label htmlFor="ratingrange" className='mt-4'>Rating</label>
            <div className=''>

              <input type="range" id="ratingrange" min="2" max="5" defaultValue="5" onInput={srating} />
            </div>
            <span> {rating} <span> -5</span></span>

            <h5>Category</h5>
            <div className='grid grid-cols-2  gap-2 -ml-20 mt-3'>
              <input type='checkbox' onInput={manc}/>
              <span>men's clothing</span>
              <input type='checkbox' onInput={jeweleryc} />
              <span>jewelery</span>
              <input type='checkbox' onInput={electronicc} />
              <span>electronics</span>
              <input type='checkbox' onInput={womenc} />
              <span>women's clothing</span>
            </div>

          </div>
          {/* <div className='flex  justify-center  mt-10'>
            <Button>Done</Button>
          </div>  */}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Offcanvass;
