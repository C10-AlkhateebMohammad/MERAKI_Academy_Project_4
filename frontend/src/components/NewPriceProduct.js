import axios from 'axios'
import React,{useEffect, useState} from 'react'

function NewPriceProduct() {
    const [newPrice, setNewPrice] = useState()
    useEffect(() => {
        axios.get('http://localhost:5000/price/')
            .then((res) => {
                setNewPrice(res.data);      
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    
    return (
        <div className='mo'>
          {Array.isArray(newPrice) && newPrice.map((item, i) => (
            <div key={i}>
              {item.Name}
            </div>
          ))}
        </div>
      );
}

export default NewPriceProduct