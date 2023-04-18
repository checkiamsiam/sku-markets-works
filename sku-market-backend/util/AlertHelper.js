const Alert = require('../models/alert.model');

const AlertHandler = async (params) => {
    try {
        // get all the alerts for this product
        const alerts = await Alert.find({
            product: params?._id,
            active: true,
        });

        // loop through the alerts
        alerts.forEach(async (alert) => {
            // update the price
            alert.price = params?.price;
            alert.stock = params?.stock;
            alert.store = params?.store;
            alert.is_live = params?.is_live;
            alert.fulfillment_type = params?.fulfillment_type;
            // save the alert
            await alert.save();
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = AlertHandler;
