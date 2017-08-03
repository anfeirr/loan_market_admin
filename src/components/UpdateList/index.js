import React ,{Component} from 'react'
import {Modal,Form} from 'antd'

import UpdateForm from './UpdateForm'

class UpdateList extends Component {
    constructor (){
        super(...arguments)
        this.show = this.show.bind(this)
    }

    show(){
        console.log(this.props.changeId)
    }
    render(){
        const ShowForm = Form.create()(UpdateForm)
        console.log(this.props.changeId)
        return (

            <Modal
                title="更新选项"
                okText="确定"
                onCancel={this.props.onCancel}
                onOk={this.props.onOk}
                visible={this.props.visible}
                footer={false}
    >

                {/*<h1 onClick={this.show}>{this.props.changeId}</h1>*/}

                <ShowForm  id={this.props.changeId}/>

            </Modal>
        )

    }
}


export default UpdateList
