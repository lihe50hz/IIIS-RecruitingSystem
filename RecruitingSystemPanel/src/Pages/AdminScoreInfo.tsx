import React, { useState } from 'react'
import { Box, Button, Paper, TextField } from '@mui/material'
import General, { Structure } from './Admin'
import { Text, View } from "react-native";
import { pageStyles, theme } from "./App";

export const AdminScoreInfo: React.FC = () => {
    const general = new General()
    const [examYear, setExamYear] = useState('2022')
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExamYear(event.target.value)
    }
    const handleClick = () => {
        window.currentExamYear = examYear
        general.history.push('/Admin/ScoreStudentList')
    }
    return (
        <Structure general={general}>
            <View style={[pageStyles.pageRow, { flex: 1, marginRight: '1%' }]}>
                <Text
                    style={{
                        fontSize: 40,
                        color: theme.palette.primary.dark,
                        fontWeight: 'bold',
                        fontFamily: 'Roboto Mono, monospace',
                    }}
                >
                    ---成绩管理---
                </Text>
            </View>
            <View style={[pageStyles.pageRow, { flex: 7, alignItems: 'flex-start', width: '100%' }]}>
                <Paper sx={{ overflow: 'auto', maxHeight: '100%', width: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, width: '95%', alignItems: 'center' }}>
                        <TextField
                            label="请输入年份"
                            style={{ marginBottom: 10, width: '80%' }}
                            value={examYear}
                            onChange={handleChange}
                        />
                        <Button variant="contained" type="submit" color="primary" onClick={handleClick}>
                            查询
                        </Button>
                    </Box>
                </Paper>
            </View>
        </Structure>
    )
}

