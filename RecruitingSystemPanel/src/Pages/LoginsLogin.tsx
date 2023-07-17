import React, { useEffect } from 'react'
import General, { Account, Password, Structure } from './Logins'
import { login } from '../Plugins/UserServiceApi/login'
import { setUserToken } from '../Plugins/CommonUtils/Store/UserTokenStore'
import { Button } from '@mui/material'

export const LoginsLogin: React.FC = () => {
    const general = new General()
    useEffect(() => {
        if (window.isBlocked) {
            general.displayMessage('请登录')
        }
        window.isBlocked = false
    })
    const handleSubmit = async () => {
        if (general.formatTestAccount() && general.formatTestPassword()) {
            new login(general.account, general.password).send(
                data => {
                    setUserToken(data)
                    if (data != '1') {
                        general.displayMessage(window.isEnglish ? 'Login Successfully' : '登录成功')
                        localStorage.setItem("userName",general.account)
                        localStorage.setItem("password",general.password)
                        localStorage.setItem("userType",data)
                        window.isLogged = true
                        window.userName = general.account
                        window.password = general.password
                        if(data=="0")
                            general.history.push('/Student')
                        else if(data=="-1")
                            general.history.push('/Teacher')
                        else
                            general.history.push('/Admin')
                    } else {
                        general.displayMessage(window.isEnglish ? 'Login failed: ' : '登录失败：' + data)
                    }
                },
                error => {
                    general.displayMessage(window.isEnglish ? 'Failed to send messages: ' : '发送信息失败：' + error)
                }
            )
        }
    }
    return (
        <Structure general={general} handleSubmit={handleSubmit} cond={'login'}>
            <Account general={general} />
            <Password
                general={general}
                InputProps={{
                    endAdornment: (
                        <Button onClick={general.handleGotoPassword} style={{ textTransform: 'none', margin: '0%' }}>
                            {window.isEnglish ? 'Retrieve' : '找回'}
                        </Button>
                    ),
                }}
            />
        </Structure>
    )
}