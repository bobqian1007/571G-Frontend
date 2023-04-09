import {connect} from "umi";
import {Button, Card, Col, Divider, Form, InputNumber, Row} from "antd";
import React from "react"
import {PlusOutlined} from "@ant-design/icons";
const {Item: FormItem} = Form;
const { Meta } = Card;
import { Link } from 'umi';
import web3 from "../../util/web3";
const CampaignDetail = ({campaignDetail,loading,dispatch}) => {
    const {address,minimumContribution,balance,requestsCount,approversCount,manager} = campaignDetail
    const [form] = Form.useForm();
    const layout = {
        labelCol: {span: 10},
        wrapperCol: {span: 14},
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
            value: web3.utils.fromWei(balance.toString(), "ether"),
            meta: "Campaign Balance (ether)",
            description:
                "The balance is how much money this campaign has left to spend.",
        },
    ];
    const onFinish = () => {
        form.validateFields().then((values) => {
            console.log(values)
            dispatch({
                type: 'campaignDetail/contributeCampaign',
                payload: {...values,address}
            })
        })
    }
    return (
        <>
            <Row>
                <Form form={form}
                      {...layout}
                      onFinish={onFinish}>
                    <Col span={24}>
                        <FormItem label="Contribute Amount" colon={true}
                                  rules={
                                      [{required: true}]
                                  } name={"amount"} valuePropName={'value'}
                        ><InputNumber style={{width:300}} min={0} defaultValue={0} /></FormItem>
                    </Col>
                    <Col span={8}>
                        <Button loading={loading.effects['campaignDetail/contributeCampaign']} type="primary" color={"black"} onClick={() => onFinish()}>Contribute</Button>
                    </Col>
                </Form>
            </Row>
            <Divider />
            <Row gutter={[16,16]}>
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