import { pageStyles, theme } from './App'
import { Text, View } from 'react-native'
import { Button, Collapse, Divider, IconButton, Snackbar } from '@mui/material'
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import iiis_logo from '../static/icon/white_logo.png'
import calligraphy from '../static/icon/white_calligraphy2.png'
import DehazeIcon from '@mui/icons-material/Dehaze'
import EmailIcon from '@mui/icons-material/Email'
import HomeIcon from '@mui/icons-material/Home'
import QuizIcon from '@mui/icons-material/Quiz'
import LogoutIcon from '@mui/icons-material/Logout'
import InfoIcon from '@mui/icons-material/Info'
import en from '../static/icon/en_w.svg'
import zh from '../static/icon/zh_w.svg'
import { login } from "../Plugins/UserServiceApi/login";

export default class General {
    history = useHistory()
    rerender: any
    setRerender: any
    nameShown = window.userName ? window.userName : '未知学生'

    snackbarMessage: any
    setSnackbarMessage: any
    setSnackbarOpen: any
    snackbarOpen: any

    handleExit = async () => {
        this.history.push('/Student')
    }
    handleMessageTable = () => {
        this.history.push('/Student/Messages')
    }
    handleExamService = () => {
        this.history.push('/Student/Exam')
    }
    handlePersonInfo = () => {
        this.history.push('/Student/Info')
    }
    handleLogout = () => {
        window.isLogged = false
        this.history.push('/')
    }

    handleSnackbarClose = () => {
        this.setSnackbarOpen(false)
    }
    displayMessage = (message: string) => {
        this.setSnackbarMessage(message)
        this.setSnackbarOpen(true)
    }

    constructor() {
        useEffect(()=>{
            const userName=localStorage.getItem("userName")
            if(userName!=null){
                window.userName=userName
            }else {
                window.userName=''
                window.password=''
                window.userType=''
            }
            const password=localStorage.getItem("password")
            if(password!=null) {
                window.password = password
            }else{
                window.userName=''
                window.password=''
                window.userType=''
            }
            const userType=localStorage.getItem("userType")
            if(userType!=null) {
                window.userType = userType
            }else{
                window.userName=''
                window.password=''
                window.userType=''
            }
            console.log(window.userName, window.password,window.userType)
            new login(window.userName, window.password).send(
                data => {
                    console.log(data)
                    if (data != '1') {
                        window.userType=data
                        localStorage.setItem("userType",data)
                    } else {
                        this.history.push('/')
                    }
                },
                error => {
                    this.history.push('/')
                }
            )
        });
        [this.rerender, this.setRerender] = useState<boolean>(false);
        [this.snackbarMessage, this.setSnackbarMessage] = useState<string>('');
        [this.snackbarOpen, this.setSnackbarOpen] = useState<boolean>(false);
    }
}

