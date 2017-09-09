const getUser = () => Promise.resolve({
  user: 'wxnet',
});

exports.info = async () => {
  const user = await getUser();
  return user;
};
