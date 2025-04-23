const db = require ('../config/db');

const createUser = (user, callback) => {
    const sql = 'INSERT INTO User (FullName, Password, Email, PhoneNumber) VALUES (?, ?, ?, ?)';
    db.query(sql, [user.fullname, user.password, user.email, user.phonenumber], callback);
  };
  
  const findUserByEmail = (email, callback) => {
    const sql = 'SELECT UserID, FullName, Email, Password, PhoneNumber FROM User WHERE Email = ?';
    db.query(sql, [email], callback);
  };    
module.exports = {
    createUser,
    findUserByEmail
};
