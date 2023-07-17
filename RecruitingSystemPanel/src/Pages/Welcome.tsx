import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { View } from 'react-native'
import Fade from '@mui/material/Fade'
import { pageStyles, theme } from './App'
import image1 from '../static/welcome/20220524114137xUTe1R.jpg'
import image2 from '../static/welcome/20220524114448bf5sd1.jpg'
import image3 from '../static/welcome/20230627082106NvH34h.png'
import image4 from '../static/welcome/banner1_Lao1.jpg'
import image5 from '../static/welcome/banner1_Lao2.jpg'
import image6 from '../static/welcome/banner1_Lao3.jpg'
import { useHistory } from 'react-router-dom'

export const Welcome = () => {
    const history = useHistory()
    const [index, setIndex] = useState(0)
    useEffect(() => {
        const timer = setInterval(() => {
            index === images.length - 1 ? setIndex(0) : setIndex(index + 1)
        }, 5000)

        return () => clearInterval(timer)
    }, [index])
    const handleStart = () => {
        history.push('/Login')
    }

    const images = [image1, image2, image3, image4, image5, image6]

    return (
        <View style={[pageStyles.root]}>
            {images.map((image, i) => (
                <Fade in={i === index} key={i} timeout={1000}>
                    <img
                        src={image}
                        alt=""
                        style={{
                            position: 'absolute',
                            backgroundSize: 'cover',
                        }}
                    />
                </Fade>
            ))}
            <View style={pageStyles.pageRow}>
                <Button
                    sx={[
                        pageStyles.buttonLogins,
                        {
                            '&:hover': {
                                backgroundColor: theme.palette.primary.main,
                            },
                        },
                    ]}
                    onClick={handleStart}
                >
                    {window.isEnglish ? 'LOGIN' : '报名'}
                </Button>
            </View>
        </View>
    )
}
