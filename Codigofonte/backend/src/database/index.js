import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/buchinho-cheio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.Promise = global.Promise;

export default mongoose;