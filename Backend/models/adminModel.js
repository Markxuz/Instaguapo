const db = require('../config/db');

const createAdmin = (admin, callback) => {
  const sql = `
    INSERT INTO Admin 
      (FullName, Email, PhoneNumber, Password, VerificationCode, RoleID) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(
    sql,
    [
      admin.Fullname,           
      admin.Email,
      admin.PhoneNumber,
      admin.Password,
      admin.VerificationCode,
      admin.RoleID || null
    ],
    callback
  );
};

const findAdminByEmail = (email, callback) => {
  const sql = 'SELECT * FROM Admin WHERE Email = ?';
  db.query(sql, [email], callback);
};

const markAsVerified = (email, callback) => {
  const sql = 'UPDATE Admin SET IsVerified = 1 WHERE Email = ?';
  db.query(sql, [email], callback);
};

const updateResetToken = (email, reset, Expiry, callback) => {
  db.query(
    'UPDATE Admin SET resetCode = ?, resetCodeExpiry = ? WHERE Email = ?',
    [reset, Expiry, email],
    callback
  );
};

const findByResetToken = (reset, callback) => {
  db.query(
    'SELECT * FROM Admin WHERE resetCode = ? AND resetCodeExpiry > NOW()',
    [reset],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results[0] || null);
    }
  );
};

const updatePassword = (email, newPassword, callback) => {
  db.query(
    'UPDATE Admin SET Password = ?, resetCode = NULL, resetCodeExpiry = NULL WHERE Email = ?',
    [newPassword, email],
    callback
  );
};

const saveResetCode = (email, code, expiry, callback) => {
  const sql = 'UPDATE Admin SET resetCode = ?, resetCodeExpiry = ? WHERE Email = ?';
  db.query(sql, [code, expiry, email], callback);
};

const deleteAdminById = (adminId, callback) => {
  const sql = 'DELETE FROM Admin WHERE AdminID = ?';
  db.query(sql, [adminId], callback);
};

module.exports = {
  createAdmin,
  findAdminByEmail,
  markAsVerified,
  updateResetToken,
  findByResetToken,
  updatePassword,
  saveResetCode,
  deleteAdminById
};
