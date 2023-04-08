
import {connect} from 'umi';
import {Button, Card, Col, InputNumber, Modal, Row} from "antd";
import React, {useEffect, useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {PageContainer} from "@ant-design/pro-layout";
import FormForModal from "../../components/form/FormForModal";
import CampaignDetail from "./campaignDetail";
const { Meta } = Card;
const CampaignList = ({campaignList,loading,dispatch}) => {
    const [showForm,setShowForm] = useState(false)
    const [showDetail,setShowDetail] = useState(false)
    const {campaigns} = campaignList
    const formField = [
        {
            name: 'minContribution',
            label: 'Minimum Contribution',
            required: true,
            component: <InputNumber min={1} defaultValue={3} /> ,
        }
    ]
    useEffect(() => {
        dispatch({
            type: 'campaignList/queryCampaignList',
            payload: {}
        })
    },[])
    const onCreateNewCampaign = async values => {
        console.log(values)
        await dispatch({
            type: 'campaignList/createNewCampaign',
            payload: values
        })
    }
    const getCampaignDetail = async values => {
        setShowDetail(true)
        await dispatch({
            type: 'campaignList/queryCampaignDetail',
            payload: values
        })
    }
    return (
        <PageContainer title='List of Campaigns' breadcrumb={null} >
            <FormForModal title="Create New Campaign" left={12} right={12} width={500} record={{minContribution:3}} onFinish={onCreateNewCampaign} fields={formField}
                          onCancel={() => setShowForm(false)} open={showForm}
            />
            <Modal title="Campaign Detail" open={showDetail} onCancel={() => setShowDetail(false)} footer={[]}>
                <CampaignDetail />
            </Modal>
            <Card loading={loading.effects['compaignList/createTestCase']}>
                <Row>
                    <Col span={18} />
                    <Col span={6}>
                        <Button type="primary" color={"black"} onClick={() => setShowForm(true)}><PlusOutlined/>Add New Campaign</Button>
                    </Col>
                </Row>
                <Row style={{marginTop: 12}}>
                    {
                        campaigns.map((item) => (
                            <Col span={8}>
                                <Card title={"Campaign Info"} hoverable>
                                    <Meta title="Address" description={item.address}/>
                                    <Meta title="Description" description={<Button type="primary" onClick={()=>getCampaignDetail(item.address)}>view Detail</Button>}/>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </Card>
        </PageContainer>
    )
}

export default connect(({campaignList, loading}) => ({
    campaignList,
    loading,
}))(CampaignList);