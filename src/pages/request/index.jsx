import {connect} from "umi";
import {PageContainer} from "@ant-design/pro-layout";
import SearchForm from "./searchForm";
import {Button, Card, Col, Divider, Input, InputNumber, notification, Row, Table, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {approveRequest, finalizeRequest} from "../../service/campaign";
import {checkIfResValid} from "../../service/util";
import web3 from "../../util/web3";
import FormForModal from "../../components/form/FormForModal";
import {useParams} from "react-router-dom";

const RequestList = ({requestList,loading,dispatch}) => {
    const {campaignAddress,requestCount,approversCount,campaignRequests} = requestList
    const [showForm,setShowForm] = useState(false)
    const params  = useParams();
    const formField = [
        {
            name: 'address',
            label: 'Address',
            required: true,
            component: <Input defaultValue={campaignAddress} /> ,
        },
        {
            name: 'value',
            label: 'Amount',
            required: true,
            component: <InputNumber min={1} defaultValue={3} /> ,
        },
        {
            name: 'description',
            label: 'Description',
            required: true,
            type:'input',
            placeholder:'please input the description of the request',
        },
        {
            name: 'recipient',
            label: 'Recipient',
            required: true,
            type:'input',
            placeholder:'please input the address of the recipient' ,
        }
    ]
    const createNewRequest = values =>{
        dispatch({
            type: 'requestList/createNewRequest',
            payload: values
        })
    }
    const onApprove = async (id) =>{
        const res = await approveRequest({id:id,address:campaignAddress})
        if (checkIfResValid(res)){
            notification.success({
                message:"approve request successfully"
            })
        }else{
            notification.error({
                message:"sorry,you are not allowed to approve this request"
            })
        }
    }
    const onFinalize = async (id) =>{
        const res = await finalizeRequest({id:id,address:campaignAddress})
        if (checkIfResValid(res)){
            notification.success({
                message:"finalize request successfully"
            })
        }else{
            notification.error({
                message:"sorry,you are not allowed to finalize this request,please contact manager"
            })
        }
    }
    useEffect(() => {
        if (params.address != null && params.address !== ":address"){
            dispatch({
                type: 'requestList/save',
                payload: {campaignAddress:params.address}
            })
        }
    },[])
    const totalSearch = async () =>{
        if (campaignAddress != null && campaignAddress !== ""){
            await dispatch({
                type: 'requestList/queryRequestCount',
                payload: {}
            })
            await dispatch({
                type: 'requestList/queryApproversCount',
                payload: {}
            })
            await dispatch({
                type: 'requestList/queryRequestList',
                payload: {}
            })
        }
    }
    useEffect(() => {
        totalSearch()
    },[campaignAddress])
    const tableData = campaignRequests.map((item,index) => ({
        id:index,
        description:item.description,
        amount:web3.utils.fromWei(item.value, "ether"),
        recipient:request.recipient,
        approvalCount: item.approvalCount + "/" + approversCount
    }))
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Recipient',
            dataIndex: 'recipient',
            key: 'recipient',
        },
        {
            title: 'Approval Count',
            dataIndex: 'approvalCount',
            key: 'approvalCount',
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const readyToFinalize = record.approvalCount > approversCount / 2;
                return (
                    <>
                        <Button onClick={() => onApprove(record.id)} disabled={record.complete}>
                            Approve
                        </Button>
                        <Divider type={"vertical"}/>
                        <Button onClick={() => onFinalize(record.id)} disabled={!readyToFinalize || record.complete}>
                            Finalize
                        </Button>
                    </>
                );
            },
        },
    ];
    return (
        <PageContainer title='List of Requests' breadcrumb={null} >
            <FormForModal title="Create New Request" left={6} right={18} width={500} record={{}} onFinish={createNewRequest} fields={formField}
                          onCancel={() => setShowForm(false)} open={showForm}
            />
            <Card>
                <SearchForm/>
                <Row style={{marginTop: 12}}>
                    <Col span={12}>
                        <Button type="primary" color={"black"} onClick={() => setShowForm(true)}><PlusOutlined/>Add New Campaign</Button>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col span={24}>
                        <Table dataSource={tableData} columns={columns} loading={loading.effects['requestList/queryRequestList']}/>
                    </Col>
                </Row>
            </Card>
        </PageContainer>
    )
}

export default connect(({requestList, loading}) => ({
    requestList,
    loading,
}))(RequestList);