import React ,{Component} from 'react'
import Header from '../../components/Header'
import { Menu, Button,Icon,Table,Spin,Radio,Form, Select} from 'antd';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {getList,deleteById} from '../../actions/'

import UpdateList from '../../components/UpdateList'
import './lists.css'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Lists extends Component {

    constructor(){
        super(...arguments);

        this.changeTable = this.changeTable.bind(this);
        this.Update = this.Update.bind(this);
        this.onCancelModal = this.onCancelModal.bind(this)
        this.onOkModal = this.onOkModal.bind(this)
        this.Delete = this.Delete.bind(this)
        this.state = {
            type:null,
            visible:true,
            filterList:[],
            showModal:false,
            ModalChangeId:0,
            ModalDeleteId:0
        };
    }


    changeTable(e){

        this.setState({type:e.key})

    }
    Update(e){
        this.setState({showModal:true});
        this.setState({ModalChangeId:e.target.id});
        return e.target.id

    }
    Delete(e){
        console.log(e.target.id)
        this.props.deleteListItemById(e.target.id)
        return e.target.id
    }
    handleSubmit (e)  {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    normFile (e)  {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
    onCancelModal(){
        this.setState({showModal:false})
    }
    onOkModal(){
        this.setState({showModal:false})
    }
    componentWillMount(){

        this.props.getListsInfo();


        switch (this.props.match.params.id){
            case "small":
                return this.setState({type:'1'})
            case "middle":
                return this.setState({type:'2'})
            case "large":
                return this.setState({type:'3'})
            default:
                return this.setState({type:null})
        }
    }

    render(){
        const columns = [{
            title:'ICON',
            dataIndex:'icon',
            key:'icon',
            render: src => <img
                style={
                    {
                        border:'1px solid #f0f0f0',
                        borderRadius:'5px'
                    }
                }
                width="45px"
                height="45px"
                src={'/uploads/'+ src}
            />
        },{
            title:'名称',
            dataIndex:'name',
            key:'user',
        },{
            title:'时间',
            dataIndex:'time',
            key:'time'
        },{
            title:'金额',
            dataIndex:'money',
            key:'money'
        },{
            title:'标签',
            dataIndex:'tag',
            key:'tag',
            render: text => {
                   return  text.map( (item,index) =>
                       <span>
                            <span className="ant-divider" />
                           <Icon type="tag"/>
                            <span key={index}>{item}</span>
                            <span className="ant-divider" />
                       </span>
            )}

        },{
            title:'类型',
            dataIndex:'type',
            key:'type',
            render: text => {
                switch (text){
                    case 1:
                    return <span>小额</span>
                    case 2:
                    return <span>中额</span>
                    case 3:
                    return <span>大额</span>
                    default:
                    return <span>错误</span>
                }

            }
        },{
            title:'链接',
            dataIndex:'href',
            key:'href',
            render: text => <a href={text}>{text}</a>,
        },{
            title:"功能",
            dataIndex:'function',
            key:'function',
            render: (text, record) => (
                <span>
                    <a href="#"
                       id={record.id}
                       onClick={this.Update}
                    >
                        <Icon type="rollback"/>更新
                    </a>
                    <span className="ant-divider" />
                    <a href="?" id={record.id} onClick={this.Delete}><Icon type="delete"/>删除</a>
                    <span className="ant-divider" />
                    {/*<a href="#" className="ant-dropdown-link">*/}
                    {/*更多选项<Icon type="down" /></a>*/}
                </span>
            ),
        }];


        return (
            <div style={{minHeight:600}}>
                <Header current="list"/>
                <Menu
                    mode="inline"
                    style={{ width: 140,minHeight:600,float:'left' }}
                    defaultSelectedKeys={[this.state.type]}
                    onClick = {this.changeTable}
                >
                    <Menu.Item key="1">
                        <Link to="/lists/small">小额贷款列表</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/lists/middle">中额贷款列表</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/lists/large">大额贷款列表</Link>
                    </Menu.Item>
                </Menu>
                <span className="add_button" id={-1} onClick={this.Update}>增加项目</span>
                {
                    this.props.listInfo
                        ?<div>
                            <Table
                                className="list_table"
                                columns={columns}
                                dataSource={this.props.listInfo.data.filter((item)=> {
                                    return  item.type == this.state.type
                                })}
                            />
                        </div>
                        :
                        <div className="loading"><Spin size="large"/></div>
                }
                <UpdateList
                        visible={this.state.showModal}
                        onCancel={this.onCancelModal}
                        onOk={this.onOkModal}
                        changeId={this.state.ModalChangeId}
                    />


            </div>
        )
    }
}

function mapState(state){
    return {
        listInfo:state.list.listInfo
    }
}

function mapDispatch(dispatch){
    return {
        getListsInfo(){
            dispatch(getList())
        },
        deleteListItemById(id){
            dispatch(deleteById(id))
        }
    }
}

export default connect(mapState,mapDispatch)(Lists)