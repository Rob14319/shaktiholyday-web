import PocketBase from 'pocketbase';

const pb = new PocketBase('http://localhost:3000/hcgi/platform');

async function getCollections() {
    try {
        const collections = await pb.collections.getFullList();
        console.log("Collections:", collections.map(c => c.name));
    } catch (e) {
        console.error("Error:", e.message);
    }
}

getCollections();
