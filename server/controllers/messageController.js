import messageModel from "../models/messageModel.js";

export async function getMessages(req,res,next){
    try{
        const {from, to} = req.body;
        const messages = await messageModel.find({
            users: {$all: [from,to]},
        }).sort({updatedAt: 1})

        const projectedMessages = messages.map((msg) => {
            return {
                from: msg.sender.toString() === from,
                message: msg.message.text
            };
        });
        res.json(projectedMessages)
    }catch(e){
     next(e)
    }
}

export async function addMessage (req,res, next) {
   try {
    const {from, to, message} = req.body
    const addedMessage = await messageModel.create({
        message:{text:message},
        users: [from,to],
        sender: from
    });
    if (addedMessage) return res.json({msg:"Message added successfully."})
    else return res.json({msg: "Failed to add message to the database."})
   }catch(e) {
    next(e)
   }
}