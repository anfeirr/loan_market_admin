import React,{Component} from 'react'
import { Input, Icon,Table,Spin,Modal,Form, Select, InputNumber,Switch, Radio, Slider, Button, Upload} from 'antd';
import {connect} from 'react-redux'
import {setForm} from '../../actions'


const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


class UpdateForm extends Component{


    constructor(){
        super(...arguments)
        this.normFile = this.normFile.bind(this)
        this.FormSubmit = this.FormSubmit.bind(this)
        let imgobj = this.props.itemData.data.filter( item => {

            return item.id == this.props.id

        });
        let imgurl = imgobj[0]?imgobj[0].icon:null;
        console.log(imgurl)

        this.state = {
            itemData:[{name:""}],
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: -1,
                name: 'init.png',
                status: 'done',
                url: `../uploads/${imgurl}`,
            }],
        };


        if(this.props.itemData && this.props.id != -1){
            this.setState({itemData:this.props.itemData.data.filter((item) => {
                return item.id == this.props.id
            })})
        }

    }


    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        console.log(this.state.fileList);
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList })


    normFile (e) {

        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    }


    FormSubmit (e){
        this.props.ok()
        e.preventDefault();
        console.log(this.state.url)
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.sendFrom({...values,id:this.props.id})
            }
        });


        window.location.href = `/lists/small`
    }

    componentWillMount(){
            if(this.props.itemData && this.props.id != -1){
                this.setState({itemData:this.props.itemData.data.filter((item) => {
                    return item.id == this.props.id
                })})
            }
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        if(this.props.itemData.data){
            return (
                <Form onSubmit={this.FormSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="修改名称"
                    >
                        {getFieldDecorator('name',{
                            rules:[
                                {required:true,message:'请填写名称'}
                            ],
                            initialValue:`${this.state.itemData[0].name}`
                        })(
                            <Input  placeholder="请填写名称"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="选择类型"
                        hasFeedback
                    >
                        {getFieldDecorator('type', {
                            rules: [
                                { required: true, message: '必须选择一个' },
                            ],
                            initialValue:
                                `${
                                    this.state.itemData[0].type == 1
                                        ? '小额贷款'
                                        :this.state.itemData[0].type == 2
                                        ?'中额贷款'
                                        :this.state.itemData[0].type == 3
                                            ?'大额贷款'
                                            :this.state.itemData[0].type == 4
                                                ?'待回收':
                                                '出错了'
                                    }`
                        })(
                            <Select placeholder="请选择一个类型">
                                <Option value="small">小额贷款</Option>
                                <Option value="middle">中额贷款</Option>
                                <Option value="large">大额贷款</Option>
                            </Select>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="修改标签"
                    >
                        {getFieldDecorator('tag', {
                            rules: [
                                { required: true, message: '请添加1-3个标签', type: 'array' },
                            ],
                            initialValue:this.state.itemData[0].tag
                        })(
                            <Select mode="multiple" placeholder="请添加标签">
                                <Option value="运营商">运营商</Option>
                                <Option value="通过高">通过高</Option>
                                <Option value="活动中">活动中</Option>
                            </Select>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="修改时间"
                    >
                        {getFieldDecorator('time',{
                            rules:[
                                {required:true,message:'请填写时间'}
                            ],
                            initialValue:this.state.itemData[0].time
                        })(
                            <Input  placeholder="请填写时间"/>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="修改金额"
                    >
                        {getFieldDecorator('money',{
                            rules:[
                                {required:true,message:'请填写金额'}
                            ],
                            initialValue:this.state.itemData[0].money

                        })(
                            <Input  placeholder="请填写金额"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="修改网址"
                    >
                        {getFieldDecorator('url',{
                            rules:[
                                {required:true,message:'请填写网址'}
                            ],
                            initialValue:this.state.itemData[0].href
                        })(
                            <Input
                                style={{ width: 283 }}
                                placeholder="请输入网址"
                                defaultValue="mysite"
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="icon"
                    >
                        <div className="dropbox">
                            {getFieldDecorator('icon', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                            })(
                                <div>
                                    <Upload
                                        name="files"
                                        action="/upload"
                                        method="post"
                                        enctype="multipart/form-data"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={this.handlePreview}
                                        onChange={this.handleChange}

                                    >
                                        {fileList.length >= 1 ? null : uploadButton}

                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div>
                            )}
                        </div>
                    </FormItem>

                    <FormItem
                        wrapperCol={{ span: 12, offset: 16 }}
                    >
                        <Button type="primary" htmlType="submit">确认更新</Button>
                    </FormItem>
                </Form>)
        }


    }

}

function mapState(state){
    return {
        itemData:state.list.listInfo
    }
}

function mapDispatch (dispatch){
    return {
        sendFrom(data){
            dispatch(setForm(data))
        }
    }
}
export default connect(mapState,mapDispatch)(UpdateForm)



