import { promisify } from 'util';
import { randomBytes } from 'crypto';
import { createTransport } from 'nodemailer';
import { authenticate } from 'passport';
import { startCase, toLower } from 'lodash';
import { isEmail, isEmpty, normalizeEmail, isLength, escape, isHexadecimal } from 'validator';
import { isValid } from 'mailchecker';
import User, { findOne, findById, deleteOne } from '../models/User';

const randomBytesAsync = promisify(randomBytes);

/**
 * Helper Function to Send Mail.
 */
const sendMail = (settings) => {
  const transportConfig = {
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  };

  let transporter = createTransport(transportConfig);

  return transporter.sendMail(settings.mailOptions)
    .then(() => {
      settings.req.flash(settings.successfulType, { msg: settings.successfulMsg });
    })
    .catch((err) => {
      if (err.message === 'self signed certificate in certificate chain') {
        console.log('WARNING: Self signed certificate in certificate chain. Retrying with the self signed certificate. Use a valid certificate if in production.');
        transportConfig.tls = transportConfig.tls || {};
        transportConfig.tls.rejectUnauthorized = false;
        transporter = createTransport(transportConfig);
        return transporter.sendMail(settings.mailOptions)
          .then(() => {
            settings.req.flash(settings.successfulType, { msg: settings.successfulMsg });
          });
      }
      console.log(settings.loggingError, err);
      settings.req.flash(settings.errorType, { msg: settings.errorMsg });
      return err;
    });
};



/**
 * POST /login
 * Sign in using email and password.
 */
export function postLogin(req, res, next) {
  const validationErrors = [];
  if (!isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
  if (isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' });

  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/login');
  }
  req.body.email = normalizeEmail(req.body.email, { gmail_remove_dots: false });

  authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      req.flash('errors', info);
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/');
    });
  })(req, res, next);
}

/**
 * GET /logout
 * Log out.
 */
export function logout(req, res) {
  req.logout((err) => {
    if (err) console.log('Error : Failed to logout.', err);
    req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err);
      req.user = null;
      res.redirect('/');
    });
  });
}


/**
 * POST /signup
 * Create a new local account.
 */
export async function postSignup(req, res, next) {
  const validationErrors = [];
  if (!isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
  if (!isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' });
  if (escape(req.body.password) !== escape(req.body.confirmPassword)) validationErrors.push({ msg: 'Passwords do not match' });
  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/signup');
  }
  req.body.email = normalizeEmail(req.body.email, { gmail_remove_dots: false });
  try {
    const existingUser = await findOne({ email: req.body.email });
    if (existingUser) {
      req.flash('errors', { msg: 'Account with that email address already exists.' });
      return res.redirect('/signup');
    }
    const user = new User({
      email: req.body.email,
      password: req.body.password
    });
    await user.save();
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  } catch (err) {
    next(err);
  }
}



/**
 * POST /account/profile
 * Update profile information.
 */
export async function postUpdateProfile(req, res, next) {
  const validationErrors = [];
  if (!isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });

  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/account');
  }
  req.body.email = normalizeEmail(req.body.email, { gmail_remove_dots: false });
  try {
    const user = await findById(req.user.id);
    if (user.email !== req.body.email) user.emailVerified = false;
    user.email = req.body.email || '';
    user.profile.name = req.body.name || '';
    user.profile.gender = req.body.gender || '';
    user.profile.location = req.body.location || '';
    user.profile.website = req.body.website || '';
    await user.save();
    req.flash('success', { msg: 'Profile information has been updated.' });
    res.redirect('/account');
  } catch (err) {
    if (err.code === 11000) {
      req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
      return res.redirect('/account');
    }
    next(err);
  }
}

/**
 * POST /account/password
 * Update current password.
 */
export async function postUpdatePassword(req, res, next) {
  const validationErrors = [];
  if (!isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' });
  if (escape(req.body.password) !== escape(req.body.confirmPassword)) validationErrors.push({ msg: 'Passwords do not match' });

  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/account');
  }
  try {
    const user = await findById(req.user.id);
    user.password = req.body.password;
    await user.save();
    req.flash('success', { msg: 'Password has been changed.' });
    res.redirect('/account');
  } catch (err) {
    next(err);
  }
}

