import { Logger } from "@nestjs/common";

export class Helper {
    static customFileName(req, file, cb) {
      const uniqueSuffix = Date.now();
      let fileExtension = "";
      if(file.mimetype.indexOf("jpeg") > -1){
          fileExtension = "jpg"
      }else if(file.mimetype.indexOf("png") > -1){
          fileExtension = "png";
      }
      const originalName = file.originalname.split(".")[0];
      Logger.log("Original Name" + originalName);
      Logger.log("Unique Suffix" + uniqueSuffix);
      Logger.log("File Extension" + fileExtension);
      cb(null, originalName + '-' + uniqueSuffix+"."+fileExtension);
    }
   
    static destinationPath(req, file, cb) {
      cb(null, 'libs/shared-assets/src/lib/uploadedFiles')
    }
  }