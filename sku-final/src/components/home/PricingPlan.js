import { Box, Grid, Paper, Typography } from '@mui/material';
import CustomBadge from 'components/common/CustomBadge/CustomBadge';
import { selectPlan } from 'features/plan/planSlice';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import style from './styles/PricingCard.module.css';

const PricingPlan = ({
  checked,
  freeValue,
  launchValue,
  professionalValue,
  businessValue,
  growValue,
  teamValue,
  getCrncy,
  defaultCurrency,
}) => {
  let navigate = useNavigate();

  const PRICING_PLAN = [
    {
      plan: 'B2B Marketplace',
      title: 'Perfect for startups and growing businesses',
      currency: `${getCrncy?.label ? getCrncy.label : defaultCurrency.label}`,
      price: `${Math.round(freeValue * (getCrncy?.rate || defaultCurrency?.rate))}`,
      qty: `${checked ? 12 : 1}`,
      subTitle: 'Up to Unlimited Of Your SKUs',
      available: 'Cross Countries & Categories',
      description: [
        'SKU Markets Feature to Sell',
        'SKU Markets Feature to Buy',
        'Other Ready- Built Features',
      ],
      link: '/signup',
      active: true,
    },
    {
      plan: 'B2C Partner Store',
      title: 'Customized for sales channels Management',
      currency: `${getCrncy?.label ? getCrncy.label : defaultCurrency.label}`,
      price: `${Math.round(launchValue * (getCrncy?.rate || defaultCurrency?.rate))}`,
      qty: `${checked ? 12 : 1}`,
      subTitle: 'Up to Unlimited Of Your SKUs',
      available: 'Cross Countries & Categories',
      description: [
        'B2B Marketplace +',
        'A complete Sales Channels',
        'A complete marketing solutions',
        'Other Ready- Built Features',
      ],
      active: true,
      badge: 'Beta',
    },
    {
      plan: 'Data Analytics',
      title: 'Ideal for small to medium-sized organizations',
      currency: `${getCrncy?.label ? getCrncy.label : defaultCurrency.label}`,
      price: `${Math.round(growValue * (getCrncy?.rate || defaultCurrency?.rate))}`,
      qty: `${checked ? 12 : 1}`,
      subTitle: 'Up to Unlimited Of Your SKUs',
      available: 'Cross Countries & Categories',
      description: [
        'B2C Partner Store +',
        'Top Ranked SKUs of Today',
        'Expected Trade vloume & SOH',
        'Opportunities & Competitors',
      ],
      active: true,
    },
    {
      plan: 'Portfolio For Other Platforms',
      title: 'Customized for specific organization SKUs',
      currency: `${getCrncy?.label ? getCrncy.label : defaultCurrency.label}`,
      price: `${Math.round(businessValue * (getCrncy?.rate || defaultCurrency?.rate))}`,
      qty: `${checked ? 12 : 1}`,
      subTitle: 'Up to Unlimited Of Your SKUs',
      available: 'Cross Countries & Categories',
      description: [
        'Data Analytics Plan +',
        'Portfolio for other platforms',
        'Track & Alert SKUs',
        'Bulk Portfolio & Alerts Import',
      ],
      active: true,
    },
    {
      plan: 'Automate Your Tasks',
      title: 'Designed to activate automation - solutions',
      currency: `${getCrncy?.label ? getCrncy.label : defaultCurrency.label}`,
      price: `${Math.round(professionalValue * (getCrncy?.rate || defaultCurrency?.rate))}`,
      qty: `${checked ? 12 : 1}`,
      subTitle: ' Up to Unlimited Of Your SKUs',
      available: 'Cross Countries & Categories',
      description: [
        'Portfolio For Other Platforms +',
        'Ecommerce Platforms, shipping and Logistics couriers & Shopping Carts Integration',
        'Bots automation',
      ],
      active: false,
      badge: 'Soon',
    },
    {
      plan: 'Team Management',
      title: 'Designed for higher volumes organizations',
      currency: `${getCrncy?.label ? getCrncy.label : defaultCurrency.label}`,
      price: `${Math.round(teamValue * (getCrncy?.rate || defaultCurrency?.rate))}`,
      qty: `${checked ? 12 : 1}`,
      subTitle: ' Up to Unlimited Of Your SKUs',
      available: 'Cross Countries & Platforms',
      description: [
        'Automate Your Tasks Plan +',
        '1/7 Ecommerce Specialist Account Manager to Support your Business',
      ],
      active: false,
      badge: 'Soon',
    },
  ];

  const dispatch = useDispatch();

  const handlePlan = (plan) => {
    dispatch(selectPlan(plan));
    navigate('/finance');
  };

  return (
    <>
      <Grid container spacing={2} sx={{ marginY: '40px', justifyContent: 'center' }}>
        {PRICING_PLAN?.map((plan) => (
          <Grid key={plan.plan} item lg={2} md={4} xs={12}>
            <Paper
              elevation={2}
              sx={{
                padding: '20px',
                borderRadius: '12px',
                height: '400px',
                position: 'relative',
              }}
            >
              {plan?.badge && (
                <div style={{ position: 'absolute', top: '0px', right: '0px' }}>
                  <CustomBadge text={plan.badge} />
                </div>
              )}
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: '#0d6efd',
                    fontWeight: '600',
                    marginY: '20px',
                  }}
                  component="p"
                >
                  {plan.plan}
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography sx={{ fontSize: '10px' }} component="p">
                    {plan.title}
                  </Typography>
                </div>
                <Typography
                  sx={{ fontSize: '17px', color: 'text.main', marginTop: '10px' }}
                  variant="h6"
                  component="h6"
                >
                  {plan.currency} {plan.price}/mo
                </Typography>
                <p
                  style={{
                    fontSize: '10px',
                    color: '#0d6efd',
                  }}
                >
                  +5% Selling Fees cross all Categories
                </p>
                <button
                  disabled={!plan?.active}
                  onClick={() => {
                    if (!plan?.whatsApp && !plan?.link) {
                      handlePlan(plan);
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                  className={style.payment_btn_Style}
                >
                  {plan?.whatsApp ? (
                    <Box
                      component="a"
                      href={plan?.whatsApp}
                      target="_blank"
                      sx={{ textDecoration: 'none', color: '#fff' }}
                    >
                      WHATSAPP US
                    </Box>
                  ) : (
                    <>
                      {plan?.link ? (
                        <Box
                          component={Link}
                          to={plan?.link}
                          sx={{ textDecoration: 'none', color: '#fff' }}
                        >
                          GET STARTED NOW
                        </Box>
                      ) : (
                        'GET STARTED NOW'
                      )}
                    </>
                  )}
                </button>
                <p
                  style={{
                    fontSize: '10px',
                    color: '#0d6efd',
                  }}
                >
                  + Ads fees CPC
                </p>
                <Typography
                  sx={{
                    fontSize: '11px',
                    color: 'tect.main',
                    fontWeight: '600',
                    // marginTop: '12px',
                  }}
                  component="p"
                >
                  {plan.subTitle}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '11px',
                    color: 'text.main',
                    fontWeight: '600',
                  }}
                  component="p"
                >
                  {plan.available}
                </Typography>
                <Box>
                  <ul
                    style={{
                      textAlign: 'center',
                      fontSize: '10px',
                      listStyle: 'none',
                      paddingLeft: '0',
                    }}
                  >
                    {plan.description?.map((desc, i) => (
                      <li
                        key={i}
                        style={{
                          marginTop: '10px',
                          marginBottom: '10px',
                          color: 'text.main',
                        }}
                      >
                        <AiOutlineCheckCircle style={{ color: '#0d6efd' }} /> {desc}
                      </li>
                    ))}
                  </ul>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PricingPlan;
