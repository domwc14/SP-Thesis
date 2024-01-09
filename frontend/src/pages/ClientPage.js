import { useState, useEffect} from "react";
import { useClientsContext } from "../hooks/useClientsContext";
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
import AddClientForm from "../components/AddClientForm";
import UpdateClientForm from "../components/UpdateClientForm";
import DeleteClientForm from "../components/DeleteClientForm";
import {FormControl, InputAdornment, OutlinedInput, Radio, RadioGroup, FormControlLabel } from '@mui/material';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


//FRONTEND DESIGN PART

// const StyledButton = styled(Button)({
//     variant:"contained",
//     borderRadius: '20px', // You can adjust the value to control the roundness
//     padding: '10px 20px', // Adjust padding as needed
//     color: 'black',
//     backgroundColor: 'grey'
//   });



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

    
//DIALOGUES 

const AddFormDialog = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add Client</DialogTitle>
            <DialogContent>
                {/* Your form content goes here */}
                <AddClientForm/>
                {/* <WorkoutForm/> */}
            </DialogContent>
            <DialogActions>
                <Button size="large" style={{ marginRight: '10px' }} type="submit" form="AddClientForm">Add</Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};  

const UpdateFormDialog = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Update a Client</DialogTitle>
            <DialogContent>

                {/* Your form content goes here */}
                <UpdateClientForm/>

            </DialogContent>
            <DialogActions>
                <Button size="large" style={{ marginRight: '10px' }} type="submit" form="UpdateClientForm">Update</Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};  

const DeleteFormDialog = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Delete Client</DialogTitle>
            <DialogContent>
                {/* Your form content goes here */}
                <DeleteClientForm/>

            </DialogContent>
            <DialogActions>
                <Button size="large" style={{ marginRight: '10px' }} type="submit" form="DeleteClientForm">Delete</Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};  



//START OF EXPORTED FUNCTION / RETURN 

