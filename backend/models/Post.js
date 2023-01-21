import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({

    image: {
        public_id: String,
        url: String,
    },
    
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
    ],
    totalLikes: {
        type: Number,
        default: 0,
    },
    comments: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          comment: {
            type: String,
            required: true,
          },
        },
    ],
    totalComments: {
        type: Number,
        default: 0,
    },
    achievement_desc: {
        type: String
    },
    issuer_organisation: {
        type: String
    },
    issue_date:{
        type: String
    },
    category:{
        type: String,
        required: [true, "Please enter a achievement category"],          // can be -> Research, Internship, Hackathon, Olacement, Quiz, Scholoraship, Codding contest, CP, Technical Program, Speaker@Conference  
    },
    tags: {
        type: [String]
    },
    publicPost: {
        type: Boolean,
        default: true,
    },
    
});

export default mongoose.model("Post", PostSchema)



//achievement desc
//issuer organisation
//issue date
//tags
//user
//images
//comment