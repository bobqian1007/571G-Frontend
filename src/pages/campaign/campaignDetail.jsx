import {connect} from "umi";
import {Button, Card, Col, Divider, Form, InputNumber, Row} from "antd";
import React from "react"
import {PlusOutlined} from "@ant-design/icons";
const {Item: FormItem} = Form;
const { Meta } = Card;
import { Link } from 'umi';
const CampaignDetail = ({campaignDetail,loading,dispatch}) => {
    const {address,minimumContribution,balance,requestsCount,approversCount,manager} = campaignDetail
    const [form] = Form.useForm();
    const layout = {
        labelCol: {span: 6},
        wrapperCol: {span: 18},
    }
    const linkToRequests =
        <Link to={"/requests/"+address}>View Requests</Link>

    const items = [
        {
            value: manager,
            meta: "Address of Manager",
            description:
                "The manager created this campaign and can create requests to withdraw money",
        },
        {
            value: minimumContribution,
            meta: "Minimum Contribution (wei)",
            description:
                "You must contribute at least this much wei to become an approver",
        },
        {
            value: requestsCount,
            meta: "Number of Requests",
            description:
                "A request tries to withdraw money from the contract. Requests must be approved by approvers",
        },
        {
            value: approversCount,
            meta: "Number of Approvers",
            description:
                "Number of people who have already donated to this campaign",
        },
        {
            value: web3.utils.fromWei(balance, "ether"),
            meta: "Campaign Balance (ether)",
            description:
                "The balance is how much money this campaign has left to spend.",
        },
    ];
    const onFinish = () => {
        form.validateFields().then((values) => {
            dispatch({
                type: 'compaignList/createTestCase',
                payload: values
            })
        })
    }
    return (
        <>
            <Row>
                <Form form={form}
                      {...layout}
                      initialValues={record}
                      onFinish={onFinish}>
                    <Col span={16}>
                        <FormItem label="Contribute Amount" colon={true} initialValue={parseInt(minimumContribution)}
                                  rules={
                                      [{required: true}]
                                  } name={"amount"} valuePropName={'value'}
                        ><InputNumber min={parseInt(minimumContribution)} defaultValue={parseInt(minimumContribution)} /></FormItem>
                    </Col>
                    <Col span={8}>
                        <Button type="primary" color={"black"} onClick={() => onFinish()}><PlusOutlined/>Add New Campaign</Button>
                    </Col>
                </Form>
            </Row>
            <Divider />
            <Row gutter={16}>
                {
                    items.map((item) => (
                        <Col span={8}>
                            <Card title={item.meta} bordered={false} hoverable>
                                <Meta title="Value" description={item.value} />
                                <Meta title="Description" description={item.description} />
                            </Card>
                        </Col>
                    ))
                }
                <Col span={8}>
                    <Card title={"Requests"} bordered={false}>
                        <Meta title="Value" description={linkToRequests} />
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default connect(({campaignDetail, loading}) => ({
    campaignDetail,
    loading,
}))(CampaignDetail);