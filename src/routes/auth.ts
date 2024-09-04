import express from 'express';;
import {register,login} from "../controllers/auth.controller";

const router = express.Router();

// Registration endpoint
router.post('/register',register);

// login endpoint
router.post('/login', login);



export default router;