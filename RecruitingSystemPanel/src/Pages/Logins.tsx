import React, { useState } from 'react'
import { Button, Divider, IconButton, Snackbar, TextField } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { pageStyles } from './App'
import iiis_logo from '../static/icon/iiis_logo.png'
import calligraphy from '../static/icon/calligraphy2.png'
import { View } from 'react-native'
import { getVerification } from '../Plugins/UserServiceApi/getVerification'
import HelpIcon from '@mui/icons-material/Help'
import zh from '../static/icon/zh.svg'
import en from '../static/icon/en.svg'

export default class General {
    history = useHistory()
    emailRegex = '\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*'

    rerender: any
    setRerender: any

    account: any
    email: any
    isVerificationCodeSent: any
    verificationCode: any
    password: any
    passwordConfirm: any

    setAccount: any
    setEmail: any
    setVerificationCode: any
    setIsVerificationCodeSent: any
    setPassword: any
    setPasswordConfirm: any

    snackbarMessage: any
    setSnackbarMessage: any
    setSnackbarOpen: any
    snackbarOpen: any

    getIsVerificationCodeSent = () => {
        return this.isVerificationCodeSent
    }

    // handleGoto
    handleGotoLogin = () => {
        this.history.push('/Login')
    }
    handleGotoRegister = () => {
        this.history.push('/Register')
    }
    handleGotoPassword = async () => {
        this.history.push('/Password')
    }
    // handleGeneralChange
    handleAccountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setAccount(event.target.value)
    }
    handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setEmail(event.target.value)
    }
    handleVerificationCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setVerificationCode(event.target.value)
    }
    handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setPassword(event.target.value)
    }
    handlePasswordConfirmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setPasswordConfirm(event.target.value)
    }
    handleVerificationCodeRequest = () => {
        if (this.formatTestEmail()) {
            new getVerification(this.email).send(
                data => {
                    if (data == '0') {
                        this.displayMessage(
                            window.isEnglish ? 'Verification code has been sent to email' : '验证码已发送至邮箱'
                        )
                        this.setIsVerificationCodeSent(true)
                    } else {
                        this.displayMessage(
                            window.isEnglish ? 'Email is invalid or not registered' : '邮箱无效或未注册'
                        )
                        this.setIsVerificationCodeSent(true)
                    }
                },
                error => {
                    this.displayMessage(window.isEnglish ? 'Unknown error' : '未知错误：' + error)
                    this.setIsVerificationCodeSent(true)
                }
            )
        }
    }
    handleSnackbarClose = () => {
        this.setSnackbarOpen(false)
    }
    displayMessage = (message: string) => {
        this.setSnackbarMessage(message)
        this.setSnackbarOpen(true)
    }
    //formatTest
    formatTestAccount = () => {
        if (this.account.length == 0) {
            this.displayMessage(window.isEnglish ? 'Please input account' : '请输入账号')
        } else {
            return true
        }
        return false
    }
    formatTestEmail = () => {
        if (this.email.length == 0) {
            this.displayMessage(window.isEnglish ? 'Please input email' : '请输入电子邮箱')
        } else if (!this.email.match(this.emailRegex)) {
            this.displayMessage(window.isEnglish ? 'Email format error' : '邮箱格式错误')
        } else {
            return true
        }
        return false
    }
    formatTestVerificationCode = () => {
        if (this.verificationCode.length == 0) {
            this.displayMessage(window.isEnglish ? 'Please input verification code' : '请输入验证码')
        } else {
            return true
        }
        return false
    }
    formatTestPassword = () => {
        if (this.password.length == 0) {
            this.displayMessage(window.isEnglish ? 'Please input password' : '请输入密码')
        } else if (this.password.length < 8 || this.password.length > 30) {
            this.displayMessage(window.isEnglish ? 'Password should be 8-30 characters' : '密码应为8-30个字符')
        } else {
            return true
        }
        return false
    }
    formatTestPasswordConfirm = () => {
        if (this.passwordConfirm.length == 0) {
            this.displayMessage(window.isEnglish ? 'Please confirm password' : '请确认密码')
        } else if (this.password != this.passwordConfirm) {
            this.displayMessage(window.isEnglish ? 'Passwords do not match' : '密码不匹配')
        } else {
            return true
        }
        return false
    }

    constructor() {
        ;[this.rerender, this.setRerender] = useState<boolean>(false)
        ;[this.account, this.setAccount] = useState<string>('')
        ;[this.email, this.setEmail] = useState<string>('')
        ;[this.isVerificationCodeSent, this.setIsVerificationCodeSent] = useState<boolean>(false)
        ;[this.verificationCode, this.setVerificationCode] = useState<string>('')
        ;[this.password, this.setPassword] = useState<string>('')
        ;[this.passwordConfirm, this.setPasswordConfirm] = useState<string>('')
        ;[this.snackbarMessage, this.setSnackbarMessage] = useState<string>('')
        ;[this.snackbarOpen, this.setSnackbarOpen] = useState<boolean>(false)
    }
}

