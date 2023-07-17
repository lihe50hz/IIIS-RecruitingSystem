import React, { useEffect, useState } from 'react'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { pageStyles, theme } from './App'
import General, { Structure } from '../../src/Pages/Student'
import { Text, View } from 'react-native'
import { RunningExamInfo } from '../Plugins/ExamServiceShared/RunningExamInfo'
import { getCurrentInfo } from '../Plugins/ExamServiceApi/getCurrentInfo'
import { ProblemAnswer } from '../Plugins/ExamServiceShared/ProblemAnswer'
import { Problem } from '../Plugins/ExamPaperServiceShared/Problem'
import { getExamPaper } from '../Plugins/ExamPaperServiceApi/getExamPaper'
import { ExamPaper } from '../Plugins/ExamPaperServiceShared/ExamPaper'
import { createExamAnswer } from '../Plugins/ExamServiceApi/createExamAnswer'
import { ExamAnswer } from '../Plugins/ExamServiceShared/ExamAnswer'
import WaterMarkContent from '../Plugins/MyComponent/WaterMarkContent'

const { InlineMath } = require('react-katex')

export const BeforeExam: React.FC = () => {
    const general = new General()
    const [examTitle, setExamTitle] = useState('Default Title')
    const [examStarted, setExamStarted] = useState<boolean>(false)
    const [examEnded, setExamEnded] = useState<boolean>(false)
    const [startTime, setStartTime] = useState('Default Start Time')
    const [endTime, setEndTime] = useState('Default End Time')

    const formatDate = (date: Date): string => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }

    useEffect(() => {
        if (!window.isLogged) {
            window.isBlocked = true
            general.history.push('/')
        }
        // 再加一条鉴权
        // 再加一条获取考试状态
        new getCurrentInfo(window.currentPaperIndex).send(
            data => {
                const tmp: RunningExamInfo = JSON.parse(data)
                window.currentStartTime = formatDate(new Date(tmp.startTime))
                window.currentEndTime = formatDate(new Date(tmp.endTime))
                window.currentExamName = tmp.examName
                setStartTime(window.currentStartTime)
                setEndTime(window.currentEndTime)
                setExamTitle(window.currentExamName)
                setExamStarted(Date.now() >= tmp.startTime)
                setExamEnded(Date.now() >= tmp.endTime)
            },
            error => {
                console.log('发送失败')
            }
        )
    })

    const handleGotoExam = () => {
        general.history.push('/Student/Exams/Running')
    }

    return (
        <Structure general={general}>
            <View
                style={[
                    pageStyles.pageRow,
                    {
                        width: '85%',
                        justifyContent: 'space-around',
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        marginTop: '1.5%',
                        marginBottom: '1.5%',
                    },
                ]}
            >
                <View style={[pageStyles.pageRow, { flex: 1, justifyContent: 'center', marginTop: '1.5%' }]}>
                    <Text
                        style={{
                            fontSize: 32,
                            color: theme.palette.primary.main,
                            fontWeight: 'bold',
                            fontFamily: 'Roboto Mono, monospace',
                        }}
                    >
                        当前考试
                    </Text>
                </View>
            </View>
            <View style={[pageStyles.pageRow, { flex: 7, alignItems: 'flex-start' }]}>
                <Paper sx={{ overflow: 'auto', maxHeight: '100%', width: '100%' }}>
                    {examStarted && !examEnded && (
                        <View style={[pageStyles.pageRow, { flex: 7, alignItems: 'flex-start' }]}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    p: 1,
                                    m: 1,
                                    bgcolor: 'transparent',
                                    color: theme.palette.primary.main,
                                    width: '50%',
                                    height: '50%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '2px solid black',
                                    borderRadius: '10px',
                                }}
                            >
                                <Typography variant="h5" align="center" color="red">
                                    考试已开始
                                </Typography>
                                <Typography variant="h5" align="center">
                                    考试名称：{examTitle}
                                </Typography>
                                <Typography variant="h6" align="center">
                                    考试时间：{startTime} ~ {endTime}
                                </Typography>
                                <Button
                                    style={{ color: theme.palette.primary.main }}
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleGotoExam}
                                    sx={{ marginTop: 2 }}
                                >
                                    进入考试
                                </Button>
                            </Box>
                        </View>
                    )}
                    {!examStarted && (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                p: 1,
                                m: 1,
                                bgcolor: 'transparent',
                                color: theme.palette.primary.main,
                                width: '50%',
                                height: '50%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid black',
                                borderRadius: '10px',
                            }}
                        >
                            <Typography variant="h5" align="center" color="red">
                                考试未开始
                            </Typography>
                            <Typography variant="h5" align="center">
                                考试名称：{examTitle}
                            </Typography>
                            <Typography variant="h6" align="center">
                                考试时间：{startTime} ~ {endTime}
                            </Typography>
                        </Box>
                    )}
                    {examEnded && (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                p: 1,
                                m: 1,
                                bgcolor: 'transparent',
                                color: theme.palette.primary.main,
                                width: '50%',
                                height: '50%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid black',
                                borderRadius: '10px',
                            }}
                        >
                            <Typography variant="h5" align="center" color="red">
                                考试已结束
                            </Typography>
                            <Typography variant="h5" align="center">
                                考试名称：{examTitle}
                            </Typography>
                            <Typography variant="h6" align="center">
                                考试时间：{startTime} ~ {endTime}
                            </Typography>
                        </Box>
                    )}
                </Paper>
            </View>
        </Structure>
    )
}

