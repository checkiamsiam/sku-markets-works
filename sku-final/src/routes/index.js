import BrowseAnswer from 'components/BrowsePage/BrowseAnswer';
import ShippingAndDelivery from 'components/Docs/AppsCategory/ShippingAndDelivery';
import Introduction from 'components/Docs/Introduction';
import SkuMarketsLayout from 'layouts/skuMarkets';
import SkuHome from 'layouts/skuMarkets/Home/SkuHome';
import SkuCategoryHome from 'layouts/skuMarkets/skuMarketsPages/SkuCategory/SkuCategoryHome';
import BrowsePage from 'pages/BrowsePage';
import HelpCenter from 'pages/HelpCenter';
import Page404 from 'pages/Page404';
import PageHome from 'pages/PageHome';
import RegisterPage from 'pages/RegisterPage';
import TestPage from 'pages/TestPage';
import UserAccountPage from 'pages/user/account';
import { Navigate, useRoutes } from 'react-router-dom';
import Register from 'sections/auth/Register';
import PaymentInvoice from 'sections/payment/PaymentInvoice';
import GuestGuard from '../auth/GuestGuard';
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
import DocsLayout from '../layouts/docs';
import HomeLayout from '../layouts/home';
import EmailVerificationToken from '../sections/auth/verification/EmailVerificationToken';
import OTPVerification from '../sections/auth/verification/OTPVerification';
import {
  ActivationProcess,
  AdboardPage,
  AlertPage,
  BotsAuto,
  Brand,
  BuyAgain,
  CatalogPage,
  Category,
  ChatPage,
  CheckoutPage,
  ClearanceArea,
  Competitors,
  CouponArea,
  Dashboard,
  EmailConfirmation,
  Export,
  FinancePage,
  ForgotPassword,
  GrowthPage,
  ImportPage,
  Inventory,
  LoginPage,
  Maintenance,
  MarketPlace,
  NewChartPage,
  NotificationPage,
  OpenBoxPage,
  PartnerStorePage,
  PartnersStores,
  Policies,
  Portfolio,
  ProductDetail,
  ResetPassword,
  SalesChannels,
  SellerBoard,
  SendOTP,
  SkuMarket,
  SkuProductView,
  TopDeals,
  UserProfilePage,
  VerifiedPartners,
  WatchList,
} from './elements';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <SkuMarketsLayout />,
      children: [
        { path: '/', element: <SkuHome /> },
        { path: '/skuMarket', element: <SkuMarket /> },
        { path: 'skuMarket/:id/:sellerId', element: <SkuProductView /> },
        { path: 'userprofile/:id?', element: <UserProfilePage /> },
        { path: 'skuMarket_category', element: <SkuCategoryHome /> },
        { path: '/buy_again', element: <BuyAgain /> },
        { path: '/top_deals', element: <TopDeals /> },
        { path: '/coupon_area', element: <CouponArea /> },
        { path: '/clearance_area', element: <ClearanceArea /> },
        { path: '/open_box', element: <OpenBoxPage /> },
        { path: '/verified_partners', element: <VerifiedPartners /> },
        { path: '/partner_stores', element: <PartnersStores /> },
      ],
    },
    {
      path: '/',
      element: <HomeLayout />,
      children: [
        { path: 'become_partner', element: <PageHome /> },
        { path: 'policies', element: <Policies /> },
        { path: 'help_center', element: <HelpCenter /> },
        { path: 'help_center/:title', element: <BrowsePage /> },
        { path: 'help_center/:title/:q', element: <BrowseAnswer /> },
        { path: 'maintenance', element: <Maintenance /> },
      ],
    },
    {
      path: '/',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: 'signup/old',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: 'product/:id', element: <ProductDetail /> },
        { path: 'alert', element: <AlertPage /> },
        { path: 'watchList', element: <WatchList /> },
        { path: 'finance', element: <FinancePage /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'checkout', element: <CheckoutPage /> },
        { path: 'marketPlace/:marketplace', element: <MarketPlace /> },
        { path: 'category/:category', element: <Category /> },
        { path: 'brand/:brand', element: <Brand /> },
        { path: 'notification', element: <NotificationPage /> },
        { path: 'protfolio', element: <Portfolio /> },
        { path: 'profile', element: <UserAccountPage /> },
        { path: 'import', element: <ImportPage /> },
        { path: 'export', element: <Export /> },
        { path: 'partner_store', element: <PartnerStorePage /> },
        { path: 'catalog', element: <CatalogPage /> },
        // { path: 'skuMarket', element: <SkuMarket /> },
        // { path: 'skuMarket/:id', element: <SkuProductView /> },
        { path: 'chat', element: <ChatPage /> },
        { path: 'chat/new', element: <ChatPage /> },
        { path: 'sellerboard', element: <SellerBoard /> },
        { path: 'multi_channels', element: <SalesChannels /> },
        { path: 'bots_auto', element: <BotsAuto /> },
        { path: 'growth', element: <GrowthPage /> },
        // { path: 'UserProfile', element: <UserProfilePage /> },
        { path: 'competitors', element: <Competitors /> },
        { path: 'inventory', element: <Inventory /> },
        { path: 'adboard', element: <AdboardPage /> },
        {
          path: 'newChart',
          element: <NewChartPage />,
        },
      ],
    },
    {
      element: <CompactLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: '/forgotPassword', element: <ForgotPassword /> },
        { path: '/password/reset/:token', element: <ResetPassword /> },
        { path: '/emailConfirmation', element: <EmailConfirmation /> },
        { path: '/auth/send-otp', element: <SendOTP /> },
        { path: '/auth/otp-verification', element: <OTPVerification /> },
        { path: '/auth/email/verify/:token', element: <EmailVerificationToken /> },
        { path: '/activation-process', element: <ActivationProcess /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
    {
      path: '/',
      element: <DocsLayout />,
      children: [
        { path: '/apps', element: <Introduction /> },
        { path: '/apps/introduction', element: <Introduction /> },
        { path: '/apps/shipping_delivery', element: <ShippingAndDelivery /> },
        {
          path: '/signup',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
      ],
    },
    { path: 'test', element: <TestPage /> },
    { path: '/pdf-test', element: <PaymentInvoice /> },
  ]);
}
