export const searchSkills = async (search) => {
  const res = await fetch(`https://expressendpoint.herokuapp.com/api/search?q=${search}`);
  if (!res.ok) throw new Error(res.statusText);
  return await res.json();
};

export const servicesRequest = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.statusText);
  return await res.json();
};
