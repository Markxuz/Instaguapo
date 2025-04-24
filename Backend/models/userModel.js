const db = require ('../config/db');

const createUser = (user, callback) => {
    const sql = 'INSERT INTO User (FullName, Password, Email, PhoneNumber, VerificationCode) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [user.fullname, user.password, user.email, user.phonenumber, user.verificationcode], callback);
  };
  
  const findUserByEmail = (email, callback) => {
    const sql = 'SELECT * FROM User WHERE Email = ?';
    db.query(sql, [email], callback);
  };
  const markAsVerified = (email, callback) => {
    const sql = 'UPDATE User SET IsVerified = 1 WHERE Email = ?';
    db.query(sql, [email], callback);
  };
module.exports = {
    createUser,
    findUserByEmail,
    markAsVerified
};
