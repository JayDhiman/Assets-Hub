const conf = {

    appwriteEndPoint:String(import.meta.env.VITE_API_ENDPOINT),
    appwriteProjectId:String(import.meta.env.VITE_PROJECT_ID),
    appWiteDatabaseID: String(import.meta.env.VITE_DATABASE_ID),
    appWirteBucketID: String(import.meta.env.VITE_BUCKET_ID),
    appWriteCollectionID:String(import.meta.env.VITE_COLLECTION_ID)
}

export default conf