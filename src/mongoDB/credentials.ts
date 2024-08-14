

export function getMongoUrl(collectionName: string):string {
    return `mongodb+srv://afriddev:17030143@cluster0.6t6dm.mongodb.net/${collectionName}?retryWrites=true&w=majority&appName=cluster0`
}