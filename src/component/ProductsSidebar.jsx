import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";

export default function TemporaryDrawer({ onPriceChange }) {
  const [open, setOpen] = React.useState(false);
  const [priceRange, setPriceRange] = React.useState([100, 5000]);
  const [selectedSize, setSelectedSize] = React.useState(null);
  const [ setSelectedColor] = React.useState(null);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    if (onPriceChange) {
      onPriceChange(newValue);
    }
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const sizes = [6, 7, 8, 9, 10, 11, 12, 6.5, 7.5, 8.5, 9.5, 10.5];
  const colors = ["black", "white", "blue", "green", "gray"];

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
      role="presentation"
    >
      {/* Size Section */}
      <h2 style={{ textAlign: "center", marginBottom: "15px" }}>Size</h2>
      <Grid container spacing={1}>
        {sizes.map((size, index) => (
          <Grid
            key={index}
            item
            xs={4}
            sx={{
              textAlign: "center",
              padding: "8px",
              border: `1px solid ${selectedSize === size ? "#2e57df" : "#ddd"}`,
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: selectedSize === size ? "bold" : "normal",
              backgroundColor: selectedSize === size ? "#f0f8ff" : "#fff",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                borderColor: "#2e57df",
                backgroundColor: "#f9f9f9",
              },
            }}
            onClick={() => handleSizeSelect(size)}
          >
            {size}
          </Grid>
        ))}
      </Grid>

      {/* Color Section */}
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>Color</h2>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        {colors.map((color, index) => (
          <Box
            key={index}
            sx={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              backgroundColor: color,
              
              border: "1px solid black",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
            onClick={() => handleColorSelect(color)}
          ></Box>
        ))}
      </Box>

      {/* Price Section */}
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>Price</h2>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={100}
        max={5000}
        step={50}
        sx={{
          color: "#2e57df",
          width: "90%",
          margin: "10px auto",
        }}
        aria-labelledby="price-slider"
      />
      <p style={{ textAlign: "center", fontSize: "14px", marginTop: "5px" }}>
        Selected Range: ₹{priceRange[0]} - ₹{priceRange[1]}
      </p>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        {/* Replace the icon with text */}
        <span style={{ fontSize: "15px", color: "black", fontWeight: "normal", padding: "5px" }}>Filter & Sort</span>
      </Button>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
