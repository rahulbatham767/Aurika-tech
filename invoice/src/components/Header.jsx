import React, { useEffect, useState } from "react";
import { Stack, Box } from "@mui/material";

const Header = () => {
  const [logo, setLogo] = useState("");

  useEffect(() => {
    // Retrieve the saveData from local storage
    const savedData = localStorage.getItem("saveData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (parsedData.companyLogo) {
        setLogo(parsedData.companyLogo);
      }
    }
  }, []);

  return (
    <Stack direction="row" spacing={2} alignItems={"center"}>
      <Box>
        {logo ? (
          <img src={logo} alt="Company Logo" width={"300px"} />
        ) : (
          <p>Loading logo...</p> // Optional: Add a fallback in case the logo is not available
        )}
      </Box>
      <Box>
        <h3 className="font-bold">Tax/Invoice/Bill of Supply/Cash Memo</h3>
        <p>(Original for Recipient)</p>
      </Box>
    </Stack>
  );
};

export default Header;
