const path = require('path');
const request = require('request-promise');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "jaoyingdb",
        "private_key_id": "2cf451d3de9be259c04fd265f48cfb3982f4b66d",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCuGECaVFsAFX0e\njtkBHJDraGf0zUUN/dzLsR4qRQ0wyeHSCs4tSC5CxJb2HVAxQeuHhCWtfvbnDbZ4\npRyEdX9QvlgfpiYJ82YJ2ZpMMKUbD4gL39tNLqp4+eKrGITg90T5JiFehouiOURP\n9nMkLSIkIInlIf6Blmzc3iGmVquh/LZOORAhjUKBhG8dj7H7zH3b9hz0WPOYhnZU\nX4pmOSCgMBKHOL9nLFcPVpdayl8d/WfyMP1QO4I5UMvXy92kbp5LfZ8ZEIP8IybR\nWvbzd/DFZhuvRR0nlyJ1khSxb+OioyWLAzxpUUfuOIdxtcMgjMYRNKvp/eRDo2+1\n9irThfdbAgMBAAECggEAUUZiNopGF4JwsIjotxOidjv+ODNyVwdagj90QTCOaWX+\nRiQkP9CQRDxp64kgzHYlYlUnj9kTpCdrNeSDLTV7U/MgydmzrXaTfuq3FXWqRrlX\n/o8p3tz32dVy5ARk2G+npBcQggQXAQtyIFCCTXPCmhIUvkNCATZ8KRqMpA6XPt4p\nUOSNenN64rP8BzGdc1nLKFQ6MEjHJFfEfiNlEiwIp9QKW2yME8qIjnjFhSuZdIua\n0BYJ8UWvBP7QApEroZBVIthbcF/00TvWBlsBBNqOEv+75pNEAesUior+hwDFjOn/\n+r+XnDQODym5pHWeAk6OLO4j3r2CfN1Vl7N3ZY2iJQKBgQDmbFkIwsQ1LNTigbFl\nsS2PCwwgoc2/PZV60e5w+4AZqaDkHXW8xAkOOepR++283LdgP+WCavONo9Tp1qXv\n88L/q0aPLTtEmykI4l0T6SsO+no1H2sfCX5pwsv1MWEausoprPrIuwHQJ4P6kcbr\npTKfO6E0mf2h8DfSD09AHOAwBQKBgQDBa0mKcoDMUNeScHhvGXlJ4DGM7vPzUeBN\nwZLWpDvwN8nnvmJ6NwLd7OT9TL7qnz7dXW98/kKrRumoJnKkUvyiQGXMmtShh3gg\nHaWyelqUbKuXQS1Yr+/X+VwUh+H/qMqn5VDr+Fi6bHQsohaoUx81c7S4GvIA6n4Q\n4mXYDvwH3wKBgBoZRZBfdxfKxyYMqIorIkzkZHBBw2sYz5iEtKwpYF4Hv4h26cIC\ntj/dQXQdw9SzbzXApv85m/J8Dv6ZaFwgUQLiZHCNH/xqUqCF+yLpMw5UQolH0LtI\nOQBDpxRTjnsXkxRbWmBoBhGMmD9GSbChGnW8rEqn8nloGvp473IEk0P9AoGAVS4o\nnv46VsCrj2RUxajUT4Kaj9SUPu4p+FRtlHWTqAEJvDOOLwCXFKFFX4Ay/CTRjK+f\nb86SEdgTAuibyF57wADYVDlDtzdv4cTsuiNETOVm1B/yFoK0/8pjkO8eynbNeQ92\nidU/TiqBJz7i95JTxjiEuCe1uE2M42axL2u59sUCgYAYJK41LCTnxEvYSXLSmeQj\nuoxUKhn9CbL3NfUhzUH923BKOJK5epDtDxRP8PWv2k5EkvsrOZw5H/v0CLFXpmiN\n0Vr/LoxocOC75m7IQjqZWYqp8dqJ0ndu4Uqf4SDzqFicru3uUCyURjAPas06qS/h\n8An3kdg5H6D0XeFsNJLn0w==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-leda9@jaoyingdb.iam.gserviceaccount.com",
        "client_id": "105580220196218695728",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-leda9%40jaoyingdb.iam.gserviceaccount.com"
    }),
    databaseURL: 'https://่jaoyingdb.firebaseio.com'
});
var db = admin.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
db.settings(settings);
const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer cjyJdBLbrT7DPv74Xlv9iK4XJgYX++Meh6Ghs5rYulUjNRMsP9rJIVx52ByKT/wD9uCT90kpokfgzEENrYentB2AZ9KjiGcRtDKaaEeafLY3kj5SnX/HpG3m+5ja80dthu5J6h5YIv+pCr7wNPNtiQdB04t89/1O/w1cDnyilFU=`
};
var jsonParser = bodyParser.json();
app.post('/api/linebot', jsonParser, (req, res) => {
    const request = req.body.events[0];
    const msg = request.message.text;
    const userId = request.source.userId;
    const adminRef = db.collection('admins').doc(userId);
    const ownerRef = db.collection('owners').doc(userId);
    let obj = {
        replyToken: request.replyToken,
        messages: []
    };
    // if (request.message.type !== 'text' || request.source.type !== 'group') {
    //}
    if (msg.indexOf('@@admin:') > -1 && msg.split(':').length == 2) {
        adminRef.set({
            userId,
            name: msg.split(':')[1].replace(/\s/g, ''),
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            role: 'admin'
        })
            .then(admin => {
                obj.messages.push({
                    type: 'text',
                    text: `${emoji(0x10002D)}${emoji(0x10002D)} ลงทะเบียน ${msg.split(':')[1]} เป็น Admin เรียบร้อยค่ะ ${emoji(0x10002D)}${emoji(0x10002D)}`
                })
                reply(obj);
            })
    } else if (msg.indexOf('@@owner:') > -1 && msg.split(':').length == 2) {
        adminRef.set({
            userId,
            name: msg.split(':')[1],
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            role: 'owner'
        })
            .then(owner => {

                obj.messages.push({
                    type: 'text',
                    text: `${emoji(0x100058)}${emoji(0x100058)} ลงทะเบียน ${msg.split(':')[1]} เป็น Owner เรียบร้อยค่ะ ${emoji(0x100058)}${emoji(0x100058)}`
                })
                reply(obj);
            })
    } else if (msg.indexOf('@@format') > -1) {
        obj.messages.push({
            type: 'text',
            text: `#n:ชื่อผู้รับสินค้า\n#t:เบอร์โทรศัพท์\n#a:ที่อยู่\n#o:รายการสินค้า\n#b:ชื่อธนาคารหรือCOD\n#p:ยอดโอน\n#f:Facebookลูกค้า\n#l:Lineลูกค้า\n#z:ชื่อเพจหรือLine@`
        })
        reply(obj);
    } else if (msg.indexOf('@@product') > -1) {
        db.collection('products').get()
            .then(snapShot => {
                let pt = `${emoji(0x10005C)}รายการสินค้า${emoji(0x100060)}\n`;
                let pds = [];
                // let price = 0;
                if (msg.split(':').length == 2) {
                    pds = msg.split(':')[1].replace(/\s/g, '').split(',');
                }
                snapShot.forEach(product => {
                    if (pds.length == 0 || pds.indexOf(product.id) > -1)
                        pt += `${product.id} ${product.name},\n`;
                })
                obj.messages.push({
                    type: 'text',
                    text: pt
                })
                reply(obj);
            })
    } else {
        adminRef.get()
            .then(user => {
                if (user.exists) {
                    if (request.source.type == 'group') {
                        const groupId = request.source.groupId;
                        if (msg.indexOf('@@ยกเลิก:') > -1 && msg.split(':').length == 2) {
                            const orderId = msg.split(':')[1];
                            const orderRef = db.collection('orders').doc(orderId);
                            orderRef.get()
                                .then(order => {
                                    if (order.exists) {
                                        if (order.data().cutoff && user.data().role == 'admin') {
                                            obj.messages.push({
                                                type: 'text',
                                                text: `${emoji(0x100035)}ไม่สามารถยกเลิกรายการสั่งซื้อ ${orderId}\nเนื่องจากได้ทำการตัดรอบไปแล้วค่ะ${emoji(0x1000AE)}`
                                            })
                                            reply(obj);
                                        } else {
                                            async function callback() {
                                                for (var p = 0; p < order.data().product.length; p++) {
                                                    await db.collection('products').doc(order.data().product[p].code).get()
                                                        .then(product => {
                                                            const balance = product.data().amount + order.data().product[p].amount;
                                                            db.collection('products').doc(order.data().product[p].code)
                                                                .set({ amount: balance }, { merge: true })
                                                        })
                                                }
                                                await orderRef.delete()
                                                    .then(cancel => {
                                                        obj.messages.push({
                                                            type: 'text',
                                                            text: `${emoji(0x100035)}ยกเลิกรายการสั่งซื้อ ${orderId} เรียบร้อยค่ะ`
                                                        })
                                                        reply(obj);
                                                    })
                                            }
                                            callback();

                                        }
                                    } else {
                                        obj.messages.push({
                                            type: 'text',
                                            text: `${emoji(0x100035)}ไม่มีรายการสั่งซื้อนี้: ${orderId}\nกรุณาตรวจสอบ "รหัสสั่งซื้อ" ค่ะ`
                                        })
                                    }
                                    reply(obj);
                                })
                        } else if (msg.indexOf('#') > -1) {
                            initMsgOrder(msg)
                                .then(resultOrder => {
                                    if (resultOrder.success) {
                                        db.collection('counter').doc('orders').get()
                                            .then(counts => {
                                                const countsData = counts.data();
                                                let no = 1;
                                                let cutoff = countsData.cutoff;
                                                if (countsData.date == yyyymmdd()) {
                                                    no = countsData.no + 1;
                                                }
                                                // else {
                                                //     if (cutoff == true) cutoff = false;
                                                // }
                                                let orderId = yyyymmdd() + '-' + fourDigit(no);
                                                let orderDate = yyyymmdd();
                                                let cutoffDate = countsData.cutoffDate;
                                                let cutoffOk = true;
                                                if (resultOrder.data.id && user.data().role == 'owner') { //edit with id
                                                    orderId = resultOrder.data.id;
                                                    orderDate = resultOrder.data.id.split('-')[0];
                                                } else {
                                                    if (cutoff === false) {
                                                        db.collection('counter').doc('orders').update({ date: orderDate, no })
                                                        // cutoff = false;
                                                    } else {
                                                        cutoffOk = false;
                                                    }

                                                }
                                                if (cutoffOk == true) {
                                                    db.collection('orders').doc(orderId)
                                                        .set(Object.assign({
                                                            userId, groupId,
                                                            admin: user.data().name,
                                                            cutoffDate,
                                                            cutoff,
                                                            tracking: '',
                                                            timestamp: admin.firestore.FieldValue.serverTimestamp(),
                                                            orderDate
                                                        }, resultOrder.data))
                                                        .then(order => {
                                                            db.collection('groups').doc(groupId).set({})
                                                            async function callback() {
                                                                for (var p = 0; p < resultOrder.data.product.length; p++) {
                                                                    await db.collection('products').doc(resultOrder.data.product[p].code).get()
                                                                        .then(product => {
                                                                            const amount = product.data().amount - resultOrder.data.product[p].amount;
                                                                            db.collection('products').doc(resultOrder.data.product[p].code).set({ amount }, { merge: true })
                                                                        })
                                                                }
                                                                await db.collection('orders')
                                                                    .where('cutoffDate', '==', cutoffDate)
                                                                    .where('tel', '==', resultOrder.data.tel)
                                                                    .get()
                                                                    .then(snapShot => {
                                                                        let orders = [];
                                                                        snapShot.forEach(doc => {
                                                                            orders.push({ id: doc.id, ...doc.data() })
                                                                        })
                                                                        const txts = txtListOrders(orders);
                                                                        const l = Math.ceil(txts.length / 2000) * 2000;
                                                                        for (var i = 0; i < l; i += 2000) {
                                                                            obj.messages.push({
                                                                                type: 'text',
                                                                                text: txtListOrders(orders).substr(i, 2000)
                                                                            })
                                                                        }
                                                                    })
                                                                // await  obj.messages.push({
                                                                //     type: 'text',
                                                                //     text: `รหัสสั่งซื้อ: ${orderId}\n${resultOrder.text}`
                                                                // })
                                                                await obj.messages.push({
                                                                    type: 'text',
                                                                    text: `@@ยกเลิก:${orderId}`
                                                                })
                                                                await reply(obj);
                                                            }
                                                            callback();
                                                        })
                                                } else {
                                                    obj.messages.push({ type: `text`, text: `${emoji(0x1000A6)}รายการสั่งซื้อไม่สำเร็จ! เนื่องจากยังไม่ได้เปิดรอบสั่งซื้อ` })
                                                    reply(obj);
                                                }

                                            })

                                    } else {

                                        obj.messages.push({ type: `text`, text: `${emoji(0x1000A6)} รายการสั่งของคุณไม่ถูกต้องค่ะ\nกรุณาตรวจสอบ ${resultOrder.text}` })
                                        reply(obj);
                                    }
                                })

                        }
                    } else {
                        obj.messages.push({
                            type: 'text',
                            text: `คุยในกลุ่มดีกว่านะคะ`
                        })
                        reply(obj);
                    }
                } else {
                    return;
                }
            })
    }
})
app.post('/api/boardcast', jsonParser, (req, res) => {
    const boardcasts = req.body.boardcasts;
    for (var bc = 0; bc < boardcasts.length; bc++) {
        push(boardcasts[bc]);
    }
    return;
})

