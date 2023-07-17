import { useHistory } from 'react-router-dom'
import { StyleSheet } from 'react-native'
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
    palette: {
        primary: {
            light: '#ae5eae',
            main: '#6555ae',
            dark: '#4b0c77',
            contrastText: '#fff',
        },
        secondary: {
            light: '#fff',
            main: '#48b9d9',
            dark: '#1687a6',
            contrastText: '#000',
        },
    },
})
export const pageStyles = StyleSheet.create({
    root: {
        width: 1440,
        height: 720,
        position: 'relative',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: 'auto',
    },
    pageColumn: {
        width: 'auto',
        height: '100%',
        position: 'relative',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.primary.main,
    },
    pageRow: {
        width: '100%',
        height: 'auto',
        position: 'relative',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.primary.main,
    },
    adminButtonView: {
        backgroundColor: 'white',
        width: '80%',
        height: '60%',
    },
    buttonPanelChosen: {
        color: theme.palette.primary.main,
        borderStyle: 'solid',
        position:'relative',
        height: '100%',
        width: '100%',
        borderColor: theme.palette.primary.main,
        fontSize: 20,
    },
    buttonLogins: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        fontSize: 20,
        borderRadius: 10,
        boxShadow: '0px 3px 5px gray',
    },
    buttonLoginsChosen: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        fontSize: 20,
        borderRadius: 10,
        boxShadow: '0px 3px 5px gray',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Roboto Mono, monospace, Times New Roman, SimHei',
    },
    roundPanel: {
        borderWidth: 3,
        borderColor: 'rgba(255,255,255,1)',
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderRadius: 20,
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingBottom: '2%',
    },
})
export const App = () => {
    const history = useHistory()
    history.push('/Welcome')
    return null
}