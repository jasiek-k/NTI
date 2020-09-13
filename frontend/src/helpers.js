export const checkIfLogged = () => {
  let userData = localStorage.getItem("userData");
  console.log(userData);
  if (userData) {
    const parsedData = JSON.parse(userData);
    console.log(parsedData);
    const { userLogged } = parsedData;

    return !!userLogged;
  }
};
