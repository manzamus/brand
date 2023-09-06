const successResponse=(res,status,mesg,datas)=>{
    res.status(status).json({
        massage:mesg,
        data:datas
    })
}

export default successResponse