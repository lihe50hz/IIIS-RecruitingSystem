import React, { useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Text, View } from 'react-native'
import { pageStyles, theme } from './App'
import { Button, Collapse, Divider, IconButton } from '@mui/material'
import iiis_logo from '../static/icon/iiis_logo.png'
import DehazeIcon from '@mui/icons-material/Dehaze'
import calligraphy from '../static/icon/white_calligraphy2.png'
import HomeIcon from '@mui/icons-material/Home'
import en from '../static/icon/en_w.svg'
import zh from '../static/icon/zh_w.svg'
import LogoutIcon from '@mui/icons-material/Logout'
import ContactsIcon from '@mui/icons-material/Contacts'
import EmailIcon from '@mui/icons-material/Email'
import QuizIcon from '@mui/icons-material/Quiz'
import { login } from "../Plugins/UserServiceApi/login";

export default class General {
    rerender: any
    setRerender: any
    history = useHistory()

    handleReturnHome = () => {
        this.history.push('/Admin')
    }
    handleUsersInfo = () => {
        this.history.push('/Admin/Users')
    }
    handleMessagesInfo = () => {
        this.history.push('/Admin/StudentMessages')
    }
    handleExamsInfo = () => {
        this.history.push('/Admin/ExamInfo')
    }
    handleScoreInfo = () => {
        this.history.push('/Admin/ScoreInfo')
    }
    handleExamManage = () => {
        this.history.push('/Admin/ExamManage')
    }
    handleLogout = () => {
        window.userName = ''
        window.isLogged = false
        this.history.push('/')
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
                        if(data!="-2"){
                            this.history.push('/')
                        }
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
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 26,
                        }}
                    >
                        {window.isEnglish ? 'ADMINISTRATOR' : '管理端'}
                    </Text>
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
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                backgroundColor: theme.palette.secondary.dark,
                                borderBottomLeftRadius: 10,
                            },
                        ]}
                    >
                        <Button
                            style={pageStyles.buttonPanelChosen}
                            onClick={props.general.handleReturnHome}
                            fullWidth={true}
                        >
                            <IconButton size={'large'} disabled sx={{ color: 'white !important' }}>
                                <HomeIcon />
                            </IconButton>
                            <Text style={{ color: 'white', fontSize: 16 }}>{window.isBarOpen?' 返回主页 ':''}</Text>
                        </Button>
                        <Divider flexItem style={{ textAlign: 'center', width: '100%' }} />
                        <Button
                            style={pageStyles.buttonPanelChosen}
                            onClick={props.general.handleUsersInfo}
                            fullWidth={true}
                        >
                            <IconButton size={'large'} disabled sx={{ color: 'white !important' }}>
                                <ContactsIcon />
                            </IconButton>
                            <Text style={{ color: 'white', fontSize: 16 }}>{window.isBarOpen?' 用户信息管理 ':''}</Text>
                        </Button>
                        <Divider flexItem style={{ textAlign: 'center', width: '100%' }} />
                        <Button
                            style={pageStyles.buttonPanelChosen}
                            onClick={props.general.handleMessagesInfo}
                            fullWidth={true}
                        >
                            <IconButton size={'large'} disabled sx={{ color: 'white !important' }}>
                                <EmailIcon />
                            </IconButton>
                            <Text style={{ color: 'white', fontSize: 16 }}>{window.isBarOpen?' 通知信息管理 ':''}</Text>
                        </Button>
                        <Divider flexItem style={{ textAlign: 'center', width: '100%' }} />
                        <Button
                            style={pageStyles.buttonPanelChosen}
                            onClick={props.general.handleExamsInfo}
                            fullWidth={true}
                        >
                            <IconButton size={'large'} disabled sx={{ color: 'white !important' }}>
                                <EmailIcon />
                            </IconButton>
                            <Text style={{ color: 'white', fontSize: 16 }}>{window.isBarOpen?' 报名人员管理 ':''}</Text>
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
                            borderBottomRightRadius: window.isBarOpen?20:0,
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
                <Collapse orientation="horizontal"  in={window.isBarOpen} collapsedSize={'4.4%'} style={{height:window.isBarOpen?'auto':'100%'}}>
                    <View
                        style={[
                            pageStyles.pageColumn,
                            {
                                alignItems: 'flex-end',
                                justifyContent: 'flex-end',
                                backgroundColor: theme.palette.secondary.dark,
                                borderBottomRightRadius: 10,
                            },
                        ]}
                    >
                        <Divider flexItem style={{ textAlign: 'center', width: '100%' }} />
                        <Button
                            style={pageStyles.buttonPanelChosen}
                            onClick={props.general.handleExamManage}
                            fullWidth={true}

                        >
                            <IconButton size={'large'} disabled sx={{ color: 'white !important' }}>
                                <QuizIcon />
                            </IconButton>
                            <Text style={{ color: 'white', fontSize: 16 }}>{window.isBarOpen?' 考试进程管理 ':''}</Text>
                        </Button>
                        <Divider flexItem style={{ textAlign: 'center', width: '100%' }} />
                        <Button
                            style={pageStyles.buttonPanelChosen}
                            onClick={props.general.handleScoreInfo}
                            fullWidth={true}
                        >
                            <IconButton size={'large'} disabled sx={{ color: 'white !important' }}>
                                <QuizIcon />
                            </IconButton>
                            <Text style={{ color: 'white', fontSize: 16 }}>{window.isBarOpen?' 成绩录取管理 ':''}</Text>
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
                            <IconButton disabled sx={{ color: 'white !important' }}>
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
            </View>
        </View>
    )
}
