# 姚班二招系统 (RecruitingSysrem) 报告

第19组 组长：罗天择 组员：吕敬一 李赫 缪星辰

报告主要作者：缪星辰

## 网站基本功能

- 学生、教师注册
- 学生填写个人信息
- 学生参加考试
- 教师创建、编辑考试，创建选择、填空、简答题
- 教师批改学生的作答
- 管理员删除学生、老师
- 管理员提升学生为老师
- 管理员允许学生参加考试
- 学生、老师、管理员网站和内容隔离（鉴权）

## 网站主要特色

- 欢迎、帮助页面
- 电子邮件验证码
- 中英文切换
- 题目支持文字、图片和 Markdown 数学公式
- 公告支持私信模式
- 图片自动添加水印
- 自动和手动隔离不同年份的考试与学生

## 项目开发全过程概述

- 第一周周四基本完成环境配置，由于同文的致命 bug 和 git 不同步问题，因此决定全面转为线下，仅部分借用同文的 AI 代码生成功能。

- 罗天择同学自学 Scala 后将同文自动生成的项目精简整理为目前的架构，此后的前端和后端 Core 均在此基础上修改开发，后续开发过程完全手工进行。

- 第一周周末和第二周前半周，罗天择、吕敬一、李赫负责登录、注册以及学生、教师账号的后端，缪星辰负责相应部分的前端界面。

- 第二周后半周，吕敬一、李赫开发了管理员以及部分考试、消息功能的后端，并搭配基本的前端界面；罗天择负责连接前后端通信并且实现了邮箱验证码、找回密码等功能；缪星辰负责代码融合规范、前端美化和前端小功能。

- 第二周周末和第三周前半周，吕敬一、李赫主要完善管理员、考试和消息的功能；罗天择实现了考试 markdown 支持，引入了流式布局，并大量改进后端实现；缪星辰负责代码融合精简、并在罗天择协助下完成第一次页面重构。

- 第三周后半周和周末，吕敬一、李赫实现了水印功能和完善的用户、考试管理；罗天择完成了用户身份鉴权和前端调整；缪星辰在罗天择协助下完成第二次页面重构，设计了一些视觉效果，并主要负责 Demo 制作和报告写作。

## 前端设计

- 前端的第一版本（主要是登录部分）模仿 <https://admission.join-tsinghua.edu.cn/frontend/site/login> 的风格，希望达到戏谑的效果，并降低同学的学习成本。同时缪星辰使用了大量该网站的素材，忠实地按照清华大学的紫色风格设计。第一版本的前端主要基于罗天择在最开始使用的 <tsx react mui\> 书写，使用 <Box/\> 和固定像素大小的设计。这一设计在吕敬一、李赫实现前端基本功能时得到沿用。

- 第二版本在罗天择的提议下全面拥抱流式布局<View/\>。这一阶段主要目标是将所有功能连接起来，并能正确地显示在网页上。同时，用户界面采用了一种偏浅色的界面，搭配清华紫的按钮，显得不甚和谐。

- 第三版本受到其他组的启发，将背景从简单图样替换为颜色鲜艳的校园风景，同时调整页面使之不会影响更为重要的考试功能。这一版本采用菜单模式，仿佛从页面上方垂下的卷帘，将清华紫替换为另一种深蓝色，整体视觉效果圆润、美观、和谐，搭配适当的动画，颇具特色。

- 我们排斥千篇一律的谷歌安卓式设计，即蓝框白底，也拒绝现成的一体化仪表盘解决方案，而是摸索出了一套简约美观的设计，并在许多地方独具匠心地设计了精巧的网页结构，希望让使用者感受到这是一件现代难得的手工产品。成功的配色和高专注的设计也使得学生更乐意使用这款产品考出更好的成绩。帮助页面和双语提示尽可能减少负责老师的答疑负担。可扩展的设计便于添加新的功能。

## 网站结构

```
./Welcome: 展示姚班生活
|
|-./Login: 所有用户的登录入口
  |
  |-./Register: 学生和教师在此注册，注册后身份为学生
  |
  |-./Password: 用邮箱验证码修改密码
  |
  |-./Help: 对二招和系统使用的帮助
  |
  |-./Student: 学生主页
  | |
  | |-./Student/Messages: 接收公告
  | | |
  | | |-./MessageDisplayer: 公告展示页面
  | |
  | |-./Student/Info: 编辑个人信息（用于报名考试）
  | |
  | |-./Student/Exam: 展示有效的考试
  |   |
  |   |-./Student/Exams/Before: 考试准备页面
  |   |
  |   |-./Student/Exams/Running: 考试进行中
  |   |
  |   |-./Student/Exams/After: 考试结束提示
  |
  |-./Teacher: 教师主页（以下均需要教师身份验证）
  | |
  | |-./Teacher/Messages: 接收公告
  | |
  | |-./Teacher/Exam: 添加或编辑考试
  | | |
  | | |- ./Teacher/Editing: 考试编辑页面
  | |
  | |-./Teacher/Score: 选择要批改的考试
  |   |
  |   |- ./Teacher/Scoring: 考试批改页面
  |
  |-./Admin: 管理员主页（以下均需要管理员身份验证）
    |
    |-./Admin/Users: 修改用户身份、删除现有用户
    |
    |-./Admin/Messages: 创建、编辑、发布公告
    |
    |-./Admin/ExamInfo: 选择某年的考试
    | |
    | |-./Admin/ExamStudentList: 管理学生参与考试的权限
    |
    |-./Admin/ExamManage: 选择某年的考试
    |
    |-./Admin/ScoreInfo: 查看学生分数和排名，发布笔面试公告
```

