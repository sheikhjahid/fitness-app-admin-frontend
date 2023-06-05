// next
import Head from "next/head";
import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import ClientTable from "../../components/Admin/ClientTable";

import MultipartForm from "../../components/form/MultipartForm";
// layouts

import DashboardLayout from "../../layouts/dashboard";
// components
import { useSettingsContext } from "../../components/settings";

// ----------------------------------------------------------------------

PageOne.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function PageOne() {
  const { themeStretch } = useSettingsContext();
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const addClient = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard - Fitness</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "xl"}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={8}>
            <Typography variant="h3" component="h1" paragraph>
              Clients List
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" onClick={addClient}>
              Add client
            </Button>
          </Grid>
        </Grid>
        <ClientTable />
      </Container>

      <Dialog
        fullWidth={fullWidth}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <MultipartForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
