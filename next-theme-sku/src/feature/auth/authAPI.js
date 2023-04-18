import baseAPI from '../baseAPI';
import { addMessage } from '../message/messageSlice';
import { setUser } from './authSlice';

export const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: credentials,
      }),

      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          const { data: user } = await queryFulfilled;

          dispatch(setUser({ user }));

          dispatch(
            addMessage({
              message: 'Login successful',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'Login failed',
              type: 'error',
            })
          );
        }
      },

      transformResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue.user;
      },
    }),

    registration: builder.mutation({
      query: (credentials) => ({
        url: '/api/v1/auth/register',
        method: 'POST',
        body: credentials,
      }),

      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          const { data: user } = await queryFulfilled;

          dispatch(setUser({ user }));

          dispatch(
            addMessage({
              message: 'Registration successful',
              type: 'success',
            })
          );
        } catch (error) {
          let message = error?.error?.data?.message || 'Registration failed';

          // error start with Duplicate field value set message to email already exists
          if (message.startsWith('Duplicate')) {
            message = 'Email already exists. Try logging in !';
          }

          dispatch(
            addMessage({
              message,
              type: 'error',
            })
          );
        }
      },

      transformResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue.user;
      },
    }),

    resetPassword: builder.mutation({
      query: ({ token, ...credentials }) => ({
        url: `/api/v1/auth/password/reset/${token}`,
        method: 'PUT',
        body: credentials,
      }),

      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          dispatch(
            addMessage({
              message: 'Password reset successful',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'Password reset failed',
              type: 'error',
            })
          );
        }
      },
    }),

    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: '/api/v1/auth/password/forgot',
        method: 'POST',
        body: credentials,
      }),

      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          dispatch(
            addMessage({
              message: 'Password reset email sent',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message:
                error?.error?.data?.message || error.message || 'Password reset email failed',
              type: 'error',
            })
          );
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
} = authAPI;
