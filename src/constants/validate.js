const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const VALIDATE = {
    validateEmail
}

export default VALIDATE