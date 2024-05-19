import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


 const database  = async ()=>{
  mongoose.set('strictQuery', false);

      await mongoose
     .connect(
      process.env.MONGO_URI,
      { autoIndex: false }
  )
  .then(() => {
    console.log('Database dey very functional🔥');
  })
  .catch((e) => {
    console.log('Database Crash😭', e);
  });
}
export default database
