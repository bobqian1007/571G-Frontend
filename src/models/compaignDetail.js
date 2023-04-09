import {
    getCompaignDetail, contributeMoney
} from '../service/campaign'
import {checkIfResValid} from "../service/util";
import {notification} from "antd";

export default {
    namespace: 'campaignDetail',
    state: {
        address: "",
        minimumContribution: 0,
        balance: 0,
        requestsCount: 0,
        approversCount: 0,
        manager: "",
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
        *queryCampaignDetail({payload}, {call, put}) {
            console.log(payload)
            const res = yield call(getCompaignDetail,payload)
            if (checkIfResValid(res)){
                yield put(
                    {
                        type:'save',
                        payload:{
                            address: payload,
                            minimumContribution: res[0],
                            balance: res[1],
                            requestsCount: res[2],
                            approversCount: res[3],
                            manager: res[4],
                        }
                    }
                )
            }
        },
        *contributeCampaign({payload},{call,put}){
            const res = yield call(contributeMoney,payload)
            if (checkIfResValid(res)){
                notification.success({
                    message:"contribute successfully"
                })
                yield put(
                    {
                        type:'queryCampaignDetail',
                        payload:{
                            address: payload,
                        }
                    }
                )
            }
        }
    }
}

