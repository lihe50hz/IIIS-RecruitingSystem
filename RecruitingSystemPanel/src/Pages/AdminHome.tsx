import React, { useEffect } from "react";
import { Text, View } from 'react-native'
import { pageStyles } from './App'
import General, { Structure } from './Admin'
import { login } from "../Plugins/UserServiceApi/login";

export const AdminHome: React.FC = () => {
    const general = new General()

    return (
        <Structure general={general}>
            <View style={[pageStyles.pageRow, { flex: 1, marginBottom: '2%' }]}>
                <Text style={{ fontSize: 40, fontWeight: 'bold', fontFamily: 'Roboto Mono, monospace' }}>
                    ---提示---
                </Text>
            </View>
            <View style={[pageStyles.pageRow, { flex: 7, alignItems: 'flex-start', width: '93%' }]}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', fontFamily: 'Roboto Mono, monospace' }}>
                    {'    '}
                    本页面为姚班二招系统管理页面，如果你不是相应管理人员，以某种方式进入这个页面，请立即退出，
                    不要进行任何额外操作，否则后果自负，我方保留一切法律权益，也恳请您将进入的方式通过邮箱或是其他方式告知我们（IIIS教务），
                    以便我们更好地完善系统，谢谢！
                </Text>
            </View>
        </Structure>
    )
}

