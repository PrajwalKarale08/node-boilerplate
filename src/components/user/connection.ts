import * as mongoose from 'mongoose';
const url = 'mongodb://127.0.0.1:27017/local';  
mongoose.connect(url, (err: any) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Successfully Connected!");
    }
});

export interface IUser extends mongoose.Document {
    name: string;
    age: number;
}
export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: String, required: true }
});
const User = mongoose.model<IUser>("User", UserSchema);
export default User;

