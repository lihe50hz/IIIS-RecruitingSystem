import React, { useEffect, useState } from 'react'
import { Button, Paper, TextField, Typography } from '@mui/material'
import { pageStyles, theme } from './App'
import { View } from 'react-native'
import { queryInfo } from '../Plugins/SignUpServiceApi/queryInfo'
import { SignUpInfo } from '../Plugins/SignUpServiceShared/SignUpInfo'
import { writeInfo } from '../Plugins/SignUpServiceApi/writeInfo'
import General, { Structure } from '../../src/Pages/Student'

export const StudentPersonalInformation: React.FC = () => {
    const general = new General()
    const [shouldRender, setShouldRender] = useState<boolean>(false)
    useEffect(() => {
        if (!window.isLogged) {
            window.isBlocked = true
            general.history.push('/')
        }
        new queryInfo(window.userName).send(
            data => {
                const dataUnzip: SignUpInfo = JSON.parse(data)
                window.realName = dataUnzip.realName
                window.gender = dataUnzip.gender
                window.ID = dataUnzip.ID
                window.phoneNumber = dataUnzip.phoneNumber
                window.provinceFrom = dataUnzip.provinceFrom
                window.CEEScore = dataUnzip.CEEScore
                window.CEERanking = dataUnzip.CEERanking
                window.awards = dataUnzip.awards
                window.selfIntroduction = dataUnzip.selfIntroduction
                console.log('查询成功')
                setShouldRender(true)
                return
            },
            error => {
                console.log('发送失败')
                return
            }
        )
    })
    const handlerealNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        window.realName = event.target.value
    }
    const handlegenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        window.gender = event.target.value
    }
    const handleIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        window.ID = event.target.value
    }
    const handlephoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        window.phoneNumber = event.target.value
    }
    const handleprovinceFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        window.provinceFrom = event.target.value
    }
    const handleCEEScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        window.CEEScore = event.target.value
    }
    const handleCEERankingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        window.CEERanking = event.target.value
    }
    const handleawardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        window.awards = event.target.value
    }
    const handleselfIntroductionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        window.selfIntroduction = event.target.value
    }
    const handleSaveChange = async () => {
        const signUpInfo = new SignUpInfo(
            window.userName,
            window.realName,
            window.gender,
            window.ID,
            window.phoneNumber,
            window.provinceFrom,
            window.CEEScore,
            window.CEERanking,
            window.awards,
            window.selfIntroduction,
            window.ID.slice(0, 4),
            0,
            false
        )
        new writeInfo(signUpInfo).send(
            data => {
                if (data == '0') {
                    general.displayMessage('修改已保存')
                } else {
                    general.displayMessage('保存失败，请重试')
                }
            },
            error => {
                console.log('发送失败')
                return
            }
        )
        return
    }
    return (
        <Structure general={general}>
            {shouldRender && (
                <View
                    style={[
                        pageStyles.pageColumn,
                        {
                            flex: 4,
                            width: '85%',
                            height: '85%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '3%',
                            marginRight: '5%',
                            borderRadius: 5,
                        },
                    ]}
                >
                    <Paper sx={{ overflow: 'auto', maxHeight: '100%', width: '100%' }}>
                        <View style={[pageStyles.pageRow, { flex: 7, marginBottom: '2%', marginTop: '2%' }]}>
                            <Typography variant="h5" align="center" sx={{ color: theme.palette.primary.main }}>
                                个人信息
                            </Typography>
                        </View>
                        <View
                            style={[
                                pageStyles.pageRow,
                                {
                                    flex: 7,
                                    justifyContent: 'space-around',
                                    alignItems: 'flex-start',
                                    width: '100%',
                                },
                            ]}
                        >
                            <TextField
                                label="姓名 / name"
                                style={{ marginBottom: 10, width: '45%' }}
                                defaultValue={window.realName}
                                onChange={handlerealNameChange}
                            />
                            <TextField
                                label="性别 / gender"
                                style={{ marginBottom: 10, width: '45%' }}
                                defaultValue={window.gender}
                                onChange={handlegenderChange}
                            />
                        </View>
                        <View
                            style={[
                                pageStyles.pageRow,
                                {
                                    flex: 7,
                                    justifyContent: 'space-around',
                                    alignItems: 'flex-start',
                                    width: '100%',
                                },
                            ]}
                        >
                            <TextField
                                label="学号 / ID"
                                style={{ marginBottom: 10, width: '45%' }}
                                defaultValue={window.ID}
                                onChange={handleIDChange}
                            />
                            <TextField
                                label="手机号码 / phone number"
                                style={{ marginBottom: 10, width: '45%' }}
                                defaultValue={window.phoneNumber}
                                onChange={handlephoneNumberChange}
                            />
                        </View>
                        <View
                            style={[
                                pageStyles.pageRow,
                                {
                                    flex: 7,
                                    justifyContent: 'space-around',
                                    alignItems: 'flex-start',
                                    width: '100%',
                                },
                            ]}
                        >
                            <TextField
                                label="高考省份 / province"
                                style={{ marginBottom: 10, width: '45%' }}
                                defaultValue={window.provinceFrom}
                                onChange={handleprovinceFromChange}
                            />
                            <TextField
                                label="高考成绩 / grade"
                                style={{ marginBottom: 10, width: '45%' }}
                                defaultValue={window.CEEScore}
                                onChange={handleCEEScoreChange}
                            />
                        </View>
                        <View
                            style={[
                                pageStyles.pageRow,
                                {
                                    flex: 7,
                                    justifyContent: 'space-around',
                                    alignItems: 'flex-start',
                                    width: '100%',
                                },
                            ]}
                        >
                            <TextField
                                label="高考排名 / rank"
                                style={{ marginBottom: 10, width: '45%' }}
                                defaultValue={window.CEERanking}
                                onChange={handleCEERankingChange}
                            />
                            <TextField
                                label="竞赛成绩 / award"
                                style={{ marginBottom: 10, width: '45%' }}
                                defaultValue={window.awards}
                                onChange={handleawardChange}
                            />
                        </View>
                        <View style={[pageStyles.pageRow, { flex: 7, alignItems: 'flex-start', width: '100%' }]}>
                            <TextField
                                label="个人陈述 / self introduction"
                                multiline={true}
                                maxRows={6}
                                style={{ marginBottom: 10, width: '90%' }}
                                defaultValue={window.selfIntroduction}
                                onChange={handleselfIntroductionChange}
                            />
                        </View>
                        <View
                            style={[
                                pageStyles.pageRow,
                                {
                                    flex: 7,
                                    alignItems: 'flex-start',
                                    width: '100%',
                                    marginBottom: '2%',
                                },
                            ]}
                        >
                            <Button
                                onClick={handleSaveChange}
                                sx={{
                                    display: 'flex',
                                    width: '20%',
                                    bgcolor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                    alignItems: 'center',
                                }}
                            >
                                保存信息
                            </Button>
                        </View>
                    </Paper>
                </View>
            )}
        </Structure>
    )
}