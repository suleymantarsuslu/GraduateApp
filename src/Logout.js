import React, { Component } from 'react'

export default class Logout extends Component {
    render() {
        localStorage.clear();
        return (
            <div>
                Çıkış Yaptınız!
            </div>
        )
    }
}
