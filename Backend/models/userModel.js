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
  console.log("Updating reset token for:", email);
  console.log("Token:", reset);
  console.log("Expiry:", Expiry);

  db.query(
    'UPDATE User SET resetCode = ?, resetCodeExpiry = ? WHERE Email = ?',
    [reset, Expiry, email],
    (err, results) => {
      console.log("DB error:", err);
      console.log("DB result:", results);
      callback(err, results);
    }
  );
};

// 2. Find user by valid token
const findByResetToken = (reset, callback) => {
  db.query(
    'SELECT * FROM User WHERE resetCode = ? AND resetCodeExpiry > NOW()',
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
    'UPDATE User SET Password = ?, resetCode = NULL, resetCodeExpiry = NULL WHERE Email = ?',
    [newPassword, email],
    callback
  );
}

const saveResetCode = (email, code, expiry, callback) => {
  const sql = 'UPDATE User SET resetCode = ?, resetCodeExpiry = ? WHERE Email = ?';
  db.query(sql, [code, expiry, email], callback);
};

module.exports = {
    createUser,
    findUserByEmail,
    markAsVerified,
    updateResetToken,
    findByResetToken,
    updatePassword,
    saveResetCode
  };
