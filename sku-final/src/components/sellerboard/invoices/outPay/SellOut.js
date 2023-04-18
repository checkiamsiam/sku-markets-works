import {
  Box, Button,
  Stack, TextField
} from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PrintAlert from 'components/sellerboard/sellerboardAlerts/PrintAlert';
import { Link } from 'react-router-dom';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const SellOut = () => {
  const printAlrt = PrintAlert();
    return (
        <>
           <Paper
        sx={{
          boxShadow: 3,
          // maxWidth: 500,
          flexGrow: 1,
          bgcolor: 'background.paper',
          borderRadius: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          spacing={0}
          sx={{ m: 1 }}
        >
          <Box>
            <Button
              sx={{
                bgcolor: 'white',
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                },
                width: 100,
                mt:1
              }}
              onClick={printAlrt}
            >
              Print
            </Button>
          </Box>
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={3} md={1}>
            <ButtonBase sx={{ textAlign: 'center', p: 1 }}>
              <Img
                alt="complex"
                src="https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg"
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={9} md={3.5} container>
          <Grid item container direction="column" spacing={0}>
              <Grid item>
                <Typography component={Link} to={`/skuMarket/${1}`}variant="caption" sx={{textDecoration:"none", color:'text.primary'}}>
                  N36338468A
                </Typography>
                <br />
                <Typography variant="caption">Quick Cook Baby Food Maker - White/Clear</Typography> <br />
                <Typography component={Link} to={`/brand/${"tommee tippee"}`} variant="caption" color="text.primary" sx={{textDecoration:"none"}}>
                  Tommee Tippee
                </Typography>
                <br />
                <Typography component={Link} to={`/category/${"body products"}`} variant="caption" color="text.primary" sx={{textDecoration:"none"}}>
                  Body Products
                </Typography>
              </Grid>
              <Grid item>
                <ButtonBase component={Link} to={`/marketplace/${"noon-ksa"}`} sx={{ width: 40, height: 40,textDecoration:"none" }}>
                  <Img
                    alt="complex"
                    src="https://sku-markets-git-main-skumarkets.vercel.app/static/media/noon-saudi.c6b665a962341d75a9b658b6012c4194.svg"
                  />
                </ButtonBase>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={9} md={3} sx={{ml:{xs:'auto'}}} container>
            <Grid item md container direction="column" spacing={1}>
              <Grid item md>
                <Typography sx={{fontWeight:700}} variant="caption">
                  Request Number: 
                  <span  style={{fontWeight:300}}> S0000001M</span>
                </Typography> <br />
                <Typography variant="caption">
                  <span  style={{fontWeight:700}}>Request Country: </span>
                   UAE
                </Typography> <br />
                <Typography variant="caption">
                  <span style={{fontWeight:700}}>Request City: </span>
                  Dubai
                </Typography>
              </Grid>
            
            </Grid>
          </Grid>
          <Grid item xs={6} md={2} container>
            <Grid item md alignItems="center" container direction="column" spacing={1}>
              <Grid item md>
                <Typography sx={{fontWeight:700}} variant="caption">Total Amount</Typography> <br />
                <Typography variant="caption" sx={{textAlign: 'center' ,fontWeight:700}}>AED 7000</Typography>
              </Grid> 
              <Typography variant="caption" sx={{ fontSize: '12px', fontWeight:600, p:0 }}>Order Outstanding Payment</Typography>
              <Grid item sx={{ textAlign: 'center' }}>
              <TextField
                id="outlined-number"
                size="small"
                type="number"
                disabled
                defaultValue="12"
                InputLabelProps={{
                  shrink: true,
                  sx: { color:'text.primary' }
                }}
                inputProps={{ style: { textAlign: 'center' } }}
                label="Quantity"
                variant="outlined"
                sx={{ m:1, fontSize: '12px',width: 75 }}
              />
              <TextField
                id="outlined-number"
                size="small"
                type="number"
                disabled
                defaultValue="12"
                InputLabelProps={{
                  shrink: true,
                  sx: { color:'text.primary' }
                }}
                inputProps={{ style: { textAlign: 'center' } }}
                label="Bid/Unit"
                variant="outlined"
                sx={{ m:1, fontSize: '12px',width: 75 }}
              />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} md={2.5} container>
            <Grid item md container direction="column" spacing={0} alignItems='center' sx={{textAlign:'center'}}>
              <Grid item md> 
              <br />
                <Typography variant="caption" sx={{ pt: 2.5 , fontWeight:700}}>
                  Sell
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper> 
        </>
    );
};

export default SellOut;