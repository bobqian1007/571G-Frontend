
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
        console.log(values)
        await dispatch({
            type: 'campaignDetail/queryCampaignDetail',
            payload: values
        })
        setShowDetail(true)
    }
    return (
        <PageContainer title='List of Campaigns' breadcrumb={null} >
            <FormForModal title="Create New Campaign" left={12} right={12} width={500} onFinish={onCreateNewCampaign} fields={formField}
                          onCancel={() => setShowForm(false)} open={showForm} loading={loading.effects['compaignList/createNewCampaign']}
            />
            <Modal width={800} title="Campaign Detail" open={showDetail} onCancel={() => setShowDetail(false)} footer={[]}>
                <CampaignDetail />
            </Modal>
            <Card loading={loading.effects['compaignList/queryCampaignList']}>
                <Row>
                    <Col span={20} />
                    <Col span={4}>
                        <Button type="primary" color={"black"} onClick={() => setShowForm(true)}><PlusOutlined/>Add New Campaign</Button>
                    </Col>
                </Row>
                <Row style={{marginTop: 12}} gutter={[12,12]}>
                    {
                        campaigns.map((item) => (
                            <Col span={8}>
                                <Card title={"Campaign Info"} hoverable>
                                    <Meta title="Address" description={item}/>
                                    <Meta title="Description" description={<Button type="primary" onClick={()=>getCampaignDetail(item)}>view Detail</Button>}/>
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