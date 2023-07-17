import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import { pageStyles, theme } from "./App";
import { Problem } from 'Plugins/ExamPaperServiceShared/Problem'
import { ExamPaper } from 'Plugins/ExamPaperServiceShared/ExamPaper'
import General, { Structure } from '../../src/Pages/Teacher'
import { View ,Text } from 'react-native'
import { getExamPaper } from '../Plugins/ExamPaperServiceApi/getExamPaper'
import { rewriteExamPaper } from '../Plugins/ExamPaperServiceApi/rewriteExamPaper'
import { removeExamPaper } from '../Plugins/ExamPaperServiceApi/removeExamPaper'
import "katex/dist/katex.css"
const { InlineMath } = require('react-katex')
const { BlockMath } = require('react-katex')
export const TeacherEditing: React.FC = () => {
    const general = new General()
    const [examTitle, setExamTitle] = useState('')
    const [examDuration, setExamDuration] = useState('')
    const [examYear, setExamYear] = useState('')
    const [problemCnt, setProblemCnt] = useState<number>(0)
    const [problemArray, setProblemArray] = useState<Problem[]>([])

    const [shouldRender, setShouldRender] = useState<boolean>(false)
    const [shouldLeave, setShouldLeave] = useState<boolean>(false)

    const defaultChoiceProblem = new Problem('Choice', '', '', 0)
    const defaultFillInProblem = new Problem('FillIn', '', '', 0)
    const defaultImageProblem = new Problem('Image', '', '', 0)

    useEffect(() => {
        // if (!window.isLogged) {
        //     window.isBlocked = true
        //     history.push('/')
        // }
        // 再加一条鉴权
        if (shouldLeave) {
            general.history.push('/Teacher/Exam')
            return
        }
        // 再加一条获取考试状态
        new getExamPaper(window.currentEditingPaperIndex).send(
            data => {
                const tmp: ExamPaper = JSON.parse(data)
                setExamTitle(tmp.title)
                setExamDuration(tmp.examDuration.toString())
                setExamYear(tmp.examYear)
                setProblemCnt(tmp.problemCnt)
                setProblemArray(tmp.problems)
                setShouldRender(true)
            },
            error => {
                console.log('获取考试失败')
            }
        )
    }, [shouldLeave])

    const handleProblemChange = (index: number, problem: Problem) => {
        setShouldRender(false)
        const tmp = problemArray
        tmp[index] = problem
        console.log(problem)
        setProblemArray(tmp)
        setShouldRender(true)
    }

    const handleProblemInsert = (index: number) => {
        problemArray.splice(index, 0, defaultChoiceProblem)
        setProblemCnt(problemCnt + 1)
    }
    const handleProblemAppend = () => {
        handleProblemInsert(problemArray.length)
        setProblemCnt(problemCnt + 1)
    }
    const handleProblemRemove = (index: number) => {
        problemArray.splice(index, 1)
        setProblemCnt(problemCnt - 1)
    }

    const handleExamTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExamTitle(event.target.value)
    }

    const handleExamDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExamDuration(event.target.value)
    }

    const handleExamYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExamYear(event.target.value)
    }

    const handleReturn = () => {
        new rewriteExamPaper(
            window.currentEditingPaperIndex,
            new ExamPaper(
                window.currentEditingPaperIndex,
                examTitle,
                problemArray.length,
                parseInt(examDuration),
                examYear,
                problemArray
            )
        ).send(
            data => {
                console.log('发送成功')
                setShouldLeave(true)
            },
            error => {
                console.log('发送失败')
            }
        )
    }

    const handlePaperRemove = () => {
        new removeExamPaper(window.currentEditingPaperIndex).send(
            data => {
                console.log('发送成功')
                setShouldLeave(true)
            },
            error => {
                console.log('发送失败')
            }
        )
    }

    return (
        <Structure general={general}>
            <View style={[pageStyles.pageRow, { flex: 1, marginBottom: '2%',justifyContent: 'space-evenly',width:'80%' }]}>
                <TextField
                    label="试卷标题"
                    value={examTitle}
                    onChange={handleExamTitleChange}
                />
                <TextField
                    label="考试时长"
                    value={examDuration}
                    onChange={handleExamDurationChange}
                />
                <TextField
                    label="试卷年份"
                    value={examYear}
                    onChange={handleExamYearChange}
                />
                <View style={[pageStyles.pageColumn, {height:'70%', backgroundColor: 'purple', borderRadius: 5 }]}>
                    <Button
                        sx={{
                            height:'100%',
                            backgroundColor: theme.palette.primary.light,
                            color: theme.palette.primary.contrastText,
                        }}
                        onClick={handleReturn}
                    >
                        编辑完成
                    </Button>
                </View>

                <View style={[pageStyles.pageColumn, {height:'70%', backgroundColor: 'purple', borderRadius: 5 }]}>
                    <Button
                        sx={{
                            height:'100%',
                            backgroundColor: theme.palette.primary.light,
                            color: theme.palette.primary.contrastText,
                        }}
                        onClick={handlePaperRemove}
                    >
                        删除试卷
                    </Button>
                </View>
            </View>
            <View style={[pageStyles.pageRow, { flex: 7, alignItems: 'flex-start', width: '93%' }]}>
                {shouldRender && (
                    <Paper sx={{ overflow: 'auto', height:'100%', width: '100%' }}>
                        <View style={[pageStyles.pageColumn,{justifyContent: 'flex-start',width: '93%',marginTop:'3%'}]}>
                            {problemArray.map((problem, index) => (
                                <View key={index} style={[pageStyles.pageRow,{width:'90%',justifyContent:'center'}]}>
                                    <MyProblem
                                        problemIndex={index}
                                        problemContent={problem}
                                        onProblemChange={handleProblemChange}
                                        onProblemInsert={handleProblemInsert}
                                        onProblemRemove={handleProblemRemove}
                                        shouldRender={shouldRender}
                                    />
                                </View>
                            ))}
                            <Button>
                                <Typography variant="h6" align="left" onClick={handleProblemAppend}>
                                    添加新试题
                                </Typography>
                            </Button>
                        </View>
                    </Paper>
                )}
            </View>
        </Structure>
    )
}

