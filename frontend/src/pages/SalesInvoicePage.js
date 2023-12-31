import { useState, useEffect} from "react";
import { useSalesInvoiceContext } from "../hooks/useSalesInvoiceContext";
import { useAuthContext } from "../hooks/useAuthContext";


//mui table
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
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


//components
import NavDrawer from "../components/NavDrawer";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import AddSalesInvoiceForm from "../components/AddSalesInvoiceForm";
import UpdateSalesInvoiceForm from "../components/UpdateSalesInvoiceForm";
import DeleteSalesInvoiceForm from "../components/DeleteSalesInvoiceForm";
import {FormControl, InputAdornment, OutlinedInput, Radio, RadioGroup, FormControlLabel} from '@mui/material';
import GeneratePDFForm from "../components/GeneratePDFForm";


//FRONTEND DESIGN PART

const StyledButton = styled(Button)({
    variant:"contained",
    borderRadius: '20px', // You can adjust the value to control the roundness
    padding: '10px 20px ', // Adjust padding as needed
    color: 'black',
    backgroundColor: 'grey',
    whiteSpace: 'nowrap', // Prevent text from going down. basically 1 liner
  });



function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="first page"
        >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
            onClick={handleBackButtonClick}
            disabled={page === 0}
            aria-label="previous page"
        >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
        >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="last page"
        >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
        </Box>
    );
    }

    TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    };


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


//YOU ARE HERE YOU ARE HERE YOU ARE HERE
    
//DIALOGUES 

const AddFormDialog = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add Sales Invoice</DialogTitle>
            <DialogContent>
                {/* Your form content goes here */}
                <AddSalesInvoiceForm/>
                {/* <WorkoutForm/> */}
            </DialogContent>
            <DialogActions>
                <Button size="large" style={{ marginRight: '10px' }} type="submit" form="AddSalesInvoiceForm">Add</Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};  

const UpdateFormDialog = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Update a Sales Invoice</DialogTitle>
            <DialogContent>

                {/* Your form content goes here */}
                <UpdateSalesInvoiceForm/>

            </DialogContent>
            <DialogActions>
                <Button size="large" style={{ marginRight: '10px' }} type="submit" form="UpdateSalesInvoiceForm">Update</Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};  

const DeleteFormDialog = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Delete SalesInvoice</DialogTitle>
            <DialogContent>
                {/* Your form content goes here */}
                <DeleteSalesInvoiceForm/>

            </DialogContent>
            <DialogActions>
                <Button size="large" style={{ marginRight: '10px' }} type="submit" form="DeleteSalesInvoiceForm">Delete</Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};  

const GenerateFormDialog = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Generate Documents to Print</DialogTitle>
            <DialogContent>
                {/* Your form content goes here */}
                <GeneratePDFForm/>

            </DialogContent>
            <DialogActions>
                <Button size="large" style={{ marginRight: '10px' }} type="submit" form="GeneratePDFForm">Download PDF</Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};  

function getFieldValues(obj, path) {        //for traversing customer.name may dot.
    // Split the path into individual keys
    const keys = path.split('.');
    
    // Traverse the object using the keys
    let value = obj;
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return undefined; // Property not found
      }
    }
  
    return value;
  }



//START OF EXPORTED FUNCTION / RETURN 

