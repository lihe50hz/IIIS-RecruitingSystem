import React, { useEffect, useState } from 'react'
import { pageStyles, theme } from './App'
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Paper,
    Radio,
    RadioGroup,
    Switch,
    TextField,
    Typography,
} from '@mui/material'
import { SignUpInfo } from '../Plugins/SignUpServiceShared/SignUpInfo'
import { sendMessage } from '../Plugins/SignUpServiceApi/sendMessage'
import { UserInfo } from '../Plugins/UserServiceShared/UserInfo'
import { queryUserInfo } from '../Plugins/UserServiceApi/queryUserInfo'
import General, { Structure } from './Admin'
import { Text, View } from 'react-native'
import { sortByTotalScore } from '../Plugins/ExamServiceApi/sortByTotalScore'
import { StudentScore } from '../Plugins/ExamServiceShared/StudentScore'
import { queryInfo } from '../Plugins/SignUpServiceApi/queryInfo'
import { updateStatus } from '../Plugins/ExamServiceApi/updateStatus'
import { ExamPaper } from '../Plugins/ExamPaperServiceShared/ExamPaper'
import { getExamPaper } from '../Plugins/ExamPaperServiceApi/getExamPaper'
import { sortByProblem } from '../Plugins/ExamServiceApi/sortByProblem'
import { sortByExam } from '../Plugins/ExamServiceApi/sortByExam'
import { getAllExams } from '../Plugins/ExamServiceApi/getAllExams'
import { RunningExamInfo } from '../Plugins/ExamServiceShared/RunningExamInfo'
import { newMessage } from '../Plugins/MessageServiceApi/newMessage'

