import { useState, useEffect } from "react"
import { useSalesInvoiceContext } from "../hooks/useSalesInvoiceContext";
import { useAuthContext } from "../hooks/useAuthContext"; 
import Box from '@mui/material/Box';
import { Button } from "@mui/material";

//THINGS TO ADD:
//CLEAR BUTTON FOR CLEARING CURRENT purchase_list
//



const AddSalesInvoiceForm = () => {
    const{dispatch} = useSalesInvoiceContext()
    const {user} = useAuthContext()

    const [invoice_number,setInvoice_number] = useState('')
    const [reference_PO,setReference_PO] = useState('')
    //customer_name so that we can search an id with that name
    const [customer_name,setCustomer_name] = useState('')
    const [date,setDate] = useState('')
    const [description,setDescription] = useState('')
    //const [total_amount,setTotal_amount] = useState('')
    const [payment_terms,setPayment_terms] = useState('')
    const [payment_due,setPayment_due] = useState('')
    const [date_paid,setDate_paid] = useState('')
    const [amount_paid,setAmount_paid] = useState('')
    const [BIR_2307,setBIR_2307] = useState('')
    const [SR,setSR] = useState('')
    const [CR_Number,setCR_Number] = useState('')

    //purchase list will look like this: 3 text boxes para sa
    // p_code;75,350000; then click Button "add an item to list"
    //then display the current list of items below or above

    const [product_code,setProduct_code] = useState('')
    const [quantity,setQuantity] = useState('')
    const [amount,setAmount] = useState('')

    // const [bought_item,setBought_item] = useState(null)
    const [purchase_list,setPurchaseList] = useState([])

    const [emptyFields,setEmptyFields] = useState([])
    const [error,setError] = useState(null)


    const handleAddToCart = async (e) => {
        e.preventDefault()  //dont refresh page
        const bought_item = {product_code,quantity,amount}
        console.log("itemdetails", bought_item)
    
        setPurchaseList([bought_item,...purchase_list]);
    }

    useEffect(() => {            //ASYNCH CHECK SA purchase_list, DISABLE ADD BUTTON, ENABLE IT ONLY AFTER THIS
        console.log(purchase_list);
      }, [purchase_list]);
    

    const handleSubmit = async (e) => {
         e.preventDefault() //page is not refreshed
         if(!user){
            setError('There is no user. Log in first')
            return
         }

        //FIND CUSTOMER HERE
        //if not exist,

        const total_amount = purchase_list.reduce((currentTotal,item)=> {
            return item.amount + currentTotal
        })

         const product = {invoice_number,reference_PO,date,description,total_amount,payment_terms,payment_due,
            date_paid,amount_paid} //catches yung mga values sa form

         const response = await fetch('/salesinvoice/add',{
            method:'POST',
            body: JSON.stringify(product),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
         })
         //remember if success, we sendback the object, else send error
         const json = await response.json() //this json is the response from the backend.
         if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
         }
         if(response.ok){
            //resets the form back to empty strings
            setInvoice_number('')
            setReference_PO('')
            setDate('')
            setDescription('')
            setPayment_terms('')
            setPayment_due('')
            setDate_paid('')
            setAmount_paid('')
            setBIR_2307('')
            setSR('')
            setCR_Number('')



            setError(null)
            setEmptyFields([])
            console.log('New SIPOM Added', json)
            dispatch({type:'CREATE_SALES_INVOICE',payload: json})
         }

    } 




    return (
        <Box>
        <form id="AddSalesInvoiceForm" className="create" onSubmit={handleSubmit}>
        <h3> Add a Sales Invoice</h3>
        <label> Invoice Number</label>
        <input 
            type="text" onChange={(e)=> setInvoice_number(e.target.value)}
            value={invoice_number}
          
           className={emptyFields.includes('invoice_number') ? 'error': ''}
        />
         <label>Reference PO</label>
        <input 
            type="text" onChange={(e)=> setReference_PO(e.target.value)}
            value={reference_PO}
          
           className={emptyFields.includes('reference_PO') ? 'error': ''}
        />

         <label>Customer Name</label>
        <input 
            type="text" onChange={(e)=> setCustomer_name(e.target.value)}
            value={customer_name}
          
           className={emptyFields.includes('customer_name') ? 'error': ''}
        />
        
        {/* TRY TRY TRY TO DO //try get current date  */} 
        <label> Date MM/DD/YYYY </label>
        <input 
            type="date" onChange={(e)=> setDate(e.target.value)}
            value={date}
          
           className={emptyFields.includes('date') ? 'error': ''}
        />
         <label>Description</label>
        <input 
            type="text" onChange={(e)=> setDescription(e.target.value)}
            value={description}
         
           //className={emptyFields.includes('description') ? 'error': ''}
        />

        {/* //TOTAL AMOUNT WOULD HAVE BEEN HERE */}

        <label>Payment Terms</label>
        <input 
            type="text" onChange={(e)=> setPayment_terms(e.target.value)}
            value={payment_terms}
          
           //className={emptyFields.includes('payment_terms') ? 'error': ''}
        />
        <label>Payment Due</label>
        <input 
            type="text" onChange={(e)=> setPayment_due(e.target.value)}
            value={payment_due}
           className={emptyFields.includes('payment_due') ? 'error': ''}
        />
        <label>Date Paid</label>
        <input 
            type="date" onChange={(e)=> setDate_paid(e.target.value)}
            value={date_paid}
           
          // className={emptyFields.includes('date_paid') ? 'error': ''}
        />
        <label>Amount Paid</label>
        <input 
            type="number" onChange={(e)=> setAmount_paid(e.target.value)}
            value={amount_paid}

           className={emptyFields.includes('amount_paid') ? 'error': ''}
        />
        <label>BIR 2307</label>
        <input 
            type="number" onChange={(e)=> setBIR_2307(e.target.value)}
            value={BIR_2307}

           className={emptyFields.includes('BIR_2307') ? 'error': ''}
        />
         <label>SR</label>
        <input 
            type="text" onChange={(e)=> setSR(e.target.value)}
            value={SR}

           className={emptyFields.includes('SR') ? 'error': ''}
        />
         <label>CR Number</label>
        <input 
            type="text" onChange={(e)=> setCR_Number(e.target.value)}
            value={CR_Number}

           className={emptyFields.includes('CR_Number') ? 'error': ''}
        />
        <h3> Articles </h3>

        {/* <div className="purchase_list">{purchase_list}</div> */}
        {purchase_list && purchase_list.map((purchase)=>(
                <div>{purchase.product_code} {purchase.quantity} {purchase.amount}</div>
            ))}
        {/* //MAP PRODUCT LIST ITEMS TO DIV HERE<div> </div> */}
        {/* ADD INDENTATION / PADDING TO THE RIGHT FOR THE NEXT 3 OR MAKE THEM NEXT TO EACH OTHER */}
         <label > Product Code / Name </label>
        <input style={{ width: '350px'}} 
            type="text" onChange={(e)=> setProduct_code(e.target.value)}
            value={product_code}
        />
        <div style={{ display: 'flex', gap: '30px' }}>
            <label> Quantity </label>
            <input style={{ width: '15ch' }}
                type="number" onChange={(e)=> setQuantity(e.target.value)}
                value={quantity}
            />
            <label> Amount (Php) </label>
            <input style={{ width: '17ch' }}
                type="number" onChange={(e)=> setAmount(e.target.value)}
                value={amount}
            />
        </div>
        <Button sx={{
            background: 'var(--primary)',
            border: 0,
            color: '#fff',
            padding: '10px',
            fontFamily: 'Poppins',
            borderRadius: '4px',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: 'var(--secondary)',
            },
            }} onClick={handleAddToCart}> 11.11 Addutocartu </Button>
        
        {/* <button type="submit" style={{ position: 'fixed', bottom: '40px', right: '600px', }}>Add Workout</button> */}
        {error && <div className="error">{error}</div>}
        </form>
        </Box>

    )
}

export default AddSalesInvoiceForm