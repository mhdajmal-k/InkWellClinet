/* eslint-disable @typescript-eslint/no-explicit-any */


import { Button, Card, CardBody, Input, Textarea } from '@nextui-org/react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { IoMdCloseCircle } from "react-icons/io";
import { preferredArticleCategories } from '../../utils/enums/preferedCategory';
import CustomToast from '../helpers/CustomToast';
import { crateBlog } from '../../store/slices/userThunk';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';




const CreateArticle: React.FC = () => {
    const [articleName, setArticleName] = useState('')
    const [description, setDescription] = useState('')
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const dispatch: AppDispatch = useDispatch();
    const [category, setCategory] = useState('')
    const navigate = useNavigate()
    const { loading, error } = useSelector((state: RootState) => state.user)

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };
    const handleRemoveImageIndia = () => {
        if (previewImage) {
            if (previewImage) URL.revokeObjectURL(previewImage);
        }
        setSelectedImage(null);
        setPreviewImage(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('title', articleName)
            formData.append('content', description)
            console.log(selectedImage, "is the image  ")
            if (selectedImage) {
                formData.append('image', selectedImage);
            }
            formData.append('category', category)
            for (const [key, value] of formData.entries()) {
                console.log(key, value);
            }

            const response = await dispatch(crateBlog(formData)).unwrap();
            toast(<CustomToast message={response.message} type="success" />);
            navigate("/dashBoard")
            setSelectedImage(null);
            setPreviewImage(null);
        } catch (error: any) {
            toast(<CustomToast message={error || error.message} type="error" />);

        }

    }

    return (
        <div className='container'>
            <Card className="w-full max-w-4xl mx-auto p-4 my-5">
                <h1 className='text-2xl font-bold'>Create New Article</h1>
                <h4 className='text-base mt-2'>Fill in the details to create a new article</h4>

                <CardBody>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="articleName" className="text-sm font-medium">
                                Article Name
                            </label>
                            <Input
                                id="articleName"
                                value={articleName}
                                onChange={(e) => setArticleName(e.target.value)}
                                placeholder="Enter article name"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="text-sm font-medium">
                                Description
                            </label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter article description"
                                required
                            />
                        </div>

                        <div className='m-4'>
                            <input
                                type='file'
                                onChange={handleImageChange}
                                accept='image/*'

                            />
                        </div>
                        {previewImage && (
                            <div style={{ marginTop: '10px' }}>
                                <img src={previewImage} alt='Selected' className='w-24 h-24 object-contain border' />
                                <button onClick={handleRemoveImageIndia} className="mt-2 text-red-500 text-sm flex items-center space-x-1">
                                    <IoMdCloseCircle /> <span>Remove</span>
                                </button>
                            </div>
                        )}

                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full border rounded p-2"
                            required
                        >
                            <option value="">Select a category</option>
                            {preferredArticleCategories.map((value, index) => {
                                return <option value={value.name} key={index}>{value.name}</option>
                            })}



                        </select>


                        {loading ? (
                            <Button color="primary" type="submit" className="w-full" isLoading disabled>
                                Creating ...
                            </Button>
                        ) : (
                            <Button
                                color="primary"
                                type="submit"
                                className={`w-full`}
                            >
                                Creating new Blog
                            </Button>

                        )}
                        {error && <p>{error}</p>}
                    </form>
                </CardBody>
            </Card>
        </div>
    )
}

export default CreateArticle

