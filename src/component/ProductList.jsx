import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5002/getProducts');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="product-list">
      <h3>Featured Products</h3>
      <div className="products">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((product) => (
            <div key={product._id.$oid} className="product">
              <div className='product-up'>
                <img
                  src={product.images || 'placeholder.jpg'}
                  alt={product.name}
                />
              </div>
             
              <div className='product-detail'>
                <h4>{product.name}</h4>
                <p>Price: {product.price} {product.currency}</p>
                <button onClick={() => addToCart(product)}>  {/* Pass the product object */}
                  <ShoppingBagIcon /> Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;

// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Chip from '@mui/material/Chip';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import { SparkLineChart } from '@mui/x-charts';
// import { areaElementClasses } from '@mui/x-charts/LineChart';

// function getDaysInMonth(month, year) {
//   const date = new Date(year, month, 0);
//   const monthName = date.toLocaleDateString('en-US', { month: 'short' });
//   const daysInMonth = date.getDate();
//   const days = [];
//   let i = 1;
//   while (days.length < daysInMonth) {
//     days.push(`${monthName} ${i}`);
//     i += 1;
//   }
//   return days;
// }

// function AreaGradient({ color, id }) {
//   return (
//     <defs>
//       <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
//         <stop offset="0%" stopColor={color} stopOpacity={0.3} />
//         <stop offset="100%" stopColor={color} stopOpacity={0} />
//       </linearGradient>
//     </defs>
//   );
// }

// AreaGradient.propTypes = {
//   color: PropTypes.string.isRequired,
//   id: PropTypes.string.isRequired,
// };

// function StatCard({ title, value, interval, trend, data }) {
//   const theme = useTheme();
//   const daysInWeek = getDaysInMonth(4, 2024);

//   const trendColors = {
//     up: theme.palette.mode === 'light' ? theme.palette.success.main : theme.palette.success.dark,
//     down: theme.palette.mode === 'light' ? theme.palette.error.main : theme.palette.error.dark,
//     neutral: theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[700],
//   };

//   const labelColors = {
//     up: 'success',
//     down: 'error',
//     neutral: 'default',
//   };

//   if (!data || data.length === 0) {
//     return (
//       <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
//         <CardContent>
//           <Typography component="h2" variant="subtitle2" gutterBottom>
//             {title}
//           </Typography>
//           <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//             No data available
//           </Typography>
//         </CardContent>
//       </Card>
//     );
//   }

//   const color = labelColors[trend];
//   const chartColor = trendColors[trend];
//   const trendValues = { up: '+25%', down: '-25%', neutral: '+5%' };

//   return (
//     <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
//       <CardContent>
//         <Typography component="h2" variant="subtitle2" gutterBottom>
//           {title}
//         </Typography>
//         <Stack direction="column" sx={{ justifyContent: 'space-between', flexGrow: '1', gap: 1 }}>
//           <Stack sx={{ justifyContent: 'space-between' }}>
//             <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
//               <Typography variant="h4" component="p">
//                 {value}
//               </Typography>
//               <Chip size="small" color={color} label={trendValues[trend]} />
//             </Stack>
//             <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//               {interval}
//             </Typography>
//           </Stack>
//           <Box sx={{ width: '100%', height: 50 }}>
//             <SparkLineChart
//               colors={[chartColor]}
//               data={data}
//               area
//               showHighlight
//               showTooltip
//               xAxis={{
//                 scaleType: 'band',
//                 data: daysInWeek,
//               }}
//               sx={{
//                 [`& .${areaElementClasses.root}`]: {
//                   fill: `url(#area-gradient-${value})`,
//                 },
//               }}
//             >
//               <AreaGradient color={chartColor} id={`area-gradient-${value}`} />
//             </SparkLineChart>
//           </Box>
//         </Stack>
//       </CardContent>
//     </Card>
//   );
// }

// StatCard.propTypes = {
//   data: PropTypes.arrayOf(
//     PropTypes.shape({
//       x: PropTypes.string.isRequired,
//       y: PropTypes.number.isRequired,
//     })
//   ).isRequired,
//   interval: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   trend: PropTypes.oneOf(['down', 'neutral', 'up']).isRequired,
//   value: PropTypes.string.isRequired,
// };

// export default StatCard;
