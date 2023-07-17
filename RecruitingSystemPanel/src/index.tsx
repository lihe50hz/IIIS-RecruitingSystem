import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router'
import Background from '../src/static/icon/bg.jpg'

import { App } from './Pages/App'
import { Welcome } from './Pages/Welcome'
import { Help } from './Pages/Help'

import { LoginsLogin } from './Pages/LoginsLogin'
import { LoginsRegister } from './Pages/LoginsRegister'
import { LoginsPassword } from './Pages/LoginsPassword'

import { StudentHome } from './Pages/StudentHome'
import { StudentMessages } from './Pages/StudentMessages'
import { StudentExamService } from './Pages/StudentExamService'
import { StudentPersonalInformation } from './Pages/StudentPersonalInformation'
import { AfterExam, BeforeExam, StudentExamPage } from './Pages/StudentExamPage'

import { TeacherHome } from './Pages/TeacherHome'
import {TeacherMessages} from './Pages/TeacherMessages'
import { TeacherEditExam } from './Pages/TeacherEditExam'
import { TeacherHomeScoreAnswers } from './Pages/TeacherHomeScoreAnswers'
import { TeacherEditing } from './Pages/TeacherEditing'
import { TeacherScoring } from './Pages/TeacherScoring'

import { AdminHome } from './Pages/AdminHome'
import { AdminMessages } from './Pages/AdminMessagesInfo'
import { AdminExamInfo } from './Pages/AdminExamInfo'
import { AdminUsersInfo } from './Pages/AdminUsersInfo'

import { AdminExamStudentList } from './Pages/AdminExamStudentList'
import { AdminExamStudentInfo } from './Pages/AdminExamStudentInfo'
import { AdminExamManage } from './Pages/AdminExamManage'
import { AdminScoreStudentList } from './Pages/AdminScoreStudentList'
import { AdminScoreInfo } from './Pages/AdminScoreInfo'

import { MessageDisplayer } from './Pages/MessageDisplayer'

render(
    <div
        style={{
            backgroundImage: `url(${Background})`,
            backgroundSize: 'cover',
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        }}
    >
        <HashRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/Welcome" exact component={Welcome} />
                <Route path="/Help" exact component={Help} />

                <Route path="/Login" exact component={LoginsLogin} />
                <Route path="/Register" exact component={LoginsRegister} />
                <Route path="/Password" exact component={LoginsPassword} />

                <Route path="/Student" exact component={StudentHome} />
                <Route path="/Student/Messages" exact component={StudentMessages} />
                <Route path="/Student/Exam" exact component={StudentExamService} />
                <Route path="/Student/Info" exact component={StudentPersonalInformation} />
                <Route path="/Student/Exams/Before" exact component={BeforeExam} />
                <Route path="/Student/Exams/Running" exact component={StudentExamPage} />
                <Route path="/Student/Exams/After" exact component={AfterExam} />

                <Route path="/Teacher" exact component={TeacherHome} />
                <Route path="/Teacher/Messages" exact component={TeacherMessages} />
                <Route path="/Teacher/Exam" exact component={TeacherEditExam} />
                <Route path="/Teacher/Score" exact component={TeacherHomeScoreAnswers} />
                <Route path="/Teacher/Editing" exact component={TeacherEditing} />
                <Route path="/Teacher/Scoring" exact component={TeacherScoring} />

                <Route path="/Admin" exact component={AdminHome} />
                <Route path="/Admin/Users" exact component={AdminUsersInfo} />
                <Route path="/Admin/StudentMessages" exact component={AdminMessages} />
                <Route path="/Admin/ExamStudentList" exact component={AdminExamStudentList} />
                <Route path="/Admin/ExamStudentInfo" exact component={AdminExamStudentInfo} />
                <Route path="/Admin/ExamManage" exact component={AdminExamManage} />
                <Route path="/Admin/ExamInfo" exact component={AdminExamInfo} />
                <Route path="/Admin/ScoreInfo" exact component={AdminScoreInfo} />
                <Route path="/Admin/ScoreStudentList" exact component={AdminScoreStudentList} />

                <Route path="/MessageDisplayer" exact component={MessageDisplayer} />

                <Redirect from="*" to="/Welcome" />
            </Switch>
        </HashRouter>
    </div>,
    document.getElementById('root')
)
