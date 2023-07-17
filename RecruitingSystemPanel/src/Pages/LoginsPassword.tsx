import React from 'react'
import { resetPassword } from '../Plugins/UserServiceApi/resetPassword'
import General, { Email, Password, PasswordConfirm, Structure, VerificationCode } from './Logins'

export const LoginsPassword: React.FC = () => {
    const general = new General()
    const handleSubmit = () => {
        if (
            general.formatTestVerificationCode() &&
            general.formatTestPassword() &&
            general.formatTestPasswordConfirm()
        ) {
            new resetPassword(general.email, general.verificationCode, general.password).send(
                data => {
                    if (data == '0') {
                        general.displayMessage(window.isEnglish ? 'Password has been reset' : '密码已重置')
                    } else if (data == '1') {
                        general.displayMessage(window.isEnglish ? 'Wrong verification code' : '验证码错误')
                    } else {
                        general.displayMessage(window.isEnglish ? 'The email is not registered' : '该邮箱未被注册')
                    }
                },
                error => {
                    general.displayMessage(window.isEnglish ? 'Failed to send message: ' : '发送信息失败：' + error)
                }
            )
        }
    }
    return (
        <Structure general={general} handleSubmit={handleSubmit}>
            <Email general={general} />
            <VerificationCode general={general} />
            {general.getIsVerificationCodeSent() && <Password general={general} />}
            {general.getIsVerificationCodeSent() && <PasswordConfirm general={general} />}
        </Structure>
    )
}