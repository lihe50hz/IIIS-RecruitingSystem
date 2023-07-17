import React from 'react'
import { Text, View } from 'react-native'
import { pageStyles } from './App'

export const Help = () => {
    return (
        <View>
            <View style={[pageStyles.pageRow, { margin: '1%', width: '85%' }]}>
                <Text style={[pageStyles.text, { color: 'red', fontFamily: 'Times New Roman' }]}>
                    {window.isEnglish ? 'GENTLE REMINDER' : '温馨提示'}
                </Text>
            </View>
            <View style={[pageStyles.pageRow, { margin: '1%', width: '85%' }]}>
                <Text style={[pageStyles.text, { fontFamily: 'Times New Roman' }]}>
                    {window.isEnglish
                        ? '1. This system is used for the registration and online assessment of the secondary recruiting of the Institute for Interdisciplinary Information Sciences (IIIS), Tsinghua University.\n\n' +
                          '2. You need to register first. Please be sure to fill in the information truthfully and your email address is valid.\n\n' +
                          '3. It is recommended to use Chrome or Edge for your safe and smooth sign-up.\n\n' +
                          '4. Please do not use the same computer for multiple people to sign up. Please log out after your operation.\n\n' +
                          '5. If you have any questions during the use of the system, please click the button above to view the help page, or contact us by email: iiis@mail.tsinghua.edu.cn.'
                        : '\t1、本系统用于清华大学交叉信息研究院 (IIIS) 二次招生的报名和线上考核。\n' +
                          '\t2、首次使用本系统需要进行注册，请务必如实填写注册信息，注册时须绑定本人邮箱，请务必确认本人邮箱有效。\n' +
                          '\t3、为保证安全流畅填报信息，推荐使用 Chrome、Edge 浏览器，如果使用 360、搜狗浏览器，请切换至极速模式。\n' +
                          '\t4、请勿多人使用同一台电脑反复填报，操作完成后请及时登出本人账号，避免他人误操作影响申报。\n' +
                          '\t5、系统使用过程中遇到疑问，可点击上方按钮查看帮助页面，或通过邮件联系我们：iiis@mail.tsinghua.edu.cn。'}
                </Text>
            </View>
        </View>
    )
}