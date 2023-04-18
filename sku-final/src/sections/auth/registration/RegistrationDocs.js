import React, { useEffect, useCallback } from 'react';
import { LoadingButton } from '@mui/lab';
import { Box, Stack, Typography, IconButton, useTheme, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { alpha } from '@mui/material/styles';

import useAuth from 'hooks/useAuth';

import { useUploadDocsMutation, useCompleteProfileMutation, useDeleteDocsMutation } from 'features/auth/authAPI';
import { useNavigate } from 'react-router';

import { RHFUploadPDF } from 'components/hook-form/RHFUpload';
import FormProvider from 'components/hook-form';
import { useForm } from 'react-hook-form';

const RegistrationDocs = () => {
  const theme = useTheme();
  const user = useAuth();
  const navigate = useNavigate();
  const { commercial, vat, national, bank, brand, courier, other } = user?.docs || {};

  const [upload] = useUploadDocsMutation();
  const [complete, { isLoading: completeLoading, isSuccess }] = useCompleteProfileMutation();
  const [deleteDocs, {isLoading: deleteLoading}] = useDeleteDocsMutation();

  useEffect(() => {
    isSuccess && navigate('/activation-process', { replace: true });
  }, [isSuccess, navigate])

  const methods = useForm({
    defaultValues: {
      commercial: '',
      vat: '',
      national: '',
      bank: '',
      brand: '',
      courier: '',
      other: ''
    }
  });

  const {
    setValue,
    getValues,
  } = methods;

  useEffect(() => {
    setValue('commercial', commercial?.url ? {preview: commercial.url} : '');
    setValue('vat', vat?.url ? {preview: vat.url} : '');
    setValue('national', national?.url ? {preview: national.url} : '');
    setValue('bank', bank?.url ? {preview: bank.url} : '');
    setValue('brand', brand?.url ? {preview: brand.url} : '');
    setValue('courier', courier?.url ? {preview: courier.url} : '');
    setValue('other', other?.url ? {preview: other.url} : '');
  }, [setValue, user.docs]);

  const handleDrop = useCallback(
    (acceptedFiles, fieldName) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue(fieldName, newFile);

        const formData = new FormData();
        formData.append('docs', file);
        const data = { name: fieldName, file: formData };
        upload(data);
      }
    },
    [setValue, upload]
  );

  const handleDelete = useCallback((fieldName) => {
    setValue(fieldName, '');
    deleteDocs({fieldName});
  },[setValue, deleteDocs])

  return (
    <Box sx={{width: '100%'}}>

      <Box sx={{width: '100%'}}>
        <FormProvider methods={methods}>
        {deleteLoading ? (
          <Box
            sx={{
              display: 'grid',
              placeItems: 'center',
              width: '100%',
              height: '80vh',
            }}
          >
          <CircularProgress/>
          </Box>
        ) : (
          <>
        {Object.entries(user?.docs).map((item, i) => {
          let fieldName = '';
          const value = getValues(item[0]);
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
            <Box key={i} sx={{my: 3}}>
              <Typography variant='subtitle1' sx={{pl: 2, pb: 1}}>
                {fieldName}
                {(item[0] !== 'other' && item[0] !== 'courier') && (<Typography
                  variant="caption"
                  sx={{
                    color: 'red',
                    fontSize: 20,
                    zIndex: 5,
                  }}
                >
                  *
                </Typography>)}
              </Typography>
              {value ? (
                <Stack
                  direction='column'
                  alignItems='center'
                  justifyContent='center'
                  spacing={0.75}
                  sx={{
                    width: '100%',
                    height: '350px',
                    fontSize: 24,
                    cursor: 'pointer',
                    mx: 'auto',
                    color: theme.palette.text.disabled,
                    borderRadius: 2,
                    border: `dashed 1px ${theme.palette.divider}`,
                    backgroundColor: alpha(theme.palette.grey[500], 0.08),
                    '&:hover': {
                      opacity: 0.72,
                    },
                  }}>
                  <object width='400px' height='250px' data={value.preview} type='application/pdf'>
                  </object>
                  <IconButton onClick={() => handleDelete(item[0])}>
                    <DeleteIcon/>
                  </IconButton>
                </Stack>
              ) : (<RHFUploadPDF
                  disabled={item[0].url}
                  name={item[0]}
                  maxSize={3145728}
                  onDrop={(file) => handleDrop(file, item[0])}
                  multiple={false}
                  onDelete={() => handleDelete(item[0])}
                />
              )}
              </Box>
            )}
          )}
          </>
        )}
        </FormProvider>
      </Box>

      {/* Complete Registration Button */}
      <Stack direction="row" justifyContent="flex-end" sx={{ my: 5 }}>
        <LoadingButton
          disabled={
            !commercial?.url || !vat?.url || !national?.url || !bank?.url || !brand?.url
          }
          onClick={complete}
          loading={completeLoading}
          variant="contained"
          sx={{
            px: 4,
            py: 1,
            bgcolor: 'primary.main',
            border: (theme) => `1px solid ${theme.palette.primary.main}`,
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'white',
              color: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : 'primary.main'),
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
            },
          }}
        >
          Complete Registration
        </LoadingButton>
      </Stack>
    </Box>
  );
};

export default RegistrationDocs;