export const StudentExamPage: React.FC = () => {
    const general = new General()
    const [problemArray, setProblemArray] = useState<Problem[]>([])
    const [answerArray, setAnswerArray] = useState<ProblemAnswer[]>([])
    const [shouldRender, setShouldRender] = useState<boolean>(false)

    useEffect(() => {
        if (!window.isLogged) {
            window.isBlocked = true
            general.history.push('/')
        }
        new getExamPaper(window.currentPaperIndex).send(
            data => {
                const tmp: ExamPaper = JSON.parse(data)
                setProblemArray(tmp.problems)
                setAnswerArray(Array(tmp.problems.length).fill(null))
                setShouldRender(true)
            },
            error => {
                console.log('获取考试失败')
            }
        )
    }, [])
    const handleAnswerChange = (index: number, answer: ProblemAnswer) => {
        const tmpArray = answerArray
        tmpArray[index] = answer
        setAnswerArray(tmpArray)
    }

    const handleHandIn = () => {
        new createExamAnswer(
            new ExamAnswer(
                0,
                window.userName,
                window.currentPaperIndex,
                window.currentExamName,
                window.currentExamYear,
                answerArray,
                0
            )
        ).send(
            data => {
                console.log('发送成功')
            },
            error => {
                console.log('发送失败')
            }
        )
        general.history.push('/Student/Exams/After')
    }

    const checkEnd = () => {
        const nowTime = Date.now()
        if (nowTime >= new Date(window.currentEndTime).getTime()) {
            handleHandIn()
            setTimeout(() => {
                clearInterval(timer)
            }, 0)
        }
    }
    const [timer, setTimer] = useState<NodeJS.Timeout>(setInterval(checkEnd, 1000))

    return (
        <Structure general={general}>

            <View style={[pageStyles.pageColumn, { flex: 1, alignSelf: 'center', height: '90%', width: '100%' }]}>
                {{ shouldRender } && (
                    <Paper sx={{ overflow: 'auto', maxHeight: 500, width: '100%' }}>
                        <View style={[pageStyles.pageRow, { flex: 1, alignSelf: 'center'}]}>
                            <Typography
                                style={{ fontSize: 40, fontWeight: 'bold', fontFamily: 'Roboto Mono, monospace' }}
                            >
                                {window.currentExamName}
                            </Typography>
                        </View>

                            {problemArray.map((problem, index) => (
                                    <View key={index} style={[pageStyles.pageRow,{justifyContent:'center'}]}>
                                        {problem.problemType == 'Choice' && (
                                            <MyChoiceProblem
                                                problemIndex={index}
                                                problem={problem}
                                                onAnswerChange={handleAnswerChange}
                                            />
                                        )}
                                        {problem.problemType == 'FillIn' && (
                                            <MyFillInProblem
                                                problemIndex={index}
                                                problem={problem}
                                                onAnswerChange={handleAnswerChange}
                                            />
                                        )}
                                        {problem.problemType == 'Image' && (
                                            <MyImageProblem
                                                problemIndex={index}
                                                problem={problem}
                                                onAnswerChange={handleAnswerChange}
                                            />
                                        )}
                                    </View>
                            ))}

                        <View
                            style={[
                                pageStyles.pageColumn,
                                {
                                    flex: 5,
                                    width: '100%',
                                    height: '90%',
                                    justifyContent: 'flex-start',
                                    marginBottom: '3%',
                                    marginRight: '3%',
                                },
                            ]}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Box sx={{ width: '70%' }} />
                                <Button variant="contained" type="submit" color="primary" onClick={handleHandIn}>
                                    交卷
                                </Button>
                            </Box>
                        </View>
                    </Paper>
                )}
            </View>

        </Structure>
    )
}

