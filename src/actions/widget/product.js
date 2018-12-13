import firestore from '../../firebase/firebase';
export const startAddProduct = (product) => {
    return (dispatch) => {
        // console.log(product)
        return firestore.collection('products').get()
            .then(snapShot => {
                let products = [];
                let count = 1;
                // let free = 1;
                snapShot.forEach(doc => {
                    if (Number(doc.id) == count) {
                        count++;
                    } else {
                        return true;
                    }
                })
                return firestore.collection('products').doc(count.toString()).set(product)
                    .then(() => {
                        return "ok"
                    })
            })
    }
}

