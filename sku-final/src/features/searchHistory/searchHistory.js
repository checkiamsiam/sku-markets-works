export const addSearchedItem = (url) => {
  let urls = localStorage.getItem('recentlySearchedItems');

  if (!urls) {
    urls = [url];
  } else {
    urls = JSON.parse(urls);

    if (!urls.includes(url)) {
      if (urls.length == 20) {
        urls.pop();
      }
      urls.unshift(url);
    }
  }

  localStorage.setItem('recentlySearchedItems', JSON.stringify(urls));
};

export const removeSearchedItem = (url) => {
  let urls = localStorage.getItem('recentlySearchedItems');

  if (!urls) {
    return;
  } else {
    urls = JSON.parse(urls);
    urls = urls.filter((obj) => obj != url);
    localStorage.setItem('recentlySearchedItems', JSON.stringify(urls));
  }
};

export const getSearchedItems = () => {
  const urls = localStorage.getItem('recentlySearchedItems');

  if (!urls) {
    return [];
  } else {
    return JSON.parse(urls);
  }
};
