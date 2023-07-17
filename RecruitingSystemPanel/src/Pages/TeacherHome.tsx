import React from 'react'
import General, { Structure } from '../../src/Pages/Teacher'
import { pageStyles } from './App'
import { Text, View } from 'react-native'

export const TeacherHome: React.FC = () => {
    const general = new General()
    return (
        <Structure general={general}>
            <View style={[pageStyles.pageRow, { flex: 1, marginBottom: '2%' }]}>
                <Text style={{ fontSize: 40, fontWeight: 'bold', fontFamily: 'Roboto Mono, monospace' }}>
                    ---教师端---
                </Text>
            </View>
            <View style={[pageStyles.pageRow, { flex: 7, alignItems: 'flex-start', width: '93%' }]}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'Roboto Mono, monospace' }}>
                    {'  这里是教师端  '}
                </Text>
            </View>
        </Structure>
    )
}