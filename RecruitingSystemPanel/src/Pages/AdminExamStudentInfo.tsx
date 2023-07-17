import React from 'react'
import { Button, Paper, TextField, Typography } from '@mui/material'
import { pageStyles, theme } from './App'
import General, { Structure } from './Admin'
import { View } from 'react-native'

export const AdminExamStudentInfo: React.FC = () => {
    const general = new General()
    const handleReturn = () => {
        general.history.goBack()
    }
    return (
        <Structure general={general}>
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
                <Paper sx={{ overflow: 'auto', maxHeight: '100%', width: '100%',backgroundColor:'rgba(255,255,255,0.75)' }}>
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
                            disabled
                        />
                        <TextField
                            label="性别 / gender"
                            style={{ marginBottom: 10, width: '45%' }}
                            defaultValue={window.gender}
                            disabled
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
                            disabled
                        />
                        <TextField
                            label="手机号码 / phone number"
                            style={{ marginBottom: 10, width: '45%' }}
                            defaultValue={window.phoneNumber}
                            disabled
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
                            disabled
                        />
                        <TextField
                            label="高考成绩 / grade"
                            style={{ marginBottom: 10, width: '45%' }}
                            defaultValue={window.CEEScore}
                            disabled
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
                            disabled
                        />
                        <TextField
                            label="竞赛成绩 / award"
                            style={{ marginBottom: 10, width: '45%' }}
                            defaultValue={window.awards}
                            disabled
                        />
                    </View>
                    <View style={[pageStyles.pageRow, { flex: 7, alignItems: 'flex-start', width: '100%' }]}>
                        <TextField
                            label="个人陈述 / self introduction"
                            multiline={true}
                            maxRows={6}
                            style={{ marginBottom: 10, width: '90%' }}
                            defaultValue={window.selfIntroduction}
                            disabled
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
                            onClick={handleReturn}
                            sx={{
                                display: 'flex',
                                width: '20%',
                                bgcolor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                alignItems: 'center',
                            }}
                        >
                            返回信息列表
                        </Button>
                    </View>
                </Paper>
            </View>
        </Structure>
    )
}





