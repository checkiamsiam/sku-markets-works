import ApiBase from 'app/ApiBase';
import { addMessage } from 'features/message/messageSlice';

export const alertAPI = ApiBase.injectEndpoints({
    endpoints: (builder) => ({
        addAlert: builder.mutation({
            query: (alert) => ({
                url: '/api/v1/alerts',
                method: 'POST',
                body: alert,
            }),
            async onQueryStarted(query, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        addMessage({
                            message: 'Alert added',
                            type: 'success',
                        })
                    );
                } catch (error) {
                    dispatch(
                        addMessage({
                            message:
                                error?.error?.data?.message ||
                                error.message ||
                                'Alert failed',
                            type: 'error',
                        })
                    );
                }
            },

            transformResponse(baseQueryReturnValue, meta, arg) {
                return baseQueryReturnValue.alert;
            },
        }),

        updateAlert: builder.mutation({
            query: (alert) => ({
                url: `/api/v1/alerts/${alert.id}`,
                method: 'PUT',
                body: alert,
            }),
            async onQueryStarted(query, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        addMessage({
                            message: 'Alert updated',
                            type: 'success',
                        })
                    );
                } catch (error) {
                    dispatch(
                        addMessage({
                            message:
                                error?.error?.data?.message ||
                                error.message ||
                                'Alert failed',
                            type: 'error',
                        })
                    );
                }
            },

            transformResponse(baseQueryReturnValue, meta, arg) {
                return baseQueryReturnValue.alert;
            },
        }),

        deleteAlert: builder.mutation({
            query: (alert) => ({
                url: `/api/v1/alerts/${alert.id}`,
                method: 'DELETE',
            }),

            invalidatesTags: ['Alert'],

            async onQueryStarted(query, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        addMessage({
                            message: 'Alert deleted',
                            type: 'success',
                        })
                    );
                } catch (error) {
                    dispatch(
                        addMessage({
                            message:
                                error?.error?.data?.message ||
                                error.message ||
                                'Alert failed',
                            type: 'error',
                        })
                    );
                }
            },

            transformResponse(baseQueryReturnValue, meta, arg) {
                return baseQueryReturnValue.alert;
            },
        }),
    }),
});
