const mongoose = require("mongoose");

const adoptionSchema = new mongoose.Schema({
    petName: String,
    petBreed: String,
    petAge: String,
    petLocation: String,
    fullName: String,
    phone: String,
    address: String,
    occupation: String,
    houseType: String,
    ownership: String,
    reason: String,
    experience: String,
    currentPets: String,
    hoursAlone: Number,
    agreedToTerms: Boolean
}, { timestamps: true });

module.exports = mongoose.model("Adoption", adoptionSchema);