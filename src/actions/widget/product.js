import firestore from '../../firebase/firebase';
export const startAddProduct = (product) => {
    return (dispatch) => {
        // console.log(product)
        return firestore.collection('products').get()
            .then(snapShot => {
                let products = [];
                let count = 0;
                // let free = 1;
                snapShot.forEach(doc => {
                    products.push({ id: Number(doc.id) })
                })
                products = products.sort((a, b) => a.id > b.id ? 1 : -1)
                for (let i = 0; i < products.length; i++) {
                    // console.log('round ', i)
                    if (i != products[i].id) {
                        count = i;
                        console.log('แทน ', count)
                        break;
                    }
                }
                if (count == 0) {
                    count = products.length;
                }
                // console.log(count)
                return firestore.collection('products').doc(threeDigit(count)).set(product)
                    .then(() => {
                        return "ok"
                    })
            })
    }
}
export const startUpdateProduct = (product) => {
    return (dispatch) => {
        return firestore.collection('products').doc(product.id).update(product)
    }
}
export const startDeleteProduct = (product) => {
    return (dispatch) => {
        return firestore.collection('products').doc(product.id).delete()
    }
}
const threeDigit = (n) => {
    if (n < 10) {
        return '00' + n.toString();
    } else if (n < 100) {
        return '0' + n.toString()
    } else {
        return n.toString();
    }
}

