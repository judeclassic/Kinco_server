const path = require('path');
const userModel = require('../models/user.model');
const contentModel = require('../models/content.model');

exports.postContent = (req, res)=>{
    console.log(req.body);
    console.log(req.file);
    res.json('i rule the world');
    console.log(req.file.path.slice(10));
    var content = new contentModel({
        'userID': req.body.userID,
        "url": path.join("/file/"+req.file.filename),
        "lastModified": Date.now()
    });

    content.save()
    .then((result)=>{
        console.log(result._id);

        userModel.findByIdAndUpdate(
            req.body.userID,
            {$push: {
                "content": {
                    "contentID": result._id,
                    "url": result.url
                }
            }},
            (err, userResult)=>{
                if (err) console.error(err);
                console.log(userResult)
            }
        )
    })
    .catch((err)=>{
        console.error(err);
    });
    
}

exports.requestContents = (req, res)=>{
    console.log("yeah baby");
    contentModel.find(
        {},
        (err, result)=>{
            if (err){
                res.json(err);
            }
            console.log(result)
            res.json(result);
        }
    )
}

exports.updateContent = (req, res)=>{
    userModel.find(
        {},
        (err, result)=>{
            console.log(result);
        }
    )
}