/**
 * POST /account/delete
 * Delete user account.
 */
export async function postDeleteAccount(req, res, next) {
  try {
    await deleteOne({ _id: req.user.id });
    req.logout((err) => {
      if (err) console.log('Error: Failed to logout.', err);
      req.session.destroy((err) => {
        if (err) console.log('Error: Failed to destroy the session during account deletion.', err);
        req.user = null;
        res.redirect('/');
      });
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */
export async function getOauthUnlink(req, res, next) {
  try {
    let { provider } = req.params;
    provider = escape(provider);
    const user = await findById(req.user.id);
    user[provider.toLowerCase()] = undefined;
    const tokensWithoutProviderToUnlink = user.tokens.filter((token) =>
      token.kind !== provider.toLowerCase());
    // Some auth providers do not provide an email address in the user profile.
    // As a result, we need to verify that unlinking the provider is safe by ensuring
    // that another login method exists.
    if (
      !(user.email && user.password)
      && tokensWithoutProviderToUnlink.length === 0
    ) {
      req.flash('errors', {
        msg: `The ${startCase(toLower(provider))} account cannot be unlinked without another form of login enabled.`
        + ' Please link another account or add an email address and password.'
      });
      return res.redirect('/account');
    }
    user.tokens = tokensWithoutProviderToUnlink;
    await user.save();
    req.flash('info', {
      msg: `${startCase(toLower(provider))} account has been unlinked.`,
    });
    res.redirect('/account');
  } catch (err) {
    next(err);
  }
}

/**
 * GET /reset/:token
 * Reset Password page.
 */
export async function getReset(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      return res.redirect('/');
    }
    const validationErrors = [];
    if (!isHexadecimal(req.params.token)) validationErrors.push({ msg: 'Invalid Token.  Please retry.' });
    if (validationErrors.length) {
      req.flash('errors', validationErrors);
      return res.redirect('/forgot');
    }

    const user = await findOne({
      passwordResetToken: req.params.token,
      passwordResetExpires: { $gt: Date.now() }
    }).exec();
    if (!user) {
      req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
      return res.redirect('/forgot');
    }
    res.render('account/reset', {
      title: 'Password Reset'
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * GET /account/verify/:token
 * Verify email address
 */
export function getVerifyEmailToken(req, res, next) {
  if (req.user.emailVerified) {
    req.flash('info', { msg: 'The email address has been verified.' });
    return res.redirect('/account');
  }

  const validationErrors = [];
  if (escape(req.params.token) && (!isHexadecimal(req.params.token))) validationErrors.push({ msg: 'Invalid Token.  Please retry.' });
  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/account');
  }

  if (req.params.token === req.user.emailVerificationToken) {
    findOne({ email: req.user.email })
      .then((user) => {
        if (!user) {
          req.flash('errors', { msg: 'There was an error in loading your profile.' });
          return res.redirect('back');
        }
        user.emailVerificationToken = '';
        user.emailVerified = true;
        user = user.save();
        req.flash('info', { msg: 'Thank you for verifying your email address.' });
        return res.redirect('/account');
      })
      .catch((error) => {
        console.log('Error saving the user profile to the database after email verification', error);
        req.flash('errors', { msg: 'There was an error when updating your profile.  Please try again later.' });
        return res.redirect('/account');
      });
  } else {
    req.flash('errors', { msg: 'The verification link was invalid, or is for a different account.' });
    return res.redirect('/account');
  }
}

/**
 * GET /account/verify
 * Verify email address
 */
export function getVerifyEmail(req, res, next) {
  if (req.user.emailVerified) {
    req.flash('info', { msg: 'The email address has been verified.' });
    return res.redirect('/account');
  }

  if (!isValid(req.user.email)) {
    req.flash('errors', { msg: 'The email address is invalid or disposable and can not be verified.  Please update your email address and try again.' });
    return res.redirect('/account');
  }

  const createRandomToken = randomBytesAsync(16)
    .then((buf) => buf.toString('hex'));

  const setRandomToken = (token) => {
    findOne({ email: req.user.email })
      .then((user) => {
        user.emailVerificationToken = token;
        user = user.save();
      });
    return token;
  };

  const sendVerifyEmail = (token) => {
    const mailOptions = {
      to: req.user.email,
      from: process.env.SITE_CONTACT_EMAIL,
      subject: 'Please verify your email address on Hackathon Starter',
      text: `Thank you for registering with hackathon-starter.\n\n
        This verify your email address please click on the following link, or paste this into your browser:\n\n
        http://${req.headers.host}/account/verify/${token}\n\n
        \n\n
        Thank you!`
    };
    const mailSettings = {
      successfulType: 'info',
      successfulMsg: `An e-mail has been sent to ${req.user.email} with further instructions.`,
      loggingError: 'ERROR: Could not send verifyEmail email after security downgrade.\n',
      errorType: 'errors',
      errorMsg: 'Error sending the email verification message. Please try again shortly.',
      mailOptions,
      req
    };
    return sendMail(mailSettings);
  };

  createRandomToken
    .then(setRandomToken)
    .then(sendVerifyEmail)
    .then(() => res.redirect('/account'))
    .catch(next);
}

/**
 * POST /reset/:token
 * Process the reset password request.
 */
export function postReset(req, res, next) {
  const validationErrors = [];
  if (!isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' });
  if (escape(req.body.password) !== escape(req.body.confirm)) validationErrors.push({ msg: 'Passwords do not match' });
  if (!isHexadecimal(req.params.token)) validationErrors.push({ msg: 'Invalid Token.  Please retry.' });

  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('back');
  }

  const resetPassword = () =>
    findOne({ passwordResetToken: req.params.token })
      .where('passwordResetExpires').gt(Date.now())
      .then((user) => {
        if (!user) {
          req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
          return res.redirect('back');
        }
        user.password = req.body.password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        return user.save().then(() => new Promise((resolve, reject) => {
          req.logIn(user, (err) => {
            if (err) { return reject(err); }
            resolve(user);
          });
        }));
      });

  const sendResetPasswordEmail = (user) => {
    if (!user) { return; }
    const mailOptions = {
      to: user.email,
      from: process.env.SITE_CONTACT_EMAIL,
      subject: 'Your Hackathon Starter password has been changed',
      text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
    };
    const mailSettings = {
      successfulType: 'success',
      successfulMsg: 'Success! Your password has been changed.',
      loggingError: 'ERROR: Could not send password reset confirmation email after security downgrade.\n',
      errorType: 'warning',
      errorMsg: 'Your password has been changed, however we were unable to send you a confirmation email. We will be looking into it shortly.',
      mailOptions,
      req
    };
    return sendMail(mailSettings);
  };

  resetPassword()
    .then(sendResetPasswordEmail)
    .then(() => { if (!res.finished) res.redirect('/'); })
    .catch((err) => next(err));
}


export function postForgot(req, res, next) {
  const validationErrors = [];
  if (!isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });

  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/forgot');
  }
  req.body.email = normalizeEmail(req.body.email, { gmail_remove_dots: false });

  const createRandomToken = randomBytesAsync(16)
    .then((buf) => buf.toString('hex'));

  const setRandomToken = (token) =>
    findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash('errors', { msg: 'Account with that email address does not exist.' });
        } else {
          user.passwordResetToken = token;
          user.passwordResetExpires = Date.now() + 3600000; // 1 hour
          user = user.save();
        }
        return user;
      });

  const sendForgotPasswordEmail = (user) => {
    if (!user) { return; }
    const token = user.passwordResetToken;
    const mailOptions = {
      to: user.email,
      from: process.env.SITE_CONTACT_EMAIL,
      subject: 'Reset your password on Hackathon Starter',
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://${req.headers.host}/reset/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };
    const mailSettings = {
      successfulType: 'info',
      successfulMsg: `An e-mail has been sent to ${user.email} with further instructions.`,
      loggingError: 'ERROR: Could not send forgot password email after security downgrade.\n',
      errorType: 'errors',
      errorMsg: 'Error sending the password reset message. Please try again shortly.',
      mailOptions,
      req
    };
    return sendMail(mailSettings);
  };

  createRandomToken
    .then(setRandomToken)
    .then(sendForgotPasswordEmail)
    .then(() => res.redirect('/forgot'))
    .catch(next);
}
