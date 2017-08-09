import React,{Component} from 'react'
import {connect} from 'react-redux'
import ReactEcharts from 'echarts-for-react';
import {getCountDataByList,getCountDataByUser,getnameList} from '../../actions'
import {Spin} from 'antd'
import Header from '../../components/Header'
import userlist from "../../reducers/userlist";
class Admin extends Component{
    constructor(props) {
        super(props);
        //初始化修改状态属性
        this.state = {
            visible: false,
            activityName:''
        }
    }
    componentWillMount(){
        if(this.props.match.params.type == 'list'){
            this.props.getCountDataByList(this.props.match.params.value)
            this.props.getNameList(this.props.match.params.value)
        }


    }

    render(){

    if (this.props.countData && this.props.userListData){



        if(this.props.countData.data){
            var dateList = this.props.countData.data.map(item => {
                return item.time
            })

            var valueList =
                this.props.match.params.type == "user"?
                    this.props.countData.data.map(item => {
                        return item.listArr
                    }):
                    this.props.countData.data.map(item => {
                        return item.count
                    });

            valueList = valueList.map(item => {
                if(Array.isArray(item)){
                    return item.length
                }else{
                    return item
                }
            });

        }

        if(this.props.userListData.data){

            let userList = (<div>{this.props.userListData.data.map(item => {return item.phoneNumber})}</div>)
        }

        let option = {
            // Make gradient line here
            visualMap: [{
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: 0,
                max: 400
            }],

            title: [{
                left: 'center',
                text: `每日的点击量`
            }],
            tooltip: {
                trigger: 'axis'
            },
            xAxis: [{
                data: dateList
            }],
            yAxis: [{
                splitLine: {show: true}
            }],
            grid: [{
                bottom: '40%'
            }],
            series: [{
                type: 'line',
                showSymbol: true,
                data: valueList
            }]
        };

        return (
            <div>
                <Header/>
                <ReactEcharts
                    option={option}
                    notMerge={true}
                    lazyUpdate={true}
                    theme={"theme_name"}
                    style={{height:450}}
                />
                <div>
                    <h2 style = {{textAlign:'center'}}>点击这条消息的用户</h2>
                    <div style={{textAlign:'center',width:'calc(100% - 20rem)',margin:'2rem auto'}}>
                        {

                            this.props.userListData.data.map (item => {return (<span style={{fontSize:'1.5rem',float:'left',paddingLeft:'2.3rem'}}>{item.phoneNumber}</span>)})

                        }
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div>
                <Header/>
                <div className="loading">
                    <Spin size="large"/>
                </div>
            </div>
            )

    }
    }
}

function mapState(state){
    return {
        countData:state.count.data,
        userListData:state.userlist.data
    }
}

function mapDispatch(dispatch){
    return {
        getCountDataByList(id){
            dispatch(getCountDataByList(id))
        },
        getCountDataByUser(phoneNumber){
          dispatch(getCountDataByUser(phoneNumber))
        },
        getNameList(id){
            dispatch(getnameList(id))
        }
    }
}


export default  connect(mapState,mapDispatch)(Admin)