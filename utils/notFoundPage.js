export let notFoundPage = (req , res )=>{
    return res.status(404).json({ success: false, message: "page not Found"});
}