import React, { useEffect, useState } from 'react'
import { Button, Paper, TextField, Typography } from '@mui/material'
import { pageStyles, theme } from './App'
import { Text, View } from 'react-native'
import { login } from '../Plugins/UserServiceApi/login'
import { setUserToken } from '../Plugins/CommonUtils/Store/UserTokenStore'
import { Message } from '../Plugins/MessageServiceShared/Message'
import { refreshMessage } from '../Plugins/MessageServiceApi/refreshMessage'
import { newMessage } from '../Plugins/MessageServiceApi/newMessage'
import { deleteMessage } from '../Plugins/MessageServiceApi/deleteMessage'
import { sendMessage } from '../Plugins/MessageServiceApi/sendMessage'
import { recallMessage } from '../Plugins/MessageServiceApi/recallMessage'
import ImageUpload from '../Plugins/MyComponent/upLoadImage'
import General, { Structure } from './Admin'

export const AdminMessages: React.FC = () => {
    const general = new General()
    const [snackBarMessage, setSnackBarMessage] = useState('')
    const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false)
    const [MessageTitle, setMessageTitle] = useState('')
    const [MessageContent, setMessageContent] = useState('')
    const [PicContent, setPicContent] = useState([''])
    const [flag, setflag] = useState(false)
    const [Target, setTarget] = useState('')
    const handleTargetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTarget(event.target.value)
    }
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessageTitle(event.target.value)
    }
    const handleImageChange = (images: File[]) => {
        const readerPromises: Promise<string>[] = []

        // Read each image using FileReader
        images.forEach(image => {
            const reader = new FileReader()
            const readerPromise = new Promise<string>(resolve => {
                reader.onload = event => {
                    if (event.target && event.target.result) {
                        resolve(event.target.result.toString())
                    }
                }
            })

            reader.readAsDataURL(image)
            readerPromises.push(readerPromise)
        })

        // Wait for all FileReader promises to resolve
        Promise.all(readerPromises)
            .then(dataURLs => {
                const updatedPicContent = [...dataURLs]
                setPicContent(updatedPicContent)
            })
            .catch(error => {
                console.error('Error reading images:', error)
            })
    }

    const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessageContent(event.target.value)
    }
    const handlePublish = async () => {
        new newMessage(window.userName, 'Admin', MessageContent, MessageTitle, PicContent, 'Unpublished', Target).send(
            data1 => {
                console.log('发送成功')
            },
            error => {
                console.log('发送失败')
            }
        )
        getmesbox()
    }
    const handleDelete = (mesRank: number) => {
        new deleteMessage(window.userName, 'Admin', mesRank).send(
            data => {
                console.log('删除成功')
            },
            error => {
                console.log('删除失败')
            }
        )
        getmesbox()
    }
    const handleSend = (mesRank: number) => {
        new sendMessage(window.userName, 'Admin', mesRank).send(
            data => {
                console.log('删除成功')
            },
            error => {
                console.log('删除失败')
            }
        )
        getmesbox()
    }
    const handleRecall = (mesRank: number) => {
        new recallMessage(window.userName, 'Admin', mesRank).send(
            data => {
                console.log('删除成功')
            },
            error => {
                console.log('删除失败')
            }
        )
        getmesbox()
    }
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
    const handleEdit = (mesRank: number, mesTitle: string, mesContent: string, tarName: string) => {
        setMessageTitle(mesTitle)
        setMessageContent(mesContent)
        setTarget(tarName.substring(0, tarName.length - 1))
        new deleteMessage(window.userName, 'Admin', mesRank).send(
            data => {
                console.log('删除成功')
            },
            error => {
                console.log('删除失败')
            }
        )
        getmesbox()
    }
    const [MesList, mesbox] = useState<Array<Message>>([])
    useEffect(() => {
        if (!flag) {
            getmesbox()
            setflag(true)
        }
    })
    const getmesbox = async () => {
        new refreshMessage(window.userName, 'Admin').send(
            list => {
                const tmp: Array<Message> = JSON.parse(list)
                mesbox(tmp)
            },
            error => {
                setSnackBarMessage('发送信息失败：' + { error })
                setSnackBarOpen(true)
            }
        )
    }
    return (
        <Structure general={general}>
            <View style={[pageStyles.pageRow, { flex: 1, marginRight: '4%' }]}>
                <Text
                    style={{
                        fontSize: 40,
                        color: theme.palette.primary.dark,
                        fontWeight: 'bold',
                        fontFamily: 'Roboto Mono, monospace',
                    }}
                >
                    ---公告管理---
                </Text>
            </View>
            <View style={[pageStyles.pageRow, { flex: 7, alignItems: 'flex-start' }]}>
                <View style={[pageStyles.pageColumn, { flex: 0.8, justifyContent: 'flex-start', marginRight: '2%' }]}>
                    <Paper sx={{ overflow: 'auto', maxHeight: '100%', width: '100%', backgroundColor: 'white' }}>
                        <View style={[pageStyles.pageRow, { flex: 1, justifyContent: 'center', marginTop: '1.5%' }]}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    color: theme.palette.primary.dark,
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto Mono, monospace',
                                }}
                            >
                                编辑公告
                            </Text>
                        </View>
                        <View
                            style={[
                                pageStyles.pageRow,
                                {
                                    width: '90%',
                                    justifyContent: 'center',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginTop: '1.5%',
                                },
                            ]}
                        >
                            <TextField
                                label="标题 / title"
                                fullWidth={true}
                                onChange={handleTitleChange}
                                value={MessageTitle}
                            />
                        </View>
                        <View
                            style={[
                                pageStyles.pageRow,
                                {
                                    width: '90%',
                                    justifyContent: 'center',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginTop: '1.5%',
                                },
                            ]}
                        >
                            <TextField
                                label="目标用户 / Target  (多个请以空格分割）"
                                fullWidth={true}
                                onChange={handleTargetChange}
                                value={Target}
                            />
                        </View>
                        <View
                            style={[
                                pageStyles.pageRow,
                                {
                                    width: '90%',
                                    justifyContent: 'center',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginTop: '2%',
                                },
                            ]}
                        >
                            <TextField
                                label="正文 / content"
                                multiline={true}
                                fullWidth={true}
                                maxRows={16}
                                onChange={handleContentChange}
                                value={MessageContent}
                            />
                        </View>
                        <View
                            style={[
                                pageStyles.pageRow,
                                {
                                    width: '90%',
                                    justifyContent: 'center',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginTop: '2%',
                                },
                            ]}
                        >
                            <ImageUpload onChange={handleImageChange} />
                        </View>
                        <View
                            style={[
                                pageStyles.pageRow,
                                {
                                    width: '85%',
                                    justifyContent: 'space-around',
                                    marginRight: 'auto',
                                    marginLeft: 'auto',
                                    marginTop: '5%',
                                    marginBottom: '1.5%',
                                },
                            ]}
                        >
                            <View style={[pageStyles.pageColumn, { backgroundColor: 'purple', borderRadius: 5 }]}>
                                <Button
                                    sx={{
                                        backgroundColor: theme.palette.primary.light,
                                        color: theme.palette.primary.contrastText,
                                    }}
                                    onClick={handlePublish}
                                >
                                    发送信息
                                </Button>
                            </View>
                            <View style={[pageStyles.pageColumn, { backgroundColor: 'purple', borderRadius: 5 }]}>
                                <Button
                                    sx={{
                                        backgroundColor: theme.palette.primary.light,
                                        color: theme.palette.primary.contrastText,
                                    }}
                                    onClick={getmesbox}
                                >
                                    刷新
                                </Button>
                            </View>
                        </View>
                    </Paper>
                </View>
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
                    <Paper sx={{ overflow: 'auto', maxHeight: '100%', width: '100%' }}>
                        <View style={[pageStyles.pageRow, { flex: 1, justifyContent: 'center', marginTop: '1.5%' }]}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    color: theme.palette.primary.dark,
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto Mono, monospace',
                                }}
                            >
                                已有公告
                            </Text>
                        </View>
                        <View style={[pageStyles.pageColumn, { width: '98.5%', justifyContent: 'flex-start'}]}>
                            {MesList.map(ite => (
                                <div style={{ width: '100%' }}>
                                    <View
                                        style={[
                                            pageStyles.pageRow,
                                            {
                                                justifyContent: 'flex-start',
                                                marginLeft: '1.5%',
                                            },
                                        ]}
                                    >
                                        <Typography style={{ fontSize: 24, color: 'black' }}>{'公告标题:'}</Typography>
                                        <Button
                                            sx={{ width: '80%', fontSize: 24 }}
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
                                            {ite.mesTitle}
                                        </Button>
                                    </View>
                                    <View
                                        style={[
                                            pageStyles.pageRow,
                                            {
                                                justifyContent: 'flex-start',
                                                marginLeft: '1.5%',
                                            },
                                        ]}
                                    >
                                        <Typography style={{ fontSize: 24, alignSelf: 'flex-start', color: 'black' }}>
                                            {'公告状态:  '}
                                            {ite.mesType}
                                            {'---发布时间: '}
                                            {ite.mesDate}
                                        </Typography>
                                    </View>
                                    <View
                                        style={[
                                            pageStyles.pageRow,
                                            {
                                                justifyContent: 'space-evenly',
                                                marginTop: '1%',
                                                marginBottom: '1%',
                                            },
                                        ]}
                                    >
                                        <View
                                            style={[
                                                pageStyles.pageColumn,
                                                {
                                                    backgroundColor: 'purple',
                                                    borderRadius: 5,
                                                },
                                            ]}
                                        >
                                            <Button
                                                sx={{
                                                    backgroundColor: theme.palette.primary.light,
                                                    color: theme.palette.primary.contrastText,
                                                }}
                                                onClick={() => handleDelete(ite.mesRank)}
                                            >
                                                删除公告
                                            </Button>
                                        </View>

                                        <View
                                            style={[
                                                pageStyles.pageColumn,
                                                {
                                                    backgroundColor: 'purple',
                                                    borderRadius: 5,
                                                },
                                            ]}
                                        >
                                            <Button
                                                sx={{
                                                    backgroundColor: theme.palette.primary.light,
                                                    color: theme.palette.primary.contrastText,
                                                }}
                                                onClick={() => handleSend(ite.mesRank)}
                                            >
                                                发送公告
                                            </Button>
                                        </View>
                                        <View
                                            style={[
                                                pageStyles.pageColumn,
                                                {
                                                    backgroundColor: 'purple',
                                                    borderRadius: 5,
                                                },
                                            ]}
                                        >
                                            <Button
                                                sx={{
                                                    backgroundColor: theme.palette.primary.light,
                                                    color: theme.palette.primary.contrastText,
                                                }}
                                                onClick={() => handleRecall(ite.mesRank)}
                                            >
                                                撤回公告
                                            </Button>
                                        </View>
                                        <View
                                            style={[
                                                pageStyles.pageColumn,
                                                {
                                                    backgroundColor: 'purple',
                                                    borderRadius: 5,
                                                },
                                            ]}
                                        >
                                            <Button
                                                sx={{
                                                    backgroundColor: theme.palette.primary.light,
                                                    color: theme.palette.primary.contrastText,
                                                }}
                                                onClick={() =>
                                                    handleEdit(
                                                        ite.mesRank,
                                                        ite.mesTitle,
                                                        ite.mesContent,
                                                        ite.tarName.substring(1)
                                                    )
                                                }
                                            >
                                                重新编辑公告
                                            </Button>
                                        </View>
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