export const AfterExam: React.FC = () => {
    const general = new General()
    useEffect(() => {
        if (!window.isLogged) {
            window.isBlocked = true
            general.history.push('/')
        }
        // 再加一条鉴权
        // 再加一条获取考试状态
    }, [])

    return (
        <Structure general={general}>
            <View
                style={[
                    pageStyles.pageRow,
                    {
                        flex: 5,
                        width: '70%',
                        height: '30%',
                        justifyContent: 'flex-start',
                        marginBottom: '3%',
                        marginRight: '3%',
                        borderWidth:3,
                        borderRadius:5,
                        backgroundColor:'rgba(255,255,255,0.75)'
                    },
                ]}
            >

                <Typography variant="h4" align="center" color="red">
                    您已交卷，请等待监考发出指令后，退出页面、登出系统，有序离开考场
                </Typography>


            </View>
        </Structure>
    )
}

interface ParamsToProblem {
    problemIndex: number
    problem: Problem
    onAnswerChange: (index: number, answer: ProblemAnswer) => void
}

export const MyFillInProblem: React.FC<ParamsToProblem> = ({ problemIndex, problem, onAnswerChange }) => {
    const [answerText, setAnswerText] = useState('')
    const [TeXDescription, setTeXDescription] = useState('')
    const dummy: number[] = Array(problem.choiceCnt).fill(0)
    useEffect(() => {
        const re1 = new RegExp(' ', 'g')
        const re2 = new RegExp('\\n', 'g')
        setTeXDescription(problem.description.replace(re1, '~').replace(re2, '\\\\'))
    })
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswerText(event.target.value)
    }
    const handleSave = () => {
        onAnswerChange(problemIndex, new ProblemAnswer(problem, '', answerText, '', 0))
    }

    return (
        <View
            style={[
                pageStyles.pageColumn,
                {
                    flex: 5,
                    width: '100%',
                    height: '90%',
                    justifyContent: 'flex-start',
                    marginBottom: '3%',
                    marginRight: '3%',
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
                    width: '70%',
                    borderRadius: '5px',
                }}
            >
                <Typography variant="h6" align="left">
                    {'Problem ' + problemIndex}
                </Typography>
                <WaterMarkContent>
                    <InlineMath>{TeXDescription}</InlineMath>
                </WaterMarkContent>
                <WaterMarkContent>
                    <img src={problem.image} alt="" />
                </WaterMarkContent>
                <TextField
                    label={'Your answer for Problem ' + problemIndex}
                    onChange={handleChange}
                    style={{ marginBottom: 10 }}
                />
                <Button type="submit" color="primary" onClick={handleSave}>
                    保存答案
                </Button>
            </Box>
        </View>
    )
}

export const MyImageProblem: React.FC<ParamsToProblem> = ({ problemIndex, problem, onAnswerChange }) => {
    const [answerImage, setAnswerImage] = useState('')
    const [TeXDescription, setTeXDescription] = useState('')
    const dummy: number[] = Array(problem.choiceCnt).fill(0)
    useEffect(() => {
        const re1 = new RegExp(' ', 'g')
        const re2 = new RegExp('\\n', 'g')
        setTeXDescription(problem.description.replace(re1, '~').replace(re2, '\\\\'))
    })
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files) return
        const fr = new FileReader()
        const ff = files[0]
        fr.readAsDataURL(ff)
        fr.onload = function () {
            // setImage(String(this.result))
            const img = new Image()
            img.src = String(this.result)
            img.onload = () => {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                if (ctx) {
                    const maxWidth = 800
                    const width = maxWidth > img.width ? img.width : maxWidth
                    const ratio = width / img.width
                    const height = img.height * ratio
                    canvas.width = width
                    canvas.height = height
                    ctx.drawImage(img, 0, 0, width, height)
                    const compressedImageData = canvas.toDataURL('image/jpeg', 0.7)
                    setAnswerImage(compressedImageData)
                }
            }
        }
    }
    const handleImageRemove = () => {
        console.log('test')
        setAnswerImage('')
    }
    const handleSave = () => {
        onAnswerChange(problemIndex, new ProblemAnswer(problem, '', '', answerImage, 0))
    }
    return (
        <View
            style={[
                pageStyles.pageColumn,
                {
                    flex: 5,
                    width: '100%',
                    height: '90%',
                    justifyContent: 'flex-start',
                    marginBottom: '3%',
                    marginRight: '3%',
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
                    width: '70%',
                    borderRadius: '5px',
                }}
            >
                <Typography variant="h6" align="left">
                    {'Problem ' + problemIndex}
                </Typography>
                <WaterMarkContent>
                    <InlineMath>{TeXDescription}</InlineMath>
                </WaterMarkContent>
                <WaterMarkContent>
                    <img src={problem.image} alt="IIIS logo" />
                </WaterMarkContent>
                <Typography align="left">{'你的答案 Problem ' + problemIndex + ':'}</Typography>
                <img src={answerImage} alt="" />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }}
                >
                    <Button variant="contained" component="label">
                        {'上传图片 Problem ' + problemIndex}
                        <input type="file" style={{ display: 'none' }} onChange={handleChange} />
                    </Button>
                    <Button variant="contained" component="label" onClick={handleImageRemove}>
                        删除图片
                    </Button>
                </Box>x
                <Button type="submit" color="primary" onClick={handleSave}>
                    保存答案
                </Button>
            </Box>
        </View>
    )
}

