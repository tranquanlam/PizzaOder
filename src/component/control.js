import React, { Component } from 'react';
import Product from './product';
import dbPro from './dbPro';

class control extends Component {
    constructor(props) {
        super(props);
        this.state = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            total: 0,
            click: 1
        };
    }

    componentWillMount() {
        if (localStorage.getItem('total') == null) {

            localStorage.setItem('total', '0');
        }
        if (localStorage.getItem('tranquanlam') == null) {
            var b = [];
            localStorage.setItem('tranquanlam', JSON.stringify(b));
        }
        var a = JSON.parse(localStorage.getItem('tranquanlam'));
        a.forEach(element => {
            this.setState({
                [element.id]: element.quatity,
                total: parseFloat(localStorage.getItem('total'))
            })
        });
    }
    getDetele = () => {
        localStorage.setItem('total', '0');
        var b = [];
        localStorage.setItem('tranquanlam', JSON.stringify(b));
        this.setState({
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            total: 0,
            click: 1
        })
        var myNode = document.getElementById("viewPro");
        myNode.innerHTML = '';
    }
    getStatus = (id, price, img) => {
        if (localStorage.getItem('tranquanlam') == null) {
            var b = [];
            localStorage.setItem('tranquanlam', JSON.stringify(b));
        }
        else {
            var obj = { "id": id, "quatity": 0, 'price': price, 'img': img };
            var a = JSON.parse(localStorage.getItem('tranquanlam'));
            var has = false;
            a.forEach(element => {
                if (element.id === obj.id) {
                    has = true;
                    console.log("has");

                }
            });
            if (has === false) {
                var view = document.createElement("img");
                view.setAttribute("src", obj.img.toString());
                view.setAttribute("height", "100");
                view.setAttribute("width", "100");
                view.setAttribute("alt", "Flower");
                view.setAttribute("id", "img__" + obj.id.toString());
                view.setAttribute("class", "img img-thumbnail");
                document.getElementById("viewPro").appendChild(view);
            }
            console.log();
            if (a.length === 0) {
                obj.quatity++;
                a.push(obj);
                var sum = this.state.total + obj.quatity * parseFloat(obj.price);
                this.setState({
                    [obj.id]: obj.quatity,
                    total: sum
                })
                localStorage.setItem('total', sum.toString());
            }
            var yesN = false;
            a.forEach(element => {
                if (element.id === obj.id) {
                    yesN = true;
                }
            });
            if (yesN === true) {
                a.forEach(element => {
                    if (element.id === obj.id) {
                        if (a.length !== 1) {
                            element.quatity++;
                            var sum = parseFloat(localStorage.getItem('total')) + parseFloat(obj.price);
                            localStorage.setItem('total', sum.toString());
                        }
                        this.setState({
                            [element.id]: element.quatity,
                            total: parseFloat(localStorage.getItem('total'))
                        })
                    }
                });
            }
            if (this.state.click > 1) {
                if (a.length === 1 && yesN === true) {
                    a.forEach(element => {
                        if (element.id === obj.id) {
                            element.quatity++;
                            var sum = parseFloat(localStorage.getItem('total')) + parseFloat(obj.price);
                            localStorage.setItem('total', sum.toString());
                            localStorage.setItem('tranquanlam', JSON.stringify(a));
                            this.setState({
                                [element.id]: element.quatity,
                                total: sum
                            })
                        }
                    });
                }
            }
            if (yesN === false) {
                a.push(obj);
                obj.quatity++;
                sum = this.state.total + obj.quatity * parseFloat(obj.price);
                this.setState({
                    [obj.id]: obj.quatity,
                    total: sum
                })
                localStorage.setItem('total', sum.toString());
            }
            localStorage.setItem('tranquanlam', JSON.stringify(a));
            this.setState({
                click: 2
            })

        }
    }
    getXoa = (id, price) => {

        var a = JSON.parse(localStorage.getItem('tranquanlam'));
        var sum = parseFloat(localStorage.getItem('total'))
        var img;
        a.forEach(element => {
            if (element.id === id) {
                if (element.quatity > 0) {
                    element.quatity--;
                    img = element.quatity;
                    sum = parseFloat(sum) - parseFloat(price);
                    this.setState({
                        [element.id]: element.quatity,
                        total: sum
                    })
                    localStorage.setItem('total', sum.toString());
                }
                if (element.quatity === 0) {
                    a.splice((a.indexOf(element.quatity)));
                }
            }
        });
        if (img <= 0) {

            var element = document.getElementById("img__" + id);
            document.getElementById("viewPro").removeChild(element);
        }
        localStorage.setItem('tranquanlam', JSON.stringify(a));
    }
    render() {
        return (
            <div className="addPro">
                <div className="addPro__topInfo">
                    <p className="addPro__topInfo__title">Your Pizza</p>
                    <p className="addPro__topInfo__total">{this.state.total} $</p>
                    <button className="btn btn-warning" onClick={() => this.getDetele()} >Reset Pizza</button>
                </div>
                <div className="addPro__listProduct">
                    {
                        dbPro.map((value, key) => (
                            <Product name={value.name} id={value.id} them={() => this.getStatus(value.id, value.price, value.img)} bot={() => this.getXoa(value.id, value.price)} price={value.price} quatity={this.state[value.id]}></Product>
                        ))
                    }
                    <div className="product row pay">
                        <div className="col-6">
                            <p>Total :</p>
                        </div>
                        <div className="col-6">
                            <p>{this.state.total}</p>
                        </div>
                    </div>
                    <div className="product row pay">
                        <div className="btn btn-primary">Checkout</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default control;