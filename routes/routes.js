import express from 'express'
import {UserGetController, UserPostController} from '../controllers/controller.js'

const router = express.Router()
const UserGetcontroller = new UserGetController()
const UserPostcontroller = new UserPostController()

router.get('/signup', UserGetcontroller.getSignUpPage);
router.get('/signin', UserGetcontroller.getSignInPage);
router.get('/home', UserGetcontroller.home);
router.get('/signout', UserGetcontroller.logoutUser);
router.get('/forgotPassword', UserGetcontroller.getForgotPassword);
router.get('/changePassword', UserGetcontroller.getChangePassword);




//POST REQUESTS
router.post('/signup', UserPostcontroller.createUser);
router.post('/signin', UserPostcontroller.signInUser);
router.post('/forgotPassword', UserPostcontroller.forgotPassword);
router.post('/changePassword', UserPostcontroller.changePassword);


export default router