const axios = require('axios');
const catchAsyncErrors = require('../lib/catchAsyncErrors');

exports.initializePayment = catchAsyncErrors(async (req, res, next) => {
    const response = await axios.post(
        process.env.PAYMENT_API_URL + 'order',
        {
            apiOperation: 'INITIATE',
            order: {
                reference: '',
                amount: req.body.amount,
                currency: 'SAR',
                name: req.body.offer,
                description: req.body.description,
                channel: 'web',
            category: 'pay',
            },
            configuration: {
                tokenizeCc: 'true',
                returnUrl: req.body.returnUrl,
                locale: 'en',
                paymentAction: 'AUTHORIZE,SALE',
            },
        },
        {
            headers: {
                Authorization: process.env.TEST_KEY,
            },
        }
    );

    return res.status(200).json({
        postUrl: response?.data?.result?.checkoutData?.postUrl,
    });
});
