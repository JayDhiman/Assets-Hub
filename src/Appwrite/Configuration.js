
import conf from "../config/config";
import { Client,Databases,ID } from "appwrite";

export class  DatabaseService{
 id = ID.unique()
client = new Client();
databases;
bucket;

constructor(){
    this.client
    .setEndpoint(conf.appwriteEndPoint)
   .setProject(conf.appwriteProjectId);
   this.datbases = new Databases(this.client);

}

// create Entery

async createEntry({Version,
    Software,
    NumberOfAssigns,
    userId}){

        try {
            return await this.databases.createDocument(
                conf.appWiteDatabaseID,
                conf.appWriteCollectionID,
                ID.unique()
                ,{
                    Version,
                    Software,NumberOfAssigns,
                    userId
                }
            )
            
        } catch (error) {
            console.log("Appwrite service ::", error)
        }
}

// update Entery
async updatePost(id, {Version,Software,NumberOfAssigns,userID }){
    try {
        return await this.databases.updateDocument(
            conf.appWiteDatabaseID,
            conf.appWriteCollectionID,
            id,
            {
                    Version,
                    Software,
                    NumberOfAssigns,
                    userID



            }
        )
    } catch (error) {
        console.log("Appwrite serive :: updatePost :: error", error);
    }
}

// Delete Entery
async deletePost(id){
    try {
        await this.databases.deleteDocument(
            conf.appWiteDatabaseID,
            conf.appWriteCollectionID,
            id
        
        )
        return true
    } catch (error) {
        console.log("Appwrite serive :: deletePost :: error", error);
        return false
    }
}

 // get a single Entry
async getPost(id){
    try {
        return await this.databases.getDocument(
            conf.appWiteDatabaseID,
            conf.appWriteCollectionID,
            id
        
        )
    } catch (error) {
        console.log("Appwrite serive :: getPost :: error", error);
        return false
    }
}

async getPosts(){
    try {
        return await this.databases.listDocuments(
            conf.appWiteDatabaseID,
            conf.appWriteCollectionID,
         
            

        )
    } catch (error) {
        console.log("Appwrite serive :: getPosts :: error", error);
        return false
    }
}

}



const databaseServce = new DatabaseService()
export default databaseServce