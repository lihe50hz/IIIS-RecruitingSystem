// import React,{useState} from 'react'
import React from 'react'
import { Button, Paper, Typography } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { pageStyles, theme } from './App'
import { Text, View } from 'react-native'
import iiis_logo from '../static/icon/white_logo.png'
import WaterMarkContent from '../Plugins/MyComponent/WaterMarkContent'
import General from './Admin'

export const MessageDisplayer: React.FC = () => {
	const general = new General();
	const history = useHistory();
	const handleExit = async () => {
		history.push("/Login");
	};
	const handleBack = async () => {
		history.goBack();
	};


	return (
		<View style={[pageStyles.root, { justifyContent: "flex-start", flexDirection: "column" }]}>
			<View style={[pageStyles.pageRow, { backgroundColor: theme.palette.primary.main,flex: 1}]}>
				<View style={[pageStyles.pageColumn, { alignItems: "flex-start", flex: 1 }]}>
					<img src={iiis_logo} alt="IIIS logo" width="100%" />
				</View>
				<View style={[pageStyles.pageColumn, { alignItems: "center", flex: 1 }]}>
					<Typography variant="h6" align="center" style={{color:theme.palette.primary.contrastText}}>二次招生系统：公告显示</Typography>
				</View>
				<View style={[pageStyles.pageColumn, { alignItems: "center", flex: 1.5 }]}>
					<Typography variant="h6" align="center" style={{color:theme.palette.primary.contrastText}}>
						欢迎， {window.userName}
					</Typography>
				</View>
				<View style={[pageStyles.pageColumn, { alignItems: "center", flex: 0.6 }]}>
					<Button sx={{
						backgroundColor: theme.palette.primary.main,
						color: theme.palette.primary.contrastText,
						fontSize:20
					}} fullWidth={true} onClick={handleBack}>
						返回公告列表
					</Button>
				</View>
			</View>

			<View style={[pageStyles.pageColumn, {
				width: "100%",
				height: "90%",
				backgroundColor:"rgba(255,255,255,0.3)",
				justifyContent:"flex-start"
			}]}>

				<Paper sx={{ overflow: "auto", height: "90%", width: "90%",backgroundColor:'rgba(255,255,255,0.75)' }}>
					<View style={[pageStyles.pageRow, {
						flex: 1,
						justifyContent: "center",
						marginTop: "1.5%",
						marginBottom: "1.5%"
					}]}>
						<Text style={{
							fontSize: 32, color: theme.palette.primary.dark,
							fontWeight: "bold", fontFamily: "Roboto Mono, monospace"
						}}>当前公告</Text>
					</View>
					<View style={[pageStyles.pageColumn, { width: "100%", justifyContent: "flex-start" }]}>
						<View style={[pageStyles.pageRow, { justifyContent: "center", marginBottom: "1.5%" }]}>
							<Typography style={{ fontSize: 48, color: "black" }}>
								{window.mesTitle}
							</Typography>
						</View>
						<View style={[pageStyles.pageRow, { justifyContent: "flex-end", marginBottom: "1.5%" }]}>
							<Typography style={{ fontSize: 24, color: "black" }}>
								{window.mesType}{"------"}{window.mesDate}
							</Typography>
						</View>
						<View style={[pageStyles.pageRow, { justifyContent: "center", marginBottom: "1.5%" }]}>
							<Typography
								style={{ fontSize: 24, alignSelf: "center", color: "black", whiteSpace: "pre-wrap" }}>
								{"公告内容:\n"}{window.mesContent}
							</Typography>
						</View>
						{window.mesStatus.map(rep => (
							<div>
								<View style={[pageStyles.pageRow, {
									width: "100%",
									margin: "auto",
									alignSelf: "center",
									justifyContent: "center",
									marginBottom: "1.5%"
								}]}>
									<WaterMarkContent>
										<img src={rep} style={{ width: "100%", height: "100%" }} />
									</WaterMarkContent>
								</View>
							</div>
						))}
					</View>
				</Paper>
			</View>
		</View>
	);
};
