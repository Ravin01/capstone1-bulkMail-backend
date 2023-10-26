import mongoose from "mongoose";

// Schema
export const registrationSchema = mongoose.Schema({
  userId: {
    type: "string",
    required: true,
  },
  userName: {
    type: "string",
    required: true,
  },
  userEmail: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
});

export const registrationModel = mongoose.model("users", registrationSchema);

// mails schema
export const mailsSchema = mongoose.Schema({
  mailId : {
    type : 'string',
    required : true
  },
   to: {
    type: [],
    required: true,
  },
  subject: {
    type: "string",
    required: true,
  },
  text: {
    type: "string",
    required: true,
  },
  time: {
    type: "string",
    required: true,
  }
});

export const mailsModel = mongoose.model("mails", mailsSchema);


// Important mails
export const importantMailsSchema = mongoose.Schema({
  mailId : {
    type : 'string',
    required : true
  },
   to: {
    type: [],
    required: true,
  },
  subject: {
    type: "string",
    required: true,
  },
  text: {
    type: "string",
    required: true,
  }
})

export const importantMailsModel = mongoose.model('importantMails', importantMailsSchema)
