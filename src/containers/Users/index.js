import React,{Component} from 'react'
import { Menu, Icon,Table,Input} from 'antd';
import {connect} from 'react-redux'
import {getUser} from "../../actions/index"
import Header from '../../components/Header'

import './users.css'

const Search = Input.Search;
class Admin extends Component{

    constructor(){
        super(...arguments);
        this.searchTable = this.searchTable.bind(this);
        this.state = {
            users:[],
            searchResult:false
        }
    }
    componentWillMount(){

        this.props.getUserInfo();


    }

    searchTable(e){
        if(e == ""){
            return this.setState({searchResult:false})

        } else if(this.props.users !== undefined) {
            let SearchResult = this.props.users.data.filter(function(item,index){
                return e == item.phoneNumber
            })

            this.setState({users:SearchResult})

        }
        this.setState({searchResult:true})

    }
    render(){

        const columns = [{
            title:"真实姓名",
            dataIndex:'userName',
            key:'userName',
        },{
            title:'电话号码',
            dataIndex:'phoneNumber',
            key:'phoneNumber'
        },{
            title:'联系人',
            dataIndex:'personName',
            key:'personName'
        },{
            title:'工作单位',
            dataIndex:'work_address',
            key:'work_address'
        },{
            title:'居住地址',
            dataIndex:'home_address',
            key:'home_address'
        }];
        if(this.state.searchResult){
            return (
                <div>
                    <Header current="user"/>
                    <Search
                        placeholder="搜索电话号码,搜索空置返回原表"
                        className="search"
                        onSearch={this.searchTable}
                    />
                    <Table className="user_table" columns={columns} dataSource={this.state.users}/>
                </div>
            )
        }

        if(this.props.users !== undefined){

            return (
                <div>
                    <Header current="user"/>
                    <Search
                        placeholder="搜索电话号码,搜索空置返回原表"
                        className="search"
                        onSearch={this.searchTable}
                    />
                    <Table className="user_table" columns={columns} dataSource={this.props.users.data}/>
                </div>
            )
        }

        return <div><Header current="user"/></div>
    }
}


function mapState(state){
    return {
        users:state.user.userInfo
    }
}
function mapDispatch(dispatch){
   return {
       getUserInfo(){
           dispatch(getUser())
       }
   }
}
export default connect(mapState,mapDispatch)(Admin)