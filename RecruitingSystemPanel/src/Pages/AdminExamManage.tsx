import React, { useEffect, useState } from 'react'
import { pageStyles, theme } from './App'
import { Container, Paper, Snackbar, Switch, TextField, Typography } from '@mui/material'
import { getAllExamPaper } from '../Plugins/ExamPaperServiceApi/getAllExamPaper'
import { SimpleExamPaper } from '../Plugins/ExamPaperServiceShared/SimpleExamPaper'
import General, { Structure } from './Admin'
import { Text, View } from 'react-native'
import { hasExam } from '../Plugins/ExamServiceApi/hasExam'
import { removeExam } from '../Plugins/ExamServiceApi/removeExam'
import { addExam } from '../Plugins/ExamServiceApi/addExam'

export const AdminExamManage: React.FC = () => {
    const general = new General()
    const [allPapers, setAllPapers] = useState<SimpleExamPaper[]>([])
    const [shouldRender, setShouldRender] = useState<boolean>(false)
    const [length, setLength] = useState(0)
    useEffect(() => {
        new getAllExamPaper().send(
            data => {
                const tmp: SimpleExamPaper[] = JSON.parse(data)
                setAllPapers(tmp)
                setLength(tmp.length)
                setShouldRender(true)
            },
            error => {
                console.log('发送失败')
            }
        )
    }, [])
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
                    ---考试进程管理---
                </Text>
            </View>
            <View style={[pageStyles.pageRow, { flex: 7, alignItems: 'flex-start', width: '100%' }]}>
                {{ shouldRender } && (
                    <Paper sx={{ overflow: 'auto', maxHeight: 500, width: '100%' }}>
                        <PaperTable data={allPapers} length={length} />
                    </Paper>
                )}
            </View>
        </Structure>
    )
}

interface ButtonProp {
    index: number
    paper: SimpleExamPaper
    handleClick: (index: number, paper: SimpleExamPaper, state: boolean) => void
    initialState: boolean
}

export const PassButton: React.FC<ButtonProp> = ({ index, paper, handleClick, initialState }) => {
    const [isOn, setIsOn] = useState<boolean>(initialState)
    const handleToggle = () => {
        handleClick(index, paper, !isOn)
        setIsOn(!isOn)
    }
    return <Switch color="primary" checked={isOn} onChange={handleToggle} />
}

interface TableProps {
    data: SimpleExamPaper[]
    length: number
}

const PaperTable: React.FC<TableProps> = ({ data, length }) => {
    if (length <= 0) return <Container></Container>
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
    // useEffect(() => { handleExamResult(0) } )
    const [selectedDate, setSelectedDate] = useState<(Date | null)[]>(Array(data.length).fill(null))
    const [initialButton, setInitialButton] = useState<boolean[]>(Array(length).fill(undefined))
    const [shouldRender, setShouldRender] = useState<boolean>(false)
    const [tmpResult, setTmpResult] = useState<boolean>(false)

    useEffect(() => {
        // console.log(length)
        // //data.map((paper, index) => modifyInitial(index, queryInitial(index)))
        // for(let index = 0; index < length; index++)
        // 	queryInitial(index)
        // // console.log(initialButton)
        // setShouldRender(true)
    }, [])
    const modifyInitial = (index: number, value: boolean) => {
        const tmp = initialButton
        tmp[index] = value
        setInitialButton(tmp)
    }
    const handleDateChange = (index: number, date: string) => {
        const tmpDate = selectedDate
        tmpDate[index] = new Date(date)
        setSelectedDate(tmpDate)
    }
    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }
    const handleToggleChange = (index: number, paper: SimpleExamPaper, state: boolean) => {
        if (state) {
            if (selectedDate[index] == null) {
                setSnackbarOpen(true)
            } else if (selectedDate[index] != null) {
                const date: Date = selectedDate[index] as Date
                console.log(date.getTime())
                console.log(data[index])
                new addExam(data[index], date.getTime()).send(
                    data => {
                        console.log('发送成功')
                    },
                    error => {
                        console.log('发送失败')
                    }
                )
            }
        } else {
            console.log('test')
            new removeExam(paper.index).send(
                data => {
                    console.log('发送成功')
                },
                error => {
                    console.log('发送失败')
                }
            )
        }
    }

    const queryInitial = (index: number) => {
        new hasExam(data[index].index).send(
            data => {
                const res: boolean = JSON.parse(data)
                console.log(res)
                modifyInitial(index, res)
            },
            error => {
                console.log('发送失败')
            }
        )
    }

    return (
        <View style={pageStyles.pageColumn}>
            {{ shouldRender } && (
                <table width="100%">
                    <thead>
                        <tr color={theme.palette.primary.main}>
                            <th>试卷标题</th>
                            <th>使用年份</th>
                            <th>是否考生可见？</th>
                            <th>考试起始时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td align="center">
                                    <Typography variant="h6" align="center">
                                        {row.title}
                                    </Typography>
                                </td>
                                <td align="center">{row.examYear}</td>
                                <td align="center">
                                    <PassButton
                                        index={index}
                                        paper={row}
                                        handleClick={handleToggleChange}
                                        initialState={initialButton[index]}
                                    />
                                </td>
                                <td align="center">
                                    <DatePick index={index} onDateChange={handleDateChange} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <Snackbar
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                message="请输入考试起始时间"
                autoHideDuration={3000}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            />
        </View>
    )
}

interface DatePickerProps {
    index: number
    onDateChange: (index: number, date: string) => void
}

const DatePick: React.FC<DatePickerProps> = ({ index, onDateChange }) => {
    const [selectedDate, setSelectedDate] = useState('')
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value)
        onDateChange(index, event.target.value)
    }
    return (
        <TextField
            label="YYYY-MM-DD hh:mm:ss"
            value={selectedDate}
            onChange={handleDateChange}
            style={{ marginBottom: 10 }}
        />
    )
}