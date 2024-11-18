import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";

export default function TemporaryDrawer({ onFilterChange }) {
  const [open, setOpen] = React.useState(false);
  const [priceRange, setPriceRange] = React.useState([100, 5000]);
  const [selectedSize, setSelectedSize] = React.useState(null);
  const [selectedColor, setSelectedColor] = React.useState(null);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    console.log(`Drawer is now ${newOpen ? "open" : "closed"}`);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    console.log("Price range updated:", newValue);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    console.log("Size selected:", size);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    console.log("Color selected:", color);
  };

  const handleSearchClick = () => {
    const selectedFilters = {
      price: priceRange.join(","), // Convert array to string
      size: selectedSize,
      color: selectedColor,
    };

    console.log("Filters applied:", selectedFilters);

    // Notify parent component of the updated filters
    if (onFilterChange) {
      onFilterChange(selectedFilters);
    }
  };

  const sizes = [6, 7, 8, 9, 10, 11, 12];
  const colors = ["Black", "White", "Blue", "Green", "Grey"];

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
            aria-label={`Size ${size}`}
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
              border: selectedColor === color ? "3px solid #2e57df" : "1px solid black",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
            onClick={() => handleColorSelect(color)}
            aria-label={`Color ${color}`}
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

      {/* Search Button */}
      <Button
        onClick={handleSearchClick}
        sx={{
          width: "100%",
          backgroundColor: "#2e57df",
          color: "#fff",
          padding: "10px",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#1d3a75",
          },
        }}
        aria-label="Search Filters"
      >
        Search
      </Button>
    </Box>
  );

  return (
    <div className="filter-sidebar">
      <Button onClick={toggleDrawer(true)} aria-label="Open Filters">
        {open ? "Close Filters" : "Filter & Sort"}
      </Button>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
