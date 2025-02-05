module.exports = {
    secret: "8020a6779156d244d4e785db4e8cbcf177ae4790a4487d2031ae86a944250db7",
    options: {
      expiresIn: '1h',
      algorithm: 'HS256'
    },
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000
    }
  };