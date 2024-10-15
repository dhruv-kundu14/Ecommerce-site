// import { faker } from '@faker-js/faker';
// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { makeStyles } from '@mui/styles';
// import { Avatar, Grid, TableFooter, Typography } from '@mui/material';
// import TablePagination from '@mui/material/TablePagination';

// const useStyles = makeStyles((theme) => ({
//     table: {
//         minWidth: 650,
//     },
//     tableContainer: {
//         borderRadius: 15,
//         margin: '10px 10px',
//         maxWidth: 950,
//     },
//     tableHeaderCell: {
//         fontWeight: 'bold',
//         backgroundColor: theme.palette.primary.dark,
//         color: theme.palette.getContrastText(theme.palette.primary.dark),
//         justifyContent: 'center',
//     },
//     avatar: {
//         backgroundColor: theme.palette.primary.light,
//         color: theme.palette.getContrastText(theme.palette.primary.light),
//     },
//     name: {
//         fontWeight: 'bold',
//         color: theme.palette.secondary.dark, 
//     },
//     status:{
//         fontWeight:'bold',
//         fontSize:'0.75rem',
//         color:'white',
//         backgroundColor: 'gray',
//         borderRadius: 8,
//         padding:'3px 10px',
//         display: 'inline-block'
//     }
// }));

// let users = [];
// const STATUSES = ["Active", "Pending", "Blocked"];

// for (let i = 0; i < 100; i++) {
//     users.push({
//         name: faker.person.fullName(),
//         email: faker.internet.email(),
//         phone: faker.phone.number(),
//         job: faker.person.jobTitle(),
//         company: faker.company.name(),
//         joinDate: faker.date.past().toLocaleDateString(),
//         status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
//     });
// }

// function MTable() {
//     const classes = useStyles();
//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
//     const handleChangePage = (event, newPage) => {
//       setPage(newPage);
//     };
  
//     const handleChangeRowsPerPage = (event) => {
//       setRowsPerPage(+event.target.value);
//       setPage(0);
//     };

//     return (
//         <Grid container justifyContent="center">
//             <TableContainer component={Paper} className={classes.tableContainer}>
//                 <Table aria-label="simple table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell className={classes.tableHeaderCell}>User Info</TableCell>
//                             <TableCell className={classes.tableHeaderCell}>Product</TableCell>
//                             <TableCell className={classes.tableHeaderCell}>Joining Date</TableCell>
//                             <TableCell className={classes.tableHeaderCell}>Status</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
//                             <TableRow key={row.name}>
//                                 <TableCell>
//                                     <Grid container>
//                                         <Grid item lg={2}>
//                                             <Avatar alt={row.name} src='.   ' className={classes.avatar} />
//                                         </Grid>
//                                         <Grid item lg={10}>
//                                             <Typography className={classes.name}>{row.name}</Typography>
//                                             <Typography color='textSecondary' variant='body2'>{row.email}</Typography>
//                                             <Typography color='textSecondary' variant='body2'>{row.phone}</Typography>
//                                         </Grid>
//                                     </Grid>
//                                 </TableCell>
//                                 <TableCell>
//                                     <Typography color='primary' variant='subtitle2'>{row.job}</Typography>
//                                     <Typography color='textSecondary' variant='body2'>{row.company}</Typography>
//                                 </TableCell>
//                                 <TableCell>{row.joinDate}</TableCell>
//                                 <TableCell>
//                                     <Typography className={classes.status}
//                                     style={{
//                                         backgroundColor:
//                                         ((row.status === 'Active' && 'green') ||
//                                         (row.status === 'Pending' && 'blue') ||
//                                         (row.status === 'Blocked' && 'orange')
//                                     )}  
//                                     }>
//                                     {row.status}
//                                     </Typography>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                     <TableFooter>
//                     <TableRow>
//                         <TableCell colSpan={4}>
//                             <Grid container justifyContent="center">
//                                 <TablePagination
//                                     rowsPerPageOptions={[10, 20, 30]}
//                                     component="div"
//                                     count={users.length}
//                                     rowsPerPage={rowsPerPage}
//                                     page={page}
//                                     onPageChange={handleChangePage}
//                                     onRowsPerPageChange={handleChangeRowsPerPage}
//                                 />
//                             </Grid>
//                         </TableCell>
//                     </TableRow>
//                     </TableFooter>
//                 </Table>
//             </TableContainer>
//         </Grid>
//     );
// }

// export default MTable;

import { faker } from '@faker-js/faker';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import { Avatar, Grid, TableFooter, Typography } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950,
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark),
        justifyContent: 'center',
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light),
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark, 
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'gray',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block',
    },
}));

let products = [];
const conversionFactor = 83.25; // Example conversion rate
const CATEGORIES = ["Electronics", "Clothing", "Home", "Toys", "Sports"];

// Placeholder image URLs
const itemImages = [
    "https://via.placeholder.com/40x40?text=Item1",
    "https://via.placeholder.com/40x40?text=Item2",
    "https://via.placeholder.com/40x40?text=Item3",
    "https://via.placeholder.com/40x40?text=Item4",
    "https://via.placeholder.com/40x40?text=Item5",
];

for (let i = 0; i < 100; i++) {
    const priceInUSD = parseFloat(faker.commerce.price());
    const priceInINR = (priceInUSD * conversionFactor).toFixed(2); // Convert to INR
    const randomImage = itemImages[Math.floor(Math.random() * itemImages.length)]; // Get a random image

    products.push({
        productName: faker.commerce.productName(),
        category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
        price: priceInINR, // Store price formatted in INR
        stock: faker.number.int({ min: 0, max: 100 }),
        releaseDate: faker.date.past().toLocaleDateString(),
        status: faker.number.int({ min: 0, max: 100 }) > 50 ? "Available" : "Out of Stock",
        image: randomImage // Store the random image URL
    });
}

function MTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Grid container justifyContent="center">
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeaderCell}>Product Info</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Category</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Price (INR)</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Stock Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row.productName}>
                                <TableCell>
                                    <Grid container>
                                        <Grid item lg={2}>
                                            <Avatar 
                                                alt={row.productName} 
                                                src={row.image} // Use the random image URL
                                                className={classes.avatar} 
                                            />
                                        </Grid>
                                        <Grid item lg={10}>
                                            <Typography className={classes.name}>{row.productName}</Typography>
                                            <Typography color="textSecondary" variant="body2">Released: {row.releaseDate}</Typography>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell>{row.category}</TableCell>
                                <TableCell>₹{row.price}</TableCell>
                                <TableCell>
                                    <Typography className={classes.status}
                                        style={{
                                            backgroundColor:
                                                ((row.status === 'Available' && 'green') ||
                                                (row.status === 'Out of Stock' && 'red'))
                                        }}>
                                        {row.status}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4}>
                                <Grid container justifyContent="center">
                                    <TablePagination
                                        rowsPerPageOptions={[10, 20, 30]}
                                        component="div"
                                        count={products.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Grid>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Grid>
    );
}

export default MTable;
