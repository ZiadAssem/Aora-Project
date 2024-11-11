import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';


export const config = {
    endpoint: " https://cloud.appwrite.io/v1",
    platform: "com.ziad.aora",
    projectId: "67267cbb00188c11af5e",
    databaseId: "67267f240025b7ef4295",
    userCollectionId: "67267f54003d2de8bb39",
    videoCollectionId: "67267f7200024462f0f7",
    likesCollectionId: "6730bcc20010a3664732",
    storageId: "672680bf000d3ffe37f4"
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    likesCollectionId,
    storageId,
} = config;
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(endpoint) // Your Appwrite Endpoint
    .setProject(projectId) // Your project ID
    .setPlatform(platform) // Your application ID or bundle ID.


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

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

        await signIn(email, password);

        const newUser = await databases.createDocument(
            databaseId,
            userCollectionId,
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

export const signIn = async (email, password) => {
    try {

        const session = await account.createEmailPasswordSession(email, password);
        return session;

    } catch (error) {
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw new Error('No user found');

        const currentUser = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw new Error('No user found');
        // console.log('current user', currentUser.documents[0])
        return currentUser.documents[0];
    } catch (error) {
        throw new Error(error);
    }
}

export const getAllPosts = async () => {

    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt',)]

        )
        return posts.documents;

    } catch (error) {
        throw new Error(error);
    }
}

export const getLatestPosts = async () => {

    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )

        return posts.documents;

    } catch (error) {
        throw new Error(error);
    }
}

export const searchPosts = async (query) => {

    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title', query)]
        )

        return posts.documents;

    } catch (error) {
        throw new Error(error);
    }
}

export const getUserPosts = async (userId) => {

    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.equal('creator', userId), Query.orderDesc('$createdAt',)]
        )
        return posts.documents;

    } catch (error) {
        throw new Error(error);
    }
}

export const signOut = async (userId) => {

    try {
        const session = await account.deleteSession('current');
        return session;

    } catch (error) {
        throw new Error(error);
    }
}

// returns storage bucket url for the file
export const getFilePreview = async (fileId, type) => {
    let fileUrl
    try {
        if (type === 'video') {
            fileUrl = storage.getFileView(storageId, fileId);
        } else if (type === 'image') {
            fileUrl = storage.getFilePreview(
                storageId,
                fileId,
                2000,
                2000,
                'top',
                100
            );
        } else {
            throw new Error('Invalid file type')
        }
        if (!fileUrl) throw new Error('Failed to get file preview')
        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
}

// Uploads file to storage bucket so we can reference it in the database
export const uploadFile = async (file, type) => {
    if (!file) return;

    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri
    }

    try {
        const uploadedFile = await storage.createFile(
            storageId,
            ID.unique(),
            asset,
        );
        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }

}

// uploads the video and thumbnail then references it into database
export const createVideo = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video'),
        ])

        const newPost = await databases.createDocument(
            databaseId,
            videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId,
            }
        );
        return newPost;
    } catch (error) {
        throw new Error(error);

    }
}

export const getLikedPost = async (userId, postId) => {
    try {
        console.log('getting liked post')
        const likes = await databases.listDocuments(
            databaseId,
            likesCollectionId,
            [Query.equal('users', userId), Query.equal('video', postId)]
        )
        console.log('likes', likes)
        return likes.documents || [];
    } catch (error) {
        throw new Error(error);
    }
}



export const likeOrUnlike = async ( postId, likedBy, likeCount) => {
    try {
        // const likedPost = await getLikedPost(userId, postId);


        const updatedVideo = await databases.updateDocument(
            databaseId,
            videoCollectionId,
            postId,
            {
                liked_by: likedBy,
                number_of_likes: likeCount
            }

        );
        return updatedVideo;

    } catch (error) {
        throw new Error(error);
    }
}


