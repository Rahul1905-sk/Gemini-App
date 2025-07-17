const mockUsers = [];

export const authService = {
  async checkUserExists(phone) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUsers.some(user => user.phone === phone));
      }, 500);
    });
  },

  async sendOtp(phone) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`OTP sent to ${phone} (mock: 123456)`);
        resolve();
      }, 500);
    });
  },

  async verifyOtp(phone, otp) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (otp === '123456') {
          resolve(true);
        } else {
          reject(new Error('Invalid OTP'));
        }
      }, 500);
    });
  },

  async registerUser(userData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockUsers.push(userData);
        console.log('User registered:', userData);
        resolve();
      }, 500);
    });
  }
};