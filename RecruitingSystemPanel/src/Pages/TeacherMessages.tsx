import { Button, Paper, Typography } from '@mui/material'
import { pageStyles, theme } from './App'
import { Message } from '../Plugins/MessageServiceShared/Message'
import { login } from '../Plugins/UserServiceApi/login'
import { setUserToken } from '../Plugins/CommonUtils/Store/UserTokenStore'
import { refreshMessage } from '../Plugins/MessageServiceApi/refreshMessage'
import { Text, View } from 'react-native'
import General, { Structure } from '../../src/Pages/Teacher'
import React, { useEffect, useState } from 'react'

export const TeacherMessages: React.FC = () => {
    const general = new General()
    const [flag, setflag] = useState(false)
    const [MesList, mesbox] = useState<Array<Message>>([])
    const display = (
        mesTitle: string,
        mesContent: string,
        mesRank: number,
        mesStatus: Array<string>,
        mesType: string,
        mesDate: string
    ) => {
        window.mesTitle = mesTitle
        window.mesContent = mesContent
        window.mesRank = mesRank
        window.mesStatus = mesStatus
        window.mesType = mesType
        window.mesDate = mesDate
        general.history.push('/MessageDisplayer')
    }
    useEffect(() => {
        if (!flag) {
            getmesbox()
            setflag(true)
        }
    })
    const getmesbox = () => {
        /*if (!window.isLogged) {
            window.isBlocked = true
            general.history.push('/')
        }*/
        new refreshMessage(window.userName, 'Teacher').send(
            list => {
                const tmp: Array<Message> = JSON.parse(list)
                mesbox(tmp)
            },
            error => {
                general.displayMessage('发送信息失败：' + { error })
            }
        )
        // new login(window.userName, window.password).send(
        //     data => {
        //         setUserToken(data)
        //         if (data == '0') {
        //             new refreshMessage(window.userName, 'Student').send(
        //                 list => {
        //                     const tmp: Array<Message> = JSON.parse(list)
        //                     mesbox(tmp)
        //                 },
        //                 error => {
        //                     general.displayMessage('发送信息失败：' + { error })
        //                 }
        //             )
        //         } else {
        //             general.displayMessage('登录失败 / Fail：' + { data })
        //             general.history.push('/')
        //         }
        //     },
        //     error => {
        //         general.displayMessage('发送信息失败：' + { error })
        //     }
        // )
    }

    return (
        <Structure general={general}>
            <View style={[pageStyles.pageRow, { flex: 1, marginRight: '4%' }]}>
                <Text
                    style={{
                        fontSize: 40,
                        color: theme.palette.primary.main,
                        fontWeight: 'bold',
                        fontFamily: 'Roboto Mono, monospace',
                    }}
                >
                    ---公告查看---
                </Text>
            </View>
            <View style={[pageStyles.pageRow, { flex: 7, alignItems: 'flex-start' }]}>
                <View
                    style={[
                        pageStyles.pageColumn,
                        {
                            flex: 1.2,
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                        },
                    ]}
                >
                    <Paper sx={{  overflow: 'auto', maxHeight: '100%', width: '100%' ,backgroundColor:'rgba(255,255,255 ,0.2)'}}>
                        <View style={[pageStyles.pageColumn, { marginTop:'1%',marginBottom:'2%',width:'100%',
                            height:'80%',justifyContent: 'flex-start',alignItems:'center'}]}>
                            {MesList.map(ite => (
                                <div style={{ width: '90%' }}>
                                    <View
                                        style={[
                                            pageStyles.pageRow,
                                            {
                                                justifyContent: 'flex-start',
                                                marginBottom:'1%',
                                                backgroundColor:'rgba(255,255,255 ,0.35)',
                                            },
                                        ]}
                                    >
                                        <Button
                                            sx={{ width: '100%', fontSize: 24,justifyContent:'flex-start' }}
                                            onClick={() =>
                                                display(
                                                    ite.mesTitle,
                                                    ite.mesContent,
                                                    ite.mesRank,
                                                    ite.mesStatus,
                                                    ite.mesType,
                                                    ite.mesDate
                                                )
                                            }
                                        >
                                            <View style={[pageStyles.pageColumn, { justifyContent: 'flex-start',width:'100%'}]}>
                                                <View style={[pageStyles.pageRow, { justifyContent: 'flex-start'},]}>
                                                    {ite.mesTitle}
                                                </View>
                                                <View style={[pageStyles.pageRow, { justifyContent: 'flex-end',width:'100%'}]}>
                                                    {ite.mesDate}
                                                </View>
                                            </View>
                                        </Button>
                                    </View>
                                </div>
                            ))}
                        </View>
                    </Paper>
                </View>
            </View>
        </Structure>
    )
}


