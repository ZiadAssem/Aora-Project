import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';


export const config = {
    endpoint: " https://cloud.appwrite.io/v1",
    platform: "com.ziad.aora",
    projectId: "67267cbb00188c11af5e",
    databaseId: "67267f240025b7ef4295",
    userCollectionId: "67267f54003d2de8bb39",
    videoCollectionId: "67267f7200024462f0f7",
    storageId: "672680bf000d3ffe37f4"
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username,
        )
        if (!newAccount) throw new Error('Failed to create user');
        const avatarUrl = avatars.getInitials(username);

        await signIn(email,password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl,
            }
        )

        return newUser;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const signIn = async (email,password)=>{
    try {
        
        const session = await account.createEmailPasswordSession(email,password);
        return session;

    } catch (error) {
        throw new Error(error);
    }
}


