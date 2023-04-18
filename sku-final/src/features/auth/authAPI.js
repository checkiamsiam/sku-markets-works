import ApiBase from 'app/ApiBase';
import { addMessage } from '../message/messageSlice';
import {
  setEmailVerified,
  setUser,
  setUserShare,
  setWhatsappVerified,
  updateAgreement,
  updateAvatar,
  updateCover,
  updateDocs,
  updateSellerType,
  setDocsInfo,
  setProfileComplete,
  removeDoc,
} from './authSlice';

export const authAPI = ApiBase.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: credentials,
      }),

      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          dispatch(
            addMessage({
              message: 'Logging in...',
              type: 'info',
            })
          );

          const { data: user } = await queryFulfilled;

          dispatch(
            addMessage({
              message: 'Login successful',
              type: 'success',
            })
          );

          dispatch(setUser({ user }));
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
    shareProfile: builder.mutation({
      query: (credentials) => ({
        url: `/api/v1/auth/usershare`,
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          const { data: user } = await queryFulfilled;
          // console.log('dispatch userss', user);
          dispatch(setUserShare({ user }));
        } catch (error) {}
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
          dispatch(
            addMessage({
              message: 'Registering...',
              type: 'info',
            })
          );

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

    updatePassword: builder.mutation({
      query: (credentials) => ({
        url: '/api/v1/auth/password/update',
        method: 'PUT',
        body: credentials,
      }),

      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          dispatch(
            addMessage({
              message: 'Changing password...',
              type: 'info',
            })
          );

          await queryFulfilled;

          dispatch(
            addMessage({
              message: 'Password changed',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'Password change failed',
              type: 'error',
            })
          );
        }
      },

      transformResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue.user;
      },
    }),

    updateProfile: builder.mutation({
      query: (credentials) => ({
        url: '/api/v1/auth/updateMe',
        method: 'PUT',
        body: credentials,
      }),

      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          dispatch(
            addMessage({
              message: 'Updating profile...',
              type: 'info',
            })
          );

          const { data: user } = await queryFulfilled;

          dispatch(setUser({ user }));

          dispatch(
            addMessage({
              message: 'Profile updated',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'Profile update failed',
              type: 'error',
            })
          );
        }
      },

      transformResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue.user;
      },
    }),

    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: '/api/v1/auth/avatar',
        method: 'PATCH',
        body: avatar,
      }),
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          dispatch(
            addMessage({
              message: 'Image uploading',
              type: 'info',
            })
          );

          const { data } = await queryFulfilled;
          dispatch(updateAvatar(data.data));
          dispatch(
            addMessage({
              message: 'Image upload Successful',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'Image upload failed',
              type: 'error',
            })
          );
        }
      },
    }),

    updateCover: builder.mutation({
      query: (cover) => ({
        url: '/api/v1/auth/cover',
        method: 'PATCH',
        body: cover,
      }),
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          dispatch(
            addMessage({
              message: 'Cover Image uploading',
              type: 'info',
            })
          );

          const { data } = await queryFulfilled;
          dispatch(updateCover(data.data));
          dispatch(
            addMessage({
              message: 'Cover Image upload Successful',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'Cover upload failed',
              type: 'error',
            })
          );
        }
      },
    }),

    acceptPolicies: builder.mutation({
      query: (data) => ({
        url: `/api/v1/auth/agreement`,
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(updateAgreement('policies'));
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'Image upload failed',
              type: 'error',
            })
          );
        }
      },
    }),

    acceptManager: builder.mutation({
      query: (data) => ({
        url: `/api/v1/auth/agreement`,
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(updateAgreement('manager'));
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'Image upload failed',
              type: 'error',
            })
          );
        }
      },
    }),

    acceptSellerType: builder.mutation({
      query: (data) => ({
        url: `/api/v1/auth/agreement`,
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(updateAgreement('seller_type'));
          dispatch(updateSellerType(query.seller_type));
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'Image upload failed',
              type: 'error',
            })
          );
        }
      },
    }),

    getUser: builder.query({
      query: () => '/api/v1/auth/user',
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'Failed to get User details',
              type: 'error',
            })
          );
        }
      },
    }),

    sendOTP: builder.mutation({
      query: (phone) => ({
        url: '/api/v1/auth/send/otp',
        method: 'POST',
        body: { phone },
      }),
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          dispatch(
            addMessage({
              message: 'OTP sent to your phone',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'Image upload failed',
              type: 'error',
            })
          );
        }
      },
    }),

    verifyOTP: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/verify/otp',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(setWhatsappVerified());
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'OTP Verification Failed',
              type: 'error',
            })
          );
        }
      },
    }),

    uploadDocs: builder.mutation({
      query: (data) => ({
        url: `/api/v1/auth/docs/${data.name}`,
        method: 'PATCH',
        body: data.file,
      }),
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          dispatch(
            addMessage({
              message: 'Submitting document',
              type: 'info',
            })
          );

          const { data } = await queryFulfilled;

          dispatch(updateDocs({ name: query.name, value: data.data }));
          dispatch(
            addMessage({
              message: 'Document submitted successfully',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'Document submit failed',
              type: 'error',
            })
          );
        }
      },
    }),

    sendEmailVerificationToken: builder.query({
      query: () => '/api/v1/auth/send/email/verify/token',
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          dispatch(
            addMessage({
              message: 'Resending Verification Email',
              type: 'info',
            })
          );

          await queryFulfilled;
          dispatch(
            addMessage({
              message: 'Verification Email sent',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message:
                error?.error?.data?.message || error.message || 'Failed to send verification email',
              type: 'error',
            })
          );
        }
      },
    }),

    verifyEmailToken: builder.query({
      query: (token) => `/api/v1/auth/email/verify/${token}`,
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          dispatch(
            addMessage({
              message: 'Verifying your eamil address',
              type: 'info',
            })
          );

          await queryFulfilled;
          dispatch(setEmailVerified());
          dispatch(
            addMessage({
              message: 'Email Verified successfully',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message:
                error?.error?.data?.message ||
                error.message ||
                'Verification time out or failed to verify your email',
              type: 'error',
            })
          );
        }
      },
    }),

    updateDocsInfo: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/update-docs-info',
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(setDocsInfo(query));
          dispatch(
            addMessage({
              message: 'Information added successfully',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message:
                error?.error?.data?.message || error.message || 'Failed to add Business Info',
              type: 'error',
            })
          );
        }
      },
    }),

    completeProfile: builder.mutation({
      query: () => ({
        url: '/api/v1/auth/complete-profile',
        method: 'PATCH',
      }),
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(setProfileComplete());
          dispatch(
            addMessage({
              message: 'Registration completed',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message:
                error?.error?.data?.message || error.message || 'Failed to complete registration',
              type: 'error',
            })
          );
        }
      },
    }),

    deleteDocs: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/docs-delete',
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(removeDoc(query.fieldName));
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'Failed to delete document',
              type: 'error',
            })
          );
        }
      },
    }),

    // --------------- Not Integrated --------------
    activateUser: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/activate-user',
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          dispatch(addMessage({ message: 'Activation the user', icon: 'info' }));

          await queryFulfilled;
          dispatch(addMessage({ message: 'User activated successfully', icon: 'success' }));
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'Failed to delete document',
              type: 'error',
            })
          );
        }
      },
    }),

    updatePaymentInfo: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/update-payment',
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {

        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'Failed to update payment info',
              type: 'error',
            })
          );
        }
      }
    }),

  }),
});

export const {
  useLoginMutation,
  useUpdateProfileMutation,
  useRegistrationMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useUpdatePasswordMutation,
  useUpdateAvatarMutation,
  useUpdateCoverMutation,
  useAcceptPoliciesMutation,
  useAcceptManagerMutation,
  useAcceptSellerTypeMutation,
  useGetUserQuery,
  useSendOTPMutation,
  useVerifyOTPMutation,
  useUploadDocsMutation,
  useSendEmailVerificationTokenQuery,
  useVerifyEmailTokenQuery,
  useShareProfileMutation,
  useUpdateDocsInfoMutation,
  useCompleteProfileMutation,
  useDeleteDocsMutation,
  useActivateUserMutation,
  useUpdatePaymentInfoMutation,
} = authAPI;
