import React from 'react';
import { connect } from 'react-redux';
import { startGetStock, startClearNameAmount0, startClearStock } from '../../actions/widget/stock';
import { startUpdateProduct, startDeleteProduct } from '../../actions/widget/product';
import Money from '../../selectors/money';
import MdEdit from 'react-icons/lib/md/edit';
import NumberFormat from 'react-number-format';
export class StockPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stock: props.stock,
            auth: props.auth,
            id: '',
            name: '',
            size: '',
            sale: 0,
            amount: 0,
            cost: 0,
            price: 0,
            action: false,
            isLoading: '',
            filter: '',
            valueDel: 0
        }
        this.props.startGetStock();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.stock != this.state.stock) {
            this.setState({ stock: nextProps.stock, valueDel: nextProps.stock.length - 1 });
        }
        if (nextProps.auth != this.state.auth) {
            this.setState({ auth: nextProps.auth });
        }
    }
    onNameChange = (e) => {
        const name = e.target.value;
        this.setState({ name })
    }
    onSizeChange = (e) => {
        let size = e.target.value.replace(/\D/g, '');
        if (size.length == 6) {
            let newSize = '';
            for (let i = 0; i < size.length; i++) {
                newSize += size.charAt(i);
                if ((i + 1) % 2 == 0 && i < 5) {
                    newSize += '-';
                }
            }
            this.setState({ size: newSize })
        } else if (size.length < 6) {
            this.setState({ size })
        }
    }
    onFilterChange = (e) => {
        const filter = e.target.value.replace(/\D/g, '');
        this.setState({ filter })
    }
    onPriceChange = (e) => {
        const price = e.target.value.replace(/\D/g, '');
        if (!isNaN(price)) {
            this.setState({
                price: Number(price)
            })
        } else {
            console.log(price)
        }
    }
    onCostChange = (e) => {
        const cost = e.target.value.replace(/\D/g, '');
        if (!isNaN(cost)) {
            this.setState({
                cost: Number(cost)
            })
        } else {
            console.log(cost)
        }
    }
    onSaleChange = (e) => {
        const sale = e.target.value.replace(/\D/g, '');
        if (!isNaN(sale)) {
            this.setState({
                sale: Number(sale)
            })
        } else {
            console.log(sale)
        }
    }
    onAmountChange = (e) => {
        const amount = e.target.value.replace(/\D/g, '');
        if (!isNaN(amount)) {
            this.setState({
                amount: Number(amount)
            })
        } else {
            console.log(amount)
        }
    }
    onActionClick = (action, id) => {
        const data = this.state.stock.find(f => f.id == id)
        // if (!action) {
        //     this.setState({ amount: 0, cost: 0, price: 0 })
        // }
        this.setState({
            id,
            action,
            ...data
        })
    }
    handleSelectAll = (e) => {
        e.target.select()
    }
    onUpdateClick = () => {
        if (this.state.id != '') {
            this.setState({ isLoading: 'is-loading' })
            this.props.startUpdateProduct({
                id: this.state.id,
                name: this.state.name,
                size: this.state.size,
                amount: this.state.amount,
                cost: this.state.cost,
                sale: this.state.sale,
                price: this.state.price
            }).then(() => {
                this.setState({ isLoading: '', action: false, id: '', name: '', size: '', amount: 0, price: 0, sale: 0, cost: 0 })
            })
        } else {
            alert('กรุณาเลือกใหม่อีกรอบ')
        }
    }
    onDeleteClick = () => {
        if (this.state.id != '' && this.state.amount == 0) {
            if (confirm('ยืนยันต้องการลบสินค้านี้ใช่หรือไม่?')) {
                this.setState({ isLoading: 'is-loading' })
                this.props.startDeleteProduct({
                    id: this.state.id
                }).then(() => {
                    this.setState({ isLoading: '', action: false, id: '', name: '', size: '', amount: 0, price: 0, sale: 0, cost: 0 })
                })
            }
        } else {
            alert('สินค้านี้ยังมีสต็อกคงเหลือไม่สามารถลบได้')
        }
    }
    onClearNameClick = () => {
        if (confirm('คุณแน่ใจที่จะล้างชื่อสินค้าทั้งหมดที่มีจำนวนเหลือเท่ากับ 0 ?')) {
            this.props.startClearNameAmount0()
                .then((res) => {
                    alert('ล้างชื่อสินค้าเรียบร้อย!')
                })

        }
    }
    onClearStockClick = () => {
        if (confirm('คุณแน่ใจที่จะล้างรายการสินค้า รหัส ' + this.threeDigit(this.state.valueDel) + ' ขึ้นไป!?')) {
            this.props.startClearStock(this.threeDigit(this.state.valueDel))
                .then((res) => {
                    alert('ล้างสินค้าเรียบร้อย!')
                })
        }
    }
    threeDigit = (n) => {
        if (n < 10) {
            return '00' + n.toString();
        } else if (n < 100) {
            return '0' + n.toString()
        } else {
            return n.toString();
        }
    }

    render() {
        let sumCost = 0;
        let sumAmount = 0;
        return (
            <section className="hero">
                <div className="hero-head">
                    <div className="container">
                        <h2 className="title">สินค้าคงคลัง</h2>
                    </div>
                </div>
                <div className="hero-body">
                    <div className="level">
                        <div className="level-left">
                            <div className="level-item">
                                <div className="field">
                                    <div className="control">
                                        <button className="button is-info"
                                            onClick={this.onClearNameClick}>ล้างชื่อสินค้า</button>
                                    </div>
                                </div>
                            </div>
                            <div className="level-item">
                                <div className="field is-grouped">
                                    <div className="control">
                                        <button className="button is-danger"
                                            onClick={this.onClearStockClick}>ล้างมากกว่า&gt;&gt;&gt;</button>
                                    </div>
                                    <div className="control">
                                        <NumberFormat className="input is-rounded has-text-right" thousandSeparator={true}
                                            value={this.state.valueDel}
                                            onFocus={this.handleSelectAll}
                                            onValueChange={(values) => {
                                                const { formattedValue, value, floatValue } = values;
                                                // formattedValue = $2,223
                                                // value ie, 2223
                                                this.setState({ valueDel: floatValue })
                                            }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                <div className="field">
                                    <div className="control">
                                        <input className="input has-text-centered" type="text" placeholder="จำนวน"
                                            value={this.state.filter}
                                            onChange={this.onFilterChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <table className="table is-fullwidth is-striped is-narrow">
                        <thead>
                            <tr>
                                {/* <th className="has-text-centered">ลำดับ</th> */}
                                <th className="has-text-left">รหัส</th>
                                <th className="has-text-left">ชื่อสินค้า</th>
                                <th className="has-text-left">ขนาด</th>
                                <th className="has-text-right">COST</th>
                                <th className="has-text-right">SALE</th>
                                <th className="has-text-right">ราคา</th>
                                <th className="has-text-right">คงเหลือ</th>
                                {this.state.auth.role == 'owner' && (< th className="has-text-right">จัดการ</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.stock.sort((a, b) => {
                                return Number(a.id) > Number(b.id) ? 1 : -1
                            }).filter(f => f.amount == Number(this.state.filter) || this.state.filter == '').map((st, i) => {
                                sumCost += st.cost * st.amount;
                                sumAmount += st.amount;
                                if (this.state.id !== st.id) {
                                    return <tr key={st.id}>
                                        <td className="has-text-left">{st.id}</td>
                                        <td className="has-text-left">{st.name}</td>
                                        <td className="has-text-centered">{st.size}</td>
                                        <td className="has-text-right">JY{Money(st.cost, 0)}</td>
                                        <td className="has-text-right">{Money(st.sale, 0)}</td>
                                        <td className="has-text-right">{Money(st.price, 0)}</td>
                                        <td className="has-text-right">{Money(st.amount, 0)}</td>
                                        <td className="has-text-right">
                                            <a className="button is-outlined"
                                                onClick={() => { this.onActionClick(true, st.id) }}>
                                                <span>แก้ไข</span>
                                                <span className="icon is-small">
                                                    <MdEdit />
                                                </span>
                                            </a>
                                        </td>
                                    </tr>;
                                } else {
                                    return <tr key={st.id}>
                                        <td className="has-text-left">{st.id}</td>
                                        <td className="has-text-left">
                                            <div className="control">
                                                <input type="text" name={this.state.id}
                                                    className="input is-rounded has-text-left"
                                                    placeholder="ชื่อสินค้า"
                                                    value={this.state.name}
                                                    onChange={this.onNameChange}
                                                />
                                            </div>
                                        </td>
                                        <td className="has-text-left">
                                            <div className="control">
                                                <input type="text" name={this.state.id}
                                                    className="input is-rounded has-text-left"
                                                    placeholder="ขนาด"
                                                    value={this.state.size}
                                                    onChange={this.onSizeChange}
                                                />
                                            </div>
                                        </td>
                                        <td className="has-text-right">
                                            <div className="control">
                                                <input type="text" name={this.state.id}
                                                    className="input is-rounded has-text-right"
                                                    placeholder="COST"
                                                    onFocus={this.handleSelectAll}
                                                    value={Money(this.state.cost, 0)}
                                                    onChange={this.onCostChange}
                                                />
                                            </div>
                                        </td>
                                        <td className="has-text-right">
                                            <div className="control">
                                                <input type="text" name={this.state.id}
                                                    className="input is-rounded has-text-right"
                                                    placeholder="ราคา"
                                                    onFocus={this.handleSelectAll}
                                                    value={Money(this.state.sale, 0)}
                                                    onChange={this.onSaleChange}
                                                />
                                            </div>
                                        </td>
                                        <td className="has-text-right">
                                            <div className="control">
                                                <input type="text" name={this.state.id}
                                                    className="input is-rounded has-text-right"
                                                    placeholder="ราคา"
                                                    onFocus={this.handleSelectAll}
                                                    value={Money(this.state.price, 0)}
                                                    onChange={this.onPriceChange}
                                                />
                                            </div>
                                        </td>
                                        <td className="has-text-right">
                                            <div className="control">
                                                <input type="text" name={this.state.id}
                                                    className="input is-rounded has-text-right"
                                                    placeholder="จำนวน"
                                                    onFocus={this.handleSelectAll}
                                                    value={Money(this.state.amount, 0)}
                                                    onChange={this.onAmountChange}
                                                />
                                            </div>
                                        </td>
                                        <td className="has-text-right">
                                            <div className="field is-grouped">
                                                <p className="control">
                                                    <a className={`button is-link ${this.state.isLoading}`}
                                                        onClick={this.onUpdateClick}>
                                                        บันทึก
                                                    </a>
                                                </p>
                                                <p className="control">
                                                    <a className={`button ${this.state.isLoading}`}
                                                        onClick={() => { this.onActionClick(false, '') }}>
                                                        ยกเลิก
                                                    </a>
                                                </p>
                                                <p className="control">
                                                    <a className={`button is-danger ${this.state.isLoading}`}
                                                        onClick={this.onDeleteClick}>
                                                        ลบ
                                                    </a>
                                                </p>
                                            </div>
                                        </td>
                                    </tr>;
                                }

                                {/*((this.state.id !== st.id) && this.state.auth.role == 'owner') && (
                                        <td className="has-text-right">
                                            <button
                                                className="button is-small"
                                                onClick={() => { this.onActionClick(true, st.id) }}>
                                                ปรับสต็อก
                                        </button>
                                        </td>
                                    )}
                                    { {((this.state.id === st.id) && this.state.auth.role == 'owner') && (
                                        <td className="has-text-right">
                                            <div className="field has-addons has-addons-right">
                                                <div className="control">
                                                    <a className="delete is-default is-larg"
                                                        onClick={() => { this.onActionClick(false, '') }}>
                                                        ปิด
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="field has-addons has-addons-right">
                                                <div className="control">
                                                    <button className={`button is-success ${this.state.isLoading}`}
                                                        onClick={() => { this.onStockClick('plus') }}>
                                                        +</button>
                                                </div>
                                                <div className="control">
                                                    <input type="text" name={this.state.id}
                                                        className="input is-rounded has-text-right"
                                                        onFocus={this.handleSelectAll}
                                                        value={Money(this.state.amount, 0)}
                                                        onChange={this.onStockChange}
                                                    />
                                                </div>
                                                <div className="control">
                                                    <button className={`button is-danger ${this.state.isLoading}`}
                                                        onClick={() => { this.onStockClick('minus') }}>
                                                        -</button>
                                                </div>

                                            </div>
                                        </td>
                                    )} */}

                            })
                            }
                            <tr>
                                <td className="has-text-centered" colSpan={3}>รวม</td>
                                <td className="has-text-right">JY{Money(sumCost, 0)}</td>
                                <td></td>
                                <td></td>
                                <td className="has-text-right">{Money(sumAmount, 0)}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section >
        )
    }
}
const mapStateToProps = (state, props) => ({
    stock: state.stock,
    auth: state.auth
});
const mapDispatchToProps = (dispatch, props) => ({
    startGetStock: () => dispatch(startGetStock()),
    startClearNameAmount0: () => dispatch(startClearNameAmount0()),
    startClearStock: (ids) => dispatch(startClearStock(ids)),
    startUpdateProduct: (product) => dispatch(startUpdateProduct(product)),
    startDeleteProduct: (product) => dispatch(startDeleteProduct(product))
});
export default connect(mapStateToProps, mapDispatchToProps)(StockPage);