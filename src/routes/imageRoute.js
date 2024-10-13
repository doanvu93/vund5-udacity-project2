import express from 'express';
import {filterImageFromURL, deleteLocalFiles} from '../../util/util.js';

const imageRoute = express.Router();

imageRoute.get( "/filteredimage", async ( req, res ) => {
    const imageUrl = req.query.image_url;
    if (imageUrl) {
        filterImageFromURL(imageUrl)
            .then(outpath => {
                res.sendFile(outpath);
                setTimeout(() => {
                    deleteLocalFiles([outpath]);
                }, 1000);
            })
            .catch((error) => {
                res.status(422).json({
                    statusCode: 422,
                    error: error.message,
                    content: 'Invalid image path or data could not be loaded!',
                });
            });
        return;
    } else {
        res.status(400).json({
            statusCode: 400,
            error: 'Invalid parameter',
            content: 'Invalid parameter!',
        });
    }
} );

export default imageRoute;