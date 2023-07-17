import React from 'react'
import { register } from '../Plugins/UserServiceApi/register'
import General, { Account, Email, Password, PasswordConfirm, Structure, VerificationCode } from './Logins'

export const LoginsRegister: React.FC = () => {
    const general = new General()
    const handleSubmit = async () => {
        if (
            general.formatTestVerificationCode() &&
            general.formatTestPassword() &&
            general.formatTestPasswordConfirm()
        ) {
            new register(general.account, general.password, general.email, general.verificationCode).send(
                data => {
                    if (data == '0') {
                        general.displayMessage(window.isEnglish ? 'Register Successfully' : '注册成功')
                        general.history.push('/Login')
                    } else if (data == '1') {
                        general.displayMessage(
                            window.isEnglish ? 'Registration failed: duplicate account' : '注册失败：名字重复'
                        )
                    } else if (data == '2') {
                        general.displayMessage(
                            window.isEnglish ? 'Registration failed: duplicate email' : '注册失败：邮箱重名'
                        )
                    } else {
                        general.displayMessage(window.isEnglish ? 'Verification code is wrong' : '验证码错误')
                    }
                },
                error => {
                    general.displayMessage(window.isEnglish ? 'Failed to send message: ' : '发送信息失败：' + { error })
                }
            )
        }
    }
    return (
        <Structure general={general} handleSubmit={handleSubmit} cond={'register'}>
            <Account general={general} />
            <Email general={general} />
            <VerificationCode general={general} />
            {general.getIsVerificationCodeSent() && <Password general={general} />}
            {general.getIsVerificationCodeSent() && <PasswordConfirm general={general} />}
        </Structure>
    )
}