import { google } from "googleapis";
import path from "path";
import fs from "fs";
import nc from "next-connect";
import onError from "../../../middleware/error";
import { NextApiResponse } from "next";
import { googleDrive } from "../../../db";

const handler = nc({
  onError,
});

export const credentials = {
  // type: process.env.type,
  // project_id: process.env.project_id,
  // private_key_id: process.env.private_key_id,
  private_key: process.env.private_key,
  client_email: process.env.client_email,
  // client_id: process.env.client_id,
  // auth_uri: process.env.auth_uri,
  // token_uri: process.env.token_uri,
  // auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  // client_x509_cert_url: process.env.client_x509_cert_url,
};

export const ImagefilePath = path.join(process.cwd(), "pages/api/dosc", "التقويم الدراسي.xlsx");
// export const ImagefilePath = path.join(process.cwd(), "pages/api/dosc", "p.docx");

handler.get(async (req: Request, res: NextApiResponse) => {
  const client = await google.auth.getClient({
    credentials,
    scopes: ["https://www.googleapis.com/auth/drive"],
  });

  // const drive = google.drive({
  //   version: "v3",
  //   auth: client,
  // });

  //   async function createFileInFolder() {
  //   try {
  //     const folderId = "0AKK2FEcg3f53Uk9PVA";
  //     const res = await drive.files.create({
  //       requestBody: {
  //         name: "edc-team",
  //         mimeType: "image/jpg",
  //         // driveId: "0AKK2FEcg3f53Uk9PVA",
  //         parents: [folderId],
  //       },
  //       media: {
  //         mimeType: "image/jpg",
  //         body: fs.createReadStream(filePath),
  //       },
  //       supportsAllDrives: true,
  //       fields: "id",
  //     });
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // createFileInFolder();

  async function uploadFile() {
    try {
      const drive = await googleDrive();
      const res = await drive.files.create({
        requestBody: {
          name: "التقويم الدراسي",
          // mimeType: "application/msword",
          mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          driveId: "0AKK2FEcg3f53Uk9PVA",
          parents: ["1yss2Mx9_hrXDSrmpHkE0rHY4anac6sut" ],
        },
        media: {
          mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          body: fs.createReadStream(ImagefilePath),
        },
        supportsAllDrives: true,
        supportsTeamDrives: true,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  uploadFile();


async function copyFile(){
  try {
    const drive = await googleDrive()
    const copy = await drive.files.copy({
      
    supportsAllDrives:true,
    fileId:"1PaZpizD4JEU2yKlxa123b2VmSPJqa_X8",
    
    })
    console.log(copy);
    
    // const paste = await drive.files.update({
    //   fileId: copy.data.id,
     

    //   includePermissionsForView:"published",

    //    addParents:"11jZpXbzs43ivhd6rTkBW3qYN3PnX2T8v",
    //    removeParents:  "11jZpXbzs43ivhd6rTkBW3qYN3PnX2T8v",
    //   supportsAllDrives:true,
    //   supportsTeamDrives:true,
    //   // fields:"0AKK2FEcg3f53Uk9PVA, 11jZpXbzs43ivhd6rTkBW3qYN3PnX2T8v",
    // })
    // console.log(paste);
    
  } catch (error) {
    console.log(error);
    
  }
}


// copyFile()



  async function searchForFile() {
    try {
      const drive = await googleDrive();
      const res = await drive.files.list({
        // q: "mimeType: 'application/vnd.google-apps.folder'",
        q: "parents in '11jZpXbzs43ivhd6rTkBW3qYN3PnX2T8v'",
        // fields: "nextPageToken, files(id, name)",

        includeItemsFromAllDrives: true,
        driveId: "0AKK2FEcg3f53Uk9PVA",
        supportsAllDrives: true,
        
        corpora: "drive",
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  // searchForFile();

  // async function deleteFile() {
  //   try {
  //     const res = await drive.files.delete({
  //       fileId: "1qkasq11YuENcSWYkbrtb8s2Pf_cP",
  //     });
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // deleteFile();

  async function createUrl() {
    const drive = await googleDrive();
    try {
      const fileID = "1PaZpizD4JEU2yKlxa123b2VmSPJqa_X8";

      await drive.permissions.create({
        fileId: fileID,

        supportsTeamDrives: true,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });
      const result = await drive.files.get({
        fileId: fileID,
        supportsTeamDrives: true,
        fields: "webViewLink, webContentLink",
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  // createUrl();

  async function folder() {
    var fileMetadata = {
      name: "مدرسة الإمام الشافعي ذكور",
      mimeType: "application/vnd.google-apps.folder",
      driveId: "0AKK2FEcg3f53Uk9PVA",
      parents: ["0AKK2FEcg3f53Uk9PVA"],
    };
    const drive = await googleDrive();
    drive.files.create(
      {
        requestBody: fileMetadata,
        supportsAllDrives: true,
      },
      function (err, file) {
        if (err) {
          // Handle error
          console.error(err);
        } else {
          console.log("Folder Id: ", file.data.id);
        }
      }
    );
  }

  // folder();

  // async function allFiles() {
  //   drive.files.list(
  //     {
  //       pageSize: 10,
  //       fields: "nextPageToken, files(id, name)",
  //       driveId: "0AKK2FEcg3f53Uk9PVA",
  //       supportsAllDrives: true,
  //       includeTeamDriveItems: true,
  //       spaces: "drive",
  //       corpora: "drive",
  //     },
  //     (err, res) => {
  //       if (err) return console.log("The API returned an error: " + err);
  //       const files = res.data.files;
  //       if (files.length) {
  //         console.log("Files:");
  //         files.map((file) => {
  //           console.log(`${file.name} (${file.id})`);
  //         });
  //       } else {
  //         console.log("No files found.");
  //       }
  //     }
  //   );
  // }

  // allFiles();

  // searchForFile();

  // async function download() {
  //   try {
  //     const fileId = "1vHQlKDqOHmHCyLX2ZmPThwtLRhSTQcW6";
  //     var dest = fs.createWriteStream("/tmp/t1.jpg");

  //     const res = await drive.files.get({
  //       fileId: fileId,
  //       alt: "media",
  //       // q: "parents in '12F83Qzqe3jKUr5tpd13oXjE6XO3OeNiI'",
  //       // fields: "nextPageToken, files(id, name)",
  //       // includeItemsFromAllDrives: true,
  //       // driveId: "0AKK2FEcg3f53Uk9PVA",
  //       // supportsAllDrives: true,
  //       // corpora: "drive",
  //     });

  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // download();

  res.end();
});
// const auth = new google.auth.GoogleAuth({
//   keyFile: "",
//   scopes: ["https://www.googleapis.com/auth/drive"],
// });

// oauth2Client.setCredentials({
//   refresh_token:
//     "ya29.a0AfH6SMDf5qJIGJHClnn2Z8QnLzCHqp3E7s85JDWnTC6Osg5vPi7_23pcPQ-DKy7f7fws4HdCoQ3L9xiAXMwiCG-K1Ql6UGRpFNy4IbQfGep5_hxVv1IM-a4ekVKI9JIWLGdAFhtet2kuhyOwvCxFSplgsY9nLI0dOJqTxzlnLcaLRco4IO088VHgnBfjSVhFDo-v9mF7",
// });

// const drive = google.drive({
//   version: "v3",
//   auth: oauth2Client,
// });

// const filePath = path.join(process.cwd(), "test", "h.jpg");

// async function uploadFile() {
//   try {
//     const res = await drive.files.create({
//       requestBody: {
//         name: "edc-team",
//         mimeType: "image/jpg",
//         driveId: "0AKK2FEcg3f53Uk9PVA",
//         parents: ["0AKK2FEcg3f53Uk9PVA"],
//       },
//       media: {
//         mimeType: "image/jpg",
//         body: fs.createReadStream(filePath),
//       },
//       supportsAllDrives: true,
//       supportsTeamDrives: true,
//     });
//     console.log(res.data);
//   } catch (error) {
//     console.log(error);
//   }
// }

// // uploadFile();

// // delete

// async function deleteFile() {
//   try {
//     const res = await drive.files.delete({
//       fileId: "1nesGIgSoZxh0MNNR4vJPF6jJ7p-ncN3f",
//     });
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// }

// // deleteFile();

// // create url

// async function createUrl() {
//   try {
//     const fileID = "1iOEeLmGrSbkrOVkxSNQMAI0tfN-O-1Kh";
//     await drive.permissions.create({
//       fileId: fileID,
//       requestBody: {
//         role: "reader",
//         type: "anyone",
//       },
//     });
//     const result = await drive.files.get({
//       fileId: fileID,
//       fields: "webViewLink, webContentLink",
//     });
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// }

// // createUrl()
// // ! 1
// async function folder() {
//   var fileMetadata = {
//     name: "المدرس عمر",
//     mimeType: "application/vnd.google-apps.folder",
//     driveId: "0AKK2FEcg3f53Uk9PVA",
//     parents: ["0AKK2FEcg3f53Uk9PVA"],
//   };
//   drive.files.create(
//     {
//       requestBody: fileMetadata,
//       supportsAllDrives: true,
//     },
//     function (err, file) {
//       if (err) {
//         // Handle error
//         console.error(err);
//       } else {
//         console.log("Folder Id: ", file.id);
//       }
//     }
//   );
// }

// // folder();

// async function allFiles() {
//   drive.files.list(
//     {
//       pageSize: 10,
//       fields: "nextPageToken, files(id, name)",
//       supportsAllDrives: true,
//       spaces: "drive",
//     },
//     (err, res) => {
//       if (err) return console.log("The API returned an error: " + err);
//       const files = res.data.files;
//       if (files.length) {
//         console.log("Files:");
//         files.map((file) => {
//           console.log(`${file.name} (${file.id})`);
//         });
//       } else {
//         console.log("No files found.");
//       }
//     }
//   );
// }

// // allFiles();
// const fileId = "0AKK2FEcg3f53Uk9PVA";
// async function getFiles() {
//   drive.files.get(
//     {
//       fileId,
//       fields: "parents",
//       supportsAllDrives: true,
//     },
//     function (err, file) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(file.data);
//       }
//     }
//   );
// }

// // getFiles();

// // Create a file in a folder
// // ! 2
// async function createFileInFolder() {
//   try {
//     const folderId = "12F83Qzqe3jKUr5tpd13oXjE6XO3OeNiI";
//     const res = await drive.files.create({
//       requestBody: {
//         name: "edc-team",
//         mimeType: "image/jpg",
//         // driveId: "0AKK2FEcg3f53Uk9PVA",
//         parents: [folderId],
//       },
//       media: {
//         mimeType: "image/jpg",
//         body: fs.createReadStream(filePath),
//       },
//       supportsAllDrives: true,
//       fields: "id",
//     });
//     console.log(res.data);
//   } catch (error) {
//     console.log(error);
//   }
// }
// // createFileInFolder();

// // search for a file

// async function searchForFile() {
//   try {
//     const res = await drive.files.list({
//       // q: "mimeType: 'application/vnd.google-apps.folder'",
//       q: "parents in '12F83Qzqe3jKUr5tpd13oXjE6XO3OeNiI'",
//       // fields: "nextPageToken, files(id, name)",
//       includeItemsFromAllDrives: true,
//       driveId: "0AKK2FEcg3f53Uk9PVA",
//       supportsAllDrives: true,
//       corpora: "drive",
//     });
//     console.log(res.data);
//   } catch (error) {
//     console.log(error);
//   }
// }
// // searchForFile();
export default handler;

// for finding all folders
// q: "mimeType: 'application/vnd.google-apps.folder'",
