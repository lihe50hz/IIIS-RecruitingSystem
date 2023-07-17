import React, { useEffect, useState } from 'react'
import { pageStyles, theme } from './App'
import { Button, Paper, Switch, Typography } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { writeInfo } from '../Plugins/SignUpServiceApi/writeInfo'
import { queryInfoByExam } from '../Plugins/SignUpServiceApi/queryInfoByExam'
import { SignUpInfo } from '../Plugins/SignUpServiceShared/SignUpInfo'
import General, { Structure } from './Admin'
import { Text, View } from 'react-native'

export const AdminExamStudentList: React.FC = () => {
    const general = new General()
    const [userData, setUserData] = useState<SignUpInfo[]>([])
    const [shouldRender, setShouldRender] = useState<boolean>(false)
    useEffect(() => {
        new queryInfoByExam(window.currentExamYear).send(
            data => {
                console.log('发送成功')
                console.log(data)
                const tmp: SignUpInfo[] = JSON.parse(data)
                if (tmp.length == 0) general.history.goBack()
                setUserData(tmp)
                console.log(tmp)
                setShouldRender(true)
                return
            },
            error => {
                console.log('发送失败')
                return
            }
        )
    }, [])
    const handleExit = async () => {
        general.history.push('/')
    }
    const handleEnd = (flag: number) => {
        if (userData.length == 0) {
            general.history.push('/Admin')
            return
        }
        userData.map(data =>
            new writeInfo(data).send(
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

    const handleAccess = (index: number) => {
        const newData = userData
        const tmpData = newData[index]
        newData[index] = new SignUpInfo(
            tmpData.userName,
            tmpData.realName,
            tmpData.gender,
            tmpData.ID,
            tmpData.phoneNumber,
            tmpData.provinceFrom,
            tmpData.CEEScore,
            tmpData.CEERanking,
            tmpData.awards,
            tmpData.selfIntroduction,
            tmpData.examYear,
            tmpData.score,
            !tmpData.isValid
        )
        setUserData(newData)
    }
    return (
        <Structure general={general}>
            <View style={[pageStyles.pageRow, { flex: 1, marginBottom: '2%' }]}>
                <Text style={{ fontSize: 40, fontWeight: 'bold', fontFamily: 'Roboto Mono, monospace' }}>
                    报名本年度考试的学生信息
                </Text>
                <Button
                    style={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        marginLeft:'3%'
                    }}
                    type="submit"
                    onClick={() => handleEnd(0)}
                >
                    保存并退出
                </Button>
            </View>
            <View style={[pageStyles.pageRow, { flex: 7, alignItems: 'flex-start', width: '93%' }]}>
                {{ shouldRender } && (
                    <Paper sx={{ overflow: 'auto', maxHeight: 500, width: '100%' }}>
                        <UserTable data={userData} handleAccess={handleAccess} />
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
    data: SignUpInfo[]
    handleAccess: (index: number) => void
}

const UserTable: React.FC<TableProps> = ({ data, handleAccess }) => {
    const history = useHistory()
    // useEffect(() => { handleExamResult(0) } )
    const handleClick = (index: number) => {
        return () => {
            window.realName = data[index].realName
            window.gender = data[index].gender
            window.ID = data[index].ID
            window.phoneNumber = data[index].phoneNumber
            window.provinceFrom = data[index].provinceFrom
            window.CEEScore = data[index].CEEScore
            window.CEERanking = data[index].CEERanking
            window.awards = data[index].awards
            window.selfIntroduction = data[index].selfIntroduction
            history.push('/Admin/ExamStudentInfo')
        }
    }

    return (
        <table width="1000px">
            <thead>
                <tr color={theme.palette.primary.main}>
                    <th>用户名（点击查看信息）</th>
                    <th>是否允许参加笔试？</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        <td align="center">
                            <Button>
                                <Typography variant="h6" align="left" onClick={handleClick(index)}>
                                    {row.userName}
                                </Typography>
                            </Button>
                        </td>
                        <td align="center">
                            <PassButton
                                userIndex={index}
                                handleClick={handleAccess}
                                initialState={row.isValid}
                            ></PassButton>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}