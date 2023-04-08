import {
    getAllRequests,
    getRequestCount,
    getapproversCount,
    createRequest
} from '../service/campaign'
import {checkIfResValid} from "../service/util";
import {notification} from "antd";

export default {
    namespace: 'requestList',
    state: {
        campaignAddress:"",
        requestCount:"",
        approversCount:"",
        campaignRequests:[]
    },

    reducers: {
        save(state, {payload}) {
            return {
                ...state,
                ...payload,
            }
        }
    },

    effects: {
        *queryRequestCount(_, {call, put,select}) {
            const requestList = yield select(state => state.requestList);
            if (!requestList.campaignAddress){
                return
            }
            const res = yield call(getRequestCount,requestList.campaignAddress)
            if (checkIfResValid(res)){
                yield put(
                    {
                        type:'save',
                        payload:{
                            requestCount:res
                        }
                    }
                )
            }
        },
        *queryApproversCount(_, {call, put,select}) {
            const requestList = yield select(state => state.requestList);
            if (!requestList.campaignAddress){
                return
            }
            const res = yield call(getapproversCount,requestList.campaignAddress)
            if (checkIfResValid(res)){
                yield put(
                    {
                        type:'save',
                        payload:{
                            approversCount:res
                        }
                    }
                )
            }
        },
        *queryRequestList({payload}, {call, put,select}) {
            const requestList = yield select(state => state.requestList);
            if (!requestList.campaignAddress || !requestList.requestCount){
                return
            }
            const res = yield call(getAllRequests, {requestCount:requestList.requestCount,address:requestList.address})
            if (checkIfResValid(res)){
                yield put(
                    {
                        type:'save',
                        payload:{
                            campaignRequests:res
                        }
                    }
                )
            }
        },
        *createNewRequest(payload,{call,put,select}){
            const requestList = yield select(state => state.requestList);
            const res = yield call(createRequest,payload)
            if (checkIfResValid(res)){
                notification.success({
                    message:"create request successfully"
                })
                if (payload.address === requestList.campaignAddress){
                    yield put(
                        {
                            type:'queryRequestList',
                            payload:{}
                        }
                    )
                }

            }
        }
    }
}
