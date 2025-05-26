const db = require ('../config/db');

const createUser = (user, callback) => {
    const sql = 'INSERT INTO User (FullName, Password, Email, PhoneNumber, VerificationCode) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [user.fullname, user.password, user.email, user.phonenumber, user.VerificationCode], callback);
  };
  
  const findUserByEmail = (email, callback) => {
    const sql = 'SELECT * FROM User WHERE Email = ?';
    db.query(sql, [email], callback);
  };
  const markAsVerified = (email, callback) => {
    const sql = 'UPDATE User SET IsVerified = 1 WHERE Email = ?';
    db.query(sql, [email], callback);
  };
  // 1. Store reset token
  const updateResetToken = (email, reset, Expiry, callback) => {
  db.query(
    'UPDATE User SET resetToken = ?, resetTokenExpiry = ? WHERE Email = ?',
    [reset, Expiry, email],
    callback
  );
};

// 2. Find user by valid token
const findByResetToken = (reset, callback) => {
  db.query(
    'SELECT * FROM User WHERE resetToken = ? AND resetTokenExpiry > NOW()',
    [reset],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results[0] || null);
    }
  );
};

// 3. Update password and clear token
const updatePassword = (email, newPassword, callback) =>  {
  db.query(
    'UPDATE User SET Password = ?, resetToken = NULL, resetTokenExpiry = NULL WHERE Email = ?',
    [newPassword, email],
    callback
  );
}
module.exports = {
    createUser,
    findUserByEmail,
    markAsVerified,
    updateResetToken,
    findByResetToken,
    updatePassword
  };