export const Structure = (props: any) => {
    return (
        <View style={[pageStyles.root, { flexDirection: 'column' }]}>
            <View
                style={[
                    pageStyles.pageRow,
                    {
                        height: '10%',
                        backgroundColor: theme.palette.primary.main,
                        padding: '1%',
                    },
                ]}
            >
                <IconButton
                    aria-label="dehaze"
                    size="large"
                    sx={{
                        color: 'white',
                    }}
                >
                    <DehazeIcon
                        onClick={() => {
                            window.isBarOpen = !window.isBarOpen
                            props.general.setRerender(!props.general.rerender)
                        }}
                    />
                </IconButton>
                <View style={[pageStyles.pageColumn, { alignItems: 'flex-start', flex: 1, marginRight: '2%' }]}>
                    <img src={iiis_logo} alt="清华大学交叉信息研究院" height="100%" />
                </View>
                <View style={[pageStyles.pageColumn, { alignItems: 'flex-start', flex: 0.8, marginRight: '2%' }]}>
                    <img src={calligraphy} alt="二次招生系统" height="100%" />
                </View>
                <View style={[pageStyles.pageColumn, { alignItems: 'flex-start', flex: 0.5 }]}>
                    <Text style={{ color: 'white', fontSize: 26 }}>{window.isEnglish ? 'STUDENT' : '学生端'}</Text>
                </View>
                <View style={[pageStyles.pageColumn, { alignItems: 'center', flex: 1.5 }]}>
                    <Text style={{ color: 'white', fontSize: 26 }}>
                        {window.isEnglish ? 'Welcome, ' : '欢迎，'}
                        {props.general.nameShown}
                    </Text>
                </View>
            </View>
            <View
                style={[
                    pageStyles.pageRow,
                    {
                        height: '90%',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                    },
                ]}
            >
                <Collapse orientation="horizontal" in={window.isBarOpen} collapsedSize={'4.4%'} style={{height:window.isBarOpen?'auto':'100%'}}>
                    <View
                        style={[
                            pageStyles.pageColumn,
                            {
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                backgroundColor: theme.palette.secondary.dark,
                                borderBottomLeftRadius: 10,
                            },
                        ]}
                    >
                        <Button
                            style={pageStyles.buttonPanelChosen}
                            onClick={props.general.handleExit}
                            fullWidth={true}
                        >
                            <IconButton aria-label="home" size={'large'} disabled sx={{ color: 'white !important' }}>
                                <HomeIcon />
                            </IconButton>
                            <Text style={{ color: 'white', fontSize: 16 }}>{window.isBarOpen?' 返回主页 ':''}</Text>
                        </Button>
                        <Divider flexItem style={{ textAlign: 'center', width: '100%' }} />
                        <Button
                            style={pageStyles.buttonPanelChosen}
                            onClick={props.general.handleMessageTable}
                            fullWidth={true}
                        >
                            <IconButton aria-label="email" size={'large'} disabled sx={{ color: 'white !important' }}>
                                <EmailIcon />
                            </IconButton>
                            <Text style={{ color: 'white', fontSize: 16 }}>{window.isBarOpen?' 查看公告 ':''}</Text>
                        </Button>
                        <Divider flexItem style={{ textAlign: 'center', width: '100%' }} />
                        <Button
                            style={pageStyles.buttonPanelChosen}
                            onClick={props.general.handlePersonInfo}
                            fullWidth={true}
                        >
                            <IconButton size={'large'} disabled sx={{ color: 'white !important' }}>
                                <InfoIcon/>
                            </IconButton>
                            <Text style={{ color: 'white', fontSize: 16 }}>{window.isBarOpen?' 个人信息 ':''}</Text>
                        </Button>
                        <Divider flexItem style={{ textAlign: 'center', width: '100%' }} />
                        <Button
                            style={pageStyles.buttonPanelChosen}
                            onClick={props.general.handleExamService}
                            fullWidth={true}
                        >
                            <IconButton aria-label="quiz" size={'large'} disabled sx={{ color: 'white !important' }}>
                                <QuizIcon />
                            </IconButton>
                            <Text style={{ color: 'white', fontSize: 16 }}>{window.isBarOpen?' 考试系统 ':''}</Text>
                        </Button>
                        <Divider flexItem style={{ textAlign: 'center', width: '100%' }} />
                        <Button
                            style={pageStyles.buttonPanelChosen}
                            onClick={() => {
                                window.isEnglish = !window.isEnglish
                                props.general.setRerender(!props.general.rerender)
                            }}
                            fullWidth={true}
                        >
                            <IconButton aria-label="delete" disabled sx={{ color: 'white !important' }}>
                                <img src={window.isEnglish ? en : zh} alt={''} />
                            </IconButton>
                            <Text style={{ color: 'white', fontSize: 16 }}>{window.isBarOpen?' 切换语言 ':''}</Text>
                        </Button>
                        <Divider flexItem style={{ textAlign: 'center', width: '100%' }} />
                        <Button
                            style={pageStyles.buttonPanelChosen}
                            onClick={props.general.handleLogout}
                            fullWidth={true}
                        >
                            <IconButton size={'large'} disabled sx={{ color: 'white !important' }}>
                                <LogoutIcon />
                            </IconButton>
                            <Text style={{ color: 'white', fontSize: 16 }}>{window.isBarOpen?' 退出系统 ':''}</Text>
                        </Button>
                    </View>
                </Collapse>
                <View
                    style={[
                        pageStyles.pageColumn,
                        {
                            backgroundColor: 'rgba(255,255,255,0.85)',
                            flex: 4,
                            width: '100%',
                            height: '100%',
                            justifyContent: 'flex-start',
                            marginBottom: '0%',
                            marginRight: '0%',
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomLeftRadius: window.isBarOpen?20:0,
                            borderBottomRightRadius: 20,
                        },
                    ]}
                >
                    <View
                        style={[
                            pageStyles.pageColumn,
                            {
                                backgroundColor: 'transparent',
                                flex: 4,
                                width: '92%',
                                height: '85%',
                                justifyContent: 'flex-start',
                                marginVertical: '3%',
                                marginHorizontal: '5%',
                            },
                        ]}
                    >
                        {props.children}
                    </View>
                </View>
            </View>
            <Snackbar
                open={props.general.snackbarOpen}
                onClose={props.general.handleSnackbarClose}
                message={props.general.snackbarMessage}
                autoHideDuration={3000}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            />
        </View>
    )
}