import React, { ChangeEvent, useState } from 'react'
import { Button, Card, CardContent, CardMedia, Grid, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { pageStyles, theme } from '../../Pages/App'
import { View } from 'react-native'

interface ImageUploadProps {
    onChange: (images: File[]) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange }) => {
    const [selectedImages, setSelectedImages] = useState<File[]>([])

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files

        if (files) {
            const newImages: File[] = Array.from(files)
            setSelectedImages(prevSelectedImages => [...prevSelectedImages, ...newImages])
            onChange([...selectedImages, ...newImages])
        }
    }

    const handleImageRemove = (image: File) => {
        const updatedImages = selectedImages.filter(img => img !== image)
        setSelectedImages(updatedImages)
        onChange(updatedImages)
    }

    return (
        <View style={pageStyles.pageRow}>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                id="image-upload"
            />
            <label htmlFor="image-upload">
                <View style={[pageStyles.pageColumn, { backgroundColor: 'purple', borderRadius: 5 }]}>
                    <Button
                        sx={{
                            backgroundColor: theme.palette.primary.light,
                            color: theme.palette.primary.contrastText,
                            width: '100%',
                        }}
                        component="span"
                    >
                        上传图片
                    </Button>
                </View>

                <Grid container spacing={2}>
                    {selectedImages.map((image, index) => (
                        <Grid item key={index} xs={6} sm={4} md={3}>
                            <Card>
                                <CardMedia component="img" src={URL.createObjectURL(image)} alt={`Image ${index}`} />
                                <CardContent>
                                    <IconButton onClick={() => handleImageRemove(image)}>
                                        <DeleteIcon color="secondary" />
                                    </IconButton>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </label>
        </View>
    )
}

export default ImageUpload;