export const MyChoiceProblem: React.FC<ParamsToProblem> = ({ problemIndex, problem, onAnswerChange }) => {
    const [answerChoice, setAnswerChoice] = useState<string[]>(Array(problem.choiceCnt).fill(''))
    const [answerFlag, setAnswerFlag] = useState<boolean[]>(Array(problem.choiceCnt).fill(false))
    const [TeXDescription, setTeXDescription] = useState('')
    const dummy: number[] = Array(problem.choiceCnt).fill(0)
    useEffect(() => {
        const re1 = new RegExp(' ', 'g')
        const re2 = new RegExp('\\n', 'g')
        setTeXDescription(problem.description.replace(re1, '~').replace(re2, '\\\\'))
    })
    const handleAnswerChange = (index: number, value: boolean) => {
        const tmp = answerFlag
        tmp[index] = value
        setAnswerFlag(tmp)
        console.log('flag')
        console.log(answerFlag)
    }
    const handleChoiceChange = (index: number, char: string) => {
        const tmp = answerChoice
        tmp[index] = char
        setAnswerChoice(tmp)
    }
    const indexToChar = (index: number) => {
        console.log('indexToChar ' + String.fromCharCode('A'.charCodeAt(0) + index))
        return String.fromCharCode('A'.charCodeAt(0) + index)
    }
    const handleSave = () => {
        answerFlag.map((flag, index) => {
            flag ? handleChoiceChange(index, indexToChar(index)) : index
        })
        console.log(answerChoice)
        onAnswerChange(problemIndex, new ProblemAnswer(problem, answerChoice.join(), '', '', 0))
    }
    return (
        <View
            style={[
                pageStyles.pageColumn,
                {
                    flex: 5,
                    width: '100%',
                    height: '90%',
                    justifyContent: 'flex-start',
                    marginBottom: '3%',
                    marginRight: '3%',
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
                    width: '70%',
                    borderRadius: '5px',
                }}
            >
                <Typography variant="h6" align="left">
                    {'Problem ' + problemIndex}
                </Typography>
                <WaterMarkContent>
                    <InlineMath>{TeXDescription}</InlineMath>
                </WaterMarkContent>
                <View style={[pageStyles.pageRow, {flex:1,width:'auto',alignSelf:'center',height:'50%'}]}>
                    <WaterMarkContent>

                        <img src={problem.image} alt="" />

                    </WaterMarkContent>
                </View>
                <Typography align="left">{'Your answer for Problem ' + problemIndex + ':'}</Typography>
                {dummy.map((dum, index) => (
                    <Box
                        key={index}
                        sx={{ width: '15%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}
                    >
                        <MyCheckbox choiceIndex={index} onChoiceChange={handleAnswerChange} />
                    </Box>
                ))}
                <Button type="submit" color="primary" onClick={handleSave}>
                    保存答案
                </Button>
            </Box>
        </View>
    )
}

interface ParamsToCheckbox {
	choiceIndex: number;
	onChoiceChange: (choiceIndex: number, value: boolean) => void;
}

export const MyCheckbox: React.FC<ParamsToCheckbox> = ({ choiceIndex, onChoiceChange }) => {
	const [isChecked, setIsChecked] = useState(false);
	const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChoiceChange(choiceIndex, !isChecked);
		setIsChecked(!isChecked);
	};

	const indexToChar = (index: number) => {
		return String.fromCharCode("A".charCodeAt(0) + index);
	};

	return (<label>
		<input type="checkbox" checked={isChecked} onChange={handleCheckBoxChange} />
		{indexToChar(choiceIndex)}
	</label>);
};