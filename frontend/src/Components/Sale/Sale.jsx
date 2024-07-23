import React, { useEffect, useRef, useState } from 'react'

function Sale(props) { 

  const [sales, setSales] = useState([]);  
  const [currentSale, setCurrentSale] = useState({sno: sales.length + 1, item: '', quantity: '', price: '', total: ''}); 

  const snoRef = useRef(null) 
  const itemRef = useRef(null)
  const quantityRef = useRef(null)
  const priceRef = useRef(null)
  const totalRef = useRef(null)   

  const [showSuggest, setShowSuggest] = useState(true); 

  useEffect(() => {
    itemRef.current.focus()
  }, [sales])  

  function addItem() {
    console.log('item added!');  
    setSales([...sales, currentSale]); 
  }


  return (
   <>
    <div className="flex flex-col m-4 p-2 border shadow-xl "> 
      <h2 className="font-semibold text-center text-white py-2 mb-2 text-xl">Sales</h2>
          <div className="flex w-full space border-b border-black border-double">
          <div type="text" className="border-r border-black bg-slate-300 focus:outline-none w-1/6 px-2 py-1 text-gray-700 bg-">s.No</div>
          <div type="text" className="border-r border-black bg-slate-300 focus:outline-none w-2/6 px-2 py-1 text-gray-700">Item</div>
          <div type="text" className="border-r border-black bg-slate-300 focus:outline-none w-1/6 px-2 py-1 text-gray-700">quantity</div>
          <div type="text" className="border-r border-black bg-slate-300 focus:outline-none w-1/6 px-2 py-1 text-gray-700">price</div>
          <div type="text" className="border-r border-black bg-slate-300 focus:outline-none w-1/6 px-2 py-1 text-gray-700">total</div>
          </div>
      
        
        {sales.map((sale) => (
          <>
          <div className="flex w-full font-mono border-b"> 
          <input type="text" readOnly value={sale.sno} className="border-r  focus:outline-none w-1/6 px-2 py-1 text-gray-700"/>
          <input type="text" readOnly value={sale.item} className="border-r  focus:outline-none w-2/6 px-2 py-1 text-gray-700"/>
          <input type="text" readOnly value={sale.quantity} className="border-r  focus:outline-none w-1/6 px-2 py-1 text-gray-700"/>
          <input type="text" readOnly value={sale.price} className="border-r  focus:outline-none w-1/6 px-2 py-1 text-gray-700"/>
          <input type="text" readOnly value={sale.total} className="border-r  focus:outline-none w-1/6 px-2 py-1 text-gray-700"/>
          </div>
          </>
        )) 
        }
        <div className="flex w-full font-mono border-b"> 
          <input 
          ref={snoRef}
          value={currentSale.sno}
          onChange={(e) => {
            setCurrentSale({...currentSale, sno:e.target.value }) 
          }}
          type="text" className="border-r  focus:outline-none w-1/6 px-2 py-1 text-gray-700"/>
          <input
          ref={itemRef}
          value={currentSale.item} 
          onKeyDown={(e) => {
            if(e.code == 'Enter') {
              quantityRef.current.focus()
            }
          }}
          onChange={(e) => { 
            setShowSuggest(true); 
            setCurrentSale({...currentSale, item:e.target.value })
            console.log(e.keyCode)
          }}
           type="text" className="border-r  focus:outline-none w-2/6 px-2 py-1 text-gray-700"/>
          <input
          ref={quantityRef}
          value={currentSale.quantity}
          onKeyDown={(e) => {
            if(e.code == 'Enter') { 
              setCurrentSale({...currentSale, total:currentSale.price * currentSale.quantity})
              addItem()
            }
          }}
          onChange={(e) => setCurrentSale({...currentSale, quantity:e.target.value })} 
          placeholder='0'
           type="text" className="border-r  focus:outline-none w-1/6 px-2 py-1 text-gray-700"/>
          <input
          ref={priceRef}
          value={currentSale.price}
          onChange={(e) => setCurrentSale({...currentSale, price:e.target.value })}
          placeholder='0'
           type="text" className="border-r  focus:outline-none w-1/6 px-2 py-1 text-gray-700"/>
          <input
          ref={totalRef}
          value={currentSale.total}
          placeholder='0'
          onChange={(e) => setCurrentSale({...currentSale, total:e.target.value })}
           type="text" className="border-r  focus:outline-none w-1/6 px-2 py-1 text-gray-700"/>
          </div>
          {
            <div className="w-full flex">
            <div className="bg-yellow-100 w-1/6 invisible"></div>
            {showSuggest &&
               <div className="bg-yellow-100 w-1/3 px-2 h-20 overflow-y-scroll">
               {props?.products.map((product) => (
                 <h2 tabIndex={0} 
                 onClick={() => { 
                  setCurrentSale({...currentSale, item:product.name, price:Number(product.price)})
                  quantityRef.current.focus()
                  setShowSuggest(false);
                 }}
                 className="w-full hover:bg-sky-200"><small className="">{product.name}</small></h2>
               ))
               }
              </div>
            }
           
          </div>
          }
    </div>
   </>
  )
}

export default Sale