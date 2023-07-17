import React, { useEffect, useState } from 'react'
import General, { Structure } from './Teacher'
import { SimpleExamPaper } from '../Plugins/ExamPaperServiceShared/SimpleExamPaper'
import { createExamPaper } from '../Plugins/ExamPaperServiceApi/createExamPaper'
import { getAllExamPaper } from '../Plugins/ExamPaperServiceApi/getAllExamPaper'
import { Box, Button, Paper, Typography } from '@mui/material'

export const TeacherEditExam: React.FC = () => {
    const general = new General()
    const [simplePapers, setSimplePapers] = useState<SimpleExamPaper[]>([])
    const [shouldRender, setShouldRender] = useState<boolean>(false)
    const handleAppend = () => {
        new createExamPaper().send(
            data => {
                console.log('创建成功')
                location.reload()
            },
            error => {
                console.log('创建失败')
            }
        )
    }
    useEffect(() => {
        new getAllExamPaper().send(
            data => {
                const tmp: SimpleExamPaper[] = JSON.parse(data)
                setSimplePapers(tmp)
                setShouldRender(true)
            },
            error => {
                console.log('发送失败')
            }
        )
    }, [])
    const handleClick = (index: number) => {
        window.currentEditingPaperIndex = index
        general.history.push('/Teacher/Editing')
    }

    return (
        <Structure general={general}>
            {shouldRender && (
                <Paper sx={{ overflow: 'auto', maxHeight: 400, width: '90%' }}>
                    {simplePapers.map((paper, index) => (
                        <Box key={index}>
                            <Button>
                                <Typography variant="h6" align="left" onClick={() => handleClick(paper.index)}>
                                    {paper.title + '(' + paper.examYear + ')'}
                                </Typography>
                            </Button>
                        </Box>
                    ))}
                    <Button>
                        <Typography variant="h6" align="left" onClick={handleAppend}>
                            添加新试卷
                        </Typography>
                    </Button>
                </Paper>
            )}
        </Structure>
    )
}