## 二招全流程

```
学生               教师                    管理员
注册账号           注册账号
                                          提升教师账号身份
登录账号           登录账号      
填写个人信息       创建新考试
                  填写考试年份、时间和内容
                  发布考试
                                          设置学生是否有资格参加考试
进入考试等待页面
开始考试
考试结束交卷
                  选择试卷和考生开始批改
                  批改完成上传分数
                                          查看考生分数并按照总分或不同考试排序
                                          选择通过考试的学生，生成公告
                                          发送公告或以私信模式发送
查看公告栏和邮箱
获得考试结果和面试通知
```

## 项目结构

```
RecruitingSystem
| 前端，定义网页和静态图片资源
|-RecruitingSystemPanel
| |
| |-src: 页面资源
| | |
| | |-Pages: 页面内容、布局（省略大部分与网址对应的文件）
| | | |
| | | |-App.tsx: 根网址，自动跳转欢迎页面；定义组件风格和配色
| | | |
| | | |-Logins: 登录界面公共模板
| | | |
| | | |-Student.tsx: 学生页面公共模板
| | | |
| | | |-Teacher.tsx: 教师页面公共模板
| | | |
| | | |-Admin.tsx: 管理员页面公用模板
| | |
| | |-static: 存储静态图片、图标
| | |
| | |-Plugins: 后端各模块的 Api/Shared
| | | |
| | | |-MyComponent: 考试用到的图片和水印服务
| | |
| | |-index.tsx: 链接各网页，设置背景图片
| | |
| | |-global.d.ts: 公用变量，用于鉴权和记录状态
| | |
| | |-declaration.d.ts: 定义可识别的资源文件
| |
| |-node_modules: 外部模块
| |
| |-public: 根网页，设置网页图标
| 后端，结构基于同文生成进一步精简
|-RecruitingSystemPortal: 前后端信息传输
|
|-ExamPaperServiceCore: 考试编辑、显示服务的数据库对接
|
|-ExamServiceCore: 考试管理服务的数据库对接
|
|-MessageServiceCore: 公告通知管理服务的数据库对接
|
|-SignUpServiceCore: 报名、邮件服务的数据库对接
|
|-UserServiceCore: 用户管理服务的数据库对接

```

## 组内分工

### 按类别划分

#### 罗天择

前端代码的主体工作

前端鉴权与反作弊的主体工作

后端的用户管理相关服务

前后端统筹规划与通信

Demo 修复 bug 后解说

#### 吕敬一

Demo 演示和解说

前端接口的功能性实现

后端设计与实现

部分鉴权设计

#### 李赫

前端接口的功能性实现

后端设计与实现

部分鉴权设计

#### 缪星辰

登录界面

美工

代码整理精简

合并各成员的工作（merge & 规范化）

收集 THU IIIS 标志和各种图片素材

Demo 环境准备、剪辑

写报告

### 按文件划分（一些文件经过多人修改，划分不完全准确）

#### 罗天择 吕敬一 李赫 缪星辰 比例大致划定

```
前端部分.tsx文件
Admin 2 0 0 8
AdminExamInfo 6 0 0 4
AdminExamManage 3 3 0 4
AdminExamStudentInfo 3 4 0 3
AdminExamStudentList 4 4 0 2
AdminHome 4 0 0 6
AdminMessagesInfo 4 0 4 2
AdminScoreInfo 5 3 0 2
AdminScoreStudentList 4 4 0 2
AdminUserInfo 7 0 1 2
App 5 0 0 5
Logins 2 0 0 8
LoginsLogin 4 0 0 6
LoginsPassword 5 0 0 5
LoginsResgister 4 0 0 6

MessageDisplayer 10 0 0 0

Student 2 0 0 8
StudentExamPage 3 6 0 1
StudentExamService 6 2 0 2
StudentHome 4 0 2 4
StudentMessages 5 0 4 1
StudentPersonalInformation 5 0 3 2
Teacher 2 0 0 8
TeacherEditExam 3 5 0 2
TeacherEditing 6 3 0 1
TeacherHome 6 0 0 4
TeacherHomeScoreAnswers 5 3 0 2
TeacherMessages 8 0 1 1 
TeacherScoring 3 6 0 1
Welcome 2 0 0 8

```

```
后端部分：
UserServiceApi-Shared-Core 7 1 1 1
SignUpServiceApi-Shared-Core 6 4 0 0
ExamServiceApi-Shared-Core 0 10 0 0 
ExamPaperServiceApi-Shared-Core 0 10 0 0
MessageService 0 0 10 0
ImageService（后转化为在前端定义组件实现） 0 0 10 0

```
