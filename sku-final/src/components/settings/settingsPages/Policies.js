import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Button, Card, CardContent, FormControl, MenuItem, OutlinedInput, Select, Typography, useTheme, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import {useAcceptPoliciesMutation, useAcceptManagerMutation, useAcceptSellerTypeMutation} from 'features/auth/authAPI';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MktType = [
  { type: 'Seller' },
  { type: 'Brand Owner' },
  { type: 'Distributor' },
  { type: 'Retailer' },
  { type: 'wholesaler' },
  { type: 'local store seller' },
  { type: 'Local Manufacturer' },
  { type: 'International Brand Owner' },
  { type: 'International Distributor' },
  { type: 'International Retailer' },
  { type: 'International wholesaler' },
  { type: 'International Seller' },
  { type: 'International Manufacturer' },
];

const Policies = () => {
  const user = useAuth();
  const [view,setView] = useState(user.seller_type || MktType[0]?.type);

  const [acceptPolicies, {isLoading: policyLoading}] = useAcceptPoliciesMutation();
  const [acceptManager, {isLoading: managerLoading}] = useAcceptManagerMutation();
  const [acceptSellerType, {isLoading: sellerTypeLoading}] = useAcceptSellerTypeMutation();

  const theme = useTheme();

  return (
    <>
      {/* <Typography sx={{ p: 2 }}>Legal</Typography> */}
      {/* <Card sx={{ p: 1, boxShadow: 2, borderRadius: 1 }}>
        <CardContent> */}
          <Box
            sx={{ display: { md: 'flex' }, justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Box sx={{ width: { md: '70%' } }}>
              <Typography sx={{ fontSize: '13px' }}>Policies</Typography>
              <Typography component="div" variant="caption">
                Accept the Policies listed{' '}
                <Link
                  style={{
                    color: theme.palette.text.primary,
                  }}
                  to="/policies"
                >
                  Here
                </Link>
              </Typography>
            </Box>
            <Box>
              {user?.agreement?.policies ? (
                <Button
                  variant="outlined"
                  sx={{ width: 180, fontSize: '13px' }}
                  startIcon={<TaskAltIcon />}
                  disabled={user?.agreement?.policies || policyLoading}
                >
                  Already Accepted
                </Button>
              ) : (
                <LoadingButton
                  sx={{
                    bgcolor: 'primary.main',
                    fontSize: '13px',
                    border: (theme) => `1px solid ${theme.palette.primary.main}`,
                    color: (theme) =>
                      theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                    '&:hover': {
                      bgcolor: 'white',
                      color: (theme) =>
                        theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                      border: (theme) => `1px solid ${theme.palette.primary.main}`,
                    },
                    width: 180,
                  }}
                  disabled={policyLoading}
                  onClick={() => acceptPolicies({type: "policies", seller_type: ""})}
                  loading={policyLoading}
                >
                  Accept
                </LoadingButton>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: { md: 'flex' },
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <Box sx={{ width: { md: '70%' } }}>
              <Typography sx={{ fontSize: '13px' }}>SKU Markets Account Manager</Typography>
              <Typography variant="caption">Accept the SKU Markets Account Manager</Typography>
            </Box>
            <Box>
              {user?.agreement?.manager ? (
                <Button
                  variant="outlined"
                  sx={{ width: 180, fontSize: '13px' }}
                  startIcon={<TaskAltIcon />}
                  disabled={user?.agreement?.manager || managerLoading}
                >
                  Already Accepted
                </Button>
              ) : (
                <LoadingButton
                  sx={{
                    bgcolor: 'primary.main',
                    fontSize: '13px',
                    border: (theme) => `1px solid ${theme.palette.primary.main}`,
                    color: (theme) =>
                      theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                    '&:hover': {
                      bgcolor: 'white',
                      color: (theme) =>
                        theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                      border: (theme) => `1px solid ${theme.palette.primary.main}`,
                    },
                    width: 180,
                  }}
                  disabled={managerLoading}
                  onClick={() => acceptManager({type: "manager", seller_type: ""})}
                  loading={managerLoading}
                >
                  Accept
                </LoadingButton>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: { md: 'flex' },
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <Box sx={{ width: { md: '70%' } }}>
              <Typography sx={{ fontSize: '13px',mb:1 }}>Seller Type</Typography>

              <FormControl sx={{ minWidth: { xs: '100%', md: 250 } }} size="small">
                <Select
                  sx={{
                    borderRadius: 1,
                  }}
                  displayEmpty
                  value={view}
                  disabled={user?.agreement?.seller_type && true}
                  input={<OutlinedInput />}
                  MenuProps={MenuProps}
                  renderValue={(selected) => {
                    if (selected?.length === 0) {
                      return <>{MktType[0].type}</>;
                    }
                    return view;
                  }}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {MktType?.map((mi) => (
                    <MenuItem
                      onClick={() => {
                        setView(mi?.type);
                      }}
                      key={mi?.type}
                      value={mi?.type}
                    >
                      {mi?.type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              {user?.agreement?.seller_type ? (
                <Button
                  variant="outlined"
                  sx={{ width: 180, fontSize: '13px' }}
                  startIcon={<TaskAltIcon />}
                  disabled={user?.agreement?.seller_type || sellerTypeLoading}
                >
                  Already Accepted
                </Button>
              ) : (
                <LoadingButton
                  sx={{
                    bgcolor: 'primary.main',
                    fontSize: '13px',
                    border: (theme) => `1px solid ${theme.palette.primary.main}`,
                    color: (theme) =>
                      theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                    '&:hover': {
                      bgcolor: 'white',
                      color: (theme) =>
                        theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                      border: (theme) => `1px solid ${theme.palette.primary.main}`,
                    },
                    width: 180,
                  }}
                  disabled={sellerTypeLoading}
                  onClick={() => acceptSellerType({type: "seller_type", seller_type: view})}
                  loading={sellerTypeLoading}
                >
                  Accept
                </LoadingButton>
              )}
            </Box>
          </Box>
        {/* </CardContent>
      </Card> */}
    </>
  );
};

export default Policies;