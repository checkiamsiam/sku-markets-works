import ApiBase from 'app/ApiBase';

export const shipmentAPI = ApiBase.injectEndpoints({
  endpoints: (builder) => ({
    getShipment: builder.query({
      query: (query) => ({
        url: `/api/v1/shipment?${query}`,
        method: 'GET',
      }),

      // transformResponse(baseQueryReturnValue, meta, arg) {
      //   return baseQueryReturnValue.data;
      // },
    }),

    updateShipmentPreparing: builder.mutation({
      query: (data) => ({
        url: `/api/v1/shipment/preparing`,
        method: 'PATCH',
        body: data,
      }),
    }),

    updateShipmentPicked: builder.mutation({
      query: (data) => ({
        url: `/api/v1/shipment/picked`,
        method: 'PATCH',
        body: data,
      }),
    }),

    updateShipmentPacked: builder.mutation({
      query: (data) => ({
        url: `/api/v1/shipment/packed`,
        method: 'PATCH',
        body: data,
      }),
    }),

    updateShipmentShipped: builder.mutation({
      query: (id) => ({
        url: `/api/v1/shipment/shipped/${id}`,
        method: 'PATCH',
      }),
    }),

    updateShipmentDeliveredRTV: builder.mutation({
      query: (data) => ({
        url: `/api/v1/shipment/deliveredRTV`,
        method: 'PATCH',
        body: data,
      }),
    }),

    updateShipmentRTVAcceptance: builder.mutation({
      query: (id) => ({
        url: `/api/v1/shipment/rtvAcceptance/${id}`,
        method: 'PATCH',
      }),
    }),

    updateShipmentRTVAwaiting: builder.mutation({
      query: (data) => ({
        url: `/api/v1/shipment/rtvAwaiting`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetShipmentQuery,
  useUpdateShipmentPreparingMutation,
  useUpdateShipmentPickedMutation,
  useUpdateShipmentPackedMutation,
  useUpdateShipmentShippedMutation,
  useUpdateShipmentDeliveredRTVMutation,
  useUpdateShipmentRTVAcceptanceMutation,
  useUpdateShipmentRTVAwaitingMutation,
} = shipmentAPI;
