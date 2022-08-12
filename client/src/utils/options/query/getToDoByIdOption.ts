const getToDoByIdOption = (updateMode: boolean) => {
  return { enabled: updateMode ? true : false };
};
export default getToDoByIdOption;
