import { firestore } from '../utils/firebase';

export default defineEventHandler(event => {
    const refCol = firestore.collection('commands')
    return refCol.get().then(data => {
        let commands: Record<string, any> = {}
        data.forEach(doc => {
            commands[doc.id] = doc.data()
        });
        return commands
    })
})