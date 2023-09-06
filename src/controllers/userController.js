import User from "../model/User";
import bcrypt, { compareSync, hash } from 'bcrypt';
import errorResponse from "../utils/errorResponse";
import successResponse from "../utils/successResponse";
import Jwt from "jsonwebtoken";

class UserController {
  static async createUser(req, res) {
    const {firstName,lastName,email,password}=req.body
    try {

        if(req.body.password!==req.body.confirmpassword){
            return errorResponse(res,403,`Password and confirm password is not matched`)      
        }
     
        const hashPassword=bcrypt.hashSync(req.body.password,10)

      const user = await User.create({firstName,lastName,email,password:hashPassword});
     const status=201

     const msg=`user successfuly created`
     const data=user
     successResponse(res,status,msg,data)
    } catch (error) {
      if (error.code == 11000) {
        return errorResponse(res,403,`User already exist`)
       
      } else {
        return errorResponse(res,500,error)
       
      
      }
    }
  }

  static async  login(req,res){
    const{email,password}=req.body
    const user=await User.findOne({email});
    if(!user){
      return errorResponse(res,401,`Invalid email `)
    }else{
      const comparepassword=bcrypt.compareSync(password,user.password)
      if(!comparepassword){
        return errorResponse(res,401,`Invalid  password`)
      }else{
        const token=Jwt.sign({role:user.role,email:user.email,firstName:user.firstName},process.env.SECRET_KEY,{expiresIn:"1d"})
        return res.status(200).json({
          token:token,
          data:{
            email:user.email,
            firstName:user.firstName,
            role:user.role
          }
        })
      }
    }

    
  }
  static async getAllUsers(req,res){
    const users= await User.find();
    if(!users || users.length==0){
      return errorResponse(res,401,'no user found')
      
    }else if(users){
      const status=200
      const msg=`all ${users.length} Users Found`
      const data=users
      return successResponse(res,status,msg,data)
      
    }
  }
  static async deleteAllUsers(req,res){
    const users=await User.deleteMany()
    return successResponse(res,200,'alll users deleted',users)
   
  }
  static async getOneUser(req,res){
    const id=req.params.id
    const user=await User.findById(id)
    if(!user){
      return errorResponse(res,401,`no user found with that id : ${id}`)
  
    }else{

   return successResponse(res,200,`user successfuly retrieved`,user)
    }


  }

  static async deleteOneUser(req,res){

    const id=req.params.id
    const user=await User.findByIdAndDelete(id)
    if(!User){
     errorResponse(res,403,`user with id ${id} not found`);
  }else{
    successResponse(res,200,`user successfuly delete`,user)
  }
}
static async updateOneUser(req,res){
  const id=req.params.id
  const user=await User.findByIdAndUpdate(id,req.body,{new:true})

  if(!User){
return errorResponse(res,403,`that id ${id} not found`)
  }else{
    return successResponse(res,200,`user successfuly apdated`,user)
  }
}
}
export default UserController