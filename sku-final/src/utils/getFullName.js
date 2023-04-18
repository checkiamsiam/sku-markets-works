/* 
create function that takes in a string
and returns a string with the country name and the Marketplace name
input = "noon-ksa"
output = "Noon Saudi Arabia"
input = "amazon-uae"
output = "Amazon United Arab Emirates"
input = "noon-egypt"
output = "Noon Egypt"
*/

const getFullName = (marketplace) => {
  const fullMarketplace = marketplace.split('-');
  const firstPart = fullMarketplace[0].charAt(0).toUpperCase() + fullMarketplace[0].slice(1);

  const secondPart =
    fullMarketplace[1] === 'ksa'
      ? 'Saudi Arabia'
      : fullMarketplace[1] === 'uae'
      ? 'United Arab Emirates'
      : fullMarketplace[1] === 'egypt'
      ? 'Egypt'
      : fullMarketplace[1];

  return `${firstPart} ${secondPart}`;
};

export default getFullName;
