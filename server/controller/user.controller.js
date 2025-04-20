import { User } from "../model/user.model.js";

export const create = async(req, res) => {
    try {
        const newUser = new User(req.body);
        const { email } = newUser
        console.log(email);
        

        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return res.status(400).json({ message: "user already exists" });
        }
        
        const savedUser = await newUser.save();

        // res.status(200).json(savedUser)
        res.status(201).json({message: "user created successfully"})
        
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}

export const getAllUsers = async(req, res) => {
    try {
        
        const userData = await User.find()
        if (!userData || userData === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        
        res.status(200).json(userData)
        
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
}

export const getUserById = async (req, res) => {
    
    try {
        
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json(userExist)
        
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
    
}

export const update = async (req, res) => {
    try {
        
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const updatedData = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        })
        
        // res.status(200).json(updatedData)
        res.status(201).json({message: "user created successfully"})

    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
}

export const deleteById = async (req, res) => {
    try {

        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }

        const deletedUser = await User.findByIdAndDelete(id);
        res.status(200).json({message: "User Deleted Successfully"})
        
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}