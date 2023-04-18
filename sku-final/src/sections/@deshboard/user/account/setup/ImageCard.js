import { useForm } from 'react-hook-form';

import { Box, Card, Tooltip, Typography, IconButton } from '@mui/material';

import { RHFUpload, RHFUploadAvatar } from 'components/hook-form/RHFUpload';
import {
  useUpdateAvatarMutation,
  useUpdateCoverMutation,
} from 'features/auth/authAPI';
import useAuth from 'hooks/useAuth';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { InfoIcon } from 'theme/overrides/CustomIcons';
import { fData } from 'utils/formatNumber';
import pCover from 'assets/images/sku-market-default-cover-profile.jpg';
import pProfile from 'assets/images/sku-market-default-profile.jpg';
import mapIcon from 'assets/images/map.png';
import FormProvider from 'components/hook-form';

export default function ImageCard () {
  const user = useAuth();

  const [updateAvatar] = useUpdateAvatarMutation();
  const [updateCover] = useUpdateCoverMutation();

  const methods = useForm({
    defaultValues: {
      avatar: user?.avatar || pProfile,
      cover: user?.cover || pCover,
    },
  });

  const {
    setValue,
  } = methods;


  const handleAvatar = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatar', newFile, { shouldValidate: true });

        const formData = new FormData();
        formData.append('avatar', file);
        updateAvatar(formData);
      }
    },
    [setValue, updateAvatar]
  );

  const handleCover = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      if (file) {
        setValue('cover', newFile, { shouldValidate: true });
        const formData = new FormData();
        formData.append('cover', file);
        updateCover(formData);
      }
    },
    [setValue, updateCover]
  );
  return (
    <FormProvider methods={methods}>
      <Card sx={{ pb: 40, textAlign: 'center' }}>
        {/* Cover Image */}
        <Tooltip title="Click on image to change">
          <IconButton sx={{
            position: 'absolute',
            top: 13,
            right: 20,
            color: 'white',
            zIndex: 11,
          }}>
            <InfoIcon />
          </IconButton>
        </Tooltip>
        <RHFUpload name="cover" maxSize={3145728} onDrop={handleCover} />

        {/* User Avatar */}
        <Box
          sx={{
            position: 'absolute',
            top: { md: '29%', xs: '35%' },
            left: '33%',
            zIndex: 10,
          }}
        >
          <RHFUploadAvatar
            name="avatar"
            maxSize={3145728}
            onDrop={handleAvatar}
            helperText={
              <Typography
                variant="caption"
                sx={{
                  mt: 2,
                  mx: 'auto',
                  display: 'block',
                  textAlign: 'center',
                  color: 'text.secondary',
                }}
              >
                Company logo
                <br /> max size of {fData(3145728)}
              </Typography>
            }
          />
          <Box sx={{ mt: 2.5 }}>
            {user?.isWhatsappVerified ? (
              <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary' }}>
                SKU Markets Bot is <span style={{ color: 'green' }}> connected</span> ✔️
              </Typography>
            ) : (
              <Typography
                component={Link}
                variant="caption"
                sx={{ textDecoration: 'underline', color: 'text.primary' }}
                to="/auth/send-otp"
              >
                Verify my WhatsApp
              </Typography>
            )}
            <br />
            <Typography
              component={Link}
              variant="caption"
              sx={{
                textDecoration: 'none',
                color: 'text.primary',
                '&:hover': { textDecoration: 'underline' },
              }}
              to="/userprofile"
            >
              Seller Profile Page
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 1,
                py: 2,
              }}
            >
              <Link
                to={`https://google.com/maps/@${user?.location?.lat},${user?.location?.lng},20z`}
                target="_blank"
                rel="noreffer"
              >
                <Box component="img" src={mapIcon} width="40px" height="40px" />
              </Link>
              <Typography variant="h5">{user?.companyName || 'Company Name'}</Typography>
            </Box>
          </Box>
        </Box>
      </Card>
      </FormProvider>
)}
