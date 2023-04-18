import { lazy, Suspense } from 'react';
import LoadingScreen from '../components/loading-screen';

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

export const Brand = Loadable(lazy(() => import('../pages/Brand')));
export const Export = Loadable(lazy(() => import('../pages/Export')));
export const Dashboard = Loadable(lazy(() => import('pages/Dashboard')));
export const Category = Loadable(lazy(() => import('../pages/Category')));
export const Policies = Loadable(lazy(() => import('../pages/Policies')));
export const ChatPage = Loadable(lazy(() => import('../pages/ChatPage')));
export const BotsAuto = Loadable(lazy(() => import('../pages/BotsAuto')));
export const GrowthPage = Loadable(lazy(() => import('../pages/Growth')));
export const AlertPage = Loadable(lazy(() => import('../pages/AlertPage')));
export const FinancePage = Loadable(lazy(() => import('../pages/FinancePage')));
export const WatchList = Loadable(lazy(() => import('../pages/WatchList')));
export const Portfolio = Loadable(lazy(() => import('../pages/Portfolio')));
export const SkuMarket = Loadable(lazy(() => import('../pages/SkuMarket')));
export const Inventory = Loadable(lazy(() => import('../pages/Inventory')));
export const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));
export const ImportPage = Loadable(lazy(() => import('../pages/ImportPage')));
export const MarketPlace = Loadable(lazy(() => import('../pages/MarketPlace')));
export const PartnerStorePage = Loadable(lazy(() => import('../pages/PartnerStorePage')));
export const CatalogPage = Loadable(lazy(() => import('../pages/CatalogPage')));
export const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
export const SellerBoard = Loadable(lazy(() => import('../pages/Sellerboard')));
export const Competitors = Loadable(lazy(() => import('../pages/Competitors')));
export const NewChartPage = Loadable(lazy(() => import('../pages/newChartPage')));
export const SkuProductView = Loadable(lazy(() => import('pages/SkuProductView')));
export const ProductDetail = Loadable(lazy(() => import('../pages/ProductDetail')));
export const SalesChannels = Loadable(lazy(() => import('../pages/SalesChannels')));
export const CheckoutPage = Loadable(lazy(() => import('../pages/SubscriptionPage')));
export const AdboardPage = Loadable(lazy(() => import('../pages/AdboardPage')));
export const UserProfilePage = Loadable(lazy(() => import('../pages/UserProfilePage')));
export const NotificationPage = Loadable(lazy(() => import('../pages/NotificationPage')));
export const EmailConfirmation = Loadable(lazy(() => import('../pages/EmailConfirmation')));
export const SendOTP = Loadable(lazy(() => import('../sections/auth/verification/SendOTP')));
export const ForgotPassword = Loadable(lazy(() => import('../sections/auth/ForgotPassword')));
export const ActivationProcess = Loadable(lazy(() => import('../pages/ActivationProcess')));
export const BuyAgain = Loadable(lazy(() => import('../pages/BuyAgain')));
export const TopDeals = Loadable(lazy(() => import('../pages/TopDeals')));
export const CouponArea = Loadable(lazy(() => import('../pages/CouponArea')));
export const OpenBoxPage = Loadable(lazy(() => import('../pages/OpenBox')));
export const ClearanceArea = Loadable(lazy(() => import('../pages/ClearanceArea')));
export const VerifiedPartners = Loadable(lazy(() => import('../pages/VerifiedPartners')));
export const PartnersStores = Loadable(lazy(() => import('../pages/PartnersStores')));
export const ResetPassword = Loadable(lazy(() => import('../pages/ResetPassword')));
