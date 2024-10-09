// import mongoose from 'mongoose';
import axios from 'axios'
import dotenv from "dotenv";
import randomBytes from 'randombytes';


dotenv.config();

export const createStreamingPolicy = async (req, res) => {

    const policy_name = process.env.DRM_POLICY_NAME;
    const project_name = process.env.PROJECT_NAME;
    const url = `https://api.mk.io/api/ams/${project_name}/streamingPolicies/${policy_name}`
    const token = process.env.MKIO_TOKEN
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }



    try {
        await axios.put(url, {

            "properties": {
                "commonEncryptionCbcs": {
                    "drm": {
                        "fairPlay": {
                        "allowPersistentLicense": true
                        }
                    },
                    "enabledProtocols": {
                        "dash": false,
                        "download": false,
                        "hls": true,
                        "smoothStreaming": false
                    }
                },
                "commonEncryptionCenc": {
                    "drm": {
                        "widevine": {},
                        "playReady": {}
                    },
                    "enabledProtocols": {
                        "dash": true,
                        "download": false,
                        "hls": true,
                        "smoothStreaming": true
                    }
                }
               
            }
        }, {headers});

        res.status(200).json({message: "streaming policy created"})
        console.log("policy created");
    }catch(err){
        console.log(err)
    }
}


export const getAllAssets = async(req, res) => {

    function generateRandomString(length) {
        const randombytes = randomBytes(length);
        return randombytes.toString('hex').slice(0, length); 
    }
    const date = new Date();
    const project_name = "mediakind-subscription"
    const token = process.env.MKIO_TOKEN
    
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
    let assets = []
    const page1 = `https://api.mk.io/api/ams/${project_name}/assets`
    const page2 = `https://api.mk.io/api/ams/${project_name}/assets?%24skiptoken=1000`


    try{
        const response1 = await axios.get(page1, {headers});
        const response2 = await axios.get(page2, {headers});
    
        assets = [...response1.data.value, ...response2.data.value];

        console.log(assets.slice(0, 15)); 

        

        // const encodedAssets = assets
        // .map(n => n.name) // Extract the names of encoded assets
        // .filter(name => name.includes("encodingadaptivestreaming")); 
        // //console.log(encodedAssets);

        // //create a locator for each encoded asset
        // for (let name of encodedAssets) {
        //     const randomString = generateRandomString(8)
        //     const locator_name = `process.env.STREAMING_POLICY_NAME-${date.toISOString().split('.')[0]}-${randomString}`
        //     const createLocators = `https://api.mk.io/api/ams/${project_name}/streamingLocators/${locator_name}`

        //     //console.log(`${name} locator created`);
        //     // console.log(locator_name);

        //     try{
                
        //         const stringName = name.toString()
        //         await axios.put(createLocators, {
        //             properties:{
        //                 assetName: stringName,
        //                 defaultContentKeyPolicyName: process.env.DEFAULT_CONTENT_KEY_POLICY_NAME,
        //                 endTime: '2224-07-03T01:54:10.380Z',
        //                 streamingPolicyName: process.env.STREAMING_POLICY_NAME
        //             }
        //         }, {headers});
                
        //         console.log(`${name} locator created`)
        //     }catch(err){
        //         console.log(err)
        //     }
        // }

        // console.log("All Streaming locator have been created! Nice job");

        res.status(200).json(assets.slice(0, 15))

    }catch(err){
        console.log(err);
    }
}