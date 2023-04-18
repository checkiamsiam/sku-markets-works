// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  Dashboard: path(ROOTS_DASHBOARD, 'dashboard'),
  Protfolio: path(ROOTS_DASHBOARD, 'protfolio'),
  Adboard: path(ROOTS_DASHBOARD, 'adboard'),
  Alerts: path(ROOTS_DASHBOARD, 'alert'),
  Finance: path(ROOTS_DASHBOARD, 'finance'),
  Catalog: path(ROOTS_DASHBOARD, 'catalog'),
  PartnerStore: path(ROOTS_DASHBOARD, 'partner_store'),
  Watchlist: path(ROOTS_DASHBOARD, 'watchlist'),
  Sellerboard: path(ROOTS_DASHBOARD, 'sellerboard'),
  SalesChannels: path(ROOTS_DASHBOARD, 'multi_channels'),
  Maintenance: path(ROOTS_DASHBOARD, 'maintenance'),
  Growth: path(ROOTS_DASHBOARD, 'growth'),
  Inventory: path(ROOTS_DASHBOARD, 'inventory'),
  Competitors: path(ROOTS_DASHBOARD, 'competitors'),
  Import: path(ROOTS_DASHBOARD, 'import'),
  Export: path(ROOTS_DASHBOARD, 'export'),
  ChatPage: path(ROOTS_DASHBOARD, 'chat'),
  // Settings: path(ROOTS_DASHBOARD, 'settings'),
  BotsAuto: path(ROOTS_DASHBOARD, 'bots_auto'),
  new: path(ROOTS_DASHBOARD, 'chat/new'),
  view: (name) => path(ROOTS_DASHBOARD, `chat/${name}`),

};
