import React, { useEffect, useState } from 'react'
import General, { Structure } from './Teacher'
import { SimpleExamAnswer } from '../Plugins/ExamServiceShared/SimpleExamAnswer'
import { getAllAnswers } from '../Plugins/ExamServiceApi/getAllAnswers'
import { Box, Button, Paper, Typography } from '@mui/material'

export const TeacherHomeScoreAnswers: React.FC = () => {
    const general = new General()
    const [answerArray, setAnswerArray] = useState<SimpleExamAnswer[]>([])
    const [shouldRender, setShouldRender] = useState<boolean>(false)

    useEffect(() => {
        new getAllAnswers().send(
            data => {
                const tmp: SimpleExamAnswer[] = JSON.parse(data)
                setAnswerArray(tmp)
                setShouldRender(true)
            },
            error => {
                console.log('发送失败')
            }
        )
    }, [])
    const handleClick = (index: number) => {
        return () => {
            window.currentAnswerIndex = index
            general.history.push('/Teacher/Scoring')
        }
    }

    return (
        <Structure general={general}>
            <Paper sx={{ overflow: 'auto', maxHeight: 400, width: '90%' }}>
                <Box sx={{ p: 4, width: '90%' }}>
                    {answerArray.map((answer, index) => (
                        <Box key={index}>
                            <Button>
                                <Typography variant="h6" align="left" onClick={handleClick(answer.index)}>
                                    {answer.examName}-{answer.userName}
                                </Typography>
                            </Button>
                        </Box>
                    ))}
                </Box>
            </Paper>
        </Structure>
    )
}