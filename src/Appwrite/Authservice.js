import { Client, Account,ID } from "appwrite";
import conf from '../config/config'



export class AuthService{
client = new Client();
account;

constructor(){
this.client
.setEndpoint(conf.appwriteEndPoint)
.setProject(conf.appwriteProjectId);
this.account = new Account(this.client);
}




//  register a new user


async register({ email, password, name}) {
    try {
      // Create a new user account
      const userAccount = await this.account.create( ID.unique(), email, password, name);
      
      if (userAccount) {
        // Return the user account data or a success message
        return userAccount;
      } else {
        // Handle the case where userAccount is falsy (registration failed)
        throw new Error("Failed to register user");
      }
    } catch (error) {
      throw error;
    }
  }

//   login new user

async login({email, password}) {
try {
    return await this.account.createEmailSession(email, password);
} catch (error) {
    throw error;
}
}


//  detail of current user
async currentUser(){
try {
  return await this.account.get()
  
} catch (error) {
    console.log("Appwrite service :: currentUser :: error", error);       
    }
    return null;
}


//   Logout user

async logout(){
try {
    return await this.account.deleteSessions()
} catch (error) {
    console.log("Appwrite serive :: logout :: error", error);}
}


}
const authService = new AuthService();


export default authService





