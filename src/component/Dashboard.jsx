import React from "react";
import { Grid, Paper, Typography, Box, Divider } from "@mui/material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import SecurityIcon from "@mui/icons-material/Security";
// import HomeIcon from "@mui/icons-material/Home";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const AccountDashboard = () => {
  const accountItems = [
    {
      title: "Your Orders",
      description: "Track, return, or buy things again",
      // icon: <ShoppingCartIcon fontSize="large" />,
      icon: <img 
      src="/icons/shopping-cart.png" 
      alt="Shopping bag icon" 
      style={{
        width: '50px',
        height: '50px',
        marginRight: '8px',
        objectFit: 'contain',
        cursor: 'pointer',
        transition: 'transform 0.2s',
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    />
    },
    {
      title: "Login & Security",
      description: "Edit login, name, and mobile number",
      // icon: <SecurityIcon fontSize="large" />,
      icon: <img 
        src="/icons/shield.png"
        alt="shield secuirty"
        style={{
          width: '50px',
          height: '50px',
          marginRight: '8px',
          objectFit: 'contain',
          cursor: 'pointer',
          transition: 'transform 0.2s',
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      />
    },
    {
      title: "Prime",
      description: "View benefits and payment settings",
      // icon: <CreditCardIcon fontSize="large" />,
      icon: <img 
        src="/icons/box.png"
        alt="shield secuirty"
        style={{
          width: '50px',
          height: '50px',
          marginRight: '8px',
          objectFit: 'contain',
          cursor: 'pointer',
          transition: 'transform 0.2s',
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      />
    },
    {
      title: "Your Addresses",
      description: "Edit addresses for orders and gifts",
      // icon: <HomeIcon fontSize="large" />,
      icon: <img 
        src="/icons/location.png"
        alt="shield secuirty"
        style={{
          width: '50px',
          height: '50px',
          marginRight: '8px',
          objectFit: 'contain',
          cursor: 'pointer',
          transition: 'transform 0.2s',
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      />
    },
    {
      title: "Your Business Account",
      description:
        "Sign up for free to save up to 28% with GST invoice and bulk discounts",
      // icon: <BusinessCenterIcon fontSize="large" />,
      icon: <img 
        src="/icons/cooperation.png"
        alt="shield secuirty"
        style={{
          width: '50px',
          height: '50px',
          marginRight: '8px',
          objectFit: 'contain',
          cursor: 'pointer',
          transition: 'transform 0.2s',
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      />
    },
    {
      title: "Payment Options",
      description: "Edit or add payment methods",
      // icon: <CreditCardIcon fontSize="large" />,
      icon: <img 
        src="/icons/wallet.png"
        alt="shield secuirty"
        style={{
          width: '50px',
          height: '50px',
          marginRight: '8px',
          objectFit: 'contain',
          cursor: 'pointer',
          transition: 'transform 0.2s',
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      />
    },
    {
      title: "Amazon Pay Balance",
      description: "Add money to your balance",
      // icon: <AccountBalanceWalletIcon fontSize="large" />,
      icon: <img 
        src="/icons/wallet (1).png"
        alt="shield secuirty"
        style={{
          width: '50px',
          height: '50px',
          marginRight: '8px',
          objectFit: 'contain',
          cursor: 'pointer',
          transition: 'transform 0.2s',
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      />
    },
    {
      title: "Contact Us",
      description: "Contact our customer service via phone or chat",
      // icon: <AccountBalanceWalletIcon fontSize="large" />,
      icon: <img 
        src="/icons/customer-service.png"
        alt="shield secuirty"
        style={{
          width: '50px',
          height: '50px',
          marginRight: '8px',
          objectFit: 'contain',
          cursor: 'pointer',
          transition: 'transform 0.2s',
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      />
    },
  ];

  const accountItem1 = [
    {
      title: "Digital content and devices",
      links: [
        "Apps and more",
        "Content and devices",
        "Digital gifts you've received",
      ],
    },
    {
      title: "Email alerts, messages, and ads",
      links: [
        "Advertising preferences",
        "Communication preferences",
        "SMS alert preferences",
        "Message Centre",
        "Alexa shopping notifications",
      ],
    },
    {
      title: "More ways to pay",
      links: ["Default Purchase Settings", "Amazon Pay", "Coupons"],
    },
    {
      title: "Ordering and shopping preferences",
      links: [
        "Leave packaging feedback",
        "Lists",
        "Manage saved IDs",
        "Profile",
        "Language settings",
      ],
    },
    {
      title: "Other accounts",
      links: ["Account Linking",
        "Seller account",
        "Amazon Web Services"],
    },
    {
      title: "Shopping programs and rentals",
      links: ["Manage Your Amazon Family",
        "Subscribe & Save",
        "Shop the Kids Store by age"],
    },
    {
      title: "Subscriptions",
      links: ["Email",
        "Memberships & Subscriptions"],
    },
    {
        title: "Manage your data",
        links: ["Request your data",
            "Manage apps and services with data access",
            "Close Your Amazon Account",
            "Privacy Notice"],
      },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Account
      </Typography>
      <Grid container spacing={2}>
        {accountItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={2}
              sx={{
                padding: 3,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                height: 180,
                minWidth: 220,
                textAlign: "center",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: 6,
                  transform: "scale(1.02)",
                },
              }}
            >
              <Box sx={{ marginBottom: 1 }}>{item.icon}</Box>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="body2">{item.description}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* <Divider sx={{ marginY: 5 }} /> */}
      <Divider 
  sx={{ 
    marginY: 5, 
    borderColor: 'rgba(0, 0, 0, 0.8)', // Darker color for better visibility
    borderWidth: '2px' // Increase thickness
  }} 
/>

      <Grid container spacing={2}>
        {accountItem1.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={2}
              sx={{
                padding: 3,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                height: 180,
                minWidth: 220,
                textAlign: "center",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: 6,
                  transform: "scale(1.02)",
                },
              }}
            >
              <Box sx={{ marginBottom: 1 }}>{item.icon}</Box>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="body2">{item.description}</Typography>
              {item.links.map((link, idx) => (
                <Typography
                  key={idx}
                  variant="body2"
                  sx={{ color: "teal", cursor: "pointer" }}
                >
                  {link}
                </Typography>
              ))}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AccountDashboard;
