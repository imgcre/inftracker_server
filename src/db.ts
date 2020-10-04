import mongoose from 'mongoose';
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';


// mongoose.connection.on('error', () => {
//   throw new Error('failed to connect db');
// });

class User {
  @prop()
  public name!: string;
}

export const UserModel = getModelForClass(User);


(async () => {
  await mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

  console.log('connected');
  // for(let i = 0; i < 10; i++) {
  //   const {_id: id} = await UserModel.create({name: 'John'});
  //   const user = await UserModel.findById(id).exec();

  //   console.log(user);
  // }
  


})();