import multer , {diskStorage} from "multer";
import { nanoid } from "nanoid";


export function uploadFile (){

    let storage = diskStorage({destination:"productsImages" , 
        
        filename:(req , file , cb)=>{
            
            // rename the file 
            cb(null , nanoid() + "__" + file.originalname)
        } 
    
    })
    
    let multerUpload = multer({storage})

    return multerUpload ;
}


