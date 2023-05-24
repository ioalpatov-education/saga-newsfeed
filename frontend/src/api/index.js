export const getNewsList = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/news`);
  // if (!response.ok) {
  //   throw new Error(response.statusText);
  // }
  return await response.json();
};

export const getNewsListWithLastSeenId = async (id) => {
  console.log(id);
  const params = new URLSearchParams({ lastSeenId: id });

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/news?${params}`
  );
  // if (!response.ok) {
  //   throw new Error(response.statusText);
  // }
  return await response.json();
};
