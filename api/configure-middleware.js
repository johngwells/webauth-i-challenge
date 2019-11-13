const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

module.exports = server => {
  const sessionConfig = {
    name: 'name',
    secret: 'keep it secret',
    cookie: {
      maxAge: 1000 * 30,
      secure: false, // true in production
      httpOnly: true
    },
    resave: false,
    saveOnInitialized: false // GDPR laws setting cookies auto
  };
  
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(session(sessionConfig))
};
