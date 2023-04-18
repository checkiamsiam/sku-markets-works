import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Link,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import Iconify from 'components/iconify/Iconify';
import { useUploadDocsMutation } from 'features/auth/authAPI';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#212B36' : '#fff',
  padding: theme.spacing(1),
  // textAlign: 'center', border: '1px dashed #2065D1',
  color: theme.palette.text.primary,
}));

const PdfUploads = () => {
  const user = useAuth();
  const { commercial, vat, national, bank, brand, courier, other } = user?.docs || {};

  const [field, setField] = useState({ name: '', file: null });

  const [upload, { isLoading }] = useUploadDocsMutation();

  // Handle Upload a File
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('docs', field?.file);
    const data = { name: field?.name, file: formData };
    await upload(data);
    setField({ name: '', file: null });
  };

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Item>
              <Box sx={{ minHeight: 600 }}>
                {field?.file ? (
                  <>
                    <iframe
                      title="Pdf Upload"
                      src={URL.createObjectURL(field?.file)}
                      width="100%"
                      height="600"
                    />
                    <Stack direction='row' justifyContent="flex-end" alignItems='center' spacing={1.5} sx={{ my: 2 }}>

                      <Button
                        onClick={() => setField({name: '', file: null})}
                        variant='outlined'
                        color='error'
                        sx={{'&:hover': {bgcolor: 'error.dark', color: 'white'}}}
                      >
                        Remove
                      </Button>

                      <LoadingButton
                        onClick={handleUpload}
                        type="submit"
                        variant="contained"
                        loading={isLoading}
                        sx={{
                          ml: 'auto',
                          bgcolor: 'primary.main',
                          border: (theme) => `1px solid ${theme.palette.primary.main}`,
                          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                          '&:hover': {
                            bgcolor: 'white',
                            color: (theme) =>
                              theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                            border: (theme) => `1px solid ${theme.palette.primary.main}`,
                          },
                        }}
                      >
                        Submit
                      </LoadingButton>
                    </Stack>
                  </>
                ) : (
                  <>
                    {commercial?.url ||
                    vat?.url ||
                    national?.url ||
                    bank?.url ||
                    brand?.url ||
                    courier?.url ||
                    other?.url ? (
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontSize: 30, textAlign: 'center', fontWeight: 700, mt: 2 }}
                        >
                          Submitted Documents
                        </Typography>
                        <Stack direction="column" spacing={2} sx={{ mx: 2, mt: 4 }}>
                          {Object.entries(user?.docs).map((item, i) => {
                            let fieldName = '';
                            if (item[0] === 'commercial') {
                              fieldName = 'Commercial Registration';
                            } else if (item[0] === 'vat') {
                              fieldName = 'VAT Certification';
                            } else if (item[0] === 'national') {
                              fieldName = 'National Identification';
                            } else if (item[0] === 'bank') {
                              fieldName = 'Bank Info Details';
                            } else if (item[0] === 'brand') {
                              fieldName = 'Brand Certification';
                            } else if (item[0] === 'courier') {
                              fieldName = 'Courier Agreement';
                            } else if (item[0] === 'other') {
                              fieldName = 'Others';
                            }
                            if (item[1]?.url)
                              return (
                                <Stack
                                  key={i}
                                  direction="row"
                                  spacing={1}
                                  justifyContent="space-between"
                                >
                                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5 }}>
                                    <Typography
                                      variant="subtitle1"
                                      sx={{ fontWeight: 500, width: 195 }}
                                    >
                                      {fieldName}:{' '}
                                    </Typography>
                                    <Link href={item[1].url} target="_blank" rel="noreffer">
                                      Download {fieldName}
                                    </Link>
                                  </Box>
                                  {/*<Button
                                    aria-label="Delete"
                                    color="error"
                                    disabled
                                    startIcon={<Iconify icon="eva:trash-2-outline" />}
                                  >
                                    Delete
                                  </Button>*/}
                                </Stack>
                              );
                          })}
                        </Stack>
                      </Box>
                    ) : (
                      <Stack alignItems="center" justifyContent="center" sx={{ height: 600 }}>
                        <Typography variant="subtitle1">Select a file to see preview</Typography>
                      </Stack>
                    )}
                  </>
                )}
              </Box>
            </Item>
          </Grid>
          <Grid item xs={12} md={3}>
            <Item>
              <Stack
                alignItems="center"
                direction="column"
                spacing={1}
                sx={{ textAlign: 'center' }}
              >
                <Typography sx={{ fontWeight: 600, pb: 1, fontSize: '15px' }}>
                  Information
                </Typography>

                <Typography component="div" sx={{ fontWeight: 600, fontSize: '13px', pt: 2.5 }}>
                  Commercial Registration Number:
                </Typography>
                <TextField
                  value={commercial?.value || 'Not Available'}
                  size="small"
                  variant="filled"
                  inputProps={{ style: { fontSize: '13px' } }}
                  fullWidth
                  hiddenLabel
                  disabled
                />

                <Typography component="div" sx={{ fontWeight: 600, fontSize: '13px', pt: 2.5 }}>
                  Company National Identification Number:
                </Typography>
                <TextField
                  value={brand?.value || 'Not Available'}
                  size="small"
                  variant="filled"
                  inputProps={{ style: { fontSize: '13px' } }}
                  fullWidth
                  hiddenLabel
                  disabled
                />

                <Typography component="div" sx={{ fontWeight: 600, fontSize: '13px', pt: 2.5 }}>
                  Value Added Tax Number:
                </Typography>
                <TextField
                  value={vat?.value || 'Not Available'}
                  size="small"
                  variant="filled"
                  inputProps={{ style: { fontSize: '13px' } }}
                  fullWidth
                  hiddenLabel
                  disabled
                />

                <Typography component="div" sx={{ fontWeight: 600, fontSize: '13px', pt: 2.5 }}>
                  Owner National Identification Number:
                </Typography>
                <TextField
                  value={national?.value || 'Not Available'}
                  size="small"
                  variant="filled"
                  inputProps={{ style: { fontSize: '13px' } }}
                  fullWidth
                  hiddenLabel
                  disabled
                />

                <Typography component="div" sx={{ fontWeight: 600, fontSize: '13px', pt: 2.5 }}>
                  Bank IBAN Number:
                </Typography>
                <TextField
                  value={bank?.value || 'Not Available'}
                  size="small"
                  variant="filled"
                  inputProps={{ style: { fontSize: '13px' } }}
                  fullWidth
                  hiddenLabel
                  disabled
                />

                <Typography component="div" sx={{ fontWeight: 600, fontSize: '13px', pt: 2.5 }}>
                  Courier Name:
                </Typography>
                <TextField
                  value={courier?.value || 'Not Available'}
                  size="small"
                  variant="filled"
                  inputProps={{ style: { fontSize: '13px' } }}
                  fullWidth
                  hiddenLabel
                  disabled
                />
              </Stack>
            </Item>
          </Grid>
          <Grid item xs={12} md={9}>
            <Item>
              <ButtonGroup size="large" aria-label="large button group">
                {Object.entries(user?.docs).map((item, i) => {
                  let fieldName = '';
                  if (item[0] === 'commercial') {
                    fieldName = 'Commercial Registration';
                  } else if (item[0] === 'vat') {
                    fieldName = 'VAT Certification';
                  } else if (item[0] === 'national') {
                    fieldName = 'National Identification';
                  } else if (item[0] === 'bank') {
                    fieldName = 'Bank Info Details';
                  } else if (item[0] === 'brand') {
                    fieldName = 'Brand Certification';
                  } else if (item[0] === 'courier') {
                    fieldName = 'Courier Agreement';
                  } else if (item[0] === 'other') {
                    fieldName = 'Others';
                  }
                  return (
                    <Button
                      key={i}
                      variant={field?.name === item[0] ? 'contained' : 'outlined'}
                      disabled={item[1]?.url ? true : false}
                      sx={{
                        py: 4,
                        width: '100%',
                        textAlign: 'center',
                        border: '1px dashed #2065D1',
                        fontSize: '13px',
                        position: 'relative',
                      }}
                      component="label"
                    >
                      {item[0] !== 'other' && item[0] !== 'courier' && (
                        <Typography
                          variant="caption"
                          sx={{
                            position: 'absolute',
                            top: 1,
                            right: 4,
                            color: 'red',
                            fontSize: 20,
                            zIndex: 5,
                          }}
                        >
                          *
                        </Typography>
                      )}
                      {fieldName}
                      <input
                        hidden
                        accept=".pdf"
                        type="file"
                        disabled={item[1]?.url ? true : false}
                        onChange={(e) => setField({ name: item[0], file: e.target.files[0] })}
                      />
                    </Button>
                  );
                })}
              </ButtonGroup>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PdfUploads;
