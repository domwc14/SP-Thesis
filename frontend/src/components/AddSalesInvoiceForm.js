import { useState, useEffect } from "react"
import { useSalesInvoiceContext } from "../hooks/useSalesInvoiceContext";
import { useAuthContext } from "../hooks/useAuthContext"; 
import Box from '@mui/material/Box';
import { Button } from "@mui/material";

//Table
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Stack from '@mui/material/Stack';

    //STYLES OF TABLE HEADER AND TABLE ROW
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));



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
    const [articlesEmptyFields,setArticlesEmptyFields] = useState([])
    const [error,setError] = useState(null)


    const AddToCartChecker = () => {
        let ok = 1
        const exists = purchase_list.some(article=> article.product_code === product_code);
        if (exists) {
            ok = 2
            return ok
        }
        if(product_code === ''){
            setArticlesEmptyFields(current => [...current,'product_code'])
            ok = 0

        }
        if(quantity === ''){
            setArticlesEmptyFields(current => [...current,'quantity'])
            ok = 0
 
        }
        if(amount === ''){
            setArticlesEmptyFields(current => [...current,'amount'])
            ok = 0

        }  
        return ok
    }

    const handleAddToCart = async (e) => {
        setArticlesEmptyFields([])
        e.preventDefault()  //dont refresh page
        const response = await AddToCartChecker()   //wait for this to finish, if response is ok (1) is yes

        //articlesEmptyFields.length > 0
        if(response === 0){
            setError("Please fill in fields highlighted in red")
            console.log("ARTICLE LIST", articlesEmptyFields)
            return
        }

        if(response === 2){
            setError("The item already exists in the purchase list")
            console.log("ARTICLE LIST", articlesEmptyFields)
            return
        }
        
        const bought_item = {product_code,quantity,amount}
        console.log("itemdetails", bought_item)
        setPurchaseList([bought_item,...purchase_list]);
        setError(null)
    }

    
    useEffect(() => {            //ASYNCH CHECK SA purchase_list, DISABLE ADD BUTTON, ENABLE IT ONLY AFTER THIS
        console.log("USEEFFECT PURCHASE LIST CHECK",purchase_list);
      }, [purchase_list]);
    

    const handleSubmit = async (e) => {
        e.preventDefault() //page is not refreshed
         if(!user){
            setError('There is no user. Log in first')
            return
        }

        //FIND CUSTOMER HERE
        if(customer_name.length === 0){
            setError("Customer must have a name")
            setEmptyFields(['customer_name'])
            return 
        }
        const response_customer = await fetch (`/customers/${customer_name}`,{
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const customerjson = await response_customer.json()
        if (!response_customer.ok){
            setError(customerjson.error)
            setEmptyFields(customerjson.emptyFields)
            //     console.log("customer not found btw")
            //   console.log("empty fields", emptyFields)
            return
        }
        // console.log("ID PASSED",customerjson._id)
        if(response_customer.ok){
            const salesinvoice = {invoice_number,reference_PO,customer:customerjson._id,date,description,payment_terms,payment_due,
                date_paid,amount_paid,BIR_2307,SR,CR_Number,purchase_list} //catches yung mga values sa form
    
            const response = await fetch('/api/salesinvoice/add',{
                method:'POST',
                body: JSON.stringify(salesinvoice),
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
                setCustomer_name('')
                setDate('')
                setDescription('')
                setPayment_terms('')
                setPayment_due('')
                setDate_paid('')
                setAmount_paid('')
                setBIR_2307('')
                setSR('')
                setCR_Number('')
                setProduct_code('')
                setQuantity('')
                setAmount('')

                
                setPurchaseList('')
                setArticlesEmptyFields([])
                setError(null)
                setEmptyFields([])
                console.log('New SIPOM Added', json)
                dispatch({type:'CREATE_SALES_INVOICE',payload: json})
            }

        }

            //customer_id: customer._id because everything else is named same except for this field
        

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
            type="date" onChange={(e)=> setPayment_due(e.target.value)}
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
        {/* TODO TABLE FOR ARTICLES */}
        <TableContainer component={Paper}>
        <Table aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <StyledTableCell >Product Code</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
          </TableRow>
        </TableHead>
            <TableBody>
            {/* {(purchase_list
            ).map((row) => (
                <StyledTableRow key={row.product_code}>
                <TableCell style={{ width: 60 }} component="th" scope="row">
                    {row.product_code}
                </TableCell>
                <TableCell style={{ width: 80 }} align="right">
                    {row.quantity}
                </TableCell>
                <TableCell style={{ width: 80 }} align="right">
                    {row.amount}
                </TableCell>
                </StyledTableRow>
            ))} */}

            {purchase_list && purchase_list.length > 0 ? (
                purchase_list.map((row) => (
                <StyledTableRow key={row.product_code}>
                <TableCell style={{ width: 60 }} component="th" scope="row">
                {row.product_code}
                </TableCell>
                <TableCell style={{ width: 80 }} align="right">
                {row.quantity}
                </TableCell>
                <TableCell style={{ width: 80 }} align="right">
                {row.amount}
                </TableCell>
                </StyledTableRow>
                ))) :
                (
                <TableRow>
                <TableCell colSpan={3} align="center">
                    No Articles yet
                </TableCell>
                </TableRow>
                )
            }
            

            <StyledTableRow>
            <TableCell colSpan={2}></TableCell> {/* Empty cells for Product Code and Quantity */}
            <TableCell style={{ width: 80 }} align="right">
                {/* Display Total Amount aligned to the right */}
                {
                    ( () => {
                    let display_total_amount = 0;

                    for (const obj of purchase_list) {
                        // total_amount, check if the product is real in inventory and if stock > quantity in the purchase list
                        display_total_amount += parseFloat(obj.amount);
                    }

                    return <text style={{ textAlign: 'right' }}>{display_total_amount.toFixed(2)}</text>;
                    }) ()
                }
            </TableCell>
            </StyledTableRow>

            </TableBody>
            <TableFooter>
            </TableFooter>
        </Table>
        </TableContainer>


        {/* <div className="purchase_list">{purchase_list}</div> */}
        {/* {purchase_list && purchase_list.map((purchase)=>(
                <div>{purchase.product_code} {purchase.quantity} {purchase.amount}</div>
            ))} */}
        {/* ADD INDENTATION / PADDING TO THE RIGHT FOR THE NEXT 3 OR MAKE THEM NEXT TO EACH OTHER */}
         <label > Product Code / Name </label>
        <input style={{ width: '350px'}} 
            type="text" onChange={(e)=> setProduct_code(e.target.value)}
            value={product_code}
            className={articlesEmptyFields.includes('product_code') ? 'error': ''}

        />
        <div style={{ display: 'flex', gap: '30px' }}>
            <label> Quantity </label>
            <input style={{ width: '15ch' }}
                type="number" onChange={(e)=> setQuantity(e.target.value)}
                value={quantity}
                className={articlesEmptyFields.includes('quantity') ? 'error': ''}

            />
            <label> Amount (Php) </label>
            <input style={{ width: '17ch' }}
                type="number" onChange={(e)=> setAmount(e.target.value)}
                value={amount}
                className={articlesEmptyFields.includes('amount') ? 'error': ''}

            />
        </div>
        <div style={{ display: 'flex', gap: '30px' }}>
        <Button sx={{
            background: 'var(--primary)',
            border: 0,
            color: '#fff',
            padding: '10px',
            fontFamily: 'Poppins',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: 'small',
            '&:hover': {
                backgroundColor: 'var(--secondary)',
            },
            }} onClick={handleAddToCart}> Add to Articles List </Button>
        <Button sx={{
            background: 'var(--primary)',
            border: 0,
            color: '#fff',
            padding: '10px',
            fontFamily: 'Poppins',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: 'small',
            '&:hover': {
                backgroundColor: 'var(--secondary)',
            },
            }} onClick={() => setPurchaseList([])}> Clear Purchase List </Button>
        
        </div>
        
        {console.log("final purchase List", purchase_list)}
        {/* {console.log("final empty", emptyFields)} */}
        {/* <button type="submit" style={{ position: 'fixed', bottom: '40px', right: '600px', }}>Add Workout</button> */}
        {error && <div className="error">{error}</div>}
        </form>
        </Box>

    )
}

export default AddSalesInvoiceForm