app.use(express.static(publicPath));
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
});
app.listen(port, () => {
    console.log('Server is up!')
});

const reply = (obj) => {
    return request({
        method: `POST`,
        uri: `${LINE_MESSAGING_API}/reply`,
        headers: LINE_HEADER,
        body: JSON.stringify({
            replyToken: obj.replyToken,
            messages: obj.messages
        })
    });
};
const push = (obj) => {
    return request({
        method: `POST`,
        uri: `${LINE_MESSAGING_API}/push`,
        headers: LINE_HEADER,
        body: JSON.stringify(obj)
    });
};
const initMsgOrder = (txt) => {

    // return db.collection('products').get()
    //     .then(snapShot => {
    let orders = [];
    // snapShot.forEach(product => {
    //     products.push({ id: product.id, ...product.data() })
    // })
    let data = Object.assign(...txt.split('#').filter(f => f != "")
        .map(m => {
            if (m.split(':').length == 2) {
                const dontReplces = ["name", "fb", "bank", "addr"];
                let key = m.split(':')[0].toLowerCase();
                switch (key) {
                    case 'n': key = 'name'; break;
                    case 't': key = 'tel'; break;
                    case 'a': key = 'addr'; break;
                    case 'o': key = 'product'; break;
                    case 'b': key = 'bank'; break;
                    case 'p': key = 'price'; break;
                    case 'f': key = 'fb'; break;
                    // case 'l': key = 'fb'; break;
                    // case 'z': key = 'page'; break;
                    // case 'd': key = 'delivery'; break;
                    // case 'cutoffdate': key = 'cutoffDate'; break;
                    default: key;
                }
                let value = m.split(':')[1];
                if (!dontReplces.includes(key)) value = value.replace(/\s/g, '');
                if (key !== 'addr' && key !== 'fb') value = value.replace(/\n/g, '').toUpperCase();
                if (key == 'tel') {
                    value = value.replace(/\D/g, ''); //เหลือแต่ตัวเลข
                    if (value.length != 10) {
                        value = `${emoji(0x1000A6)}เบอร์โทรไม่ครบ 10 หลักundefined`
                    }
                }
                if (key !== 'price') {
                    value = value.trim();
                    if (key == 'product') {
                        const str = value;
                        // let orders = [];
                        let arr = str.split(',');
                        for (var a in arr) {
                            if (arr[a].split('=').length == 2) {
                                const code = arr[a].split('=')[0].toUpperCase();
                                const amount = Number(arr[a].split('=')[1].replace(/\D/g, ''));
                                const orderIndex = orders.findIndex(f => f.code == code);
                                if (orderIndex > -1 && amount > 0) {
                                    orders[orderIndex]['amount'] = orders[orderIndex]['amount'] + amount
                                } else {
                                    orders.push({
                                        code,
                                        amount,
                                        name: ''
                                    })
                                }
                            } else {
                                const orderIndex = orders.findIndex(f => f.code == 'สินค้า');
                                if (orderIndex > -1) {

                                } else {
                                    orders.push({
                                        code: `${emoji(0x1000A6)}รหัสสินค้าไม่ถูกต้อง`,
                                        amount: 'undefined'
                                    })
                                }
                            }
                        }
                        value = orders;
                    } else if (key == 'name' || key == 'fb') {
                        if (value.length < 2) {
                            value = `${emoji(0x1000A6)}undefined`;
                        }
                    } else if (key == 'bank') {
                        if (value.match(/\d{2}\.\d{2}/g) == null || value.match(/[a-zA-Z]+/g, '') == null) {
                            value = `${emoji(0x1000A6)}undefined`;
                        }
                    }
                } else {
                    value = Number(value.replace(/\D/g, ''));
                }
                return { [key]: value };
            }
        }));
    const refs = orders.map(order => db.collection('products').doc(order.code));
    return db.getAll(...refs)
        .then(snapShot => {
            let products = [];
            snapShot.forEach(doc => {
                if (doc.exists)
                    products.push({ id: doc.id, ...doc.data() })
            })
            for (var order in data.product) {
                const code = data.product[order]['code'];
                const amount = data.product[order]['amount'];
                const product = products.find(f => f.id === data.product[order]['code'])
                if (product) {
                    if (product.amount >= amount) {
                        data.product[order]['name'] = product.name;
                        data.product[order]['cost'] = product.cost || 0;
                        data.product[order]['price'] = product.price || 0;
                    } else {
                        data.product[order]['code'] = `${emoji(0x1000A6)}undefined` + code;
                        data.product[order]['name'] = 'เหลือเพียง';
                        data.product[order]['amount'] = product.amount;
                    }
                } else {
                    data.product[order]['code'] = `${emoji(0x1000A6)}รหัส` + code;
                    data.product[order]['name'] = 'ไม่มีในรายการสินค้า';
                    data.product[order]['amount'] = 'undefined';
                }
            }
            let text = formatOrder(data);
            const indexUndefined = text.indexOf('undefined');
            let success = true;
            if (indexUndefined > -1) {
                // const t = text.substring(0, indexUndefined - 1).split(' ');
                // text = `${emoji(0x1000A6)} รายการสั่งของคุณไม่ถูกต้องค่ะ\nกรุณาตรวจสอบ ${t[t.length - 1]}`;
                success = false;
            }
            return { text: text.replace(/undefined/g, ''), success, data };
        })
}
const formatOrder = (data) => {
    return `
ชื่อ: ${data.name ? data.name : `${emoji(0x1000A6)}undefined`} 
เบอร์โทร: ${data.tel ? data.tel : `${emoji(0x1000A6)}undefined`}  
ที่อยู่: ${data.addr ? data.addr : `${emoji(0x1000A6)}undefined`} 
สินค้า: ${data.product
            ? data.product.map((p, i) => '\n' + p.code + ':' + p.name + ' ' + p.amount + (p.amount == 'undefined' ? '' : 'ชิ้น '))
            : `${emoji(0x1000A6)}undefined`} 
ธนาคาร: ${data.bank} 
ยอดชำระ: ${data.price ? formatMoney(data.price, 0) + ' บาท' : `${emoji(0x1000A6)}undefined`} 
FB: ${data.fb ? data.fb : `${emoji(0x1000A6)}undefined`} `;
}
const txtListOrders = (orders) => {
    const len = orders.length - 1;
    return 'ลูกค้า: ' + orders[len].name +
        '\nเบอร์โทร: ' + orders[len].tel +
        '\nที่อยู่: ' + orders[len].addr +
        '\nFB: ' + orders[len].fb +
        '\nยอดรวม: ' + formatMoney(orders.map(order => order.price).reduce((le, ri) => le + ri), 0) + ' บาท' +
        `\n===รายการสั่งซื้อ===` + orders.map((order, i) => {
            return `\n\nครั้งที่ #` + (i + 1) + ' ' + order.id +
                order.product.map(product => {
                    return '\n' + product.code + ': ' + product.name + ' ' + product.amount + ' ชิ้น'.replace(/,/g, '')
                }) + '\nยอดโอน' + order.bank + ' ' + formatMoney(order.price, 0) + ' บาท'.replace(/,/g, '')
                + '\n---------------'
        }) +
        `\n\n(โปรดอ่านทุกบรรทัด เพื่อผลประโยชน์ตัวท่านเอง)` +
        `\n1.กรุณาตรวจสอบรายการสั่งซื้อด้วยนะคะ ถ้าไม่ถูกต้องแจ้งแอดมินให้แก้ไขทันที หากจัดส่งแล้วจะไม่สามารถแก้ไขได้ค่ะ` +
        `\n2.แจ้งเลขพัสดุทางอินบล็อคเท่านั้น Kerry 1-3 วัน (แล้วแต่พื้นที่นั้นๆ) ค่ะ` +
        `\n3.อย่าลืมส่งรีวิวสวยๆกลับมา..ลุ้นทองทุกเดือน!!` +
        `\n4.หากลูกค้าเจอสินค้าตำหนิสามารถส่งกลับมาเปลี่ยนทางร้านได้ไม่เกิน 2-4 วัน ในสภาพเดิม ไม่ซัก ไม่แกะป้าย นะคะ!!...หากเกินระยะเวลาที่กำหนดทางร้านจะไม่รับเปลี่ยนทุกกรณีคะ` +
        `\n5.เลขพัสดุตรวจสอบได้ที่ลิ้งนี้นะคะ https://bot-jaoying.herokuapp.com`
}
const formatMoney = (amount, decimalCount = 2, decimal = ".", thousands = ",") => {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
};
const yyyymmdd = () => {
    function twoDigit(n) { return (n < 10 ? '0' : '') + n; }
    var now = new Date();
    return '' + now.getFullYear() + twoDigit(now.getMonth() + 1) + twoDigit(now.getDate());
}
const fourDigit = (n) => {
    if (n < 10) {
        return '000' + n.toString();
    } else if (n < 100) {
        return '00' + n.toString();
    } else if (n < 1000) {
        return '0' + n.toString()
    } else {
        return n.toString();
    }
}
const emoji = (hex) => { return String.fromCodePoint(hex) };