import React, { useEffect, useState } from 'react'
import { Button, Paper } from '@mui/material'
import { useHistory } from 'react-router-dom'
import General, { Structure } from '../../src/Pages/Student'
import { Text, View } from 'react-native'
import { pageStyles, theme } from './App'
import { hasInfo } from '../Plugins/SignUpServiceApi/hasInfo'
import { queryInfo } from '../Plugins/SignUpServiceApi/queryInfo'
import { SignUpInfo } from '../Plugins/SignUpServiceShared/SignUpInfo'
import { RunningExamInfo } from '../Plugins/ExamServiceShared/RunningExamInfo'
import { getAllExams } from '../Plugins/ExamServiceApi/getAllExams'

export const StudentExamService: React.FC = () => {
    const general = new General()
    const history = useHistory()
    const [examArray, setExamArray] = useState<RunningExamInfo[]>([])
    const [infoFlag,setInfoFlag]=useState<boolean>(false)
    const [passFlag,setPassFlag]=useState<boolean>(false)
    useEffect(() => {
        new hasInfo(window.userName).send(
            data => {
                const res: boolean = JSON.parse(data)
                setInfoFlag(res)
                new queryInfo(window.userName).send(
                    data => {
                        const tmp: SignUpInfo = JSON.parse(data)
                        setPassFlag(tmp.isValid)
                        window.currentExamYear = tmp.examYear
                    },
                    error => {
                        console.log('发送失败')
                    }
                )
            },
            error => {
                console.log('发送失败')
            }
        )
        new getAllExams(window.currentExamYear).send(
            data => {
                const tmp: RunningExamInfo[] = JSON.parse(data)
                setExamArray(tmp)
                console.log(tmp)
            },
            error => {
                console.log('发送失败')
            }
        )
    }, [])
    const enterExam = (index: number) => {
        return () => {
            window.currentPaperIndex = index
            history.push('/Student/Exams/Before')
        }
    }

    return (
        <Structure general={general}>
            <View style={[pageStyles.pageRow,
                    {
                        width: '85%',
                        justifyContent: 'space-around',
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        marginTop: '1.5%',
                        marginBottom: '1.5%',
                    },
                ]}
            >
                {!infoFlag?
                    <View style={[pageStyles.pageRow, { flex: 1, justifyContent: 'center', marginTop: '1.5%' }]}>
                        <Text
                            style={{
                                fontSize: 64,
                                color: theme.palette.primary.light,
                                fontWeight: 'bold',
                                fontFamily: 'Roboto Mono, monospace',
                            }}
                        >
                            您还未填写个人信息！
                        </Text>
                    </View>
                    : (!passFlag?
                    <View style={[pageStyles.pageRow, { flex: 1, justifyContent: 'center', marginTop: '1.5%' }]}>
                        <Text
                            style={{
                                fontSize: 64,
                                color: theme.palette.primary.light,
                                fontWeight: 'bold',
                                fontFamily: 'Roboto Mono, monospace',
                            }}
                        >
                            您的信息还在等待管理员审核！
                        </Text>
                    </View>
                    :
                    (
                        <View style={[pageStyles.pageColumn,{flex:1,height:'100%',width:'100%'}]}>
                            <View style={[pageStyles.pageRow, {flex: 1, justifyContent: 'center', marginBottom: '1.5%'}]}>
                                <Text
                                    style={{
                                        fontSize: 24,
                                        color: theme.palette.primary.main,
                                        fontWeight: 'bold',
                                        fontFamily: 'Roboto Mono, monospace',
                                    }}
                                >
                                    当前考试
                                </Text>
                            </View>
                            <View style={[pageStyles.pageRow, { flex: 7 }]}>
                                <Paper sx={{ overflow: 'auto',height: '95%', width: '100%' }}>
                                    <View style={[pageStyles.pageColumn, { flex: 1, alignItems: 'center' }]}>
                                        {examArray.map((exam, index) => (
                                            <Button style={{ width: '100%', fontSize: 24 }} onClick={enterExam(exam.paperIndex)}>
                                                {index + 1}.{exam.examName}
                                            </Button>
                                        ))}
                                    </View>
                                </Paper>
                            </View>
                    </View>))
                }
            </View>
        </Structure>
    )
}

