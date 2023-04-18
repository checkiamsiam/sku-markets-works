import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: '',
  name: '',
  companyName: '',
  email: '',
  role: '',
  status: '',
  avatar: '',
  cover: '',
  token: '',
  createdAt: '',
  location: {},
  state: '',
  country: '',
  city: '',
  zipCode: 0,
  address: '',
  phone: '',
  about: '',
  isEmailVerified: '',
  isWhatsappVerified: '',
  agreement: {},
  seller_type: '',
  docs: {},
  shareuser: '',
  delivery_method: '',
  defaultCurrency: {},
  payment: {},
  isProfileComplete: false,
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload: { user } }) => {
      state._id = user._id || '';
      state.name = user.name || '';
      state.companyName = user?.companyName || '';
      state.email = user.email || '';
      state.role = user.role || '';
      state.status = user.status || '';
      state.avatar = user.avatar || '';
      state.cover = user?.cover || '';
      state.createdAt = user.createdAt || '';
      state.location = user?.location || {};
      state.state = user.state || '';
      state.country = user.country || '';
      state.city = user.city || '';
      state.zipCode = user.zipCode || '';
      state.address = user.address || '';
      state.phone = user.phone || '';
      state.about = user.about || '';
      state.isEmailVerified = user?.isEmailVerified || '';
      state.isWhatsappVerified = user?.isWhatsappVerified || '';
      state.agreement = user?.agreement || {};
      state.seller_type = user?.seller_type || '';
      state.docs = user?.docs || {};
      state.delivery_method = user?.delivery_method || '';
      state.defaultCurrency = user?.defaultCurrency || {};
      state.payment = user?.payment || {};
      state.isProfileComplete = user.isProfileComplete || false;

      if (user.token) {
        state.token = user.token;
        localStorage.setItem('token', user.token);
      }
    },
    setUserShare: (state, { payload: { user } }) => {
      state.shareuser = user;
    },
    logout: (state) => {
      state._id = '';
      state.email = '';
      state.companyName = '';
      state.role = '';
      state.status = '';
      state.avatar = '';
      state.cover = '';
      state.token = '';
      state.createdAt = '';
      state.location = {};
      state.state = '';
      state.country = '';
      state.city = '';
      state.zipCode = 0;
      state.address = '';
      state.phone = '';
      state.about = '';
      state.isEmailVerified = '';
      state.isWhatsappVerified = '';
      state.agreement = {};
      state.seller_type = '';
      state.docs = {};
      state.delivery_method = '';
      state.defaultCurrency = {};
      state.payment = {};
      state.isProfileComplete = false;

      localStorage.removeItem('token');
    },
    updateAvatar: (state, { payload }) => {
      state.avatar = payload;
    },
    updateCover: (state, { payload }) => {
      state.cover = payload;
    },
    updateAgreement: (state, { payload }) => {
      state.agreement[payload] = true;
    },
    updateSellerType: (state, { payload }) => {
      state.seller_type = payload;
    },
    setWhatsappVerified: (state, { payload }) => {
      state.isWhatsappVerified = true;
    },
    updateDocs: (state, { payload }) => {
      state.docs[payload.name].url = payload.value;
    },
    setEmailVerified: (state, { payload }) => {
      state.isEmailVerified = true;
    },
    setDocsInfo: (state, {payload}) => {
      state.docs.commercial.value = payload.commercial || '';
      state.docs.vat.value = payload.vat || '';
      state.docs.national.value = payload.national || '';
      state.docs.bank.value = payload.bank || '';
      state.docs.courier.value = payload.courier || '';
      state.docs.other.value = payload.other || '';
      state.delivery_method = payload.delivery_method || '';
    },
    setProfileComplete: (state) => {
      state.isProfileComplete = true;
    },
    removeDoc: (state, {payload}) => {
      state.docs[payload].url = '';
    }
  },
});

export const {
  setUser,
  setUserShare,
  logout,
  updateAvatar,
  updateCover,
  updateAgreement,
  updateSellerType,
  setWhatsappVerified,
  updateDocs,
  setEmailVerified,
  setDocsInfo,
  setProfileComplete,
  removeDoc,
} = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state) => state.user;
