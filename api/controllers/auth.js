const User = require('../models/User')
const bcrypt = require('bcryptjs')



const register = async (req,res)=>{
    try{
       
        const { firstname, lastname, email, password } = req.body.data
        let emailExists = await User.findOne({email})
        

        if(emailExists){
            return res.status(409).send("Email already exists");
        }

        const hashedPsw = await bcrypt.hash(password, 10)

        let user = new User({
                firstname,
                lastname,
                email,
                password: hashedPsw,
            }
        )
        await user.save()
        res.status(201).send("User registered successfully");
    }catch (err){
        res.status(500).send('Internal server error');
    }

}

const login = async  (req,res)=>{
    try{
      
        const {email,password} = req.body.data
        let user = await User.findOne({email})

        if (!user) {
            return res.status(404).send("Incorrect email");
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(404).send("Incorrect password");
        }

        user.activity = true
        await user.save()

        req.session.isAuth = true

        req.session.user = user
        
        res.status(200).send("Login successful");

    }catch(err){
        res.status(500).send("Internal Server Error");
    }
}


const logout = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        user.activity = false;
        await user.save();

        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Failed to logout. Please try again.');
            }

        res.status(200).send("Logout successful");
        });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};




module.exports = {register, login, logout}