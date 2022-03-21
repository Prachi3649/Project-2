const mongoose = require('mongoose')
const validator = require('validator')
const ObjectId =mongoose.Schema.Types.ObjectId
const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Inter name is required",
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        //validate: [ validator.isEmail, 'invalid email' ]
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false //The validator dosn't play well with mongoose to get rid of the warning set isAsync to false


        }
    },
    // mobile: {
    //     type: String,
    //     require:true,
    //     unique:true,
    //     trim:true,
    //     match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,

    //   },

    
   mobile: {
      type: Number,
  },



    collegeId: {
        type: ObjectId,
        ref:'College',
        trim:true,
    },
    
    isDeleted: {
        type: Boolean,
        default: false
    },
 

}, { timestamps: true })






internSchema.path('mobile').validate(function validatePhone() {
  return ( this.mobile > 999999999 );
});















module.exports = mongoose.model('Intern', internSchema)