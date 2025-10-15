import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
    amount: { type: Number, required: true },
    bookedSeats: { type: Array, required: true },
    isPaid: { type: Boolean, default: false },
    paymentLink: { type: String },
    foods: [
    {
        food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
        quantity: { type: Number, default: 1 }
    }
]
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;



