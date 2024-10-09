// import mongoose from 'mongoose';
// // import axios from 'axios'
// // import dotenv from "dotenv";

// export const setCDN = async (req, res) => {
//     try {
//         // Find all documents where trailer_link needs to be updated
//         const docs = await PostMessage.find({
//             //subtitle_tracks is an array object with several subtitles. target url field for each
//             'clear_streaming_url': { $regex: /fliikamediaservice-usea.streaming.media.azure.net/ }
//         });
    
//         // Iterate through each document
//         for (let doc of docs) {
//           if (doc) {
//             const updatedLink = doc.clear_streaming_url.replace(
//                 "fliikamediaservice-usea.streaming.media.azure.net",
//               "eastus.av.mk.io/default-mediakind-subscription"
              
//             );
    
//             // Update the document
//             await PostMessage.updateOne(
//               { _id: doc._id },
//               { $set: { clear_streaming_url: updatedLink } }
//             );
    
//             console.log(`Updated clear streaming link for document with ID: ${doc._id}`);
            
//           } else {
//             console.log("Document with ID not found");
//           }
//         }

//         // for (let doc of docs) {
//         //     if (doc) {
//         //       // Map over the subtitles_tracks array and update each url
//         //       const updatedSubtitleTracks = doc.subtitles_tracks.map(track => ({
//         //         ...track,
//         //         url: track.url.replace(
//         //           "fliikamediaservice-usea.streaming.media.azure.net",
//         //           "eastus.av.mk.io/default-mediakind-subscription"
//         //         )
//         //       }));
      
//         //       // Update the document
//         //       await PostMessage.updateOne(
//         //         { _id: doc._id },
//         //         { $set: { subtitles_tracks: updatedSubtitleTracks } }
//         //       );
      
//         //       console.log(`Updated subtitle urls for document with ID: ${doc._id}`);
//         //     } else {
//         //       console.log("Document with ID not found");
//         //     }
//         // }



//         console.log("All matching documents updated");
//         res.status(200).json({message: "successsss"})
//       } catch (error) {
//         console.error("Error updating documents:", error);
//       }
    
// }