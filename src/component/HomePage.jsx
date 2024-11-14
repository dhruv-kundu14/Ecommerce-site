import React, { useState, useEffect } from "react";
import "../App.css"; // Add styles for HomePage here
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Carousel from "react-bootstrap/Carousel";
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";

const HomePage = ({ addToCart }) => {
  const products = [
    { id: 1, name: "Bagpack", price: "₹ 9500", image: "/icons/product1.jpg" },
    {
      id: 2,
      name: "Adidas Light",
      price: "₹ 12565",
      image: "/icons/product2.jpg",
    },
    {
      id: 3,
      name: "Cartoon Astronaut T-Shirt",
      price: "₹ 12565",
      image: "/icons/product3.jpg",
    },
    {
      id: 4,
      name: "Cartoon Astronaut T-Shirt",
      price: "₹ 12565",
      image: "/icons/product4.jpg",
    },
    {
      id: 5,
      name: "Cartoon Astronaut T-Shirt",
      price: "₹ 12565",
      image: "/icons/product5.jpg",
    },
    {
      id: 6,
      name: "Cartoon Astronaut T-Shirt",
      price: "₹ 12565",
      image: "/icons/product6.jpg",
    },
    {
      id: 7,
      name: "Cartoon Astronaut T-Shirt",
      price: "₹ 12565",
      image: "/icons/product7.jpg",
    },
    {
      id: 8,
      name: "Cartoon Astronaut T-Shirt",
      price: "₹ 12565",
      image: "/icons/product8.jpg",
    },
  ];

  const carouselItems = [
    { id: 1, image: "/icons/banner/b1.jpg", caption: "Limited Time Offer" },
    { id: 2, image: "/icons/banner/b16.jpg", caption: "Best Sellers" },
    { id: 3, image: "/icons/banner/b20.jpg", caption: "New Arrivals" },
  ];

  const reviews = [
    {
      id: 1,
      name: "John Doe",
      rating: 4,
      review: "Great product! Highly recommend it. The quality is top-notch.",
      icon: <img src="/icons/people/1.png" alt="John Doe" className="review-icon" />
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 5,
      review: "Absolutely love it! Fast delivery and excellent customer service.",
      icon: <img src="/icons/people/3.png" alt="Jane Smith" className="review-icon" />
    },
    {
      id: 3,
      name: "Michael Johnson",
      rating: 3,
      review: "Decent product, but could be improved. Overall, it's okay.",
      icon: <img src="/icons/people/2.png" alt="Michael Johnson" className="review-icon" />
    },
  ];

  const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, index) => (
    <MDBIcon
      key={index}
      icon={index < rating ? "star" : "star-half-alt"}
      className={`text-warning ${index >= rating ? "text-muted" : ""}`}
    />
  ));
};

  const [saleMessage, setSaleMessage] = useState("");
  const [clicked, setClicked] = useState(null);

  const handleAddToCart = (product) => {
    setClicked(product.id);
    addToCart(product);
    setTimeout(() => setClicked(null), 1000);
  };

  useEffect(() => {
    const checkTime = () => {
      const currDate = new Date();

      // Extract day, month, and year to format the date
      const day = String(currDate.getDate()).padStart(2, "0");
      const month = String(currDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
      const year = String(currDate.getFullYear()).slice(-2); // Get last 2 digits of the year

      // Format as 15-10-24
      const formattedDate = `${day}-${month}-${year}`;

      const currentHour = currDate.getHours();
      // const currentMinute = currDate.getMinutes();

      // Create a variable for the specific date you want to check against
      const saleEndDate = "20-10-24";

      // Adjusted condition: If today is the sale end date and it's before 10 PM (22:00)
      if (formattedDate === saleEndDate && currentHour < 23) {
        setSaleMessage("Sale ends at 12 PM today!");
      } else {
        setSaleMessage("The sale has ended. Check back for new offers!");
      }
    };

    // Call the function when component mounts
    checkTime();

    // Optional: Set interval to check every minute if you want real-time updates
    const interval = setInterval(checkTime, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero">
        <img src="/hero-section.jpg" alt="" />
        <div className="hero-content">
          <h2>Super value Deals</h2>
          <h3>On all Products</h3>
          <p>Shop Now</p>
        </div>
      </div>

      {/* Product List */}
      <div className="product-list">
        <h3>Featured Products</h3>
        <div className="products">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <div className="product-image">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => (e.target.src = "/placeholder.jpg")}
                />
              </div>
              <div className="product-details">
                <h4>{product.name}</h4>
                <p>Price: {product.price}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={clicked === product.id}
                >
                  <ShoppingBagIcon />
                  {clicked === product.id ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel */}
      <div className="carousel">
        <Carousel>
          {carouselItems.map((item) => (
            <Carousel.Item key={item.id}>
              <img
                className="carousel-img"
                src={item.image}
                alt={`Slide ${item.id}`}
              />
              <Carousel.Caption>
                <h3>{item.caption}</h3>
                <p>{saleMessage}</p> {/* Dynamic message */}
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="customer-reviews">
        <h3>Customer Reviews</h3>
        <div className="reviews">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                {review.icon}
                <div className="review-info">
                  <h4>{review.name}</h4>
                  <div className="stars">{renderStars(review.rating)}</div>
                </div>
              </div>
              <p>{review.review}</p>
            </div>
          ))}
        </div>
        </div>

      {/* Footer */}
 
      <MDBFooter className="text-center" color="white" bgColor="dark">
        <MDBContainer className="p-4">
          <section className="mb-4">
            <MDBBtn
              outline
              color="light"
              floating
              className="m-1"
              href="https://www.facebook.com/"
              role="button"
            >
              <MDBIcon fab icon="facebook-f" />
            </MDBBtn>

            <MDBBtn
              outline
              color="light"
              floating
              className="m-1"
              href="https://www.twitter.com/"
              role="button"
            >
              <MDBIcon fab icon="twitter" />
            </MDBBtn>

            <MDBBtn
              outline
              color="light"
              floating
              className="m-1"
              href="https://www.google.com/"
              role="button"
            >
              <MDBIcon fab icon="google" />
            </MDBBtn>

            <MDBBtn
              outline
              color="light"
              floating
              className="m-1"
              href="https://www.instagram.com/"
              role="button"
            >
              <MDBIcon fab icon="instagram" />
            </MDBBtn>

            <MDBBtn
              outline
              color="light"
              floating
              className="m-1"
              href="https://www.linkedin.com/"
              role="button"
            >
              <MDBIcon fab icon="linkedin-in" />
            </MDBBtn>

            <MDBBtn
              outline
              color="light"
              floating
              className="m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="github" />
            </MDBBtn>
          </section>

          <section className="">
            <form action="">
              <MDBRow className="d-flex justify-content-center">
                <MDBCol size="auto">
                  <p className="pt-2">
                    <strong>Sign up for our newsletter</strong>
                  </p>
                </MDBCol>

                <MDBCol md="5" start>
                  <MDBInput
                    contrast
                    type="email"
                    label="Email address"
                    className="mb-4"
                  />
                </MDBCol>

                <MDBCol size="auto">
                  <MDBBtn outline color="light" type="submit" className="mb-4">
                    Subscribe
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </form>
          </section>

          <section className="mb-4">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              distinctio earum repellat quaerat voluptatibus placeat nam,
              commodi optio pariatur est quia magnam eum harum corrupti dicta,
              aliquam sequi voluptate quas.
            </p>
          </section>

          <section className="">
            <MDBRow>
              <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
                <h5 className="text-uppercase">Links</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      Customer Support
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Shipping Info
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Returns
                    </a>
                  </li>
                </ul>
              </MDBCol>

              <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
                <h5 className="text-uppercase">Links</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      Exclusive Deals
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Seasonal Offers
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Discounts
                    </a>
                  </li>
                </ul>
              </MDBCol>

              <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
                <h5 className="text-uppercase">Links</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      About Us
                    </a>
                  </li>
                </ul>
              </MDBCol>

              <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
                <h5 className="text-uppercase">Links</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      Trending
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Best Sellers
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      New Arrivals
                    </a>
                  </li>
                </ul>
              </MDBCol>
            </MDBRow>
          </section>
        </MDBContainer>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2020 Copyright:
          <a className="text-white" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div>
      </MDBFooter>
    </div>
  );
};

export default HomePage;

// export default function App() {
//   return (
//     <MDBFooter className='text-center' color='white' bgColor='dark'>
//       <MDBContainer className='p-4'>
//         <section className='mb-4'>
//           <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
//             <MDBIcon fab icon='facebook-f' />
//           </MDBBtn>

//           <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
//             <MDBIcon fab icon='twitter' />
//           </MDBBtn>

//           <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
//             <MDBIcon fab icon='google' />
//           </MDBBtn>

//           <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
//             <MDBIcon fab icon='instagram' />
//           </MDBBtn>

//           <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
//             <MDBIcon fab icon='linkedin-in' />
//           </MDBBtn>

//           <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
//             <MDBIcon fab icon='github' />
//           </MDBBtn>
//         </section>

//         <section className=''>
//           <form action=''>
//             <MDBRow className='d-flex justify-content-center'>
//               <MDBCol size="auto">
//                 <p className='pt-2'>
//                   <strong>Sign up for our newsletter</strong>
//                 </p>
//               </MDBCol>

//               <MDBCol md='5' start>
//                 <MDBInput contrast type='email' label='Email address' className='mb-4' />
//               </MDBCol>

//               <MDBCol size="auto">
//                 <MDBBtn outline color='light' type='submit' className='mb-4'>
//                   Subscribe
//                 </MDBBtn>
//               </MDBCol>
//             </MDBRow>
//           </form>
//         </section>

//         <section className='mb-4'>
//           <p>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat
//             voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam
//             sequi voluptate quas.
//           </p>
//         </section>

//         <section className=''>
//           <MDBRow>
//             <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
//               <h5 className='text-uppercase'>Links</h5>

//               <ul className='list-unstyled mb-0'>
//                 <li>
//                   <a href='#!' className='text-white'>
//                     Link 1
//                   </a>
//                 </li>
//                 <li>
//                   <a href='#!' className='text-white'>
//                     Link 2
//                   </a>
//                 </li>
//                 <li>
//                   <a href='#!' className='text-white'>
//                     Link 3
//                   </a>
//                 </li>
//                 <li>
//                   <a href='#!' className='text-white'>
//                     Link 4
//                   </a>
//                 </li>
//               </ul>
//             </MDBCol>

//             <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
//               <h5 className='text-uppercase'>Links</h5>

//               <ul className='list-unstyled mb-0'>
//                 <li>
//                   <a href='#!' className='text-white'>
//                     Link 1
//                   </a>
//                 </li>
//                 <li>
//                   <a href='#!' className='text-white'>
//                     Link 2
//                   </a>
//                 </li>
//                 <li>
//                   <a href='#!' className='text-white'>
//                     Link 3
//                   </a>
//                 </li>
//                 <li>
//                   <a href='#!' className='text-white'>
//                     Link 4
//                   </a>
//                 </li>
//               </ul>
//             </MDBCol>

//             <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
//               <h5 className='text-uppercase'>Links</h5>

//               <ul className='list-unstyled mb-0'>
//                 <li>
//                   <a href='#!' className='text-white'>
//                     Link 1
//                   </a>
//                 </li>
//                 <li>
//                   <a href='#!' className='text-white'>
//                     Link 2
//                   </a>
//                 </li>
//                 <li>
//                   <a href='#!' className='text-white'>
//                     Link 3
//                   </a>
//                 </li>
//                 <li>
//                   <a href='#!' className='text-white'>
//                     Link 4
//                   </a>
//                 </li>
//               </ul>
//             </MDBCol>

//             <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
//               <h5 className='text-uppercase'>Links</h5>

//               <ul className='list-unstyled mb-0'>
//                 <li>
//                   <a href='#!' className='text-white'>
//                     Link 1
//                   </a>
//                 </li>
//                 <li>
//                   <a href='#!' className='text-white'>
//                     Link 2
//                   </a>
//                 </li>
//                 <li>
//                   <a href='#!' className='text-white'>
//                     Link 3
//                   </a>
//                 </li>
//                 <li>
//                   <a href='#!' className='text-white'>
//                     Link 4
//                   </a>
//                 </li>
//               </ul>
//             </MDBCol>
//           </MDBRow>
//         </section>
//       </MDBContainer>

//       <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
//         © 2020 Copyright:
//         <a className='text-white' href='https://mdbootstrap.com/'>
//           MDBootstrap.com
//         </a>
//       </div>
//     </MDBFooter>
//   );
// }