const ClientPage = () => {
    const [isAddFormVisible, setAddFormVisible] = useState(false);
    const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
    const [isDeleteFormVisible, setDeleteFormVisible] = useState(false);
    const {clients_list,dispatch} = useClientsContext()


    const [sortOrder, setSortOrder] = useState('asc');
    const [sortColumn, setSortColumn] = useState('name'); // Default sorting column

    const [query,setQuery] = useState('')
    const [searchField, setSearchField] = useState('name');

    const {user} = useAuthContext()

    console.log("b4 fetch JSON",clients_list)

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
    
    const handleCloseForms = () => {
        setAddFormVisible(false);
        setUpdateFormVisible(false);
        setDeleteFormVisible(false);
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
          // Toggle sort order if the same column is clicked again
          setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
        } else {
          // Set the new sorting column and default to ascending order
          setSortColumn(column);
          setSortOrder('asc');
        }
      };


    useEffect(()=>{
        const fetchClient = async () => {
            const response = await fetch('/customers',{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json() //its the response json from server
            if(response.ok){
                dispatch({type:'SET_CLIENTS',payload: json})
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
            fetchClient()
        }
    },[dispatch,user]) //everytime these dependencies are run / changed, rerun this function (in this case everytime may dispatch, re-run)
    
    

    console.log("AFTER FETCH JSON",clients_list)
    console.log("TYPE:",typeof(clients_list))
    //const clientsJSONtoArray = Object.entries(clients_list)
    // console.log("ARRAY TYPE:",typeof(clientsJSONtoArray))
    // console.log("ARRAY ACTUAL:",clientsJSONtoArray)
    //console.log("LIST",clientsJSONtoArray)




    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    if (clients_list === null) {          //BUFFER while d pa nag loload
        return <div>Loading...</div>;
    }

    // const filtered_clients_list = clients_list.filter(client=>{
    //     return client.name.toLowerCase().includes(query.toLowerCase())
    //     //maybe if need. try item.$variablefieldfind
    // })
    //DELETE AFTER

    const filtered_clients_list = clients_list.filter(client=>{

        const fieldValues = client[searchField];  //this is all the values of the item. 
        // console.log("FIELDVALUE", fieldValues)
        // console.log("TYPEOFFIELDVALUE", typeof (fieldValues))

        //if fieldValue is empty (nagclick ng radio button ng walang nakatype) do nothing. if may search na +
        //&& typeof(fieldValues) === 'string'
        
        //because I think 0 is also null. not sure, basta line below is needed so that it also shows 0
        if (fieldValues !== undefined && fieldValues !== null) {
            if (typeof(fieldValues) === 'string') {
                return fieldValues.toLowerCase().includes(query.toLowerCase());
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

    const sorted_clients_list = [...filtered_clients_list].sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];
    
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          // For string comparison
          return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
          // For number comparison
          return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
        }
        return 0;
    });






     const rows = sorted_clients_list
    //const rows = clients_list


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
        <div >
        <Stack direction="row" spacing={2} marginBottom={2} marginTop={1} marginLeft={2} marginRight={2} alignItems="flex-start">
            <button style={{}} className="green_button_round" onClick={handleOpenAddForm}> ADD </button>
            <button style={{}} className="green_button_round" onClick={handleOpenUpdateForm}> UPDATE </button>
            <button style={{}} className="green_button_round" onClick={handleOpenDeleteForm}> DELETE </button>
            {/* <StyledButton onClick={handleOpenAddForm}> Add </StyledButton> */}
            {/* <StyledButton onClick={handleOpenUpdateForm}> Update </StyledButton>
            <StyledButton onClick={handleOpenDeleteForm}> Delete</StyledButton> */}
            {/* YOU ARE HERE  */}
            <Box sx={{ width: '40%', ml: { xs: 0, md: 1 } }}>
                <FormControl onChange={(e)=>setQuery(e.target.value)} sx={{ marginRight:2, width: { xs: '10%', md: 224 } }}>
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
                    placeholder="Search..."
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
                        <FormControlLabel value="name" control={<Radio size="small"  />} label="Name" />
                        <FormControlLabel value="customer_type" control={<Radio size="small" />} label="Type" />
                        <FormControlLabel value="location" control={<Radio size="small" />} label="Location" />
                        <FormControlLabel value="market" control={<Radio size="small" />} label="Market" />
                        
                        {/* <FormControlLabel value="unit" control={<Radio />} label="Unit" /> */}
                    </RadioGroup>
                    </FormControl>

            </Box>



            {/* <Searchbar/> */}
            <AddFormDialog open={isAddFormVisible} onClose={handleCloseForms} />
            <UpdateFormDialog open={isUpdateFormVisible} onClose={handleCloseForms} />
            <DeleteFormDialog open={isDeleteFormVisible} onClose={handleCloseForms} />

        </Stack>

        
        {/* stickyHeader */}
        <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ cursor: 'pointer' }} onClick={() => handleSort('name')} align="center">Client Name 
                {sortColumn === 'name' && sortOrder === 'asc' && <ArrowDropUpIcon style={{ color: 'white' }} />}    
                {sortColumn === 'name' && sortOrder === 'desc' && <ArrowDropDownIcon style={{ color: 'white' }} />}
            </StyledTableCell>
            <StyledTableCell style={{ cursor: 'pointer' }} onClick={() => handleSort('customer_type')} align="center">Type
                {sortColumn === 'customer_type' && sortOrder === 'asc' && <ArrowDropUpIcon style={{ color: 'white' }} />}    
                {sortColumn === 'customer_type' && sortOrder === 'desc' && <ArrowDropDownIcon style={{ color: 'white' }} />}
            </StyledTableCell>
            <StyledTableCell style={{ cursor: 'pointer' }} onClick={() => handleSort('location')} align="center">Location
                {sortColumn === 'location' && sortOrder === 'asc' && <ArrowDropUpIcon style={{ color: 'white' }} />}    
                {sortColumn === 'location' && sortOrder === 'desc' && <ArrowDropDownIcon style={{ color: 'white' }} />}
            </StyledTableCell>
            <StyledTableCell style={{ cursor: 'pointer' }} onClick={() => handleSort('market')} align="center">Market
                {sortColumn === 'market' && sortOrder === 'asc' && <ArrowDropUpIcon style={{ color: 'white' }} />}    
                {sortColumn === 'market' && sortOrder === 'desc' && <ArrowDropDownIcon style={{ color: 'white' }} />}
            </StyledTableCell>
          </TableRow>
        </TableHead>
            <TableBody>
            {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
            ).map((row) => (
                <StyledTableRow key={row.name}>
                <TableCell style={{ width: 120 }} component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                    {row.customer_type}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                    {row.location}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                    {row.market}
                </TableCell>
                </StyledTableRow>
            ))}
            {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
                </TableRow>
            )}
            </TableBody>
            <TableFooter >
            <TableRow >
                <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={4} //match number of cols of table para mag align to rightmost
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


export default ClientPage;

//page={page} onChange={handlePage}

