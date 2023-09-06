import  express from "express"; 
import UserController from "../controller/UserController";
import DataChequer from "../middlewares/dataChequer";
import  Validator  from "../middlewares/validator"

const router=express.Router()
router.post(
    "/",
    DataChequer.userRegisterIsEmpty,
    DataChequer.emailExist,
    Validator.userAccountRule(),
    Validator.inputValidator,
    UserController.createUser  
);

router.post("/",UserController.createUser)
router.get("/",UserController.getAllUsers)
router.delete("/",UserController.deleteAllUsers)
router.get('/:id',UserController.getOneUser)
router.delete('/:id',UserController.deleteOneUser)
router.patch('/:id',UserController.updateOneUser)
router.post("/login",UserController.login)

export default router