export const Structure = (props: any) => {
    return (
        <View style={pageStyles.root}>
            <View style={[pageStyles.pageColumn, { width: '75%', marginTop: '10%' }]}>
                <View style={pageStyles.roundPanel}>
                    <View style={[pageStyles.pageRow, { margin: '2%', height: '8%' }]}>
                        <img src={iiis_logo} alt={window.isEnglish ? 'IIIS, THU' : '清华大学交叉信息研究院'} />
                    </View>
                    <Divider flexItem orientation={'vertical'} style={{ textAlign: 'center', width: '60%' }} />
                    <View style={[pageStyles.pageRow, { margin: '2%', height: '7%' }]}>
                        <img
                            src={calligraphy}
                            alt={window.isEnglish ? 'Secondary Recruiting System' : '二次招生系统'}
                        />
                    </View>
                    <View style={[pageStyles.pageRow, { width: '100%', marginBottom: '2%' }]}>
                        <Button
                            style={props.cond == 'login' ? pageStyles.buttonLoginsChosen : pageStyles.buttonLogins}
                            onClick={props.general.handleGotoLogin}
                            fullWidth={true}
                            sx={{ margin: '1%' }}
                        >
                            {window.isEnglish ? 'LOGIN' : '登录'}
                        </Button>
                        <Button
                            style={props.cond == 'register' ? pageStyles.buttonLoginsChosen : pageStyles.buttonLogins}
                            onClick={props.general.handleGotoRegister}
                            fullWidth={true}
                            sx={{ margin: '1%' }}
                        >
                            {window.isEnglish ? 'REGISTER' : '注册'}
                        </Button>
                    </View>
                    {props.children}
                    <View style={[pageStyles.pageRow, { width: '100%', marginTop: '2%' }]}>
                        <IconButton
                            onClick={() => {
                                window.isEnglish = !window.isEnglish
                                props.general.setRerender(!props.general.rerender)
                            }}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'lightblue',
                                },
                            }}
                            size={'medium'}
                        >
                            <img src={window.isEnglish ? en : zh} alt={''} />
                        </IconButton>
                        <View style={[pageStyles.pageRow, { width: '60%', margin: '1%' }]}>
                            <Button style={pageStyles.buttonLogins} onClick={props.handleSubmit} fullWidth={true}>
                                {window.isEnglish ? 'SUBMIT' : '提交'}
                            </Button>
                        </View>
                        <IconButton
                            onClick={() => {
                                props.general.history.push('./Help')
                            }}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'lightblue',
                                },
                            }}
                            size={'medium'}
                        >
                            <HelpIcon />
                        </IconButton>
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

export const Account = (props: any) => {
    return (
        <View style={[pageStyles.pageRow, { margin: '1%', width: '85%' }]}>
            <TextField
                required
                label={window.isEnglish ? 'Account' : '账号'}
                value={props.general.account}
                onChange={props.general.handleAccountChange}
                variant={'standard'}
                fullWidth={true}
            />
        </View>
    )
}

export const Email = (props: any) => {
    return (
        <View style={[pageStyles.pageRow, { margin: '1%', width: '85%' }]}>
            <TextField
                required
                label={window.isEnglish ? 'Email' : '电子邮箱'}
                value={props.general.email}
                onChange={props.general.handleEmailChange}
                variant={'standard'}
                fullWidth={true}
            />
        </View>
    )
}

export const VerificationCode = (props: any) => {
    return (
        <View style={[pageStyles.pageRow, { margin: '1%', width: '85%' }]}>
            <TextField
                required
                label={window.isEnglish ? 'Verification code' : '验证码'}
                value={props.general.verificationCode}
                onChange={props.general.handleVerificationCodeChange}
                fullWidth={true}
                variant={'standard'}
                InputProps={{
                    endAdornment: (
                        <Button
                            style={{ textTransform: 'none' }}
                            variant="text"
                            onClick={props.general.handleVerificationCodeRequest}
                        >
                            {window.isEnglish ? 'Send' : '发送'}
                        </Button>
                    ),
                }}
            />
        </View>
    )
}

export const Password = (props: any) => {
    return (
        <View style={[pageStyles.pageRow, { margin: '1%', width: '85%' }]}>
            <TextField
                required
                label={window.isEnglish ? (props.new ? 'New password' : 'Password') : props.new ? '新密码' : '密码'}
                type="password"
                value={props.general.password}
                onChange={props.general.handlePasswordChange}
                fullWidth={true}
                variant={'standard'}
                InputProps={props.InputProps}
            />
        </View>
    )
}

export const PasswordConfirm = (props: any) => {
    return (
        <View style={[pageStyles.pageRow, { margin: '1%', width: '85%' }]}>
            <TextField
                required
                label={window.isEnglish ? 'Confirm password' : '确认密码'}
                type="password"
                variant={'standard'}
                value={props.general.passwordConfirm}
                onChange={props.general.handlePasswordConfirmChange}
                fullWidth={true}
            />
        </View>
    )
}