const Regex = {
  email: (email) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const checkEmail = reg.test(email); //true or false
    return checkEmail;
  },
  phone: (phone) => {
    const reg = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    const checkPhone = reg.test(phone);
    return checkPhone;
  },
  date: (date) => {
    const reg = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    const checkDate = reg.test(date);
    return checkDate;
  },
  password: (password) => {
    const reg =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const checkPassword = reg.test(password)
    return checkPassword;
  }
};
export default Regex;