interface ParamsToProblem {
    //children: never[]
    problemIndex: number
    problemContent: Problem
    onProblemChange: (index: number, problem: Problem) => void
    onProblemInsert: (index: number) => void
    onProblemRemove: (index: number) => void
    shouldRender: boolean
}

export const MyProblem: React.FC<ParamsToProblem> = ({
    problemIndex,
    problemContent,
    onProblemChange,
    onProblemInsert,
    onProblemRemove,
    shouldRender,
}) => {
    const [description, setDescription] = useState(problemContent.description)
    const [TeXDescription, setTeXDescription] = useState('')
    const [image, setImage] = useState(problemContent.image)
    const [type, setType] = useState(problemContent.problemType)
    const [choiceCnt, setChoiceCnt] = useState<number>(problemContent.choiceCnt)
    const defaultChoiceProblem = new Problem('Choice', '', '', 0)
    const defaultFillInProblem = new Problem('FillIn', '', '', 0)
    const defaultImageProblem = new Problem('Image', '', '', 0)
    const [rerender, setRerender] = useState<boolean>(true)
    const forceUpdate = () => {
        setRerender(false)
        setRerender(true)
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const re1 = new RegExp(' ', 'g')
        const re2 = new RegExp('\\n', 'g')
        setDescription(event.target.value)
        setTeXDescription(event.target.value.replace(re1, '~').replace(re2, '\\\\ '))
    }
    const handleChoiceCntChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChoiceCnt(parseInt(event.target.value))
    }
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                    setImage(compressedImageData)
                }
            }
        }
    }
    const handleImageRemove = () => {
        console.log('test')
        setImage('')
    }
    const handleProblemChange = () => {
        onProblemChange(problemIndex, new Problem(type, description, image, choiceCnt))
        forceUpdate()
    }
    const handleSwitchToChoice = () => {
        onProblemChange(problemIndex, defaultChoiceProblem)
        setType('Choice')
        setDescription('')
        setTeXDescription('')
        setImage('')
        setChoiceCnt(0)
        // forceUpdate()
    }
    const handleSwitchToFillIn = () => {
        console.log('test')
        onProblemChange(problemIndex, defaultFillInProblem)
        // forceUpdate()
        setType('FillIn')
        setDescription('')
        setTeXDescription('')
        setImage('')
        setChoiceCnt(0)
    }
    const handleSwitchToImage = () => {
        onProblemChange(problemIndex, defaultImageProblem)
        setType('Image')
        setDescription('')
        setTeXDescription('')
        setImage('')
        setChoiceCnt(0)
    }

    return (
        <View style={[pageStyles.pageRow, { flex: 1, alignItems:'flex-start', width: '90%' ,margin:'1%',
            borderColor:theme.palette.primary.main,borderWidth:3,borderRadius:5}]}>
            {rerender && shouldRender && (
                <View style={[pageStyles.pageColumn, { flex: 1, justifyContent: 'flex-start',margin:'1%'}]}>
                    <View style={[pageStyles.pageRow, { flex: 0.2, justifyContent: 'flex-start',alignItems:'flex-end'}]}>
                        <Text style={{fontSize:24,marginBottom:'0.5%'}}>
                            {'Problem ' + problemIndex + (type == 'Choice' ? '(选择题)' : type == 'FillIn' ? '(填空题)' : '(解答题)')}
                        </Text>
                    </View>
                    <View style={[pageStyles.pageRow, { flex: 1, alignItems: 'flex-start', height:'10%' }]}>
                        <View style={[pageStyles.pageColumn, { flex: 1}]}>
                            <TextField value={description} multiline={true} onChange={handleDescriptionChange} style={{height:'100%',width:'100%'}}/>
                        </View>
                        <View style={[pageStyles.pageColumn, { flex: 1 }]}>
                            <Paper sx={{ overflow: 'auto',height:'100%',width: '100%', backgroundColor: 'white' }}>
                                <InlineMath>{TeXDescription}</InlineMath>
                            </Paper>
                        </View>
                    </View>
                    <View style={[pageStyles.pageRow, {flex:1,width:'50%',height:'50%'}]}>
                        <div>
                            <img src={image}/>
                        </div>
                    </View>

                    <View style={[pageStyles.pageRow, { flex: 1, justifyContent: 'space-evenly',marginTop:'2%'}]}>
                        <Button variant="contained" component="label">
                            {'上传照片 ---  Problem ' + problemIndex}
                            <input type="file" style={{ display: 'none' }} onChange={handleImageChange} />
                        </Button>
                        <Button variant="contained" component="label" onClick={handleImageRemove}>
                            {'删除照片 ---  Problem ' + problemIndex}
                        </Button>
                    </View>
                    {type == 'Choice' && (
                        <View style={[pageStyles.pageRow, { flex: 1, marginTop:'2%'}]}>
                            <TextField label="Number of Choices" value={choiceCnt} onChange={handleChoiceCntChange} />
                        </View>
                    )}
                    <View style={[pageStyles.pageRow, { flex: 1, justifyContent: 'space-evenly',marginTop:"2%"}]}>
                        <Typography variant="h6" align="center">
                            ------- 操作 -------
                        </Typography>
                    </View>
                    <View style={[pageStyles.pageRow, { flex: 1, justifyContent: 'space-evenly',marginTop:'2%'}]}>
                        <Button color="primary" type="submit" onClick={handleSwitchToChoice}>
                            切换至选择题
                        </Button>
                        <Button color="primary" type="submit" onClick={handleSwitchToFillIn}>
                            切换至填空题
                        </Button>
                        <Button color="primary" type="submit" onClick={handleSwitchToImage}>
                            切换至解答题
                        </Button>
                        <Button color="primary" type="submit" onClick={() => onProblemInsert(problemIndex)}>
                            插入题目
                        </Button>
                        <Button color="primary" type="submit" onClick={() => onProblemRemove(problemIndex)}>
                            删除题目
                        </Button>
                        <Button color="primary" type="submit" onClick={handleProblemChange}>
                            保存题目
                        </Button>
                    </View>
                </View>
            )}
        </View>
    )
}