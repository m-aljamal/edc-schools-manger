 
import { googleDrive } from "../db";


export const createAndFiles = async (mainFolderName: string, schoolFileId: string, res, employeeFoldersArry,
    
    ) => {
    try {
        const drive = await googleDrive();
        const mainfolder = await createFolder(mainFolderName, schoolFileId, drive);
        
        if (mainfolder.status !== 200) {
            return res.status(400).json({ error: "مشكلة في انشاء الملفات" });
          }
          if (mainfolder.data.id) {
            employeeFoldersArry?.forEach(async (folder) => {
             const createdFolders =  await createFolder(folder.mainFolder, mainfolder.data.id, drive);
             
             if(createdFolders.data.id && folder.subFolders){
                folder.subFolders.forEach(async (sub) =>{
               await createFolder(sub.folder, createdFolders.data.id, drive); 
              })   
             } 
            });
          } 
        }catch(error){
            return res.status(400).json({ error: "مشكلة في انشاء الملفات" });
        }
    
    }



  const createFolder = async (name: string, id: string, drive) => {
    const fileMetadata = {
      name,
      mimeType: "application/vnd.google-apps.folder",
      driveId: "0AKK2FEcg3f53Uk9PVA",
      parents: [id],
    };
    const file = await drive.files.create({
      requestBody: fileMetadata,
      supportsAllDrives: true,
    });
     
    return file;
  };