export const AdminScoreStudentList: React.FC = () => {
    const general = new General()
    const [userData, setUserData] = useState<StudentScore[]>([])
    const [initialData, setInitialData] = useState<StudentScore[]>([])
    const [examEnd, setExamEnd] = useState<boolean>(false)
    const [shouldRender, setShouldRender] = useState<boolean>(false)
    const [examArray, setExamArray] = useState<RunningExamInfo[]>([])
    const [selectedPaper, setSelectedPaper] = useState<ExamPaper>(new ExamPaper(0, '', 0, 0, '', []))
    const [selectedProblem, setSelectedProblem] = useState(-1)
    useEffect(() => {
        new sortByTotalScore(window.currentExamYear).send(
            data => {
                console.log('发送成功')
                const tmp: StudentScore[] = JSON.parse(data)
                if (tmp.length == 0) general.history.goBack()
                tmp.sort((a, b) => b.specifiedScore - a.specifiedScore)
                setInitialData(tmp)
                setUserData(tmp)
                setShouldRender(true)
                console.log(tmp)
                return
            },
            error => {
                console.log('发送失败')
                return
            }
        )
        new getAllExams(window.currentExamYear).send(data => {
            const tmp: RunningExamInfo[] = JSON.parse(data)
            console.log(tmp)
            setExamArray(tmp)
        })
    }, [])
    const handleEnd = (flag: number) => {
        if (flag == 1) {
            setUserData(
                userData.map(
                    (data, index) =>
                        new StudentScore(
                            data.userName,
                            data.totalScore,
                            data.examYear,
                            data.examAnswers,
                            data.specifiedScore,
                            initialData[index].examPassed,
                            data.interviewPassed
                        )
                )
            )
            new newMessage(
                window.userName,
                'Admin',
                '笔试结果已经发送至用户注册时填写的邮箱，请各位同学注意查收。',
                '笔试结果发布通知',
                [
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAJCAYAAADkZNYtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAUSURBVChTY/hPAhhVjAxopfj/fwAYn4qEqni9fQAAAABJRU5ErkJggg==',
                ],
                'Unpublished',
                ''
            ).send(
                data1 => {
                    console.log('发送成功')
                },
                error => {
                    console.log('发送失败')
                }
            )
        } else if (flag == 2) {
            setUserData(
                userData.map(
                    (data, index) =>
                        new StudentScore(
                            data.userName,
                            data.totalScore,
                            data.examYear,
                            data.examAnswers,
                            data.specifiedScore,
                            data.examPassed,
                            initialData[index].interviewPassed
                        )
                )
            )
            new newMessage(
                window.userName,
                'Admin',
                '面试结果已经发送至用户注册时填写的邮箱，请各位同学注意查收。',
                '面试结果发布通知',
                [
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAJCAYAAADkZNYtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAUSURBVChTY/hPAhhVjAxopfj/fwAYn4qEqni9fQAAAABJRU5ErkJggg==',
                ],
                'Unpublished',
                ''
            ).send(
                data1 => {
                    console.log('发送成功')
                },
                error => {
                    console.log('发送失败')
                }
            )
        }
        userData.map(score => {
            new queryUserInfo(score.userName).send(
                userInfo => {
                    new queryInfo(score.userName).send(
                        signUpInfo => {
                            const user: UserInfo = JSON.parse(userInfo)
                            const signUp: SignUpInfo = JSON.parse(signUpInfo)
                            new sendMessage(
                                user.email,
                                signUp.realName,
                                flag,
                                flag == 1 ? score.examPassed : score.interviewPassed
                            ).send(
                                data => {
                                    console.log('发送成功')
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
                },
                error => {
                    console.log('发送失败')
                }
            )
        })
        userData.map(score =>
            new updateStatus(score).send(
                data => {
                    console.log('发送成功')
                    general.history.push('/Admin')
                },
                error => {
                    console.log('发送失败')
                    return
                }
            )
        )
    }
    const handleExamResult = (index: number) => {
        const newData = userData
        const tmpData = newData[index]
        newData[index] = new StudentScore(
            tmpData.userName,
            tmpData.totalScore,
            tmpData.examYear,
            tmpData.examAnswers,
            tmpData.specifiedScore,
            !tmpData.examPassed,
            tmpData.interviewPassed
        )
        setUserData(newData)
        console.log(userData)
    }
    const handleInterviewResult = (index: number) => {
        const newData = userData
        const tmpData = newData[index]
        newData[index] = new StudentScore(
            tmpData.userName,
            tmpData.totalScore,
            tmpData.examYear,
            tmpData.examAnswers,
            tmpData.specifiedScore,
            tmpData.examPassed,
            !tmpData.interviewPassed
        )
        setUserData(newData)
    }
    const handleExamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        new getExamPaper(parseInt(event.target.value)).send(
            data => {
                const tmp: ExamPaper = JSON.parse(data)
                console.log(tmp)
                setSelectedPaper(tmp)
            },
            error => {
                console.log('发送失败')
            }
        )
    }
    const handleProblemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const tmp = parseInt(event.target.value)
        console.log(selectedPaper.problemCnt)
        if (!isNaN(tmp) && tmp < selectedPaper.problemCnt) setSelectedProblem(tmp)
    }
    const handleSort = () => {
        if (selectedPaper.index == 0) return
        if (selectedProblem != -1) {
            new sortByProblem(window.currentExamYear, selectedPaper.index, selectedProblem).send(
                data => {
                    const tmp: StudentScore[] = JSON.parse(data)
                    tmp.sort((a, b) => b.specifiedScore - a.specifiedScore)
                    setUserData(tmp)
                },
                error => {
                    console.log('发送失败')
                }
            )
        } else {
            new sortByExam(window.currentExamYear, selectedPaper.index).send(
                data => {
                    const tmp: StudentScore[] = JSON.parse(data)
                    tmp.sort((a, b) => b.specifiedScore - a.specifiedScore)
                    setUserData(tmp)
                },
                error => {
                    console.log('发送失败')
                }
            )
        }
    }
    return (
        <Structure general={general}>
            <View style={[pageStyles.pageRow, { flex: 1, marginRight: '1%' }]}>
                <Button
                    style={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        marginRight:'5%'
                    }}
                    type="submit"
                    onClick={() => handleEnd(1)}
                >
                    保存并通知笔试结果
                </Button>
                <Text
                    style={{
                        fontSize: 40,
                        color: theme.palette.primary.dark,
                        fontWeight: 'bold',
                        fontFamily: 'Roboto Mono, monospace',
                    }}
                >
                    用户管理
                </Text>
                <Button
                    style={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        marginLeft:'5%'
                    }}
                    type="submit"
                    onClick={() => handleEnd(2)}
                >
                    保存并通知面试结果
                </Button>
            </View>

            <View style={[pageStyles.pageRow, { flex: 7, alignItems: 'flex-start', width: '93%' }]}>
                {{ shouldRender } && (
                    <Paper sx={{ overflow: 'auto', maxHeight: 500, width: '100%' }}>
                        <UserTable
                            data={userData}
                            handleExamResult={handleExamResult}
                            handleInterviewResult={handleInterviewResult}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">按考试排序</FormLabel>
                                    <RadioGroup
                                        aria-label="按考试排序"
                                        name="exam_sort"
                                        value={selectedPaper.index}
                                        onChange={handleExamChange}
                                    >
                                        {examArray.map((exam, index) => (
                                            <FormControlLabel
                                                value={exam.paperIndex}
                                                control={<Radio />}
                                                label={exam.examName}
                                            />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '50%',
                                }}
                            >
                                <TextField
                                    label={'按照题目排序'}
                                    style={{ marginBottom: 10, width: '80%' }}
                                    onChange={handleProblemChange}
                                />
                                <Button variant="contained" type="submit" color="primary" onClick={handleSort}>
                                    排序
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                )}
            </View>
        </Structure>
    )
}

interface ButtonProp {
    userIndex: number
    handleClick: (index: number) => void
    initialState: boolean
}

export const PassButton: React.FC<ButtonProp> = ({ userIndex, handleClick, initialState }) => {
    const [isOn, setIsOn] = useState<boolean>(initialState)
    const handleToggle = () => {
        setIsOn(!isOn)
        // 根据 userIndex 修改是否通过的状态
        handleClick(userIndex)
        console.log('handle')
    }
    return <Switch color="primary" checked={isOn} onChange={handleToggle} />
}

interface TableProps {
    data: StudentScore[]
    handleExamResult: (index: number) => void
    handleInterviewResult: (index: number) => void
}

const UserTable: React.FC<TableProps> = ({ data, handleExamResult, handleInterviewResult }) => {
    return (
        <table width="1000px">
            <thead>
                <tr color={theme.palette.primary.main}>
                    <th>用户名</th>
                    <th>考试成绩</th>
                    <th>是否通过笔试？</th>
                    <th>是否通过面试？</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        <td align="center">
                            <Typography variant="h6" align="left">
                                {row.userName}
                            </Typography>
                        </td>
                        <td align="center">{row.specifiedScore}</td>
                        <td align="center">
                            <PassButton
                                userIndex={index}
                                handleClick={handleExamResult}
                                initialState={row.examPassed}
                            ></PassButton>
                        </td>
                        <td align="center">
                            <PassButton
                                userIndex={index}
                                handleClick={handleInterviewResult}
                                initialState={row.interviewPassed}
                            ></PassButton>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}