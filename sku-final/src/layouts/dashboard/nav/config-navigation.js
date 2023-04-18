// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SvgColor from '../../../components/svg-color';
import BusinessIcon from '@mui/icons-material/Business';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  watchlist: icon('ic_watchlist'),
  alert: icon('ic_bell'),
  sellerboard: icon('ic_sell'),
  skumarket: icon('ic_market-analysis'),
  portfolio: icon('ic_user-edit'),
  botsAuto: icon('ic_bots'),
  growthAndHealth: icon('ic_growth'),
  import: icon('ic_import'),
  export: icon('ic_export'),
  Helpcenter: icon('ic_helpCenter'),
  inventory: icon('ic_inventory'),
  competitors: <BusinessIcon sx={{ width: 1, height: 1 }} />,
  salesChannel: icon('ic_sales'),
  marketplace: icon('ic_marketplace_outline'),
  chat: icon('ic_chat_outline'),
  ads: icon('ic_ads'),
  finance: icon('ic_banking'),
  partnerStore: <StorefrontIcon sx={{ width: 1, height: 1 }} />,
  catalog: <AutoStoriesIcon sx={{ width: 1, height: 1 }} />,
};


const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Dashboard',
    items: [
      // { title: 'SKU Markets', path: 'skuMarket', icon: ICONS.skumarket },
      { title: 'Finance', path: PATH_DASHBOARD.Finance, icon: ICONS.finance },
      { title: 'Sellerboard', path: PATH_DASHBOARD.Sellerboard, icon: ICONS.sellerboard },
      { title: 'Adboard', path: PATH_DASHBOARD.Adboard, icon: ICONS.ads },
      { title: 'Partner Store', path: PATH_DASHBOARD.PartnerStore, icon: ICONS.partnerStore },
      { title: 'Growth', path: PATH_DASHBOARD.Maintenance, icon: ICONS.growthAndHealth },
      { title: 'Inventory ', path: PATH_DASHBOARD.Maintenance, icon: ICONS.inventory },
      { title: 'Competitors ', path: PATH_DASHBOARD.Maintenance, icon: ICONS.competitors },
      { title: 'Marketplaces', path: PATH_DASHBOARD.Dashboard, icon: ICONS.marketplace },
      { title: 'Portfolio', path: PATH_DASHBOARD.Protfolio, icon: ICONS.portfolio },
      { title: 'Watchlists', path: PATH_DASHBOARD.Watchlist, icon: ICONS.watchlist },
      { title: 'Alerts', path: PATH_DASHBOARD.Alerts, icon: ICONS.alert },
      {
        title: 'Multi Channels',
        path: PATH_DASHBOARD.SalesChannels,
        icon: ICONS.salesChannel,
      },
      { title: 'Bots Auto', path: PATH_DASHBOARD.BotsAuto, icon: ICONS.botsAuto },
      { title: 'Catalog ', path: PATH_DASHBOARD.Catalog, icon: ICONS.catalog },
      { title: 'Import', path: PATH_DASHBOARD.Import, icon: ICONS.import },
      { title: 'Export', path: PATH_DASHBOARD.Export, icon: ICONS.export },

      { title: 'Chat', path: PATH_DASHBOARD.ChatPage, icon: ICONS.chat },
      { title: 'Help Center', path: '/help_center', icon: ICONS.Helpcenter },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  /*  {
    subheader: 'management',
    items: [
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'Four', path: PATH_DASHBOARD.user.four },
          { title: 'Five', path: PATH_DASHBOARD.user.five },
          { title: 'Six', path: PATH_DASHBOARD.user.six },
        ],
      },
    ],
  }, */
];

export default navConfig;
