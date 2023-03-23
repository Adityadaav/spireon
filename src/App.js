import React, {useState } from "react";
import { TextField, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";


const VinDecoder = () => {
  const [vin, setVin] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [fuelTypePrimary, setFuelTypePrimary] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [error, setError] = useState(false);
  


  const handleSubmit = (event) => {
    event.preventDefault();
    if (vin.length === 17) {

      fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`)
        .then((response) => response.json())
        .then((data) => {
          const vehicle = data.Results[0];
          setYear(vehicle.ModelYear);
          setMake(vehicle.Make);
          setModel(vehicle.Model);
          setFuelTypePrimary(vehicle.FuelTypePrimary);
          setManufacturer(vehicle.Manufacturer);
          setError(false);

        })
        .catch((error) => {
          setError(true);
          console.error(error);
        });
    } else {
      setError(true);
      setVin("");
      setYear("");
      setMake("");
      setModel("");
      setFuelTypePrimary("");
      setManufacturer("");
      // setError(false);


    }
  };


  return (
    <>
      <div className="decoder">
        <h1>VIN Decoder</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            id="vin"
            label="Enter VIN"
            variant="outlined"
            value={vin}
            onChange={(e) => {
              if(vin.length ===0)
              {
                setVin(e.target.value)
                console.log("hii");
              }
              else{
                setVin(e.target.value)
                setError(true)
              }
            }
            }
          />
          <Button variant="contained" type="submit"
            sx={{ ml: 2 }}>
            Decode
          </Button>
        </form>
        {error ? (
        <Typography variant="body2" color="error">
          Please enter valid vin
        </Typography>) 
        : 
          (year && make && model && manufacturer && fuelTypePrimary && (
            <div>
              <h2>Vehicle Information</h2>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="vehicle information">
                  <TableHead>
                    <TableRow>
                      <TableCell>Property</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>VIN:</TableCell>
                      <TableCell>{vin}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Model:</TableCell>
                      <TableCell>{model}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Year:</TableCell>
                      <TableCell>{year}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Make:</TableCell>
                      <TableCell>{make}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Manufacturer:</TableCell>
                      <TableCell>{manufacturer}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>FuelTypePrimary:</TableCell>
                      <TableCell>{fuelTypePrimary}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>))
        }
      </div>
    </>

  );
};
export default VinDecoder;