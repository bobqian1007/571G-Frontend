import {connect} from "umi";
import {Button, Col, Form, Input, Row} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React from "react";
const {Item: FormItem} = Form;
const SearchForm = ({requestList,loading,dispatch}) => {
    const [form] = Form.useForm();
    const {campaignAddress} = requestList
    const changeSearchedAddress = () => {
        form.validateFields().then((values) => {
            dispatch({
                type: 'requestList/save',
                payload: values
            })
        })
    }
    const layout = {
        labelCol: {span: 6},
        wrapperCol: {span: 18},
    }
    return (
        <Row>
            <Form form={form}
                  {...layout}
                  onFinish={changeSearchedAddress}>

                <Col span={24}>
                    <FormItem label="Campaign Address" colon={true} initialValue={campaignAddress}
                              rules={
                                  [{required: true}]
                              } name={"campaignAddress"} valuePropName={'value'}
                    ><Input allowClear style={{width:500}} defaultValue={campaignAddress}/></FormItem>
                </Col>
                <Col span={4}>
                    <Button type="primary" color={"black"} onClick={() => changeSearchedAddress()} loading={loading.effects['requestList/queryRequestList']}>Search</Button>
                </Col>
            </Form>
        </Row>
    )
}

export default connect(({requestList, loading}) => ({
    requestList,
    loading,
}))(SearchForm);