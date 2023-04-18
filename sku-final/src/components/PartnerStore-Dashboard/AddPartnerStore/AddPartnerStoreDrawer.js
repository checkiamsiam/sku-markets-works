import {
  Autocomplete,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Iconify from 'components/iconify/Iconify';
import Scrollbar from 'components/scrollbar/Scrollbar';
import Block from 'components/settings/drawer/Block';
import ColorPresetsOptions from 'components/settings/drawer/ColorPresetsOptions';
import { currency } from 'layouts/dashboard/header/currency';
import { useLocales } from 'locales';
import { useRef } from 'react';
import { FaFacebookF, FaInstagramSquare, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { IoLogoWhatsapp } from 'react-icons/io';
import { GiEarthAmerica } from 'react-icons/gi';
import { countries } from '../../../assets/data';
import UploadLogoImage from './uploadImage';

const AddPartnerStoreDrawer = ({ toggleDrawer }) => {
  const countryRef = useRef();
  const storeCurrency = useRef();
  const twitterRef = useRef();
  const fbRef = useRef();
  const psnRef = useRef();
  const insRef = useRef();
  const ytRef = useRef();
  // const pstRef = useRef();
  const emailRef = useRef();
  const WhatsAppRef = useRef();
  const nameRef = useRef();
  const themeColorRef = useRef();
  const gapRef = useRef();
  // const iosRef = useRef();
  // const androidRef = useRef();
  const tacRef = useRef();
  const policyRef = useRef();
  const aboutRef = useRef();
  const { allLangs } = useLocales();

  const onSubmit = () => {
    toggleDrawer()
  }
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pl: 2, pr: 1, py: 2 }}
      >
        <Typography variant="subtitle1">Add Partner Store</Typography>

        <IconButton onClick={toggleDrawer}>
          <Iconify icon="eva:close-fill" />
        </IconButton>
      </Stack>

      <Divider />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 2.5 }}>
          <Stack spacing={1}>
            <Stack direction="column" spacing={2}>
              <TextField
                inputRef={nameRef}
                size="small"
                fullWidth
                label="Partner Store Name"
                placeholder="skumarkets.com/@"
                id="psn-top"
                required
              />
              {/* <Autocomplete
                disablePortal
                id="store-type-select-campaings"
                size="small"
                options={partnerStoreType}
                sx={{ width: '100%' }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Partner Store Type"
                    placeholder="Partner Store Type"
                    inputRef={pstRef}
                  />
                )}
              /> */}
              <Autocomplete
                disablePortal
                id="country-select-campaings"
                size="small"
                options={countries}
                sx={{ width: '100%' }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Country"
                    placeholder="Country"
                    inputRef={countryRef}
                  />
                )}
                required
              />
              <Autocomplete
                disablePortal
                id="Store-Currency-campaigns"
                size="small"
                options={currency}
                getOptionLabel={(option) => option.value}
                sx={{ width: '100%' }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Store Currency"
                    placeholder="Store Currency"
                    inputRef={storeCurrency}
                  />
                )}
                required
              />
              <Autocomplete
                disablePortal
                id="Default-Store-Language-autocomplete"
                size="small"
                options={allLangs}
                sx={{ width: '100%' }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Default Store Language"
                    placeholder="Default Store Language"
                    inputRef={storeCurrency}
                  />
                )}
                required
              />
              <TextField
                inputRef={psnRef}
                size="small"
                fullWidth
                label={<GiEarthAmerica />}
                placeholder="Partner Store Domain"
                id="psn-name"
                required
              />
              <TextField
                inputRef={emailRef}
                size="small"
                fullWidth
                label={<MdEmail />}
                placeholder="Partner Store Email"
                id="pse-name-field"
                required
              />
              <TextField
                inputRef={WhatsAppRef}
                size="small"
                fullWidth
                label={<IoLogoWhatsapp />}
                placeholder="Partner Store WhatsApp"
                id="whats-app-field"
                required
              />
              {/* <TextField
                inputRef={iosRef}
                size="small"
                fullWidth
                label={<BsApple />}
                placeholder="IOS App Link"
                id="ios-app-field"
              />
              <TextField
                inputRef={androidRef}
                size="small"
                fullWidth
                label={<AiFillAndroid />}
                placeholder="Android App Link"
                id="android-app-field"
              /> */}
              <TextField
                inputRef={twitterRef}
                size="small"
                fullWidth
                label={<FaTwitter />}
                placeholder="Twitter"
                id="twitter"
                required
              />
              <TextField
                inputRef={fbRef}
                size="small"
                fullWidth
                label={<FaFacebookF />}
                placeholder="facebook"
                id="facebook"
                required
              />
              <TextField
                inputRef={insRef}
                size="small"
                fullWidth
                label={<FaInstagramSquare />}
                placeholder="instagram"
                id="instagram"
                required
              />
              <TextField
                inputRef={ytRef}
                size="small"
                fullWidth
                label={<FaYoutube />}
                placeholder="Youtube"
                id="Youtube"
                required
              />
              <TextField
                inputRef={aboutRef}
                id="outlined-multiline-static-2"
                label="Partner Store About"
                multiline
                rows={4}
                placeholder="About Store"
                required
              />
              <TextField
                inputRef={policyRef}
                id="outlined-multiline-static-1"
                label="Partner Store Policy"
                multiline
                rows={4}
                placeholder="Policy"
                required
              />
              <TextField
                inputRef={tacRef}
                id="outlined-multiline-static-3"
                label="Terms and Conditions"
                multiline
                rows={4}
                placeholder="Terms and Conditions"
                required
              />
              <TextField
                inputRef={gapRef}
                id="outlined-multiline-static-4"
                label="Guarantees and Assurances Policy"
                multiline
                rows={4}
                placeholder="Guarantees and Assurances Policy"
                required
              />
              <Block title="Theme Color">
                <ColorPresetsOptions ref={themeColorRef} />
              </Block>
              <Block title="Logo upload">
                <UploadLogoImage />
              </Block>
            </Stack>
          </Stack>
        </Stack>
      </Scrollbar>
      <Box sx={{ p: 2.5 }}>
        <Button
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="outlined"
          startIcon={<Iconify icon="eva:checkmark-outline" />}
          onClick={onSubmit}
        >
          Create Partner Store
        </Button>
        <Button
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="outlined"
          startIcon={<Iconify icon="eva:trash-2-outline" />}
          sx={{ mt: 1 }}
          onClick={toggleDrawer}
        >
          Cancel
        </Button>
      </Box>
    </>
  );
};

export default AddPartnerStoreDrawer;
