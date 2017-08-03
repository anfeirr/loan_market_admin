import React ,{Component} from 'react'
import { Menu, Icon} from 'antd';
import {Link} from 'react-router-dom'
import './header.css'


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Header extends Component{
    state = {
        current: 'list',
    };
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    render(){
        return (
            <div>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={this.props.current}
                    mode="horizontal">
                    <Menu.Item key="user">
                        <Link to="/"><Icon type="contacts" />人员信息查看</Link>
                    </Menu.Item>
                    <Menu.Item key="list">
                        <Link to="/lists/small"><Icon type="schedule"/>贷款列表管理</Link>
                    </Menu.Item>
                    <Menu.Item key="admin" className="admin-login-out">
                        {/*<button className="login-out-button"t>退出</button>*/}
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}


export  default  Header