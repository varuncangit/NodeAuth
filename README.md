<h1>NodeJs Authentication</h1>

<p>This project implements a full-stack authentication system using Node.js, Express, MongoDB, Passport.js, and EJS templating engine. It allows users to sign up, sign in, reset passwords, and change passwords securely. Google OAuth 2.0 is also integrated for seamless sign-in/sign-up experience.</p>
<h3>Features</h3>
<ul>
  <li>User authentication (sign up, sign in, sign out)</li>
  <li>Password hashing for security</li>
  <li>Forgot password functionality with email notification</li>
  <li>Change password functionality</li>
  <li>Google OAuth 2.0 authentication</li>
  <li>Session management using Express session</li>
  <li>Responsive UI templates using EJS and CSS</li>
  <li>Integration with MongoDB for data storage</li>
</ul>
<h3>Installation</h3>
<ol>
  <li>Clone the repository:</li>
</ol>
bash
Copy code
git clone https://github.com/varuncangit/NodeAuth.git
<ol start="2">
  <li>Install dependencies:</li>
</ol>
bash
Copy code
cd node-authentication
npm install
<ol start="3">
  <li>Set up environment variables:</li>
</ol>
<p>Create a <code>.env</code> file in the root directory and add the following variables:</p>
<pre>
PORT=3000
DB_URL=mongodb://localhost:27017/nodeauth
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret
EMAIL=your_email@gmail.com
PASSWORD=your_email_password
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
CLIENT_URL=http://localhost:3000/auth/login/success
</pre>
<p>Replace <code>your_google_client_id</code>, <code>your_google_client_secret</code>, <code>your_email@gmail.com</code>, <code>your_email_password</code>, and <code>your_recaptcha_secret_key</code> with your actual credentials.</p>
<ol start="4">
  <li>Run the application:</li>
</ol>
bash
Copy code
npm start
<ol start="5">
  <li>Access the application in your web browser:</li>
</ol>
<p>Open <a href="http://localhost:3000">http://localhost:3000</a> in your web browser.</p>
<h3>Usage</h3>
<ul>
  <li>Visit <code>/user/signup</code> to sign up for a new account.</li>
  <li>Visit <code>/user/signin</code> to sign in to an existing account.</li>
  <li>Visit <code>/user/forgotPassword</code> to reset your password.</li>
  <li>Visit <code>/user/changePassword</code> to change your password after signing in.</li>
</ul>
<h3>Folder Structure</h3>
<pre>
.
├── config
│   ├── mongodb.js
│   └── nodeMailer.js
├── controllers
│   ├── authController.js
│   └── controller.js
├── models
│   └── userModel.js
├── routes
│   ├── authRoutes.js
│   └── routes.js
├── views
│   ├── changePassword.ejs
│   ├── forgotPassword.ejs
│   ├── home.ejs
│   ├── layout.ejs
│   ├── signin.ejs
│   └── signup.ejs
├── .env
├── app.js
├── package.json
└── README.md
</pre>
<h3>Dependencies</h3>
<ul>
  <li>express</li>
  <li>mongoose</li>
  <li>passport</li>
  <li>bcrypt</li>
  <li>nodemailer</li>
  <li>dotenv</li>
  <li>express-session</li>
  <li>passport-google-oauth20</li>
  <li>ejs</li>
  <li>express-ejs-layouts</li>
</ul>
