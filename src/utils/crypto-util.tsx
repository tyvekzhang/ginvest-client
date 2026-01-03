import CryptoJS from 'crypto-js';

/**
 * 根据 username 和当前日期 (YYYYMMDD) 生成对称加密密码
 */
export function encryptPassword(username: string, password: string): string {
  // 1. 获取当前 UTC 时间的 年月日 (排除时分秒)
  const now = new Date();
  const dateStr = now.getUTCFullYear().toString() +
    (now.getUTCMonth() + 1).toString().padStart(2, '0') +
    now.getUTCDate().toString().padStart(2, '0');

  // 2. 生成 Hash 密钥: SHA256(email + YYYYMMDD)
  const secretKey = CryptoJS.SHA256(username + dateStr).toString();

  // 3. 执行 AES 对称加密
  // 注意：CryptoJS 默认生成的是 Base64 编码的字符串，包含加密后的数据和 Salt
  return CryptoJS.AES.encrypt(password, secretKey).toString();
}