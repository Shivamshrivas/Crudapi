const express=require('express');
const router = express.Router() ;
const authController= require('./../controllers/authController');


router.post('/signup',authController.signup);


router.post('/login',authController.login);
router.get('/:userid',authController.userdata);
router.put('/:userid',authController.updateuser,authController.userdata);
router.delete('/:userid',authController.deleteuser);

    










 
module.exports =router;







//$2a$10$11WBWa8aAf8/WgyDjosvNOncLVzKou8kVJkJOOJKjDR8hcHC9NGW6
//$2a$10$HvS5Z9gvpscQa47Vq7u8zeFG/YeUksartzUfeg2NQYCd2AsS.44Ue