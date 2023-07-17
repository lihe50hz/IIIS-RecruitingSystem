import React, { useEffect, useState } from 'react'
import { Button, Paper, Switch } from '@mui/material'
import { pageStyles, theme } from './App'
import { UserInfo } from 'Plugins/UserServiceShared/UserInfo'
import { deleteUser } from '../Plugins/UserServiceApi/deleteUser'
import { queryAllInfo } from '../Plugins/UserServiceApi/queryAllInfo'
import { updateUserType } from '../Plugins/UserServiceApi/updateUserType'
import General, { Structure } from './Admin'
import { Text, View } from 'react-native'

export const AdminUsersInfo: React.FC = () => {
    const general = new General()
    const [userData, setUserData] = useState<UserInfo[]>([])
    const [shouldRender, setShouldRender] = useState<boolean>(false)
    const updateData = () => {
        new queryAllInfo().send(
            data => {
                console.log('发送成功')
                const tmp: UserInfo[] = JSON.parse(data)
                console.log(tmp)
                setUserData(tmp)
                return
            },
            error => {
                console.log('发送失败')
                return
            }
        )
    }
    useEffect(() => {
        updateData()
        setShouldRender(true)
    }, [])
    const handleDelete = (userName: string) => {
        new deleteUser(userName).send(
            data => {
                console.log('删除成功')
            },
            error => {
                console.log('删除失败')
            }
        )
        location.reload()
    }
    return (
        <Structure general={general}>
            <View style={[pageStyles.pageRow, { flex: 1, marginRight: '1%' }]}>
                <Text
                    style={{
                        fontSize: 40,
                        color: theme.palette.primary.dark,
                        fontWeight: 'bold',
                        fontFamily: 'Roboto Mono, monospace',
                    }}
                >
                    ---用户管理---
                </Text>
            </View>
            <View style={[pageStyles.pageRow, { flex: 7, alignItems: 'flex-start', width: '93%' }]}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', fontFamily: 'Roboto Mono, monospace' }}>
                    {{ shouldRender } && (
                        <Paper sx={{ overflow: 'auto', maxHeight: 500, width: '100%' }}>
                            <UserTable data={userData} handleClick={handleDelete} />
                        </Paper>
                    )}
                </Text>
            </View>
        </Structure>
    )
}

interface ButtonProp {
    initialState: boolean
    userName: string
}

const AccessButton: React.FC<ButtonProp> = ({ initialState, userName }) => {
    const [isOn, setIsOn] = useState<boolean>(initialState)
    const handleToggle = () => {
        new updateUserType(userName, isOn ? 'Student' : 'Teacher').send(
            data => {
                console.log('更新成功')
            },
            error => {
                console.log('更新失败')
            }
        )
        setIsOn(!isOn)
    }
    return <Switch color="primary" checked={isOn} onChange={handleToggle} />
}

interface TableProps {
    data: UserInfo[]
    handleClick: (userName: string) => void
}

const UserTable: React.FC<TableProps> = ({ data, handleClick }) => {
    const handleButtonClicked = (userName: string) => {
        console.log('clicked')
        handleClick(userName)
    }

    return (
        <table width="1000px">
            <thead>
                <tr color={theme.palette.primary.main}>
                    <th>用户名</th>
                    <th>Email</th>
                    <th>是否为老师</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        <td align="center">{row.userName}</td>
                        <td align="center">{row.email}</td>
                        <td align="center">
                            <AccessButton
                                initialState={row.userType == 'Teacher'}
                                userName={row.userName}
                            ></AccessButton>
                        </td>
                        <td align="center">
                            <Button color="primary" onClick={() => handleButtonClicked(row.userName)}>
                                删除
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}