const SalesInvoicePage = () => {
    const [isAddFormVisible, setAddFormVisible] = useState(false);
    const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
    const [isDeleteFormVisible, setDeleteFormVisible] = useState(false);
    const [isGenerateFormVisible, setGenerateFormVisible] = useState(false);

    const {sales_invoice_list,dispatch} = useSalesInvoiceContext()

    const [query,setQuery] = useState('')
    const [searchField, setSearchField] = useState('invoice_number');


    const {user} = useAuthContext()

    console.log("b4 fetch JSON",sales_invoice_list)

    console.log("QUERY",query)


    //FUNCTIONAL BUTTONS

    const handleOpenAddForm = async () => {
        setAddFormVisible(true);
    }
    
    const handleOpenUpdateForm = async () => {
        setUpdateFormVisible(true);
    }
    
    const handleOpenDeleteForm = async () => {
        setDeleteFormVisible(true);
    }

    const handleOpenGenerateForm = async () => {
        setGenerateFormVisible(true);
    }
    
    const handleCloseForms = () => {
        setAddFormVisible(false);
        setUpdateFormVisible(false);
        setDeleteFormVisible(false);
        setGenerateFormVisible(false);
    };


    useEffect(()=>{
        const fetchSalesInvoice = async () => {
            const response = await fetch('/api/salesinvoice',{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json() //its the response json from server
            if(response.ok){
                dispatch({type:'SET_SALES_INVOICE',payload: json})
                console.log("json FETCHED")
                //dispatch fires to workoutsReducer - > returns action - > updates the state sa useReducer
                //yung workouts: null magiging action.payload which is the json here
                //yung Workouts.Context.Provider value catches that. Its the ...state change (eto yung "global" context state)
                //this updates the workouts in  const {workouts,dispatch} = useWorkoutsContext() which is used sa UI
            }
            else{
                console.log("dispatch not made")
            }
        }

        if(user){
            fetchSalesInvoice()
        }
    },[dispatch,user]) //everytime these dependencies are run / changed, rerun this function (in this case everytime may dispatch, re-run)
    
    
    console.log("AFTER FETCH JSON",sales_invoice_list)
    console.log("TYPE:",typeof(sales_invoice_list))
    //const inventoryJSONtoArray = Object.entries(sales_invoice)
    // console.log("ARRAY TYPE:",typeof(inventoryJSONtoArray))
    // console.log("ARRAY ACTUAL:",inventoryJSONtoArray)
    //console.log("LIST",inventoryJSONtoArray)




    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    if (sales_invoice_list === null) {          //BUFFER while d pa nag loload
        return <div>Loading...</div>;
    }

    const filtered_sales_invoice = sales_invoice_list.filter(invoice=>{
        const fieldValues = getFieldValues(invoice, searchField);
        console.log("FIELDVALS",fieldValues)
        // console.log("FIELDVALUE", fieldValues)
        // console.log("TYPEOFFIELDVALUE", typeof (fieldValues))

        //if fieldValue is empty (nagclick ng radio button ng walang nakatype) do nothing. if may search na +
        //&& typeof(fieldValues) === 'string'
        
        //because I think 0 is also null. not sure, basta line below is needed so that it also shows 0
        if (fieldValues !== undefined && fieldValues !== null) {
            if (Array.isArray(fieldValues)) {           //if field is purchase_list
                return fieldValues.some(item =>
                    item.product_code.toLowerCase().includes(query.toLowerCase())
                  );

            }
            else if (typeof(fieldValues) === 'string') {
                console.log("STRINGSTRINGSTRINGSTRING")
                return fieldValues.toLowerCase().includes(query.toLowerCase());
            } 
            else if (typeof(fieldValues) === 'Date'){
                console.log("DATE,DATEDATE")
            }
            
            else if (typeof fieldValues === 'number') {
                // if (query === '0'){
                //     console.log("QUERY IS ZERO")
                //     console.log("FIELDVALUE", fieldValues)
                //     return fieldValues === 0.
                // }
                return fieldValues === Number(query);  // Convert query to number for comparison
            }

            // convert values of product.stock to string first because includes is a string 
            
            // const stringValue = fieldValues.toString();
            // console.log("STRVALUE IS 0",stringValue)
            // return stringValue.includes(query);

        }
        else {
            return false
        }

        //if not searchField:
        //return item.product_code.toLowerCase().includes(query.toLowerCase());
    })


     const rows = filtered_sales_invoice
    //const rows = sales_invoice


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
    <Box sx={{display: 'grid', gridTemplateColumns: '210px 2fr', gap:0}}>
        <div><NavDrawer/></div>
        <div>
        <Stack direction="row" spacing={2} marginBottom={2} alignItems="flex-start" marginTop={1}>
            <button style={{}} className="green_button_round" onClick={handleOpenAddForm}> ADD </button>
            <button style={{}} className="green_button_round" onClick={handleOpenUpdateForm}> UPDATE </button>
            <button style={{}} className="green_button_round" onClick={handleOpenDeleteForm}> DELETE </button>
            <button style={{padding: '5px 30px '}} className="green_button_round" onClick={handleOpenGenerateForm}> GET DOCUMENTS </button>
            {/* <StyledButton onClick={handleOpenAddForm}> Add </StyledButton>
            <StyledButton onClick={handleOpenUpdateForm}> Update </StyledButton>
            <StyledButton onClick={handleOpenDeleteForm}> Delete</StyledButton>
            <StyledButton sx={{ padding: '10px 30px ' }} onClick={handleOpenGenerateForm}> Generate Documents</StyledButton> */}
            {/* has own padding ksi haba ng text. overwrites padding ng Styled Button */}

            <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
                <FormControl onChange={(e)=>setQuery(e.target.value)} sx={{ width: { xs: '10%', md: 224 } }}>
                    <OutlinedInput
                    size="small"
                    id="header-search"
                    startAdornment={
                        <InputAdornment position="start" sx={{ mr: -0.5 }}>
                        </InputAdornment>
                    }
                    aria-describedby="header-search-text"
                    inputProps={{
                        'aria-label': 'weight'
                    }}
                    placeholder="Search Product Code"
                    />
                </FormControl>

                <FormControl component="setsearchfield">
                    <RadioGroup
                        row
                        aria-label="searchCriteria"
                        name="searchCriteria"
                        value={searchField}
                        onChange={(e) => setSearchField(e.target.value)}
                    >
                        <FormControlLabel value="invoice_number" control={<Radio size="small"  />} label="Invoice Number" />
                        <FormControlLabel value="reference_PO" control={<Radio size="small" />} label="Reference PO" />
                        <FormControlLabel value="customer.name" control={<Radio size="small" />} label="Customer Name" />
                        <FormControlLabel value="date" control={<Radio size="small" />} label="Date" />
                        <FormControlLabel value="total_amount" control={<Radio size="small" />} label="Total Amount" />
                        <FormControlLabel value="payment_terms" control={<Radio size="small" />} label="Payment Terms" />
                        <FormControlLabel value="payment_due" control={<Radio size="small" />} label="Payment Due" />
                        <FormControlLabel value="date_paid" control={<Radio size="small" />} label="Date Paid" />
                        <FormControlLabel value="BIR_2307" control={<Radio size="small" />} label="BIR 2307" />
                        <FormControlLabel value="SR" control={<Radio size="small" />} label="Sales Rep." />
                        <FormControlLabel value="CR_Number" control={<Radio size="small" />} label="CR Number" />
                        <FormControlLabel value="purchase_list" control={<Radio size="small" />} label="Product Code" />
                        
                        {/* <FormControlLabel value="unit" control={<Radio />} label="Unit" /> */}
                    </RadioGroup>
                    </FormControl>

            </Box>
            <AddFormDialog open={isAddFormVisible} onClose={handleCloseForms} />
            <UpdateFormDialog open={isUpdateFormVisible} onClose={handleCloseForms} />
            <DeleteFormDialog open={isDeleteFormVisible} onClose={handleCloseForms} />
            <GenerateFormDialog open={isGenerateFormVisible} onClose={handleCloseForms} />

        </Stack>


        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500, maxWidth: 1600 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Invoice Number</StyledTableCell>
            <StyledTableCell align="center">Reference_PO</StyledTableCell>
            <StyledTableCell align="center">Customer</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Total Amount</StyledTableCell>
            <StyledTableCell align="center">Payment Terms</StyledTableCell>
            <StyledTableCell align="center">Payment Due</StyledTableCell>
            <StyledTableCell align="center">Date Paid</StyledTableCell>
            <StyledTableCell align="center">Amount Paid</StyledTableCell>
            <StyledTableCell align="center">BIR 2307</StyledTableCell>
            <StyledTableCell align="center">SR</StyledTableCell>
            <StyledTableCell align="center">CR Number</StyledTableCell>
            <StyledTableCell align="center">Purchase List</StyledTableCell>
          </TableRow>
        </TableHead>
            <TableBody>
            {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
            ).map((row) => (
                <StyledTableRow key={row.invoice_number}>
                <TableCell style={{ minWidth: 90 }} component="th" scope="row">
                    {row.invoice_number}
                </TableCell>
                <TableCell style={{ minWidth: 115 }} align="center">
                    {row.reference_PO}
                </TableCell>
                <TableCell style={{ minWidth: 90 }} align="center">
                    {row.customer.name}
                </TableCell>
                <TableCell style={{ minWidth: 100}} align="center">
                    {(() => {
                    const dateObject = new Date(row.date);
                    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
                    const formattedDate = dateObject.toLocaleDateString('en-US', options).replace(/\//g, '-');
                    return formattedDate;
                    })()}
                </TableCell>
                <TableCell style={{ minWidth: 90 }} align="center">
                    {row.description}
                </TableCell>
                <TableCell style={{ minWidth: 90 }} align="center">
                    {row.total_amount}
                </TableCell>
                <TableCell style={{ minWidth: 90 }} align="center">
                    {row.payment_terms}
                </TableCell>
                <TableCell style={{ minWidth: 100}} align="center">
                    {(() => {
                    const dateObject = new Date(row.payment_due);
                    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
                    const formattedDate = dateObject.toLocaleDateString('en-US', options).replace(/\//g, '-');
                    return formattedDate;
                    })()}
                </TableCell>
                <TableCell style={{ minWidth: 100}} align="center">
                    {(() => {
                    const dateObject = row.date_paid ? new Date(row.date_paid) : null;
                    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
                    const formattedDate = dateObject ?  dateObject.toLocaleDateString('en-US', options).replace(/\//g, '-'): '';
                    return formattedDate;
                    })()}
                </TableCell>
                <TableCell style={{ minWidth: 90 }} align="center">
                    {row.amount_paid}
                </TableCell>
                <TableCell style={{ minWidth: 90 }} align="center">
                    {row.BIR_2307}
                </TableCell>
                <TableCell style={{ minWidth: 90 }} align="center">
                    {row.SR}
                </TableCell>
                <TableCell style={{ minWidth: 115 }} align="center">
                    {row.CR_Number}
                </TableCell>
                <TableCell style={{ minWidth: 100 }} align="center">
                    <h4>Purchase List Here*</h4>
                </TableCell>
                </StyledTableRow>
            ))}
            {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
                </TableRow>
            )}
            </TableBody>
            <TableFooter>
            <TableRow>
                <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={4}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                    inputProps: {
                    'aria-label': 'rows per page',
                    },
                    native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                />
            </TableRow>
            </TableFooter>
        </Table>
        </TableContainer>
        </div>
    </Box>
    );
}


export default SalesInvoicePage;

//page={page} onChange={handlePage}