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

    //   login new user
    
    async login({email, password}) {
            try {
            return  await this.account.createEmailSession(email, password);
                
            } catch (error) {
                console.log('login err');
            }
        
      }

    //   Logout user

    async logout(){
        try {
            return await this.account.deleteSession("current")
        } catch (error) {
            console.error("logout errr");
        }
    }
    //  detail of current user
    async currentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("curr user error");
        }
    }

    //  register a new user

    async register({email,password,name}){
        try {
        const userAccount = await this.account.create(ID.unique(), email, password, name);
        if (userAccount) {
            // call another method
            return this.login({email, password});
        } else {
           return  userAccount;
        }
        } catch (error) {
            
        }
    }

}


export default AuthService

   



