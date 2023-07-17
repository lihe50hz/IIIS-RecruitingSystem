import React, { useEffect, useState } from 'react'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { pageStyles, theme } from './App'
import { View } from 'react-native'
import { ProblemAnswer } from '../Plugins/ExamServiceShared/ProblemAnswer'
import { getAnswer } from '../Plugins/ExamServiceApi/getAnswer'
import { ExamAnswer } from '../Plugins/ExamServiceShared/ExamAnswer'
import { updateStudentScore } from '../Plugins/ExamServiceApi/updateStudentScore'
import { removeExamAnswer } from '../Plugins/ExamServiceApi/removeExamAnswer'
import General, { Structure } from '../../src/Pages/Teacher'

const { InlineMath } = require('react-katex')

export const TeacherScoring: React.FC = () => {
    const general = new General()
    const [answerArray, setAnswerArray] = useState<ProblemAnswer[]>([])
    const [shouldRender, setShouldRender] = useState<boolean>(false)
    const [currentUserName, setCurrentUserName] = useState('')
    const [currentExamName, setCurrentExamName] = useState('')
    const [examAnswer, setExamAnswer] = useState<ExamAnswer>(new ExamAnswer(0, '', 0, '', '', [], 0))
    const [totalScore, setTotalScore] = useState(0)

    useEffect(() => {
        new getAnswer(window.currentAnswerIndex).send(
            data => {
                const tmp: ExamAnswer = JSON.parse(data)
                setAnswerArray(tmp.answers)
                setCurrentUserName(tmp.userName)
                setCurrentExamName(tmp.examName)
                setExamAnswer(tmp)
                setShouldRender(true)
            },
            error => {
                console.log('发送失败')
            }
        )
    }, [])
    const handleScoreChange = (index: number, score: number) => {
        const tmpArray = answerArray
        setTotalScore(totalScore - tmpArray[index].score)
        tmpArray[index].score = score
        setTotalScore(totalScore + score)
        setAnswerArray(tmpArray)
    }

    const handleEndScoring = () => {
        new removeExamAnswer(examAnswer.index).send(
            data => {
                console.log('发送成功')
            },
            error => {
                console.log('发送失败')
            }
        )
        new updateStudentScore(
            new ExamAnswer(
                examAnswer.index,
                currentUserName,
                examAnswer.paperIndex,
                currentExamName,
                examAnswer.examYear,
                answerArray,
                totalScore
            )
        ).send(
            data => {
                console.log('发送成功')
            },
            error => {
                console.log('发送失败')
            }
        )
        general.history.push('/Teacher/Score')
    }

    return (
        <Structure general={general}>
            <Paper sx={{ overflow: 'auto', maxHeight: 500, width: '90%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Typography style={{ fontSize: 40, fontWeight: 'bold', fontFamily: 'Roboto Mono, monospace' }}>
                        {currentExamName}-{currentUserName}
                    </Typography>
                </Box>
                {shouldRender && (
                    <Box sx={{ p: 10, width: '90%' }}>
                        {answerArray.map((answer, index) => (
                            <View
                                style={[
                                    pageStyles.pageRow,
                                    {
                                        flex: 4,
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 5,
                                    },
                                ]}
                            >
                                <MyProblemScoring
                                    problemIndex={index}
                                    answer={answer}
                                    onScoringChange={handleScoreChange}
                                />
                            </View>
                        ))}
                    </Box>
                )}
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Box sx={{ width: '70%' }} />
                    <Typography style={{ fontSize: 40, fontWeight: 'bold', fontFamily: 'Roboto Mono, monospace' }}>
                        总分：{totalScore}
                    </Typography>
                </Box>
                <View
                    style={[
                        pageStyles.pageRow,
                        {
                            flex: 4,
                            width: '100%',
                            alignSelf: 'center',
                            justifyContent: 'center',
                            borderRadius: 5,
                        },
                    ]}
                >
                    <Button
                        sx={{
                            color: theme.palette.primary.main,
                            height: '100%',
                        }}
                        onClick={handleEndScoring}
                    >
                        <Typography variant="h5" align="center">
                            判卷完成
                        </Typography>
                    </Button>
                </View>
            </Paper>
        </Structure>
    )
}

interface ParamsToScoring {
    problemIndex: number
    answer: ProblemAnswer
    onScoringChange: (index: number, score: number) => void
}

export const MyProblemScoring: React.FC<ParamsToScoring> = ({ problemIndex, answer, onScoringChange }) => {
    const [scoring, setScoring] = useState('')
    const [TeXDescription, setTeXDescription] = useState('')
    useEffect(() => {
        const re1 = new RegExp(' ', 'g')
        const re2 = new RegExp('\\n', 'g')
        setTeXDescription(answer.problem.description.replace(re1, '~').replace(re2, '\\\\'))
    })
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setScoring(event.target.value)
    }
    const handleSave = () => {
        if (!isNaN(parseFloat(scoring))) onScoringChange(problemIndex, parseFloat(scoring))
    }

    return (
        <View
            style={[
                pageStyles.pageColumn,
                {
                    flex: 4,
                    width: '25%',
                    height: '85%',
                    justifyContent: 'flex-start',
                    marginBottom: '3%',
                    marginRight: '5%',
                    borderRadius: 5,
                },
            ]}
        >
            <Box
                sx={{
                    m: 2,
                    p: 2,
                    border: '2px solid black',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '100%',
                    borderRadius: '5px',
                }}
            >
                <Typography variant="h6" align="left">
                    {'Problem ' + problemIndex}
                </Typography>
                <InlineMath>{TeXDescription}</InlineMath>
                <img src={answer.problem.image} alt="" />
                {answer.problem.problemType == 'Choice' && (
                    <Typography>{"Student's Answer: " + answer.studentChoice}</Typography>
                )}
                {answer.problem.problemType == 'FillIn' && (
                    <Typography>{"Student's Answer: " + answer.studentAnswer}</Typography>
                )}
                {answer.problem.problemType == 'Image' && (
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography>Student's Answer:</Typography>
                        <img src={answer.studentImage} alt="" />
                    </Box>
                )}
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextField
                        label={'Your scoring for Problem ' + problemIndex}
                        onChange={handleChange}
                        style={{ marginBottom: 10 }}
                    />
                    <Button variant="contained" type="submit" color="primary" onClick={handleSave}>
                        保存评分
                    </Button>
                </Box>
            </Box>
        </View>
    )
}