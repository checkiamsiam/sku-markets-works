import BuyRetrived from './BuyRetrived';

const PaymentsRetrived = ({paymentData}) => {
    return (
        <>
        {/* <SellRetrived/> */}
        {paymentData?.map((payment)=>{
            return (
            <BuyRetrived payment={payment}/>
            )
        })}
        
        </>
    );
};

export default PaymentsRetrived;